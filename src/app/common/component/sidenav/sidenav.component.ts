import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { UserdetailsService } from '../../../bpc/service/userdetails.service';
import { KeywordsService } from '../../../bpc/service/keywords.service';
import { MbpdataService } from '../../../bpc/service/mbpdata.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  
  user: any;
  keywordsCompis = [];
  kwCSVmemberAdhoc = [];
  kwCSVmemberHRDB = [];
  kwCSVmemberSevLevel = [];
  kwCSVmemberNetezza = [];
  kwCSVmemberTandC = [];
  isAdmin: boolean = false;
  isViewVisible: boolean = false;
  canTakeReports: boolean = false;
  canTakeAdhocReport: boolean = false;
  canTakeHRDBReport: boolean = false;
  canTakeSevLevelReport: boolean = false;
  canTakeNetezzaReport: boolean = false;
  canTakeTandCReport: boolean = false;
  canSearchDB: boolean;

  constructor(private userdetails: UserdetailsService, private spinnerService: NgxSpinnerService, private keyworddetails: KeywordsService,
              private mbpdataservice: MbpdataService) { }
  
  ngOnInit() { }

  setEmptySearchStr() {
    this.mbpdataservice.setSearchStr("");
  }
}