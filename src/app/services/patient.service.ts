import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient,private tokenService: TokenService) { }

  private getRequestHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  addCadre(data:any,file:any){
    return this.httpClient.post(this.url+"/cadres/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }


  importCadres(data: any){
    return this.httpClient.post(this.url+"/cadres/import/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateCadre(id:any,data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/cadres/update/"+id, data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  uploadImages(id:any,file: FormData) {
    console.log("first upload"+file)
    return this.httpClient.post(this.url + "/cadres/upload/"+id, file);
  }

  deleteCadre(id:any){
    return this.httpClient.delete(this.url+"/cadres/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getCadres(){
    const headers = this.getRequestHeaders();
    return this.httpClient.get(this.url+"/cadres/get/",{ headers:headers })
  }

  getOneCadre(id:any){
    return this.httpClient.get(this.url+"/cadres/find/"+id)
  }

  searchCadre(data:any){
    console.log(data)
    return this.httpClient.post(this.url+"/cadres/search/",data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getImageUrl(imageName: string): string {
    return `${this.url}/images/${imageName}`;
  }

}
