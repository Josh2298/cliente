import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  constructor(public dialogRef:MatDialogRef<UsuarioFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:Usuario){
    console.log(data)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    //ci: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    /*apellido: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    rol: new FormControl('',[Validators.required]),*/
    email: new FormControl('',[Validators.required,Validators.email])
  })
  get nombre(){
    return this.agregar.get('nombre')
  }
  get email(){
    return this.agregar.get('email')
  }
  error_nombre():string{
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_email():string{
    if(this.email?.hasError('required'))
      return "Campo Obligatorio"
    if(this.email?.hasError('email'))
      return "Ingrese el formato de email"
    return ""
  }
}
