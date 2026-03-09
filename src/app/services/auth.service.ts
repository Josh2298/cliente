import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(`${this.base}users`);
  }
  logout(){
    localStorage.removeItem('token-ope');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
  }
  estaLogueado(): boolean {
    return !!localStorage.getItem('token-ope');
  }
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getToken(): string | null {
    return localStorage.getItem('token-ope');
  }
  login(data:any){
    // console.log('aqui');  
    return this.http.post(`${this.base}login`,data)
    .pipe(
        map((success:any)=>{
          const tokenAF= `Bearer ${success['token']}`;    
          localStorage.setItem('token-ope',tokenAF);     
          localStorage.setItem('rol', success.user.rol);
          localStorage.setItem('nombre', success.user.name);
          localStorage.setItem('email', success.user.email);     
          // localStorage.setItem('token-ope',btoa(tokenAF));          
          // localStorage.setItem('token-ope',success);          
          return success;
        })
    );
  }
  // login(data:any){ 
  //   return this.http.post(`${this.base}login`,data);
  //   .pipe(
  //       map((success:any)=>{
  //         const tokenAF= `Bearer ${success.token}`;
  //         localStorage.setItem('token-ope',btoa(tokenAF));          
  //         return success;
  //       })
  //   );
  // }
}