import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class KeywordsService {
  Keyworddefinitioncompi = [];
  keyworddefinitioncvi= [];
  retrieveprofilecvi = [];
  retrieveprofilecompi = [];
  // kwwearchfieldkeywords = [];

  constructor(private http: Http) { }

  getKeyworddefinitioncompi() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/keyWordDefinitionCompi',options);
  }
  setKeyworddefinitioncompi(values: string[]) {
    this.Keyworddefinitioncompi = values;
  }

  getkeyworddefinitioncvi() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/keyWordDefinitionCVI',options);
  }
  setkeyworddefinitioncvi(values: string[]) {
    this.keyworddefinitioncvi = values;
  }

  getretrieveprofilecvi() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/retrieveProfilecvi',options);
  }
  setretrieveprofilecvi(values: string[]) {
    this.retrieveprofilecvi = values;
  }

  getretrieveprofilecompi() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/retrieveProfile',options);
  }
  setretrieveprofilecompi(values: string[]) {
    this.retrieveprofilecompi = values;
  }

  // getkwwearchfieldkeywords() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get('/api/KWSearchFieldKeywords',options);
  // }
  // setkwwearchfieldkeywords(values: string[]) {
  //   this.kwwearchfieldkeywords = values;
  // }
}
