import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import { HttpTestService } from './http-test.service';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [HttpTestService],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  data: string;
  loading: boolean;
  postData: string;

   constructor(private http : Http, private httpService: HttpTestService){
   }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

   async onTestPost(text: string) {
    this.httpService.postJSON(text)
    
    .subscribe(
      
       error => JSON.parse(JSON.stringify(error)),
       () => console.log("acesso a webapi post ok...")
       
    );
    await this.delay(100);
    this.makeRequest();
}

  ngOnInit() {
  }

  

  makeRequest(): void {
    this.loading = true;
    this.http.request('http://localhost:8080/SWBackend/jaxrs/Person')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
    });
  }

}

