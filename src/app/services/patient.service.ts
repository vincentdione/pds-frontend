import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addCadre(data:any){
    return this.httpClient.post(this.url+"/cadres/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateCadre(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/cadres/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteCadre(id:any){
    return this.httpClient.delete(this.url+"/cadres/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getCadres(){
    return this.httpClient.get(this.url+"/cadres/get/")
  }



}
