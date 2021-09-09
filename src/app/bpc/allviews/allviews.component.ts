import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MbpdataService } from "../service/mbpdata.service"
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserdetailsService } from '../service/userdetails.service';
import { ViewdetailsService } from '../service/viewdetails.service';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-allviews',
  templateUrl: './allviews.component.html',
  styleUrls: ['./allviews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllviewsComponent implements OnInit {

  submitAttempt: boolean;
  private geo: string;
  private sub: any;
  user: any;
  isAdmin: boolean;
  rowData: any;
  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  private apiURL: string;
  searchValue: string;

  constructor(private https: Http,private http: HttpClient, private route: ActivatedRoute,
    private reviewdataviewService: MbpdataService, private router: Router, private mbpdataService: MbpdataService,
    private userdetails: UserdetailsService, private viewdetails: ViewdetailsService,
    private spinnerService: NgxSpinnerService) { };

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.spinnerService.show();
    this.userdetails.getUserdetails().subscribe(data => {
      this.user = JSON.parse(data["_body"]);
      this.user = this.user._json;
      var bGroups = this.user.blueGroups;

      var adminGrps = environment.bGroup_admin.split(",");
      if (adminGrps.some(function (element) { return (bGroups.indexOf(element) != -1) })) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })

    this.sub = this.route.params.subscribe(params => {
      this.geo = params['geo'];

      this.apiURL = '/api/byprincipal/';
      this.columnDefs = [
        { headerName: 'Name', field: 'Name' },
        { headerName:'Business Legal', field: 'BUS_LEGAL_'},
        { headerName: 'Source',field: 'kwchannel'},
        { headerName: 'City',field: 'City'},
        { headerName: 'St/Province',field: 'ST_ZIP'},
        { headerName: 'Zip/Postal Code', field: 'zip' },
        { headerName: 'Country', field: 'isocountry'},
        { headerName: 'Reference', field: 'REFERENCE'},
        { headerName: 'Contact', field: 'contact'},
        { headerName: 'Created By', field: 'nmauthor' },
        { headerName: 'Date Created', field: 'dtcreated'},
      ];
      this.http.get(this.apiURL).subscribe(
        value => {
          this.rowData = value["data"]
        },
        error => console.error(error),
        () => this.spinnerService.hide()
      );


    })  
  }
   

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.searchValue = this.mbpdataService.getSearchStr();
    this.gridApi.setQuickFilter(this.mbpdataService.getSearchStr());
  }

  exportToCSV(params) {
    this.gridApi.exportDataAsCsv(params);
  }
  onRowDoubleClicked(params) {
    this.spinnerService.show();
    this.mbpdataService.setViewPath(window.location.pathname);
    let idParams = new URLSearchParams();
    idParams.append("id", params.data._id);
    this.viewdetails.getDocbyid(idParams).subscribe(
      data => {
        this.mbpdataService.setMbpData(JSON.parse(data["_body"]));  
        var formname = JSON.parse(data["_body"])["Form"];
        this.setFormName(formname)
      },
      error => console.error(error),
      () => this.router.navigate(['/recordform'])
    );
  }

  setFormName(fname) {
    if (fname == "frecord") {
      this.router.navigate(['/recordform']);
    } 
  }



  updateview(info: any): void {
    console.log(info);
  }

  onQuickFilterChanged($event) {
    this.mbpdataService.setSearchStr($event.target.value);
    this.gridApi.setQuickFilter($event.target.value);
  }
 
  //function for create new record 
  CreateNewRecord() {
    this.spinnerService.show();
    this.reviewdataviewService.setViewPath(window.location.pathname);
    //this.setSearhStr();  // set the search string
    this.reviewdataviewService.setMbpData("");
    this.reviewdataviewService.setViewPath(window.location.pathname);
    this.router.navigate(['/recordform']);
    this.reviewdataviewService.getSearchStr();
  }

  
}
