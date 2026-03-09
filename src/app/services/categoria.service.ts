import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  listar_categorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>('http://localhost:8000/api/categoria')
  }
  eliminar(id:number):Observable<Categoria[]>{
     return this.http.delete<Categoria[]>('http://localhost:8000/api/categoria/'+id)
  }
  agregar(formulario:Categoria):Observable<Categoria[]>{
    return this.http.post<Categoria[]>('http://localhost:8000/api/categoria/',formulario)
  }
  actualizar(formulario:Categoria,id:number):Observable<Categoria[]>{
    return this.http.put<Categoria[]>('http://localhost:8000/api/categoria/'+id,formulario)
  }
}
