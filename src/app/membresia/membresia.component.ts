import { Component, OnInit } from '@angular/core';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
//import { MembresiaFormComponent } from './membresia-form/membresia-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent {
  membresias:Membresia[]=[]
  constructor(private membresiaService:MembresiaService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit():void{
    this.membresiaService.listar_membresias().subscribe(data =>{
      this.membresias=data
      console.log(data)
    })
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
        Swal.fire('Eliminar', 'Membresia Eliminado correctamente.', 'success');
        this.membresiaService.eliminar(item.id).subscribe(data=>{
          this.membresias=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino la membresia :)', 'error');
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
        Swal.fire('Removed!', 'Membresia removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Error','Membresia stil in our database.)', 'error');
      }
    });
  }

  /* openDialog() {
    let membresia:Membresia
    membresia={
      id:0,
      plan:'',
      monto:0,
      fecha_ini:new Date(),
      fecha_fin:new Date(),
      estado:'',
      detalle:'',
      disciplina:'',
      ext_ini:new Date(),
      ext_fin:new Date(),
      detalle_ext:'',
      user_id:0
    }
    const dialogRef = this.dialog.open(MembresiaFormComponent,{data:{membresia:membresia,texto:"Crear Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:0,
          plan:result.value.plan,
          monto:result.value.monto,
          fecha_ini:result.value.fecha_ini,
          fecha_fin:result.value.fecha_fin,
          estado:result.value.estado,
          detalle:result.value.detalle,
          disciplina:result.value.disciplina,
          ext_ini:result.value.ext_ini,
          ext_fin:result.value.ext_fin,
          detalle_ext:result.value.detalle,
          user_id:result.value.user_id,
        }
        this.membresiaService.agregar(membresia).subscribe(data=>{
          this.membresias=data
          this.toatr.success('Exito','Membresia Guardado')
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
    const dialogRef = this.dialog.open(MmebresiaFormComponent,{data:{membresia:item,texto:"Editar Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:item.id,
          plan:result.value.plan,
          monto:result.value.monto,
          fecha_ini:result.value.fecha_ini,
          fecha_fin:result.value.fecha_fin,
          estado:result.value.estado,
          detalle:result.value.detalle,
          disciplina:result.value.disciplina,
          ext_ini:result.value.ext_ini,
          ext_fin:result.value.ext_fin,
          detalle_ext:result.value.detalle,
          user_id:result.value.user_id,
        }
        this.membresiaService.actualizar(membresia,item.id).subscribe(data=>{
          this.membresias=data
          this.toatr.success('Exito','Membresia Actualizada')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  } */
}