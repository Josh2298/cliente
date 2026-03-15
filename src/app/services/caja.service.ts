import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caja } from '../models/caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http:HttpClient) { }
    listar_cajas():Observable<Caja[]>{
      return this.http.get<Caja[]>('http://localhost:8000/api/caja')
    }
    eliminar(id:number):Observable<Caja[]>{
      return this.http.delete<Caja[]>('http://localhost:8000/api/caja/'+id)
    }
    agregar(formulario:Caja):Observable<Caja[]>{
      return this.http.post<Caja[]>('http://localhost:8000/api/caja/',formulario)
    }
    actualizar(formulario:Caja,id:number):Observable<Caja[]>{
      return this.http.put<Caja[]>('http://localhost:8000/api/caja/'+id,formulario)
    }
}