import { Component, Inject } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Membresia } from 'src/app/models/membresia';
import { Promocion } from 'src/app/models/promocion';
import { MembresiaService } from 'src/app/services/membresia.service';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-membresia-form',
  templateUrl: './membresia-form.component.html',
  styleUrls: ['./membresia-form.component.css']
})
export class MembresiaFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  promociones:Promocion[]=[]
  precioTotal:number=0
  constructor(public dialogRef:MatDialogRef<MembresiaFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private membresiaServicio:MembresiaService, private promocionServicio:PromocionService){
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
    p_efectivo: new FormControl(0,[Validators.required]),
    p_qr: new FormControl(0,[]),
    monto_total: new FormControl(0,[]),
    fecha_ini: new FormControl('',[]),
    fecha_fin: new FormControl('',[]),
    estado: new FormControl('',[]),
    detalle: new FormControl('',[]),
    disciplina: new FormControl('',[]),
    cantidad_personas:new FormControl(1,[Validators.required]),
    cantidad_meses:new FormControl(1,[Validators.required]),
    ext_ini: new FormControl('',[]),
    ext_fin: new FormControl('',[]),
    detalle_ext: new FormControl('',[]),
    user_id: new FormControl('',[]),
    promocion_id:new FormControl('',[Validators.required]),
    created_at: new FormControl('',[])
  })
  get plan(){return this.agregar.get('plan')}
  get p_efectivo(){return this.agregar.get('p_efectivo')}
  get p_qr(){return this.agregar.get('p_qr')}
  get monto_total(){return this.agregar.get('monto_total')}
  get fecha_ini(){return this.agregar.get('fecha_ini')}
  get fecha_fin(){return this.agregar.get('fecha_fin')}
  get estado(){return this.agregar.get('estado')}
  get detalle(){return this.agregar.get('detalle')}
  get disciplina(){return this.agregar.get('disciplina')}
  get cantidad_personas(){return this.agregar.get('cantidad_personas')}
  get cantidad_meses(){return this.agregar.get('cantidad_meses')}
  get ext_ini(){return this.agregar.get('ext_ini')}
  get ext_fin(){return this.agregar.get('ext_fin')}
  get detalle_ext(){return this.agregar.get('detalle_ext')}
  get user_id(){return this.agregar.get('user_id')}
  get promocion_id(){return this.agregar.get('promocion_id')}
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
  cargarPromociones()
  {
    const plan = this.plan?.value?.toLowerCase()
    this.promocion_id?.setValue(null);
    this.precioTotal = 0;
    this.monto_total?.setValue(0);
    this.p_efectivo?.setValue(0);
    this.p_qr?.setValue(0);
    if(plan === 'sesion')
    {
      this.cantidad_personas?.setValue(1);
    }
    this.promocionServicio
      .listar_promociones()
      .subscribe((resp: Promocion[]) => {

        this.promociones = resp.filter(
          p => p.plan.toLowerCase() === plan
        );

      });
  }
  calcularPrecio()
  {
    if(!this.promocion_id?.value || !this.plan?.value || 
      Number(this.cantidad_personas?.value) < 1){
        return;
    }
    const datos = {
      promocion_id: this.promocion_id?.value,
      cantidad_personas: this.cantidad_personas?.value
    };

      this.promocionServicio.obtener_precio(datos).subscribe(resp => {
        const meses = Number(
        this.cantidad_meses?.value || 1
      );

      this.precioTotal = Number(resp.precio) * meses;

      this.monto_total?.setValue(
        this.precioTotal
      );

      this.p_efectivo?.setValue(
        this.precioTotal
      );
      this.p_qr?.setValue(0);

    });
}
}