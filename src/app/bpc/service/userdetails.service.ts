import { Injectable, AfterViewInit, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { SelectorContext } from '@angular/compiler';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import {MbpdataService } from "../service/mbpdata.service"
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserdetailsService {

  user: any;
  geo: string;
  nonIAI: string;
  sub: any;

  constructor(private http: Http, private route: ActivatedRoute, 
              private reviewdataviewService: MbpdataService, private router: Router) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  getUserdetails() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/getuser', options);
  }

  getNonIAIflag() {
    this.getUserdetails().subscribe(res => {
      this.user = res.json()
      this.user = this.user._json;
      
      var bGroups=this.user.blueGroups;
      var arrGrps = environment.bGroup_nonIAI.split(",");
      
      if (arrGrps.some(function(element) {return (bGroups.indexOf(element) != -1)})) {
        this.nonIAI = 'nonIAI';
      } else {
        this.nonIAI = '';   
      }
      console.log('Inside service function getNonIAIflag() => this.nonIAI = '+ this.nonIAI);
      return this.nonIAI;
    })
  }
}
