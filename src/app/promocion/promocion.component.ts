import { Component, OnInit } from '@angular/core';
import { PromocionService } from '../services/promocion.service';
import { Promocion } from '../models/promocion';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { PromocionFormComponent } from './promocion-form/promocion-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent {
  promociones:Promocion[]=[]
  constructor(private promocionService:PromocionService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit():void{
    this.promocionService.listar_promociones().subscribe(data =>{
      this.promociones=data
      console.log(data)
    })
  }
  eliminar(item:Promocion):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Promocion Eliminado correctamente.', 'success');
        this.promocionService.eliminar(item.id).subscribe(data=>{
          this.promociones=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino la promocion :)', 'error');
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
        Swal.fire('Removed!', 'Promocion removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Error','Promocion stil in our database.)', 'error');
      }
    });
  }

  openDialog() {
    let promocion:Promocion
    promocion={
      id:0,
      nombre:'',
      p1persona:0,
      p2persona:0,
      p3persona:0,
      medio_mes:0,
      trimestral:0,
      semestral:0,
      zumba:0,
      medio_z:0
    }
    const dialogRef = this.dialog.open(PromocionFormComponent,{data:{promocion:promocion,texto:"Crear Promocion"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        promocion={
          id:0,
          nombre:result.value.nombre,
          p1persona:result.value.p1persona,
          p2persona:result.value.p2persona,
          p3persona:result.value.p3persona,
          medio_mes:result.value.medio_mes,
          trimestral:result.value.trimestral,
          semestral:result.value.semestral,
          zumba:result.value.zumba,
          medio_z:result.value.medio_z
        }
        this.promocionService.agregar(promocion).subscribe(data=>{
          this.promociones=data
          this.toatr.success('Exito','Promocion Guardado')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  }

  actualizar(item:Promocion) {
    let promocion:Promocion
    const dialogRef = this.dialog.open(PromocionFormComponent,{data:{promocion:item,texto:"Editar Promocion"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        promocion={
          id:item.id,
          nombre:result.value.nombre,
          p1persona:result.value.p1persona,
          p2persona:result.value.p2persona,
          p3persona:result.value.p3persona,
          medio_mes:result.value.medio_mes,
          trimestral:result.value.trimestral,
          semestral:result.value.semestral,
          zumba:result.value.zumba,
          medio_z:result.value.medio_z
        }
        this.promocionService.actualizar(promocion,item.id).subscribe(data=>{
          this.promociones=data
          this.toatr.success('Exito','Promocion Actualizado')
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