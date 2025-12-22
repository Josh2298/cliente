import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
  listar():number[]{
    return [1,2,5,6]
  }
  listar_cadenas():string[]{
    return ["Hola","Mundo"]
  }

}
