import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membresia } from '../models/membresia';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(private http:HttpClient) { }
    listar_membresias():Observable<Membresia[]>{
      return this.http.get<Membresia[]>('http://localhost:8000/api/membresia')
    }
    eliminar(id:number):Observable<Membresia[]>{
      return this.http.delete<Membresia[]>('http://localhost:8000/api/membresia/'+id)
    }
    agregar(formulario:Membresia):Observable<Membresia[]>{
      return this.http.post<Membresia[]>('http://localhost:8000/api/membresia/',formulario)
    }
    actualizar(formulario:Membresia,id:number):Observable<Membresia[]>{
      return this.http.put<Membresia[]>('http://localhost:8000/api/membresia/'+id,formulario)
    }
}