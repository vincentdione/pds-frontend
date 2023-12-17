import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AnyCnameRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addLangue(data:any){
    return this.httpClient.post(this.url+"/langues/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateLangue(id:AnyCnameRecord,data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/langues/update/"+id, data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteLangue(id:any){
    return this.httpClient.delete(this.url+"/langues/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getLangues(){
    return this.httpClient.get(this.url+"/langues/get/")
  }
}
