import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addCommune(data:any){
    return this.httpClient.post(this.url+"/communes/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateCommune(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/communes/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteCommune(id:any){
    return this.httpClient.patch(this.url+"/communes/delete/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getCommunes(){
    return this.httpClient.get(this.url+"/communes/get/")
  }
}
