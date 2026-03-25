import { Component, OnInit } from '@angular/core';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { MembresiaFormComponent } from '../membresia/membresia-form/membresia-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit{
  membresias:Membresia[]=[]
  totalSesiones: number = 0;
  totalMonto: number = 0;
  totalEfectivo: number = 0;
  totalQr: number = 0;    
  constructor(private membresiaService:MembresiaService,public dialog: MatDialog,private toatr:ToastrService){}
  mesSeleccionado!: number;
  anioSeleccionado!: number;
  meses = [
    {valor: 1, nombre: 'Enero'},
    {valor: 2, nombre: 'Febrero'},
    {valor: 3, nombre: 'Marzo'},
    {valor: 4, nombre: 'Abril'},
    {valor: 5, nombre: 'Mayo'},
    {valor: 6, nombre: 'Junio'},
    {valor: 7, nombre: 'Julio'},
    {valor: 8, nombre: 'Agosto'},
    {valor: 9, nombre: 'Septiembre'},
    {valor: 10, nombre: 'Octubre'},
    {valor: 11, nombre: 'Noviembre'},
    {valor: 12, nombre: 'Diciembre'}
  ];
  anios: number[] = [];
  ngOnInit():void{
    const fechaActual = new Date();
    // mes actual
    this.mesSeleccionado = fechaActual.getMonth() + 1;
    // año actual
    this.anioSeleccionado = fechaActual.getFullYear();
    const anioActual = fechaActual.getFullYear();
    for(let i = anioActual; i >= anioActual - 5; i--){
      this.anios.push(i);
    }
    this.filtrarSesiones();
  }
  filtrarSesiones(): void {
    this.membresiaService
    .listar_sesiones(this.mesSeleccionado, this.anioSeleccionado)
    .subscribe(data => {
      this.membresias = data.data;
      this.totalSesiones = data.totalSesiones;
      this.totalEfectivo = data.totalEfectivo;
      this.totalQr = data.totalQr;     
      this.totalMonto = data.totalMonto;
    });
  }
  getNombreMes(): string {
    const mes = this.meses.find(m => m.valor === this.mesSeleccionado);
    return mes ? mes.nombre : '';
  }

  eliminar(item:Membresia):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.plan,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Sesion Eliminada correctamente.', 'success');
        this.membresiaService.eliminar(item.id).subscribe(data=>{
          this.membresias=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino el registro :)', 'error');
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
        Swal.fire('Removed!', 'Sesion removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Error','Product stil in our database.)', 'error');
      }
    });
  }
  openDialog() {
    let membresia:Membresia
    membresia={
      id:0,
      plan:'',
      p_efectivo:0,
      p_qr:0,
	    fecha_ini:new Date(),
      fecha_fin:new Date(),
      estado:'',
      detalle:'',
      disciplina:'',
      ext_ini:new Date(),
      ext_fin:new Date(),
      detalle_ext:'',
      user_id:0,
      created_at:''
    }
    const dialogRef = this.dialog.open(MembresiaFormComponent,{data:{usuario:membresia,texto:"Crear Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:0,
          plan:result.value.plan,
          p_efectivo:result.value.p_efectivo,
          p_qr:result.value.p_qr,
          fecha_ini:result.value.fecha_ini,
          fecha_fin:result.value.fecha_fin,
          estado:result.value.estado,
          detalle:result.value.detalle,
          disciplina:result.value.disciplina,
          ext_ini:result.value.ext_ini,
          ext_fin:result.value.ext_fin,
          detalle_ext:result.value.detalle,
          user_id:result.value.user_id,
          created_at:result.value.created_at,
        }
        this.membresiaService.agregar(membresia).subscribe(data=>{
          this.membresias=data
          this.toatr.success('Exito','Registro Guardado')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  }

  actualizar(item:Membresia) {
    let membresia:Membresia
    const dialogRef = this.dialog.open(MembresiaFormComponent,{data:{membresia:item,texto:"Editar Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:item.id,
          plan:result.value.plan,
          p_efectivo:result.value.p_efectivo,
          p_qr:result.value.p_qr,
          fecha_ini:result.value.fecha_ini,
          fecha_fin:result.value.fecha_fin,
          estado:result.value.estado,
          detalle:result.value.detalle,
          disciplina:result.value.disciplina,
          ext_ini:result.value.ext_ini,
          ext_fin:result.value.ext_fin,
          detalle_ext:result.value.detalle,
          user_id:result.value.user_id,
          created_at:result.value.created_at,
        }
        this.membresiaService.actualizar(membresia,item.id).subscribe(()=>{
          this.toatr.success('Exito','Registro Actualizado')
          this.filtrarSesiones();
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  }
}