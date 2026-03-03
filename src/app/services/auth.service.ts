import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':''+localStorage.getItem('tokenBelen')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: BehaviorSubject<Usuario>;
  public usuario:Observable<Usuario>
  base=environment.base

  constructor(private http:HttpClient) {
    let user=localStorage.getItem('test')
      this.usuarioActual = new BehaviorSubject<Usuario>(JSON.parse(user+""))
      this.usuario = this.usuarioActual.asObservable();
      /* this.usuarioActual = new BehaviorSubject<Usuario>(
        user ? JSON.parse(user) : null as any */
  }
  public get usuarioActualValue(){
    return this.usuarioActual.value
  }

  isLogged():Observable<Usuario>{
    return (this.usuarioActual)
  }

  login(form:Login):Observable<any>{
    return this.http.post(this.base+'login',form)
    .pipe(
      map((success:any)=>{
        this.usuarioActual.next(success.user)
        const tokenAF= `Bearer ${success.access_token}`;
        localStorage.setItem('tokenBelen',tokenAF);
        localStorage.setItem('test',JSON.stringify(success.user));
        // localStorage.setItem('token-ope',btoa(tokenAF));
        // localStorage.setItem('token-ope',success);
        return success;
      })
    );
  }
  logout():void{
    localStorage.removeItem('tokenBelen')
    localStorage.removeItem('test')
  }
  estaLogueado(): boolean {
    return !!localStorage.getItem('tokenBelen');
  }
}