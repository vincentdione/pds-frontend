import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addHospital(data:any){
    return this.httpClient.post(this.url+"/hopital/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateHospital(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/hopital/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteHospital(id:any){
    return this.httpClient.patch(this.url+"/hopital/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getHospitals(){
    return this.httpClient.get(this.url+"/hopital/get/")
  }
}
