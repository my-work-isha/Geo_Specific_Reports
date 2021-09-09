import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MbpdataService } from "../service/mbpdata.service"
import { Router } from '@angular/router';
import { ViewdetailsService } from '../service/viewdetails.service';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserdetailsService } from '../service/userdetails.service';

@Component({
  selector: 'app-catviews',
  templateUrl: './catviews.component.html',
  styleUrls: ['./catviews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CatviewsComponent implements OnInit {

  submitAttempt: boolean;
  geo: string;
  private sub: any;
  user: any;
  isAdmin: boolean;
  searchValue: string = "";

  constructor(private http: Http, private route: ActivatedRoute,
    private reviewdataviewService: MbpdataService,
    private router: Router, private viewdetails: ViewdetailsService,
    private spinnerService: NgxSpinnerService, private userdetails: UserdetailsService) { };

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  cvi: any;
  
  nodes: any = [{
    data: {
      BUS_LEGAL_: "",
      Name: "",
      kwchannel: "",
      CITY: "",
      ST_ZIP: "",
      zip: "",
      isocountry: "",
      contact: "",
      nmauthor: "",
      datecreated: "",
      REFERENCE: "",
      _id: "",
      _rev: ""
    }
  }];

  ngOnInit() {

    this.userdetails.getUserdetails().subscribe(
      data => this.user = JSON.parse(data["_body"]),
      error => console.error(error),
      () => {
        this.user = this.user._json;
        var bGroups = this.user.blueGroups;

        var adminGrps = environment.bGroup_admin.split(",");
        if (adminGrps.some(function (element) { return (bGroups.indexOf(element) != -1) })) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    )

    this.sub = this.route.params.subscribe(params => {
      this.geo = params['geo'];
      
      // determine the row values based on the url geo parameter
      this.searchBtn(this.geo);
      
      let searchStr = this.reviewdataviewService.getSearchStr();
      if (searchStr) {
        this.searchValue = searchStr;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  updateview(info: any): void {
    console.log(info);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  //function for create new record 
  CreateNewRecord() {
    this.spinnerService.show();
    this.reviewdataviewService.setViewPath(window.location.pathname);
    this.reviewdataviewService.setMbpData("");
    this.router.navigate(['/recordform']);
  }

  refreshData() {
    // this.nodes.data = this.nodes.data.slice();
    this.reviewdataviewService.setSearchStr(this.searchValue);
  }

  nodeSelect(event) {
    let id = event.node.data._id;
    if (id && id != '') {
      this.spinnerService.show();
      this.reviewdataviewService.setViewPath(window.location.pathname);
      let params = new URLSearchParams();
      params.append("id", id);
      this.viewdetails.getDocbyid(params).subscribe(data => {
        this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));
        this.router.navigate(['/recordform']);
      });
    }
  }

  searchBtn(urlGeoParam: string) {
    
    // stop the serach if invalid special chars are entered for search
    if (urlGeoParam == 'clickAction' && 
        _.trim(this.reviewdataviewService.getSearchStr()) != "" && 
        this.invalidSpecialChars(this.reviewdataviewService.getSearchStr())
      ) {
      alert("Please do not enter special characters in the search value!!!");
      return;
    }

    let emptyObject: any = {
      BUS_LEGAL_: "",
      Name: "",
      kwchannel: "",
      CITY: "",
      ST_ZIP: "",
      zip: "",
      isocountry: "",
      contact: "",
      nmauthor: "",
      datecreated: "",
      REFERENCE: "",
      _id: "",
      _rev: ""
    }

    if (window.location.pathname == "/bystateprovince/bystateprovince" || urlGeoParam == "bystateprovince") {
      this.nodes.data = [{
        data: {
          ST_ZIP: "Data is loading... Please wait..."
        }
      }];

      let params = new URLSearchParams();
      params.append("searchStr", this.reviewdataviewService.getSearchStr());
      let headers = new Headers();
      let options = new RequestOptions({ params: params, headers: headers });
      this.http.get('/api/bystateprovince/', options).subscribe(
        data => {
          this.cvi = JSON.parse(data["_body"]);
        },
        error => console.error(error),
        () => {
          let cvidata = this.cvi.data;

          var result = _.chain(cvidata)
            .groupBy("ST_ZIP")
            .toPairs()
            .map(function (currentItem) {
              return _.zipObject(["data", "children"], currentItem);
            })
            .value();

          _.forEach(result, function (value: any, key) {
            let ST_ZIP: any = value.data;
            value.data = _.find(cvidata, { 'ST_ZIP': value.data });

            let obj = _.clone(emptyObject)
            obj.ST_ZIP = ST_ZIP;
            obj.ST_ZIP = (ST_ZIP == 'undefined' || ST_ZIP.trim() == '') ? "Unknown State/Province" : ST_ZIP;
            value.data = obj;

            var children_result = _.map(value.children, function (value, prop) {
              return { data: value };
            });
            value.children = children_result;
          });

          this.nodes = { data: result };
          if(result.length == 0) {
            this.nodes.data = [{
              data: {
                ST_ZIP: "No records found..."
              }
            }];
          }
          this.refreshData();
        }
      );
    } else if (window.location.pathname == "/BySourceChannel/BySourceChannel" || urlGeoParam == "BySourceChannel") {
      // initial message when the row data is being retrived from the api
      this.nodes.data = [{
        data: {
          kwchannel: "Data is loading... Please wait..."
        }
      }];

      let params = new URLSearchParams();
      params.append("searchStr", this.reviewdataviewService.getSearchStr());
      let headers = new Headers();
      let options = new RequestOptions({ params: params, headers: headers });
      this.http.get('/api/BySourceChannel/', options).subscribe(
        data => {
          this.cvi = JSON.parse(data["_body"]);
        },
        error => console.error(error),
        () => {
          let cvidata = this.cvi.data;

          var result = _.chain(cvidata)
            .groupBy("kwchannel")
            .toPairs()
            .map(function (currentItem) {
              return _.zipObject(["data", "children"], currentItem);
            })
            .value();

          _.forEach(result, function (value: any, key) {
            let kwchannel: any = value.data;
            value.data = _.find(cvidata, { 'kwchannel': value.data });

            let obj = _.clone(emptyObject)
            obj.kwchannel = kwchannel;
            obj.kwchannel = (kwchannel == 'undefined' || kwchannel.trim() == '') ? "No Source/Channel" : kwchannel;
            value.data = obj;

            var children_result = _.map(value.children, function (value, prop) {
              return { data: value };
            });
            value.children = children_result;
          });

          this.nodes = { data: result };
          if(result.length == 0) {
            this.nodes.data = [{
              data: {
                kwchannel: "No records found..."
              }
            }];
          }
          this.refreshData();
        }
      );
    } else if (window.location.pathname == "/bybusinesslegalname/bybusinesslegalname" || urlGeoParam == "bybusinesslegalname") {
      // initial message when the row data is being retrived from the api
      this.nodes.data = [{
        data: {
          BUS_LEGAL_: "Data is loading... Please wait..."
        }
      }];

      let params = new URLSearchParams();
      params.append("searchStr", this.reviewdataviewService.getSearchStr());
      let headers = new Headers();
      let options = new RequestOptions({ params: params, headers: headers });
      this.http.get('/api/bybusinesslegalname/', options).subscribe(
        data => {
          this.cvi = JSON.parse(data["_body"]);
        },
        error => console.error(error),
        () => {
          let cvidata = this.cvi.data;

          var result = _.chain(cvidata)
            .groupBy("BUS_LEGAL_")
            .toPairs()
            .map(function (currentItem) {
              return _.zipObject(["data", "children"], currentItem);
            })
            .value();

          _.forEach(result, function (value: any, key) {
            let BUS_LEGAL_: any = value.data;
            value.data = _.find(cvidata, { 'BUS_LEGAL_': value.data });

            let obj = _.clone(emptyObject)
            obj.BUS_LEGAL_ = BUS_LEGAL_;
            obj.BUS_LEGAL_ = (BUS_LEGAL_ == 'undefined' || BUS_LEGAL_.trim() == '') ? "No Business Legal Name" : BUS_LEGAL_;
            value.data = obj;

            var children_result = _.map(value.children, function (value, prop) {
              return { data: value };
            });
            value.children = children_result;
          });
          this.nodes = { data: result };
          if(result.length == 0) {
            this.nodes.data = [{
              data: {
                BUS_LEGAL_: "No records found..."
              }
            }];
          }
          this.refreshData();
        }
      );
    } else if (window.location.pathname == "/bysrcbuslegalname/bysrcbuslegalname" || urlGeoParam == "bysrcbuslegalname") {
      // initial message when the row data is being retrived from the api
      this.nodes.data = [{
        data: {
          kwchannel: "Data is loading... Please wait..."
        }
      }];

      let params = new URLSearchParams();
      params.append("searchStr", this.reviewdataviewService.getSearchStr());
      let headers = new Headers();
      let options = new RequestOptions({ params: params, headers: headers });
      this.http.get('/api/bysrcbuslegalname/', options).subscribe(
        data => {
          this.cvi = JSON.parse(data["_body"]);
        },
        error => console.error(error),
        () => {
          let cvidata = this.cvi.data;

          var result = _.chain(cvidata)
            .groupBy("kwchannel")
            .toPairs()
            .map(function (currentItem) {
              return _.zipObject(["data", "children"], currentItem);
            })
            .value();

          _.forEach(result, function (value: any, key) {
            let kwchannel: any = value.data;
            value.data = _.find(cvidata, { 'kwchannel': value.data });

            let obj = _.clone(emptyObject)
            obj.kwchannel = kwchannel;
            obj.kwchannel = (kwchannel == 'undefined' || kwchannel.trim() == '') ? "No Source/Channel" : kwchannel;
            value.data = obj;

            var children_result = _.map(value.children, function (value, prop) {
              return { data: value };
            });
            value.children = children_result;
          });
          this.nodes = { data: result };
          if(result.length == 0) {
            this.nodes.data = [{
              data: {
                kwchannel: "No records found..."
              }
            }];
          }
          this.refreshData();
        }
      );
    }
  }

  invalidSpecialChars(inputStr: string): boolean {
    let includesSpecialChars: boolean = false;
    var specialCharsList = ["~","`","!","@","#","$","\"","'","%","^","&","*","(",")","+","=","{","}","[","]",":",";",",",".","?"];
    _.forEach(specialCharsList, function(value, key) {
      if(_.includes(inputStr, value)) {
        includesSpecialChars = true;
      }
    })
    return includesSpecialChars;
  }

  expandAll() {
    _.forEach(this.nodes.data, function(value, key) {
      value['expanded'] = true;
    })
  }

  collapseAll() {
    _.forEach(this.nodes.data, function(value, key) {
      value['expanded'] = false;
    })
  }
}
