import { Component, OnInit } from '@angular/core';
import { CajaService } from '../services/caja.service';
import { Caja } from '../models/caja';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { CajaFormComponent } from './caja-form/caja-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit{
  cajas:Caja[]=[]
  constructor(private cajaService:CajaService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit():void{
    this.cajaService.listar_cajas().subscribe(data =>{
      this.cajas=data
      console.log(data)
    })
  }
  eliminar(item:Caja):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Caja Eliminado correctamente.', 'success');
        this.cajaService.eliminar(item.id).subscribe(data=>{
          this.cajas=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino la caja :)', 'error');
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
        Swal.fire('Removed!', 'Caja removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Error','Caja stil in our database.)', 'error');
      }
    });
  }

  openDialog() {
    let caja:Caja
    caja={
      id:0,
      nombre:'',
      descripcion:'',
      utilidad:0,
      saldo:0
    }
    const dialogRef = this.dialog.open(CajaFormComponent,{data:{caja:caja,texto:"Crear Caja"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        caja={
          id:0,
          nombre:result.value.nombre,
          descripcion:result.value.descripcion,
          utilidad:result.value.utilidad,
          saldo:result.value.saldo
        }
        this.cajaService.agregar(caja).subscribe(data=>{
          this.cajas=data
          this.toatr.success('Exito','Caja Guardado')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  }

  actualizar(item:Caja) {
    let caja:Caja
    const dialogRef = this.dialog.open(CajaFormComponent,{data:{caja:item,texto:"Editar Caja"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        caja={
          id:item.id,
          nombre:result.value.nombre,
          descripcion:result.value.descripcion,
          utilidad:result.value.utilidad,
          saldo:result.value.saldo
        }
        this.cajaService.actualizar(caja,item.id).subscribe(data=>{
          this.cajas=data
          this.toatr.success('Exito','Caja Actualizada')
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