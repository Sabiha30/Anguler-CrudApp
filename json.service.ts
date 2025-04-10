import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor( private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get("http://localhost:3000/users");
  }
  setToken(Token:string){
    localStorage.setItem('token',Token)
  }
  checkToken(){
    return localStorage.getItem('token') != null
  }
  logout(){
    localStorage.removeItem('token')
  }
  checkLogin(username:any,password:any):Observable<any>
  {
    if(username==username && password==password){
      this.setToken('abcde')
      return of({name:username,email:username})
    }
    else{
      return throwError(new Error('Failed to login..!!'))
    }
  }
  addCustomer( customerForm:any):Observable<any>{
    return this.http.post("http://localhost:3000/customer",customerForm)
  }
  getCustomer():Observable<any>{
    return this.http.get("http://localhost:3000/customer")
  }
  deleteCustomer(id:any):Observable<any>{
    return this.http.delete("http://localhost:3000/customer/"+id)
  }
  updateCustomer(id:any,customerForm:any):Observable<any>{
    return this.http.put("http://localhost:3000/customer/"+id,customerForm)
  }
}
