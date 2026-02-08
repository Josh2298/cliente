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
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<UsuarioFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any){
    this.texto=data.texto
    console.log(data)
    this.ci?.setValue(data.usuario.ci)
    this.nombre?.setValue(data.usuario.nombre)
    this.apellido?.setValue(data.usuario.apellido)
    this.username?.setValue(data.usuario.username)
    this.password?.setValue(data.usuario.password)
    this.rol?.setValue(data.usuario.rol)
    //this.imagen?.setValue(data.imagen)
    if(data.texto=="Editar Usuario")
      this.password?.clearValidators
    if(data.imagen!="")
      this.previsualizacion='http://localhost:8000/api/usuario/imagen/'+data.imagen
    this.email?.setValue(data.email)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    ci: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    rol: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email])
  })
  get ci(){return this.agregar.get('ci')}
  get nombre(){return this.agregar.get('nombre')}
  get apellido(){return this.agregar.get('apellido')}
  get username(){return this.agregar.get('username')}
  get password(){return this.agregar.get('password')}
  get rol(){return this.agregar.get('rol')}
  get imagen(){return this.agregar.get('imagen')}
  get email(){return this.agregar.get('email')}
  error_nombre():string{
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_apellido():string{
    if(this.apellido?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_username():string{
    if(this.username?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_password():string{
    if(this.password?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_imagen():string{
    if(this.imagen?.hasError('required'))
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
  cargarImagen(event:any):void{
    console.log(event.target.files)
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.previsualizar(file)
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
    console.log(this.previsualizacion)
  };
}