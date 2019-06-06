import { FormGroup } from '@angular/forms';
import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()


export class HttpTestService {
  data: any;
  loading: boolean;

  constructor(private http: Http) { }


        requestPost(link: any, postForm: FormGroup){
          this.postJSON(link, postForm)
         .subscribe(
          error => JSON.parse(JSON.stringify(error)),
          () => console.log('acesso a webapi post ok...')
          );
        }
        postJSON(link: string, postForm: FormGroup) {
          console.log(postForm.value);
            let json = JSON.stringify(postForm.value);
            let params = 'json=' + json;
            let cabe = new Headers();
            cabe.append('Content-Type', 'application/json');
            return this.http.post(link,
            params, {
                    headers : cabe
                    })
                    .pipe(map(res => res.json()));
          }


      getJSON(link: string): void {
        this.loading = true;
        this.http.request(link)
        .subscribe((res: Response) => {
          console.log(res.json());
          this.data = res.json();
          this.loading = false;

        });
      }
}
