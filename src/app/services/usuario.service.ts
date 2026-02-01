import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  listar():number[]{
    return [1,2,5,6]
  }
  listar_cadenas():string[]{
    return ["Hola","Mundo"]
  }
  listar_usuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://localhost:8000/api/usuario')
  }
  eliminar(id:number):Observable<Usuario[]>{
    return this.http.delete<Usuario[]>('http://localhost:8000/api/usuario/'+id)
  }
  agregar(formulario:Usuario):Observable<Usuario[]>{
    return this.http.post<Usuario[]>('http://localhost:8000/api/usuario/',formulario)
  }
  actualizar(formulario:Usuario,id:number):Observable<Usuario[]>{
    return this.http.put<Usuario[]>('http://localhost:8000/api/usuario/'+id,formulario)
  }
}
