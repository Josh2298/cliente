import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
  listarPorRol(rol: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`http://localhost:8000/api/usuario?rol=${rol}`);
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
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post<Usuario[]>('http://localhost:8000/api/usuario/imagen',fd)
  }
}
