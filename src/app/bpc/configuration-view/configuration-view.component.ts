import { AfterViewInit,Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { DataTableDirective } from 'angular-datatables';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {MbpdataService } from "../service/mbpdata.service"
import { Router, RouterModule } from '@angular/router';
import { SelectorContext } from '@angular/compiler';


@Component({
  selector: 'app-configuration-view',
  templateUrl: './configuration-view.component.html',
  styleUrls: ['./configuration-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationViewComponent implements OnInit{

  submitAttempt:boolean;
  private geo:string;
  private sub:any;
  
  constructor(private http:Http,private route:ActivatedRoute,private reviewdataviewService:MbpdataService,private router:Router) { };
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();



  ngOnInit() {
    console.log("hello");
    
    this.sub = this.route.params.subscribe( params =>{
      this.geo= params['geo'];
      console.log(this.geo);
     
      
	  
	  if(this.geo === "AM"){
        this.dtOptions = {
          ajax: '/api/reviews/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
            defaultContent:"",
          },{
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:"",
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
          },
          {
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  
	  }
	  )
          });
          
          return row;
        }
        };
        
      }

if(this.geo === "AP"){
        this.dtOptions = {
          ajax: '/api/reviewsAP/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
            defaultContent:"",
          },{
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:"",
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
          },
          {
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  
	  }
	  )
          });
          
          return row;
        }
        };
        
      }

  //by principal view start  
      
if(this.geo === "byprincipal"){
  this.dtOptions = {
    "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/byprincipal/',
    columns: [{
      title: 'Name',
      data: 'Name',
      defaultContent:""
    },
    {
      title: 'BUS Legal',
      data: 'bus_legal_',
      defaultContent:""
    },
    {
      title: 'Source',
      data: 'kwchannel',
      defaultContent:""
      
    }, {
      title: 'City',
      data: 'CITY',
      defaultContent:""
      
    }, {
      title: 'St/Province',
      data: 'ST_ZIP',
      defaultContent:""
      
    }, {
      title: 'Zip/Postal Code',
      data: 'zip',
      defaultContent:""
      
    }, {
      title: 'Country',
      data: 'isocountry',
      defaultContent:""
      
    }, {
      title: 'Reference',
      data: 'REFERENCE',
      defaultContent:""
      
    }, {
      title: 'Contact',
      data: 'contact',
      defaultContent:""
      
    },    
    {
      title: 'Notes',
      data: 'NOTES',
      defaultContent:""
    }
    ,    
   {
      title: 'Created By',
      data: 'nmauthor',
      defaultContent:"",
      "class":"none"
    },
    {
      title: 'Date Created',
      data: 'datecreated',
      defaultContent:"",
      "class":"none"
    },

  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/recordform']);  
}
)
    });
    
    return row;
  }
  };
  
}
// by principal view end

// view start by state
if(this.geo === "bystateprovince"){
  this.dtOptions = {
   "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/bystateprovince/',
    columns: [{
      title: 'State/Province',
      data: 'ST_ZIP',
      defaultContent:""
    }, {
      title: 'City',
      data: 'CITY',
      defaultContent:""
      
    },
    {
      title: 'Country',
      data: 'isocountry',
      defaultContent:""
    },
    {
      title: 'Bus Legal',
      data: 'bus_legal_',
      defaultContent:""
      
    }, {
      title: 'Name',
      data: 'NAME',
      defaultContent:""
      
    },
    {
      title: 'Source',
      data: 'kwchannel',
      defaultContent:""
      
    },
    {
      title: 'Reference',
      data: 'REFERENCE',
      defaultContent:""
      
    }, {
      title: 'Contact',
      data: 'contact',
      defaultContent:""
      
    }, {
      title: 'NOTES',
      data: 'NOTES',
      defaultContent:""
      
    }
    , {
      title: 'Created By',
      data: 'nmauthor',
      defaultContent:"",
      "class":"none"
      
    },
    {
      title: 'Date Created',
      data: 'datecreated',
      defaultContent:"",
      "class":"none"
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/recordform']);  
}
)
    });
    
    return row;
  }
  };
  
}

