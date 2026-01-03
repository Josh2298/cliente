import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  usuarios:Usuario[]=[]
  datos:number[]=[]
  cadena:string[]=[]
  constructor(private usuarioService:UsuarioService){}
  llenar_imagen(nombre:string):string{
    return 'http://localhost:8000/api/usuario/imagen/'+nombre
  }
  ngOnInit():void{
    this.datos=this.usuarioService.listar()
    this.cadena=this.usuarioService.listar_cadenas()
    console.log(this.datos,this.cadena)
    this.usuarioService.listar_usuarios().subscribe(data=>{
      this.usuarios=data
      console.log(data)
    })
  }
  eliminar(item:Usuario):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.apellido+" "+item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Usuario Eliminado correctamente.', 'success');
        this.usuarioService.eliminar(item.id).subscribe(data=>{
          this.usuarios=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino el registro.)', 'error');
      }
    });
  }

  successNotification(){
    Swal.fire('Hi', 'We have been informed!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','Product stil in our database.)', 'error');
      }
    });
  }
}