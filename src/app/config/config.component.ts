import { HttpTestService } from './http-test.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './funcionario.html',
  providers: [HttpTestService],
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {


  data: string;
  postForm: FormGroup;


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  constructor(private httpService: HttpTestService) {

  }
  async onTestPost(link: string) {

   this.httpService.requestPost(link, this.postForm);
   await this.delay(100);
   this.httpService.getJSON(link);
   await this.delay(100);
   this.data = this.httpService.data;

  }

  request(link: string) {
    this.httpService.getJSON(link);
  }

  ngOnInit() {

    this.postForm = new FormGroup({
      matricula: new FormControl(''),
      nome: new FormControl(''),
      salario: new FormControl('')

   });
  }
}