//View by state end

// view start BySourceChannel
if(this.geo === "BySourceChannel"){
  this.dtOptions = {
    "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/BySourceChannel/',
    columns: [{
      title: 'Source',
      data: 'kwchannel',
      defaultContent:""
    }, {
      title: 'Bus_Legal',
      data: 'bus_legal_',
      defaultContent:""
    },{
      title: 'Name',
      data: 'Name',
      defaultContent:""
      
    },
    {
      title: 'City',
      data: 'CITY',
      defaultContent:""
      
    }, {
      title: 'St/Province',
      data: 'ST_ZIP',
      defaultContent:""
      
    }, {
      title: 'Zip/Postal Code ',
      data: 'zip',
      defaultContent:""
      
    }, {
      title: 'Country',
      data: 'isocountry',
      defaultContent:""
      
    }, {
      title: 'Reference',
      data: 'REFERENCE',
      defaultContent:"",
      "class":"none"
      
    }, {
      title: 'Contact',
      data: 'contact',
      defaultContent:"",
      "class":"none"
      
    }, {
      title: 'Notes',
      data: 'NOTES',
      defaultContent:"",
      "class":"none"
      
    },
      {
      title: 'Created By',
      data: 'nmauthor',
      defaultContent:"",
      "class":"none"
      
    },
    {
      title: 'Date Created',
      data: 'datecreated',
      defaultContent:"",
      "class":"none"
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/recordform']);  
}
)
    });
    
    return row;
  }
  };
  
}
//View by BySourceChannel end

// view start Default
if(this.geo === "Default"){
  this.dtOptions = {
    "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/Default/',
    columns: [
    {
      title: 'Bus_Legal',
      data: 'bus_legal_',
      defaultContent:""
    }, 
    {
      title: 'Name',
      data: 'Name',
      defaultContent:""
    },
    {
      title: 'Source',
      data: 'kwchannel',
      defaultContent:""
    },
    {
      title: 'City',
      data: 'CITY',
      defaultContent:""
      
    }, {
      title: 'St/Province',
      data: 'ST_ZIP',
      defaultContent:""
      
    }, {
      title: 'Zip/Postal Code',
      data: 'zip',
      defaultContent:""
      
    }, {
      title: 'Country',
      data: 'isocountry',
      defaultContent:""
      
    }, {
      title: 'Contact',
      data: 'contact',
      defaultContent:""
      
    }, {
      title: 'Created By',
      data: 'nmauthor',
      defaultContent:"",
      "class":"none"
      
    },
    
    {
      title: 'Date Created',
      data: 'datecreated',
      defaultContent:"",
      "class":"none"
      
    },{
      title: 'Reference',
      data: 'REFERENCE',
      defaultContent:"",
      "class":"none"
      
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/recordform']);  
}
)
    });
    
    return row;
  }
  };
  
}
//View by vwdefault end

// view start Defaultbysourcechannel
if(this.geo === "Defaultbysourcechannel"){
  this.dtOptions = {
    "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/Defaultbysourcechannel/',
    columns: [{
      title: 'Source',
      data: 'kwchannel',
      defaultContent:""
    }, {
      title: 'Bus Legal',
      data: 'bus_legal_',
      defaultContent:""
    },
    {
      title: 'Name',
      data: 'Name',
      defaultContent:""
    }
    , {
      title: 'City',
      data: 'CITY',
      defaultContent:""
      
    }, {
      title: 'St/Province',
      data: 'ST_ZIP',
      defaultContent:""
      
    }, {
      title: 'Zip/Postal Code',
      data: 'zip',
      defaultContent:""
      
    }, {
      title: 'Country',
      data: 'isocountry',
      defaultContent:""
      
    }, {
      title: 'Contact',
      data: 'contact',
      defaultContent:""
      
    },
     {
      title: 'Created By',
      data: 'nmauthor',
      defaultContent:""        
    }
    , {
      title: 'Date Created',
      data: 'datecreated',
      defaultContent:"",
      "class":"none"      
    },
    {
      title: 'Reference',
      data: 'REFERENCE',
      defaultContent:"",
      "class":"none"
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/recordform']);  
}
)
    });
    
    return row;
  }
  };
  
}
//View by Defaultbysourcechannel end

