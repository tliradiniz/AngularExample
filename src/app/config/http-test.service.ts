import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import {Headers} from '@angular/http'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpTestService {
  constructor(private _http : Http) { }
       postJSON(txt: string) {
                var json = JSON.stringify({field: txt});
                var params = 'json=' + json;
                var cabe = new Headers();
                cabe.append('Content-Type', 'application/json');
                return this._http.post('http://localhost:8080/SWBackend/jaxrs/Person', 
                params, {
                         headers : cabe
                        })
                        .pipe(map(res=> res.json()));
            }
}