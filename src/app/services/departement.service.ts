import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addDepartement(data:any){
    return this.httpClient.post(this.url+"/departements/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateDepartement(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/departements/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteDepartement(id:any){
    return this.httpClient.patch(this.url+"/departements/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getDepartements(){
    return this.httpClient.get(this.url+"/departements/get/")
  }
}
