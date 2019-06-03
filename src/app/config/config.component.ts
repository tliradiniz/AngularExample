import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  data: string;
  loading: boolean;

   constructor(private http: Http){}

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

   async onTestPost(text: string, link: string) {
    this.postJSON(text, link)
    .subscribe(
       error => JSON.parse(JSON.stringify(error)),
       () => console.log("acesso a webapi post ok...")
    );
    await this.delay(100);
    this.makeRequest(link);
}

  postJSON(txt: string, link: string) {
    let json = JSON.stringify({field: txt});
    let params = 'json=' + json;
    let cabe = new Headers();
    cabe.append('Content-Type', 'application/json');
    return this.http.post(link,
    params, {
             headers : cabe
            })
            .pipe(map(res => res.json()));
}


  makeRequest(link: string): void {
    this.loading = true;
    this.http.request(link)
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;
    });
  }

  ngOnInit() {
  }
}