// view start by CategoriesLists
if(this.geo === "CategoriesLists"){
  this.dtOptions = {
    "oLanguage":{"sZerorecords":"No Data available","sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/CategoriesLists/',
    columns: [{
      title: 'Name',
      data: 'txKeywdLabel',
      defaultContent:""
    }, {
      title: 'List',
      data: 'txKeywdList',
      defaultContent:""
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/keyWordDefinition']);  
}
)
    });
    
    return row;
  }
  };
  
}
// by CategoriesLists view end

// view start by ConfigurationView
if(this.geo === "ConfigurationView"){
  this.dtOptions = {
    "oLanguage":{"sEmptyTable":"Data is Loading....Please Wait"},
    ajax: '/api/ConfigurationView/',
    columns: [{
      title: 'Name',
      data: 'Name',
      defaultContent:""
    }, {
      title: 'Enabled',
      data: 'Enabled',
      defaultContent:""
    }
  ],
  responsive: true,
  rowCallback: (row: Node, data: any[] | Object, index: number) => {
    const self = this;
    $('td', row).unbind('mousedown');
    $('td', row).bind('mousedown', () => {
      let params = new URLSearchParams();
      params.append("id", data["_id"]);
      let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({ headers: headers, params:params });
this.http.get('/api/getdocbyId',options).subscribe(data => {
console.log(data);
this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

this.router.navigate(['/configform']);  
}
)
    });
    
    return row;
  }
  };
  
}
// by ConfigurationView view end
      
      if(this.geo === "EMEA"){
        this.dtOptions = {
          ajax: '/api/reviewsEMEA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
            defaultContent:"",
          },{
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:"",
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
          },
          {
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  
	  }
	  )
          });
          
          return row;
        }
        };
        
      }

	  
	       
      if(this.geo === "LA"){
        this.dtOptions = {
          ajax: '/api/reviewsLA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
            defaultContent:"",
          },{
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:"",
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
          },
          {
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  
	  }
	  )
          });
          
          return row;
        }
        };
        
      }

	  
	       
      if(this.geo === "JAPAN"){
        this.dtOptions = {
          ajax: '/api/reviewsJAPAN/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
            defaultContent:"",
          },{
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:"",
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
          },
          {
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  
	  }
	  )
          });
          
          return row;
        }
        };
        
      }

	  
	  
	  
	  
      
      if(this.geo === "MasterBPDocs"){
        this.dtOptions = {
          ajax: '/api/MasterBPDocs/',
          columns: [{
            title: 'Current Primary Name',
            data: 'txtCurprimname',
            defaultContent:""
          }, {
            title: 'Country',
            data: 'txCountry',
            defaultContent:""
          }, {
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:""
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:"",
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
          },
          {
            title:'End User',
            data:"txEUserName",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/masterbusinesspartner']);  
    })
          });
          
          return row;
        }
        };
        
      }
      
     
      if(this.geo === "MasterBPDocsAP"){
        this.dtOptions = {
          ajax: '/api/MasterBPDocsAP/',
          columns: [{
            title: 'Current Primary Name',
            data: 'txtCurprimname',
            defaultContent:""
          }, {
            title: 'Country',
            data: 'txCountry',
            defaultContent:""
          }, {
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:""
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:"",
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
          },
          {
            title:'End User',
            data:"txEUserName",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/masterbusinesspartner']);  })
          });
          
          return row;
        }
        };
        
      }
      
	   
	   
	   
	    if(this.geo === "MasterBPDocsEMEA"){
        this.dtOptions = {
          ajax: '/api/MasterBPDocsEMEA/',
          columns: [{
            title: 'Current Primary Name',
            data: 'txtCurprimname',
            defaultContent:""
          }, {
            title: 'Country',
            data: 'txCountry',
            defaultContent:""
          }, {
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:""
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:"",
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
          },
          {
            title:'End User',
            data:"txEUserName",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/masterbusinesspartner']); }) 
          });
          
          return row;
        }
        };
        
      }
      
	   
	   
	    if(this.geo === "MasterBPDocsLA"){
        this.dtOptions = {
          ajax: '/api/MasterBPDocsLA/',
          columns: [{
            title: 'Current Primary Name',
            data: 'txtCurprimname',
            defaultContent:""
          }, {
            title: 'Country',
            data: 'txCountry',
            defaultContent:""
          }, {
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:""
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:"",
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
          },
          {
            title:'End User',
            data:"txEUserName",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/masterbusinesspartner']);  })
          });
          
          return row;
        }
        };
        
      }
      
	   
	   
	    if(this.geo === "MasterBPDocsJAPAN"){
        this.dtOptions = {
          ajax: '/api/MasterBPDocsJAPAN/',
          columns: [{
            title: 'Current Primary Name',
            data: 'txtCurprimname',
            defaultContent:""
          }, {
            title: 'Country',
            data: 'txCountry',
            defaultContent:""
          }, {
            title: 'IOT/GMU',
            data: 'txMajorMarket',
            defaultContent:""
          },{
            title: 'IMT/GMT',
            data: 'txGrowthMarket',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
            defaultContent:"",
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
          },
          {
            title:'End User',
            data:"txEUserName",
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/masterbusinesspartner']);  })
          });
          
          return row;
        }
        };
        
      }
      
	       
      
	  
      
      if(this.geo === "AMReviewsByBrand"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AMreviewsByBrand/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          }, {
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	 
	 
	  if(this.geo === "LAReviewsByBrand"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LAreviewsByBrand/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          }, {
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	 
	 
	 
	 
	 
	  if(this.geo === "ControlDeskReviewStatus"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ControlDeskReviewStatus/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	  
	  if(this.geo === "ControlDeskReviewStatusLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ControlDeskReviewStatusLA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          }, {
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          }, {
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Distributor',
            data: 'kwDistributor',
            defaultContent:"",
            
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	  
	  
	  
	  
	  
	  
	  if(this.geo === "LockedUnlockedandClosedUnlocked"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LockedUnlockedandClosedUnlocked/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          },{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	  
	  
	  if(this.geo === "LockedUnlockedandClosedUnlockedAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LockedUnlockedandClosedUnlockedAP/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          },{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	  
	  
	  
	  if(this.geo === "LockedUnlockedandClosedUnlockedEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LockedUnlockedandClosedUnlockedEMEA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          },{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      } 
	  
	  
	  
	  
	  
	  if(this.geo === "LockedUnlockedandClosedUnlockedLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LockedUnlockedandClosedUnlockedLA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          },{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	  
	  
	  
	  if(this.geo === "LockedUnlockedandClosedUnlockedJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/LockedUnlockedandClosedUnlockedJAPAN/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
             title: 'Channel',
            data: 'kwChannel',
            defaultContent:"",
            
          },{
            title: 'Legal Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Investigation Type',
            data: 'kwInvestType',
            defaultContent:"",
            
          },{
            title: 'Orig/Log Date',
            data: 'dtOrigDate',
            defaultContent:""
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          },{
            title:'BPCRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          },{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
  
    if(this.geo === "ByComplianceAnalyst"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByComplianceAnalyst/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
			defaultContent:""
          },{
            title: 'Announcement',
            data: 'dtAnnounce_Chk3',
            defaultContent:"",
            
          },{
            title: 'Perform',
            data: 'dtReview_Chk7',
            defaultContent:""
          },{
            title: 'Send Findings',
            data: 'dtIntialFind_Chk8',
            defaultContent:"",
            
          },{
            title:'Present to the board',
            data:"dtBPCRB_Chk11",
            defaultContent:"",
            
          },{
            title:'Close',
            data:"dtClose_Chk13",
            defaultContent:"",
            
          },{
            title:'CRB Decision',
            data:"kwDecision",
            defaultContent:"",
            
          },{
            title:'CRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	  if(this.geo === "ByComplianceAnalystAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByComplianceAnalystAP/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
			defaultContent:""
          },{
            title: 'Announcement',
            data: 'dtAnnounce_Chk3',
            defaultContent:"",
            
          },{
            title: 'Perform',
            data: 'dtReview_Chk7',
            defaultContent:""
          },{
            title: 'Send Findings',
            data: 'dtIntialFind_Chk8',
            defaultContent:"",
            
          },{
            title:'Present to the board',
            data:"dtBPCRB_Chk11",
            defaultContent:"",
            
          },{
            title:'Close',
            data:"dtClose_Chk13",
            defaultContent:"",
            
          },{
            title:'CRB Decision',
            data:"kwDecision",
            defaultContent:"",
            
          },{
            title:'CRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	if(this.geo === "ByComplianceAnalystEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByComplianceAnalystEMEA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
			defaultContent:""
          },{
            title: 'Announcement',
            data: 'dtAnnounce_Chk3',
            defaultContent:"",
            
          },{
            title: 'Perform',
            data: 'dtReview_Chk7',
            defaultContent:""
          },{
            title: 'Send Findings',
            data: 'dtIntialFind_Chk8',
            defaultContent:"",
            
          },{
            title:'Present to the board',
            data:"dtBPCRB_Chk11",
            defaultContent:"",
            
          },{
            title:'Close',
            data:"dtClose_Chk13",
            defaultContent:"",
            
          },{
            title:'CRB Decision',
            data:"kwDecision",
            defaultContent:"",
            
          },{
            title:'CRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	if(this.geo === "ByComplianceAnalystLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByComplianceAnalystLA/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
			defaultContent:""
          },{
            title: 'Announcement',
            data: 'dtAnnounce_Chk3',
            defaultContent:"",
            
          },{
            title: 'Perform',
            data: 'dtReview_Chk7',
            defaultContent:""
          },{
            title: 'Send Findings',
            data: 'dtIntialFind_Chk8',
            defaultContent:"",
            
          },{
            title:'Present to the board',
            data:"dtBPCRB_Chk11",
            defaultContent:"",
            
          },{
            title:'Close',
            data:"dtClose_Chk13",
            defaultContent:"",
            
          },{
            title:'CRB Decision',
            data:"kwDecision",
            defaultContent:"",
            
          },{
            title:'CRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	if(this.geo === "ByComplianceAnalystJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByComplianceAnalystJAPAN/',
          columns: [{
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Country',
            data: 'txCountry',
			defaultContent:""
          },{
            title: 'Announcement',
            data: 'dtAnnounce_Chk3',
            defaultContent:"",
            
          },{
            title: 'Perform',
            data: 'dtReview_Chk7',
            defaultContent:""
          },{
            title: 'Send Findings',
            data: 'dtIntialFind_Chk8',
            defaultContent:"",
            
          },{
            title:'Present to the board',
            data:"dtBPCRB_Chk11",
            defaultContent:"",
            
          },{
            title:'Close',
            data:"dtClose_Chk13",
            defaultContent:"",
            
          },{
            title:'CRB Decision',
            data:"kwDecision",
            defaultContent:"",
            
          },{
            title:'CRB Status',
            data:"kwStatus",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	  
	  
	  
	  
	  
	  
	  
	
	
    if(this.geo === "MonthlyBPCRBTTemplate"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyBPCRBTTemplate/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'BPCRB Decision',
            data: 'kwDecision',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Final Recovery Amount',
            data:"nmFinalRecvAmt",
            defaultContent:"",
            
          },{
            title:'Action Item Owner',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Date Letter Sent to BP',
            data:"dtExecLtr",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	
    if(this.geo === "MonthlyBPCRBTTemplateAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyBPCRBTTemplateAP/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'BPCRB Decision',
            data: 'kwDecision',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Final Recovery Amount',
            data:"nmFinalRecvAmt",
            defaultContent:"",
            
          },{
            title:'Action Item Owner',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Date Letter Sent to BP',
            data:"dtExecLtr",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	
    if(this.geo === "MonthlyBPCRBTTemplateEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyBPCRBTTemplateEMEA/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'BPCRB Decision',
            data: 'kwDecision',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Final Recovery Amount',
            data:"nmFinalRecvAmt",
            defaultContent:"",
            
          },{
            title:'Action Item Owner',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Date Letter Sent to BP',
            data:"dtExecLtr",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	
    if(this.geo === "MonthlyBPCRBTTemplateLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyBPCRBTTemplateLA/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'BPCRB Decision',
            data: 'kwDecision',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Final Recovery Amount',
            data:"nmFinalRecvAmt",
            defaultContent:"",
            
          },{
            title:'Action Item Owner',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Date Letter Sent to BP',
            data:"dtExecLtr",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	
    if(this.geo === "MonthlyBPCRBTTemplateJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyBPCRBTTemplateJAPAN/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'BPCRB Decision',
            data: 'kwDecision',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Final Recovery Amount',
            data:"nmFinalRecvAmt",
            defaultContent:"",
            
          },{
            title:'Action Item Owner',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Date Letter Sent to BP',
            data:"dtExecLtr",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	
	
	
    if(this.geo === "WWMetricMaster"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/WWMetricMaster/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
	
	
    if(this.geo === "ChecklistStatusbyGeo"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ChecklistStatusbyGeo/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "ChecklistStatusbyGeoAndAnalyst"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ChecklistStatusbyGeoAndAnalyst/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "CycleTime"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/CycleTime/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "Recoveriesover100K"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/Recoveriesover100K/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "SampleInfractionRatesbyBPAndCountry"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/SampleInfractionRatesbyBPAndCountry/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "SampleInfractionRatesbyCountry"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/SampleInfractionRatesbyCountry/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "ManagersOperationalMetricsReport"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ManagersOperationalMetricsReport/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "BPCCadence"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/BPCCadence/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
    if(this.geo === "MonthlyPendingEscalation"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyPendingEscalation/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'Status',
            data: 'kwStatus',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Compliance Analyst',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Revised Recommendations',
            data:"rtxRevRec_1",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
	

    if(this.geo === "ByTargetBPCRBDate"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ByTargetBPCRBDate/',
          columns: [{
            title: 'IOT/GMU',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Target BPCRB Date',
            data:"dtTargetACRB",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Lead Analyst Name',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Approval Status',
            data: 'approveFlag2',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
    if(this.geo === "BRETFailConditions"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/BRETFailConditions/',
          columns: [{
            title: 'Geo',
            data: 'txGeo',
            defaultContent:""
          },{
             title:'Original Board Date',
            data:"dtOriAcrb",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Fail Condition (s)',
            data: 'Fail_Conditions',
            defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'BPCRB Status',
            data: 'kwStatus',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
    if(this.geo === "AgedRecoveryInvoice"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AgedRecoveryInvoice/',
          columns: [{
            title: 'IOT/GMU',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Target BPCRB Date',
            data:"dtTargetACRB",
            defaultContent:"",
            
          },{
            title: 'Log #',
            data: 'txLogNo',
			defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Lead Analyst Name',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Approval Status',
            data: 'approveFlag2',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']); }) 
          });
          return row;
        }
        };
        
      }
	
	
		  
	
	
    if(this.geo === "MonthlyPendingEscalationAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyPendingEscalationAP/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'Status',
            data: 'kwStatus',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Compliance Analyst',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Revised Recommendations',
            data:"rtxRevRec_1",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
	
	
	
	
	
    if(this.geo === "MonthlyPendingEscalationEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyPendingEscalationEMEA/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'Status',
            data: 'kwStatus',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Compliance Analyst',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Revised Recommendations',
            data:"rtxRevRec_1",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
    if(this.geo === "MonthlyPendingEscalationLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyPendingEscalationLA/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'Status',
            data: 'kwStatus',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Compliance Analyst',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Revised Recommendations',
            data:"rtxRevRec_1",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	
	
	
	
    if(this.geo === "MonthlyPendingEscalationJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/MonthlyPendingEscalationJAPAN/',
          columns: [{
            title: 'Geo',
            data: 'txGrowthMarket',
            defaultContent:""
          },{
             title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
            title: 'Channel',
            data: 'kwChannel',
			defaultContent:""
          },{
            title: 'Status',
            data: 'kwStatus',
            defaultContent:"",
            
          },{
            title: 'Log Number',
            data: 'txLogNo',
            defaultContent:""
          },{
            title: 'BP Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title:'Compliance Analyst',
            data:"kwStaffMember",
            defaultContent:"",
            
          },{
            title:'Revised Recommendations',
            data:"rtxRevRec_1",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	
	  
	  
	  
	  
	  
	  
	  
	
   if(this.geo === "PaymentsDueOSRecovery"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/PaymentsDueOSRecovery/',
          columns: [{
            title: 'LOCID',
            data: 'txLOCID',
            defaultContent:""
          },{
             title:'Distributor',
            data:"kwDistributor",
            defaultContent:"",
            
          },{
            title: 'Bus. Partner Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Final  Rec. Amt',
            data: 'nmFinalRecvAmt',
            defaultContent:"",
            
          },{
            title: 'BPCRB Date',
            data: 'dtACRBDts',
            defaultContent:""
          },{
            title: 'Letter Date',
            data: 'dtExecLtr',
            defaultContent:"",
            
          },{
            title:'Comp. Staff Member',
            data:"kwStaffMember",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']); }) 
          });
          return row;
        }
        };
        
      }
	  
	
  
    
	
   if(this.geo === "PaymentsDueOSRecoveryAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/PaymentsDueOSRecoveryAP/',
          columns: [{
            title: 'LOCID',
            data: 'txLOCID',
            defaultContent:""
          },{
             title:'Distributor',
            data:"kwDistributor",
            defaultContent:"",
            
          },{
            title: 'Bus. Partner Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Final  Rec. Amt',
            data: 'nmFinalRecvAmt',
            defaultContent:"",
            
          },{
            title: 'BPCRB Date',
            data: 'dtACRBDts',
            defaultContent:""
          },{
            title: 'Letter Date',
            data: 'dtExecLtr',
            defaultContent:"",
            
          },{
            title:'Comp. Staff Member',
            data:"kwStaffMember",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	  
	
   if(this.geo === "PaymentsDueOSRecoveryEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/PaymentsDueOSRecoveryEMEA/',
          columns: [{
            title: 'LOCID',
            data: 'txLOCID',
            defaultContent:""
          },{
             title:'Distributor',
            data:"kwDistributor",
            defaultContent:"",
            
          },{
            title: 'Bus. Partner Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Final  Rec. Amt',
            data: 'nmFinalRecvAmt',
            defaultContent:"",
            
          },{
            title: 'BPCRB Date',
            data: 'dtACRBDts',
            defaultContent:""
          },{
            title: 'Letter Date',
            data: 'dtExecLtr',
            defaultContent:"",
            
          },{
            title:'Comp. Staff Member',
            data:"kwStaffMember",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	  
	
   if(this.geo === "PaymentsDueOSRecoveryLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/PaymentsDueOSRecoveryLA/',
          columns: [{
            title: 'LOCID',
            data: 'txLOCID',
            defaultContent:""
          },{
             title:'Distributor',
            data:"kwDistributor",
            defaultContent:"",
            
          },{
            title: 'Bus. Partner Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Final  Rec. Amt',
            data: 'nmFinalRecvAmt',
            defaultContent:"",
            
          },{
            title: 'BPCRB Date',
            data: 'dtACRBDts',
            defaultContent:""
          },{
            title: 'Letter Date',
            data: 'dtExecLtr',
            defaultContent:"",
            
          },{
            title:'Comp. Staff Member',
            data:"kwStaffMember",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
	
	  
	
   if(this.geo === "PaymentsDueOSRecoveryJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/PaymentsDueOSRecoveryJAPAN/',
          columns: [{
            title: 'LOCID',
            data: 'txLOCID',
            defaultContent:""
          },{
             title:'Distributor',
            data:"kwDistributor",
            defaultContent:"",
            
          },{
            title: 'Bus. Partner Name',
            data: 'txLegalName',
			defaultContent:""
          },{
            title: 'Final  Rec. Amt',
            data: 'nmFinalRecvAmt',
            defaultContent:"",
            
          },{
            title: 'BPCRB Date',
            data: 'dtACRBDts',
            defaultContent:""
          },{
            title: 'Letter Date',
            data: 'dtExecLtr',
            defaultContent:"",
            
          },{
            title:'Comp. Staff Member',
            data:"kwStaffMember",
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	
  
  
  
  
  
  
  
  
	  if(this.geo === "ReviewstotheBoardbyDate"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ReviewstotheBoardbyDate/',
          columns: [{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
             title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
			defaultContent:""
          },{
            title:'BPCRB Status',
            data:"kwStatus",
			defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
           let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
		
	  
	


  
  
	  if(this.geo === "ReviewstotheBoardbyDateLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/ReviewstotheBoardbyDateLA/',
          columns: [{
            title:'Original BPCRB Dates',
            data:"dtACRBDts",
            defaultContent:"",
            
          },{
             title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
            
          },{
            title:'Decision',
            data:"kwDecision",
			defaultContent:""
          },{
            title:'BPCRB Status',
            data:"kwStatus",
			defaultContent:"",
            
          },{
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:"",
            
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
		
		
	  
	  
	  
      
      if(this.geo === "AllReviewDocsStatusReport"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AllReviewDocsStatusReport/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Status',
            data: 'kwPreRevStatus',
            defaultContent:""
          },
		  {
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }	   
	  
      if(this.geo === "AllReviewDocsStatusReportAP"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AllReviewDocsStatusReportAP/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Status',
            data: 'kwPreRevStatus',
            defaultContent:""
          },
		  {
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	  
	  
      if(this.geo === "AllReviewDocsStatusReportEMEA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AllReviewDocsStatusReportEMEA/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Status',
            data: 'kwPreRevStatus',
            defaultContent:""
          },
		  {
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']); }) 
          });
          return row;
        }
        };
        
      }
	  
	  
      if(this.geo === "AllReviewDocsStatusReportLA"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AllReviewDocsStatusReportLA/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Status',
            data: 'kwPreRevStatus',
            defaultContent:""
          },
		  {
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }  
	  
      if(this.geo === "AllReviewDocsStatusReportJAPAN"){
        console.log("It Came here");
        this.dtOptions = {
          ajax: '/api/AllReviewDocsStatusReportJAPAN/',
          columns: [{
            title: 'Channel',
            data: 'kwChannel',
            defaultContent:""
          }, {
            title: 'Staff Member',
            data: 'kwStaffMember',
            defaultContent:""
          },{
            title: 'Business Partner Name',
            data: 'txLegalName',
            defaultContent:"",
            
          },{
            title: 'Status',
            data: 'kwPreRevStatus',
            defaultContent:""
          },
		  {
            title: 'Log#',
            data: 'txLogNo',
            defaultContent:"",
          }
        ],
        responsive: true,
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('mousedown');
          $('td', row).bind('mousedown', () => {
            let params = new URLSearchParams();
            params.append("id", data["_id"]);
            let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params:params });
    this.http.get('/api/getdocbyId',options).subscribe(data => {
      console.log(data);
      this.reviewdataviewService.setMbpData(JSON.parse(data["_body"]));

      this.router.navigate(['/reviewform']);  })
          });
          return row;
        }
        };
        
      }
	    
	  
    } )

    
  
    
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    }
  
  
  updateview(info: any): void {
    console.log(info);
     } 

  
  //function for create new record 
  CreateNewRecord(){ 
    this.reviewdataviewService.setMbpData("");
   //this.model = new RecordForm("","","frecord","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","");
   //this.router.navigateByUrl(['/recordform']);
   
   this.router.navigate(['/recordform']);  
   

  }
  


  }
