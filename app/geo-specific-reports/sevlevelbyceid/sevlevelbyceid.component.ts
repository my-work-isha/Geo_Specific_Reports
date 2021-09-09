import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import * as _ from "lodash";
import { ViewdetailsService } from '../service/viewdetails.service';
import { MbpdataService } from '../service/mbpdata.service';
import { UserdetailsService } from '../service/userdetails.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { Location } from '@angular/common';
import { format } from "date-fns"

@Component({
  selector: 'app-sevlevelbyceid',
  templateUrl: './sevlevelbyceid.component.html',
  styleUrls: ['./sevlevelbyceid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SevlevelbyceidComponent implements OnInit {

  constructor(private http: HttpClient, private viewdetails: ViewdetailsService,
    private mbpdataService: MbpdataService, private router: Router,private userdetails: UserdetailsService,
    private spinnerService: NgxSpinnerService, private https: Http, private location: Location
  ) { }

  rowData: any;
  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  private apiURL: string;
  sevLevelClassRules: any;
  searchValue: string;
  selectedRowArray: string[];
  severityLevel: string;
  curdt: string;
  curdt_enc: string;
  sign: string;
  user: any;
  canTakeSeverity: boolean = true;

  ngOnInit() {
    this.apiURL = "/api/sevlevelbyceid";
    this.userdetails.getUserdetails().subscribe(
      data => this.user=JSON.parse(data["_body"]),
      error => console.error(error),
      () => {
        this.user= this.user._json;
      }
    )

    this.columnDefs = [
      { headerName: 'CEI', valueGetter: getCEI, 'checkboxSelection': true },
      { headerName: 'isocountry', field: 'isocountry', hide: true },
      { headerName: 'nmCEI', field: 'nmCEI', hide: true },
      { headerName: 'Name', field: 'BUS_LEGAL_' },
      { headerName: 'severityLevel', field: 'severityLevel', hide: true },
      { headerName: 'Severity', valueGetter: getSeverity },
      { headerName: '_id', field: '_id', hide: true }
    ]

    this.http.get(this.apiURL).subscribe(
      value => this.rowData = value["data"],
      error => console.error(error),
      () => this.spinnerService.hide()
    )

    this.sevLevelClassRules = {
      "sev-level-1": "data.severityLevel == 'Level 1'",
      "sev-level-2": "data.severityLevel == 'Level 2'",
      "sev-level-3": "data.severityLevel == 'Level 3'",
      "sev-level-4": "data.severityLevel == 'Level 4'",
      "sev-level-5": "data.severityLevel == 'Level 5'",
      "sev-level-term": "data.severityLevel == 'TERM'"
    };
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
      data => this.mbpdataService.setMbpData(JSON.parse(data["_body"])),
      error => console.error(error),
      () => this.router.navigate(['/recordform'])
    );
  }

  onQuickFilterChanged($event) {
    this.mbpdataService.setSearchStr($event.target.value);
    this.gridApi.setQuickFilter($event.target.value);
  }


  onMultipleRowsClicked(params) {
    var selectedRows = [];
    selectedRows = this.gridApi.getSelectedRows();
    var tempArray = [];
    selectedRows.forEach(function (selectedRow, index) {
      tempArray.push(selectedRow._id);

    })
    if (tempArray.length == 0) {
      alert("Please select atleast one record to update");
      this.canTakeSeverity = false;
    } else {
      this.canTakeSeverity = true;
    }

    this.selectedRowArray = tempArray;

  }

  selectSeverityLevel() {
    this.spinnerService.show();
    // code to insert the updated severity level values for the records selected
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    var compIds = this.selectedRowArray.join(",");
    params.append('compIds', compIds);
    this.sign = (this.user.firstName).replace("%20", " ") + " " + (this.user.lastName).replace("%20", " ");
    this.curdt = format(new Date(), "MM/DD/YYYY h:mm A Z");
    this.curdt_enc = encodeURIComponent(this.curdt)
    params.append('curdt', this.curdt_enc)
    params.append('severityLevel', this.severityLevel)
    params.append('sign',this.sign)
    var sendoptions = {
      compIds: compIds,
      curdt: this.curdt_enc,
      severityLevel: this.severityLevel,
      sign:this.sign
    }
    let options = new RequestOptions({ headers: headers });
    this.https.post('/api/sevupdate', sendoptions, options).subscribe(
      data => {

      },
      error => {
        //  console.error("Error while inserting the inquiry record!!! - " + error);
        alert("Error while inserting the inquiry record!!! - " + error);
        this.spinnerService.hide();
       
      },
      () => {
        alert("Selected records are updated.");
        this.ngOnInit();
        
      }
    )
  }
}

function getCEI(params) {

  let legalname;
  if (!(params.data.BUS_LEGAL_) || params.data.BUS_LEGAL_ == "" || _.toUpper(params.data.BUS_LEGAL_) == "UNDEFINED" || _.toUpper(params.data.BUS_LEGAL_) == "NAN") {
    legalname = "";
  } else {
    legalname = params.data.BUS_LEGAL_.replace(/,/g, " ");
  }

  let combi = _.toUpper(legalname + _.trim(_.split(params.data.isocountry, "-")[0]) + params.data.nmCEI);
  if (combi == _.toUpper("NET-INFRA CO. LTDKorea989098")) {
    return "10ailc4y";
  } else if (combi == _.toUpper("SK NetworksKorea")) {
    return "10ailc5a";
  } else if (combi == _.toUpper("OsangjaielKorea10ailemi")) {
    return "10aileml";
  } else if (combi == _.toUpper("Encoral Digital Solution (T2)Malaysia")) {
    return "10aillim";
  } else if (combi == _.toUpper("FuturegenKorea989017")) {
    return "10ain4in";
  } else if (combi == _.toUpper("Pinnacle MicroSouth Africa7vf3y / 10ailfs9 / 6fxdc / 10ailfs8 / 6dv76 / 7vf3z / 10ailfsa / 10aipra9 / 10aipraa")) {
    return "10aipra9";
  } else if (combi == _.toUpper("Asbis SK SpolSlovakia18a7gjj8")) {
    return "18z7gjj8";
  } else if (combi == _.toUpper("CDG Systems Co. LtdThailand")) {
    return "18z7gola";
  } else if (combi == _.toUpper("Lynx Technology  Inc.United States")) {
    return "18z7gqd8";
  } else if (combi == _.toUpper("Sysage Technology co LtdTaiwan")) {
    return "1cm3w1eq";
  } else if (combi == _.toUpper("NARI Tech. DevelopmentChina")) {
    return "1dx7";
  } else if (combi == _.toUpper("NEC Asia Pacific Pte LtdSingapore")) {
    return "1v2doh5c";
  } else if (combi == _.toUpper("E4NETKoreaNA2irsa46y")) {
    return "2irsa46y";
  } else if (combi == _.toUpper("Smart Technology SolutionThailand")) {
    return "2p45hlqy";
  } else if (combi == _.toUpper("Shanghai Jiaoda Nanyang Overseas Co.  Ltd.China10aurwl1")) {
    return "2qz2nle5";
  } else if (combi == _.toUpper("Nexbis Sdn BhdMalaysia757140-A")) {
    return "6ek9d";
  } else if (combi == _.toUpper("Argo DNE Technology Pte LtdSingapore")) {
    return "6qgbu";
  } else if (combi == _.toUpper("Smart3Switzerland")) {
    return "7gqlo";
  } else if (combi == _.toUpper("Axiz (Pty) Ltd and Axiz (Proprietary) LimitedSouth Africazu2pfuc / zu2pfue / 7ngon / 7ngoo / 7zh20  / 7zh21")) {
    return "7ngon";
  } else if (combi == _.toUpper("SCATMexico884z4")) {
    return "884z3";
  } else if (combi == _.toUpper("Stream IT Consulting LimitedThailand19179450")) {
    return "ztzg9r6";
  } else if (combi == _.toUpper("SELIM TSGKorea")) {
    return "zu1gbwh";
  } else if (combi == _.toUpper("TrimegaPeruNone")) {
    return "zu2aiee";
  } else if (combi == _.toUpper("Beijing Nantian Information Engineering CO. Ltd China")) {
    return "zu2791z";
  } else if (combi == _.toUpper("Beijing Yida JinTai Information Technology Co.  Ltd.China")) {
    return "6whxs";
  } else if (combi == _.toUpper("BEIJING YITONG SUNSHINE TECHNOLOGY CO. LTD.China")) {
    return "6z014";
  } else if (combi == _.toUpper("CERNET Network Ltd.China")) {
    return "18z7gt2n";
  } else if (combi == _.toUpper("DATACOM SYSTEMS PTY LTDAustralia86qur")) {
    return "86qur";
  } else if (combi == _.toUpper("Guangzhou Taifu Xintong Technology Co.  LtdChina")) {
    return "2bnireo5";
  } else if (combi == _.toUpper("Gulf Business Machines (GBM) L.L.C. Abu DhabiUnited Arab Emirates10aisu58")) {
    return "10aisu58";
  } else if (combi == _.toUpper("Hatimuda Sdn BhdMalaysia")) {
    return "74nf3";
  } else if (combi == _.toUpper("ICO TechnologyHong Kong")) {
    return "zu1v6u5";
  } else if (combi == _.toUpper("Laboratory of New Information TechnologiesRussia10ail2d4,6y52d, 10ail2ka, ztzypa2, 8a9en, 6wy5l, 72ldk, 7mj7z")) {
    return "10ail2d4";
  } else if (combi == _.toUpper("OOO Marvel CTRussia7j98w, zu2bhef")) {
    return "7j98w";
  } else if (combi == _.toUpper("Path Services Sdn BhdMalaysia")) {
    return "710xc";
  } else if (combi == _.toUpper("Red Brook IT Private LtdIndiaNone")) {
    return "zu13fqs";
  } else if (combi == _.toUpper("R-StyleRussia7o58o, 6z1y5, 1xg2u9a3, 10aim7hf, 7qfcy, ztze72g, 20nxsr80, 2kkrjkzr, 26vrelum")) {
    return "7o58o";
  } else if (combi == _.toUpper("RunkeenChinaN/A")) {
    return "64fp3";
  } else if (combi == _.toUpper("Spectra Computech Pvt. Ltd.IndiaNone")) {
    return "10ail8b4";
  } else if (combi == _.toUpper("Supreme DistributionThailand")) {
    return "1616";
  } else if (combi == _.toUpper("SYSAGE TechnologyTaiwan19184699")) {
    return "1cm3w1eq";
  } else if (combi == _.toUpper("SYSAGE TechnologyTaiwan")) {
    return "1cm3w1eq";
  } else if (combi == _.toUpper("FOUR  Inc.United States")) {
    return "6x9rz";
  } else {
    return params.data.nmCEI;
  }
}

function getSeverity(params) {
  return _.replace(params.data.severityLevel, " ", "-");
}
