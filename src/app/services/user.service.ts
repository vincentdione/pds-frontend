import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  signup(data:any){

    return this.httpClient.post(this.url+"/auth/register", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }

  forgotPassword(data:any){

    return this.httpClient.post(this.url+"/auth/forgotPassword", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }

  register(data:any){
    return this.httpClient.post(this.url+"/auth/register", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data:any){

    return this.httpClient.post(this.url+"/auth/login", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }

  updateUser(id:any,data:any){
    return this.httpClient.patch(this.url+"/auth/update/"+id, data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteUser(id:any){
    return this.httpClient.delete(this.url+"/auth/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }


  checkToken(){
    console.log("first")
    return this.httpClient.get(this.url+"/auth/checkToken");
  }

  changePassword(id:any,data:any){
    return this.httpClient.patch(`${this.url}/auth/changeMdp/${id}`, data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getUserss(){
    return this.httpClient.get(this.url+"/users/get/")
  }

  goToDashboard(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.url+"/auth/checkToken",{headers:headers})
   }


   blockedUser(id: any,row:any){
    return this.httpClient.patch(`${this.url}/users/isactive/${id}`,row)
 }


 unBlockedUser(id: any,row:any){
  return this.httpClient.patch(`${this.url}/users/isnotactive/${id}`,row)
}



}
