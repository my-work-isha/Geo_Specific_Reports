import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { ViewdetailsService } from '../service/viewdetails.service';
import { getMonth, getYear, getDate, getHours, getMinutes, getSeconds } from 'date-fns';
import { MbpdataService } from '../service/mbpdata.service';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserdetailsService } from '../service/userdetails.service';
import { environment } from '../../../environments/environment';
import { format } from "date-fns";
@Component({
  selector: 'app-csvexport',
  templateUrl: './csvexport.component.html',
  styleUrls: ['./csvexport.component.css']
})
export class CsvexportComponent implements OnInit {
  private type: string;
  private sub: any;
  private apiURL: string;
  headerName: string;
  private viewName : string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private viewdetails: ViewdetailsService,
    private mbpdataService: MbpdataService, private router: Router,
    private spinnerService: NgxSpinnerService, private https: Http, private userdetails: UserdetailsService) { }
  rowData: any;
  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  searchValue: string;
  showBox: boolean = true;
  selectedRowArray: string[];
  strLogNos: string;
  curdt: string;
  curdt_enc: string;
  sign: string;
  user: any;
  userLoggedIn: string;
  curdt1: string;
  curdt1_enc: string;
  buttondisable: boolean;
  ngOnInit() {
    this.sub = this.route.params.subscribe(value => {
      this.type = value['type'];
     this.spinnerService.show();
     this.userdetails.getUserdetails().subscribe(data => {
      this.user = JSON.parse(data["_body"]);
      this.user = this.user._json;});
      console.log("this user,"+this.user);
      // set the search value filter if the grid is in ready state
      if (this.gridApi) {
        this.searchValue = this.mbpdataService.getSearchStr();
        this.gridApi.setQuickFilter(this.mbpdataService.getSearchStr());
        this.gridApi.paginationGoToPage(0);
       }
      if (this.type == "APDailyStatus") {
        this.apiURL = "/api/apdailystatus";
        this.viewName="AP Daily Status Report";
        this.columnDefs = [
          {
          headerName: 'IBM Confidential Information',
          children:[
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value},
          { headerName: 'Current Month Bid', field: 'CURRENT_MONTH_BID', headerTooltip:'Current Month Bid',width:150,tooltip:(params) =>params.value},
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Aging', field: 'AGING',headerTooltip:'Aging', width:100,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value },
          { headerName: 'Additional ID', field: 'ADDITIONAL_ID',headerTooltip:'Additional ID', width:150,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value},
          { headerName: 'Revenue', field: 'REVENUE',headerTooltip:'Revenue',width:150,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer',tooltip:(params) =>params.value},
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value},
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME', headerTooltip:'Tier1/Distributor',tooltip:(params) =>params.value},
          { headerName: 'OO', field: 'OO_NAME',headerTooltip:'OO',tooltip:(params) =>params.value},
          { headerName: 'Log',field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value},
          { headerName: 'Action', field: 'ACTION', headerTooltip:'Action',tooltip:(params) =>params.value},
          { headerName: 'Tender Stage', field: 'TENDER_STAGE', headerTooltip:'Tender Stage',width:150,tooltip:(params) =>params.value},
          { headerName: 'Outcome', field: 'OUTCOME', headerTooltip:'Outcome',width:150,tooltip:(params) =>params.value},
          { headerName: 'CoC Reviewer', field: 'REVIEWER', headerTooltip:'CoC Reviewer',width:150,tooltip:(params) =>params.value}        

        ]
        }];
      } else if (this.type === "EMEADailyStatus") {
        this.apiURL = "/api/emeadailystatus";
        this.viewName="EMEA Daily Status Report";
        this.columnDefs = [
          {
            headerName: 'IBM Confidential Information',
            children:[          
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },      
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn'},
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value},
          { headerName: 'DIV', field: 'DIV',headerTooltip:'DIV', width:100,tooltip:(params) =>params.value },
          { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer',tooltip:(params) =>params.value },
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME',headerTooltip:'Tier1/Distributor',tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Log', field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value},
          { headerName: 'Action', field: 'ACTION', headerTooltip:'Action',width:100,tooltip:(params) =>params.value },
          { headerName: 'Revenue', field: 'REVENUE',headerTooltip:'Revenue',width:100,tooltip:(params) =>params.value,type:'numericColumn' }
          ]}]

      } else if (this.type === "GCGDailyStatus") {
        this.apiURL = "/api/gcgdailystatus";
        this.viewName="GCG Daily Status Report";
        this.columnDefs = 
        [
          {
            headerName: 'IBM Confidential Information',
            children:
        [
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value },
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},         
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME',headerTooltip:'Tier1/Distributor', width:150,tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Log', field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value},
          { headerName: 'Action', field: 'ACTION', headerTooltip:'Action',width:100,tooltip:(params) =>params.value },
          { headerName: 'Revenue', field: 'REVENUE',headerTooltip:'Revenue',width:100,tooltip:(params) =>params.value,type:'numericColumn' }         
        ]}]

      }else if (this.type === "LADailyStatus") {
        this.apiURL = "/api/ladailystatus";
        this.viewName="LA Daily Status Report";
        this.columnDefs =
        [
          {
            headerName: 'IBM Confidential Information',
            children: [
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width: 30 },
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value }, 
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},        
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME',headerTooltip:'Tier1/Distributor', width:150,tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Log', field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value},
          { headerName: 'Action', field: 'ACTION', headerTooltip:'Action',width:100,tooltip:(params) =>params.value },
          { headerName: 'Revenue (Approved BP Price)', field: 'REVENUE',headerTooltip:'Revenue (Approved BP Price)',width:100,tooltip:(params) =>params.value,type:'numericColumn' } 
         ]}]

      }else if (this.type === "ExecutiveStatus") {
        this.apiURL = "/api/execreport";
        this.viewName="Executive Status Report";
        this.columnDefs =
        [{
            headerName: 'IBM Confidential Information',
            children:[
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },      
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value },
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value },
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value },
          { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value },
          { headerName: 'Business Partner (CFP)', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value},
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer',tooltip:(params) =>params.value },
          { headerName: 'Amount($M)', field: 'REVENUE',headerTooltip:'Amount($M)',width:150,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Why flagged', field: 'BID_FACTOR_LIST',headerTooltip:'Why flagged',tooltip:(params) =>params.value },
          { headerName: 'Aging # of days', field: 'AGING',headerTooltip:'Aging(# of Days)',width:100,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Issues / Remediation Actions Required', field: 'EXECUTIVE_LOG',headerTooltip:'Issues / Remediation Actions Required',tooltip:(params) =>params.value},
       ]}]

      }else if (this.type === "ReturnReject") {
        this.apiURL = "/api/returnreject";
        this.viewName="Return / reject Report";
        this.columnDefs = 
        [{
          headerName: 'IBM Confidential Information',
          children:[
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value }, 
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn' }, 
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},                
          { headerName: 'Country', field: 'COUNTRY',headerTooltip:'Country', width:150,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME',headerTooltip:'Customer', width:150,tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value},
          { headerName: 'Final Comment', field: 'FINAL_COMMENT',tooltip:(params) =>params.value,headerTooltip:'Final Comment' },          
          { headerName: 'Revenue', field: 'REVENUE',headerTooltip:'Revenue',width:100,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Comments', field: 'COMMENTS', headerTooltip:'Comments',tooltip:(params) =>params.value }
          ]}]

      }else if (this.type === "PostShipEligible") {
        this.apiURL = "/api/postshipeligible";
        this.viewName="Post Ship Eligible report";
        this.columnDefs = 
        [{
          headerName: 'IBM Confidential Information',
          children:[
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
          { headerName: 'Quarter', field: 'QUARTER',headerTooltip:'Quarter', width:100,tooltip:(params) =>params.value }, 
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },         
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},
          { headerName: 'Country', field: 'COUNTRY', headerTooltip:'Country',tooltip:(params) =>params.value },          
          { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value },
          { headerName: 'AUTO_PSV', field: 'AUTO_PSV',headerTooltip:'AUTO_PSV', width:100,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME', headerTooltip:'Customer',tooltip:(params) =>params.value },
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME', headerTooltip:'Tier1/Distributor',tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Log', field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value}
         ]}]

      }else if (this.type === "PostShipmentSelected") {
        this.apiURL = "/api/postshipselected";
        this.viewName="Post Ship Selected report";
        this.columnDefs = 
        [{
          headerName: 'IBM Confidential Information',
          children:
        [
          { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
          { headerName: 'Quarter', field: 'QUARTER',headerTooltip:'Quarter', width:100,tooltip:(params) =>params.value },
          { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value },         
          { headerName: 'Bid ID', field: 'BID_ID',headerTooltip:'Bid ID', width:150,tooltip:(params) =>params.value },
          { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:150,tooltip:(params) =>params.value,type:'numericColumn' },
          { headerName: 'Bid Date', field: 'BID_DATE',headerTooltip:'Bid Date', width:150,tooltip:(params) =>params.value },
          { headerName: 'Geo', field: 'BID_GEO_CD',headerTooltip:'Geo', width:100,tooltip:(params) =>params.value},
          { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value},          
          { headerName: 'Country', field: 'COUNTRY', headerTooltip:'Country',tooltip:(params) =>params.value },
          { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value },
          { headerName: 'AUTO_PSV', field: 'AUTO_PSV',headerTooltip:'AUTO_PSV', width:100,tooltip:(params) =>params.value },
          { headerName: 'Customer', field: 'CUSTOMER_NAME', headerTooltip:'Customer',tooltip:(params) =>params.value },
          { headerName: 'CFP', field: 'CFP',headerTooltip:'CFP',tooltip:(params) =>params.value },
          { headerName: 'Tier1/Distributor', field: 'DISTRIBUTOR_NAME', headerTooltip:'Tier1/Distributor',tooltip:(params) =>params.value },
          { headerName: 'Log', field: 'LOG', headerTooltip:'Log',tooltip:(params) =>params.value}
                  
        ]}]

      }else if (this.type === "Adhoc") {
        this.apiURL = "/api/adhoc";
        this.viewName="Adhoc report";
        this.columnDefs = 
        [{
          headerName: 'IBM Confidential Information',
          children:
        [
        { headerName: '', valueGetter: '', 'checkboxSelection': true, width:30 },  
                 
         { headerName: 'Geo', field: 'BID_GEO_CD', headerTooltip:'Geo',tooltip:(params) =>params.value, width:100},
         { headerName: 'Source', field: 'SOURCE_SYS_CD', headerTooltip:'Source',tooltip:(params) =>params.value, width:100},
         { headerName: 'Bid_ID', field: 'BID_ID',headerTooltip:'Bid_ID', width:100,tooltip:(params) =>params.value },
         { headerName: 'Add_ID', field: 'ADDITIONAL_ID',type:'numericColumn', width:100,headerTooltip:'Add_ID' },
         { headerName: 'Tracker ID', field: 'TRACKER_ID',headerTooltip:'Tracker ID', width:100,tooltip:(params) =>params.value,type:'numericColumn' },
         { headerName: 'OCPS', field: 'OCPS_ID',headerTooltip:'OCPS', width:100,tooltip:(params) =>params.value,type:'numericColumn' },
         { headerName: 'Bid_Date', field: 'BID_DATE',headerTooltip:'Bid_Date', width:150,tooltip:(params) =>params.value},
         { headerName: 'Country', field: 'CUST_CTRY_NAME',headerTooltip:'Country', width:100,tooltip:(params) =>params.value },
         { headerName: 'Region', field: 'REGION',headerTooltip:'Region', width:100,tooltip:(params) =>params.value },
         { headerName: 'Brand', field: 'BRAND',headerTooltip:'Brand', width:100,tooltip:(params) =>params.value },

         { headerName: 'Outcome', field: 'OUTCOME',headerTooltip:'Outcome', width:100,tooltip:(params) =>params.value},
         { headerName: 'Dist', field: 'DISTRIBUTOR_NAME', headerTooltip:'Dist',tooltip:(params) =>params.value },
         { headerName: 'DistID', field: 'DISTRIBUTOR_ID', headerTooltip:'DistID',tooltip:(params) =>params.value, width:100 },
         { headerName: 'Tier2Name', field: 'TIER2_NAME', headerTooltip:'Tier2Name',tooltip:(params) =>params.value },
         { headerName: 'Tier2ID', field: 'TIER2_CEID', headerTooltip:'Tier2ID',tooltip:(params) =>params.value, width:100 },
         { headerName: 'Tier3Name', field: 'T3_NAME', headerTooltip:'Tier3Name',tooltip:(params) =>params.value },
         { headerName: 'Tier4Name', field: 'T4_NAME', headerTooltip:'Tier4Name',tooltip:(params) =>params.value },
         { headerName: 'Customer', field: 'CUSTOMER_NAME', headerTooltip:'Customer',tooltip:(params) =>params.value },
         { headerName: 'CustID', field: 'CUSTOMER_ID', headerTooltip:'CustID',tooltip:(params) =>params.value, width:100,type:'numericColumn' },
         { headerName: 'BP Margin %', field: 'BP_MARGIN', headerTooltip:'BP Margin %',tooltip:(params) =>params.value, width:150,type:'numericColumn' },

         { headerName: 'Discount', field: 'DISCOUNT', headerTooltip:'Discount',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BP Margin $', field: 'BP_MARGIN_AMT', headerTooltip:'BP Margin $',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'Bret_Score', field: 'BRET_SCORE', headerTooltip:'Bret_Score',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'Revenue', field: 'REVENUE', headerTooltip:'Revenue',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'CONF', field: 'CONF_NDA', headerTooltip:'CONF',tooltip:(params) =>params.value, width:150 },
         { headerName: 'RTM', field: 'NON_STD_RTM', headerTooltip:'RTM',tooltip:(params) =>params.value, width:150 },
         { headerName: 'NTSDPMT', field: 'NON_STD_PAYMENT', headerTooltip:'NTSDPMT',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Bundle', field: 'BUNDLE', headerTooltip:'Bundle',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Fee', field: 'CONTINGENCY_FEE', headerTooltip:'Fee',tooltip:(params) =>params.value, width:150 },
         { headerName: 'FocusBP', field: 'FOCUS_BP', headerTooltip:'FocusBP',tooltip:(params) =>params.value, width:150 },

         { headerName: 'SoleSource', field: 'SOLE_SOURCE_NON_COMPETITIVE', headerTooltip:'SoleSource',tooltip:(params) =>params.value, width:150 },
         { headerName: 'BPM', field: 'MARGIN_OUTLIER_PERCENT', headerTooltip:'BPM',tooltip:(params) =>params.value, width:150 },
         { headerName: 'DISC', field: 'DISCOUNT_OUTLIER', headerTooltip:'DISC',tooltip:(params) =>params.value, width:150 },
         { headerName: 'BPAMT', field: 'MARGIN_OUTLIER_DOLLAR', headerTooltip:'BPAMT',tooltip:(params) =>params.value, width:150 },
         { headerName: 'SuppFactors', field: 'SUP_FACTORS', headerTooltip:'SuppFactors',tooltip:(params) =>params.value },
         { headerName: 'Total Bid Score outlier', field: 'TOTAL_BID_SCORE', width:150, headerTooltip:'Total Bid Score outlier',tooltip:(params) =>params.value },
         { headerName: 'CoC_Contact', field: 'ASSIGNED_TO', headerTooltip:'CoC_Contact',tooltip:(params) =>params.value },
         { headerName: 'Log', field: 'ACTION_LOG', headerTooltip:'Log',tooltip:(params) =>params.value },
         { headerName: 'Action', field: 'ACTION_OWNER', headerTooltip:'Action',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Remediation_Closed', field: 'REMEDIATION_CLOSED', headerTooltip:'Remediation_Closed',tooltip:(params) =>params.value, width:150 },

         { headerName: 'Close Date', field: 'REMEDIATION_CLOSED_DATE', headerTooltip:'Close Date',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Condition', field: 'FOLLOWUP_ACTION', headerTooltip:'Condition',tooltip:(params) =>params.value},
         { headerName: 'AUTO_PSV', field: 'AUTO_PSV',headerTooltip:'AUTO_PSV', width:100,tooltip:(params) =>params.value },
         { headerName: 'Timestamp_Added', field: 'CREATED_DATE', headerTooltip:'Timestamp_Added',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Request for Price', field: 'PRICE_REQUEST', headerTooltip:'Request for Price',tooltip:(params) =>params.value, width:150 },
         { headerName: 'SI', field: 'SYSTEM_INTEGRATOR_BID', headerTooltip:'SI',tooltip:(params) =>params.value, width:150 },
         { headerName: 'BidFactorList', field: 'BID_FACTOR_LIST', headerTooltip:'BidFactorList',tooltip:(params) =>params.value },
         { headerName: 'OO', field: 'OO', headerTooltip:'OO',tooltip:(params) =>params.value },
         { headerName: 'OO_MGR', field: 'OO_MANAGER', headerTooltip:'OO_MGR',tooltip:(params) =>params.value },
         { headerName: 'OO_Mobile', field: 'OO_MOBILE', headerTooltip:'OO_Mobile',tooltip:(params) =>params.value },
         { headerName: 'Bid Manager', field: 'BID_MANAGER', headerTooltip:'Bid Manager',tooltip:(params) =>params.value },

         { headerName: 'DaysInBret', field: 'DAYSINBRET', headerTooltip:'DaysInBret',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPMT1FIN', field: 'BPM_T1_FIN', headerTooltip:'BPMT1FIN',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPMT1SERV', field: 'BPM_T1_FIN_SERV', headerTooltip:'BPMT1SERV',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPMT1INS', field: 'BPM_T1_INS_FREIGHT', headerTooltip:'BPMT1INS',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPMT1PROFIT', field: 'BPM_T1_PROFIT', headerTooltip:'BPMT1PROFIT',tooltip:(params) =>params.value, width:150,type:'numericColumn' },        
         { headerName: 'BPMT2FIN', field: 'BPM_T2_FIN', headerTooltip:'BPMT2FIN',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPMT2SERV', field: 'BPM_T2_SERV', headerTooltip:'BPMT2SERV',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'BPM OTHER', field: 'BPM_OTHER', headerTooltip:'BPM OTHER',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'EndUserPrice', field: 'END_USER_PRICE', headerTooltip:'EndUserPrice',tooltip:(params) =>params.value, width:150,type:'numericColumn' },
         { headerName: 'NumTiers', field: 'NO_OF_TIERS', headerTooltip:'NumTiers',tooltip:(params) =>params.value, width:100,type:'numericColumn' },

         { headerName: 'TransLetterReq', field: 'PROVIDE_TRANSPARENCY_LETTER', headerTooltip:'TransLetterReq',tooltip:(params) =>params.value, width:150 },
         { headerName: 'TransLetterSent', field: 'TRANSPARENCY_LETTER_SENT', headerTooltip:'TransLetterSent',tooltip:(params) =>params.value, width:150 },
         { headerName: 'TransLetterDate', field: 'TRANSPARENCY_LETTER_DATE', headerTooltip:'TransLetterDate',tooltip:(params) =>params.value, width:150 },
         { headerName: 'PreShipReq', field: 'PROVIDE_PRE_SHIP', headerTooltip:'PreShipReq',tooltip:(params) =>params.value, width:150 },
         { headerName: 'PreShipTestResult', field: 'PRE_SHIP_STS_RESULT', headerTooltip:'PreShipTestResult',tooltip:(params) =>params.value },        
         { headerName: 'PreShipCoCAction', field: 'PRE_SHIP_COC_ACTION', headerTooltip:'PreShipCoCAction',tooltip:(params) =>params.value },
         { headerName: 'PreShipClosedDate', field: 'PRE_SHIP_CLOSE_DATE', headerTooltip:'PreShipClosedDate',tooltip:(params) =>params.value, width:150 },
         { headerName: 'PreShipComments', field: 'PRE_SHIP_COMMENTS', headerTooltip:'PreShipComments',tooltip:(params) =>params.value },
         { headerName: 'PostShip Eligible', field: 'POST_SHIP_ELIGIBLE', headerTooltip:'PostShip Eligible',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Post Ship Selected', field: 'POST_SHIP_SELECTED', headerTooltip:'Post Ship Selected',tooltip:(params) =>params.value, width:150 },
        
         { headerName: 'PostShip Audit Followup', field: 'AUDIT_FOLLOWUP_STATUS', headerTooltip:'PostShip Audit Followup',tooltip:(params) =>params.value },
         { headerName: 'Post Ship Audit Results', field: 'AUDIT_RESULTS', headerTooltip:'Post Ship Audit Results',tooltip:(params) =>params.value },        
         { headerName: 'Mandaory PSV', field: 'PSV_REQUIRED', headerTooltip:'Mandaory PSV',tooltip:(params) =>params.value, width:150 },
         { headerName: 'PostShipClosedDate', field: 'POST_SHIP_CLOSE_DATE', headerTooltip:'PostShipClosedDate',tooltip:(params) =>params.value, width:150 },
         { headerName: 'PostShipRecovery', field: 'POST_SHIP_RECOVERY_AMOUNT', headerTooltip:'PostShipRecovery',tooltip:(params) =>params.value, width:150 },
         { headerName: 'Post Ship Comments', field: 'POST_SHIP_COMMENTS', headerTooltip:'Post Ship Comments',tooltip:(params) =>params.value },
         { headerName: 'Final Log', field: 'FINAL_LOG_MSG', headerTooltip:'Final Log',tooltip:(params) =>params.value },
         { headerName: 'Tender Stage', field: 'TENDER_STAGE', headerTooltip:'Tender Stage',tooltip:(params) =>params.value},  
         { headerName: 'Comments', field: 'COMMENTS', headerTooltip:'Comments',tooltip:(params) =>params.value }
        ]}]
      }
      this.http.get(this.apiURL).subscribe(
        value => this.rowData = value,
        error => {
          console.error(error)
          alert("There is an error with fetching the data. Please reload the page to get accurate results !!! ")
          this.spinnerService.hide()
        },
        () => 
        this.spinnerService.hide()
      )
    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.searchValue = this.mbpdataService.getSearchStr();
    this.gridApi.setQuickFilter(this.mbpdataService.getSearchStr());
    //comment
  }
  onRowDataChanged(params) {
    if (this.searchValue == "") {
      this.gridApi.ensureIndexVisible(0,screenLeft);
    }
  }
   exportToCSVSelected() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length == 0) {
      alert("Please select atleast one record");
    } else {
      var params = {
        customHeader: 'This is IBM Confidential Information \n' + this.viewName + " extracted on " + format(new Date(), "YYYY-MM-DD") + " by " + this.user.firstName + this.user.lastName + "\n",
        onlySelected: true,
      };
      this.gridApi.exportDataAsCsv(params);
    }
  }
	deselectAll(){
		this.gridApi.deselectAll();
    }
  
    ResetAllFilters(){
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();
  }  

  exportToCSV() {
    var params = {
      customHeader: 'This is IBM Confidential Information \n' + this.viewName + " extracted on " + format(new Date(), "YYYY-MM-DD") + " by " + this.user.firstName + this.user.lastName + "\n",
    };
    this.gridApi.exportDataAsCsv(params);
  }
  onQuickFilterChanged($event) {
    this.mbpdataService.setSearchStr($event.target.value);
    this.gridApi.setQuickFilter($event.target.value);
  }
}
