import { Component, OnInit } from '@angular/core';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
//import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {
  membresias:Membresia[]=[]
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
    this.membresiaService.listar_membresias().subscribe(data => {
      this.membresias = data.filter(m => {
        const fecha = new Date(m.created_at);
        const mesRegistro = fecha.getMonth() + 1;
        const anioRegistro = fecha.getFullYear();
      return m.plan === 'sesion' &&
        mesRegistro === this.mesSeleccionado &&
        anioRegistro === this.anioSeleccionado;
      });
    });
  }
  filtrarSesiones(): void {

  this.membresiaService
    .listar_sesiones(this.mesSeleccionado, this.anioSeleccionado)
    .subscribe(data => {

      this.membresias = data;

    });

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
  /* openDialog() {
    let membresia:Membresia
    membresia={
      id:0,
      ci:'',
      nombre:'',
      apellido:'',
      password:'',
      rol:'',
      imagen:'',
      email:'',
      antecedentes:'',
      medicamentos:'',
      tratamientos:''
    }
    const dialogRef = this.dialog.open(UsuarioFormComponent,{data:{usuario:membresia,texto:"Crear Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:0,
          ci:result.value.ci,
          nombre:result.value.nombre,
          apellido:result.value.apellido,
          password:result.value.password,
          rol:'admin',
          imagen:result.value.nombreImagen,
          email:result.value.email,
          antecedentes:result.value.antecedentes,
          medicamentos:result.value.medicamentos,
          tratamientos:result.value.tratamientos
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
    const dialogRef = this.dialog.open(UsuarioFormComponent,{data:{usuario:item,texto:"Editar Membresia"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        membresia={
          id:item.id,
          ci:result.value.ci,
          nombre:result.value.nombre,
          apellido:result.value.apellido,
          password:result.value.password,
          rol:item.rol,
          imagen:result.value.nombreImagen,
          email:result.value.email,
          antecedentes:result.value.antecedentes,
          medicamentos:result.value.medicamentos,
          tratamientos:result.value.tratamientos
        }
        this.membresiaService.actualizar(membresia,item.id).subscribe(data=>{
          this.membresias=data
          this.toatr.success('Exito','Registro Actualizado')
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