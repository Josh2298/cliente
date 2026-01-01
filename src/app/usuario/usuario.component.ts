import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  datos:number[]=[]
  cadena:string[]=[]
  constructor(private usuario:UsuarioService){}
  ngOnInit():void{
    this.datos=this.usuario.listar()
    this.cadena=this.usuario.listar_cadenas()
    console.log(this.datos,this.cadena)
    this.usuario.listar_usuarios().subscribe(data=>{
      console.log(data)
    })
  }
}