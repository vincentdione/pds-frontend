import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addRegion(data:any){
    return this.httpClient.post(this.url+"/regions/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateRegion(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/regions/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteRegion(id:any){
    return this.httpClient.patch(this.url+"/regions/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getRegions(){
    return this.httpClient.get(this.url+"/regions/get/")
  }
}
