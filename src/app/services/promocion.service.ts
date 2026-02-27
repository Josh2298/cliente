import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(private http:HttpClient) {}
  listar_usuarios():Observable<Promocion[]>{
      return this.http.get<Promocion[]>('http://localhost:8000/api/usuario')
    }
    eliminar(id:number):Observable<Promocion[]>{
      return this.http.delete<Promocion[]>('http://localhost:8000/api/usuario/'+id)
    }
    agregar(formulario:Promocion):Observable<Promocion[]>{
      return this.http.post<Promocion[]>('http://localhost:8000/api/usuario/',formulario)
    }
    actualizar(formulario:Promocion,id:number):Observable<Promocion[]>{
      return this.http.put<Promocion[]>('http://localhost:8000/api/usuario/'+id,formulario)
    }
}
