import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-promocion-form',
  templateUrl: './promocion-form.component.html',
  styleUrls: ['./promocion-form.component.css']
})
export class PromocionFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<PromocionFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private promocionServicio:PromocionService){
    this.texto=data.texto
    console.log(data)
    this.nombre?.setValue(data.promocion.nombre)
    this.p1persona?.setValue(data.promocion.p1persona)
    this.p2persona?.setValue(data.promocion.p2persona)
    this.p3persona?.setValue(data.promocion.p3persona)
    this.medio_mes?.setValue(data.promocion.medio_mes)
    this.trimestral?.setValue(data.promocion.trimestral)
    this.semestral?.setValue(data.promocion.semestral)
    this.zumba?.setValue(data.promocion.zumba)
    this.medio_z?.setValue(data.promocion.medio_z)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nombre: new FormControl('',[Validators.required]),
    p1persona: new FormControl('',[]),
    p2persona: new FormControl('',[]),
    p3persona: new FormControl('',[]),
    medio_mes: new FormControl('',[]),
    trimestral: new FormControl('',[]),
    semestral: new FormControl('',[]),
    zumba: new FormControl('',[]),
    medio_z: new FormControl('',[]),
  })
  get ci(){return this.agregar.get('ci')}
  get nombre(){return this.agregar.get('nombre')}
  get p1persona(){return this.agregar.get('p1persona')}
  get p2persona(){return this.agregar.get('p2persona')}
  get p3persona(){return this.agregar.get('p3persona')}
  get medio_mes(){return this.agregar.get('medio_mes')}
  get trimestral(){return this.agregar.get('trimestral')}
  get semestral(){return this.agregar.get('semestral')}
  get zumba(){return this.agregar.get('zumba')}
  get medio_z(){return this.agregar.get('medio_z')}
  error_nombre():string{
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
    //console.log(this.previsualizacion)
  };  
}