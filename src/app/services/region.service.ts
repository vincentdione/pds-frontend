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

  updateRegion(id:any,data:any){
    console.log(data)
    console.log(id)
    return this.httpClient.patch(this.url+"/regions/update/"+id, data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteRegion(id:any){
    return this.httpClient.delete(this.url+"/regions/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getRegions(){
    return this.httpClient.get(this.url+"/regions/get/")
  }


  //#Pays
  getPays(){
    return this.httpClient.get(this.url+"/pays/get/")
  }
}
