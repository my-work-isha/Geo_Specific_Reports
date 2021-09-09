import { Injectable } from '@angular/core';

@Injectable()
export class MbpdataService {
  private mbpData: any;
  private searchStr: string;
  private viewPath: string = "";
  private fetchData: any;

  constructor() { }

  setMbpData(data: any) {
    this.mbpData=data;
  }
  getMbpData() {
    return this.mbpData;
  }

  getFetchData(){
    return this.fetchData;
  }

  setFetchData(data:any){
    this.fetchData=data;
  }


  setSearchStr(data: string) {
    this.searchStr = data;
  }
  getSearchStr() {
    return this.searchStr;
  }
  
  setViewPath(data: string) {
    this.viewPath = data;
  }
  getViewPath() {
    return this.viewPath;
  }
}
