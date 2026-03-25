import { Component, Inject } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Membresia } from 'src/app/models/membresia';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-membresia-form',
  templateUrl: './membresia-form.component.html',
  styleUrls: ['./membresia-form.component.css']
})
export class MembresiaFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<MembresiaFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private membresiaServicio:MembresiaService){
    this.texto=data.texto
    console.log(data)
    this.plan?.setValue(data.membresia.plan)
    this.p_efectivo?.setValue(data.membresia.p_efectivo)
    this.p_qr?.setValue(data.membresia.p_qr)
    this.fecha_ini?.setValue(data.membresia.fecha_ini)
    this.fecha_fin?.setValue(data.membresia.fecha_fin)
    this.estado?.setValue(data.membresia.estado)
    this.detalle?.setValue(data.membresia.detalle)
    this.disciplina?.setValue(data.membresia.disciplina)
    this.ext_ini?.setValue(data.membresia.ext_ini)
    this.ext_fin?.setValue(data.membresia.ext_fin)
    this.detalle_ext?.setValue(data.membresia.detalle_ext)
    this.user_id?.setValue(data.membresia.user_id)
    this.created_at?.setValue(data.membresia.created_at)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    plan: new FormControl('',[Validators.required]),
    p_efectivo: new FormControl('',[Validators.required]),
    p_qr: new FormControl('',[]),
    fecha_ini: new FormControl('',[]),
    fecha_fin: new FormControl('',[]),
    estado: new FormControl('',[]),
    detalle: new FormControl('',[]),
    disciplina: new FormControl('',[]),
    ext_ini: new FormControl('',[]),
    ext_fin: new FormControl('',[]),
    detalle_ext: new FormControl('',[]),
    user_id: new FormControl('',[]),
    created_at: new FormControl('',[])
  })
  get plan(){return this.agregar.get('plan')}
  get p_efectivo(){return this.agregar.get('p_efectivo')}
  get p_qr(){return this.agregar.get('p_qr')}
  get fecha_ini(){return this.agregar.get('fecha_ini')}
  get fecha_fin(){return this.agregar.get('fecha_fin')}
  get estado(){return this.agregar.get('estado')}
  get detalle(){return this.agregar.get('detalle')}
  get disciplina(){return this.agregar.get('disciplina')}
  get ext_ini(){return this.agregar.get('ext_ini')}
  get ext_fin(){return this.agregar.get('ext_fin')}
  get detalle_ext(){return this.agregar.get('detalle_ext')}
  get user_id(){return this.agregar.get('user_id')}
  get created_at(){return this.agregar.get('created_at')}
  error_plan():string{
    if(this.plan?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }  
  error_p_efectivo():string{
    if(this.p_efectivo?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
}