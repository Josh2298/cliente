import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  listar_productos():Observable<Producto[]>{
    return this.http.get<Producto[]>('http://localhost:8000/api/producto')
  }
  eliminar(id:number):Observable<Producto[]>{
    return this.http.delete<Producto[]>('http://localhost:8000/api/producto/'+id)
  }
  agregar(formulario:Producto):Observable<Producto[]>{
    return this.http.post<Producto[]>('http://localhost:8000/api/producto/',formulario)
  }
  actualizar(formulario:Producto,id:number):Observable<Producto[]>{
    return this.http.put<Producto[]>('http://localhost:8000/api/producto/'+id,formulario)
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post<Producto[]>('http://localhost:8000/api/producto/imagen',fd)
  }
}
