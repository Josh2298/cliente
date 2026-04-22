import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { MembresiaService } from '../services/membresia.service';
import { Usuario } from '../models/usuario';
import { Membresia } from '../models/membresia';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { UsuarioFormComponent } from '../usuario/usuario-form/usuario-form.component';
import { MembresiaFormComponent } from '../membresia/membresia-form/membresia-form.component';
import { RegistroPagoComponent } from '../registro-pago/registro-pago.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{
  clientes: Usuario[] = [];
  membresias:Membresia[] = [];
  constructor(private usuarioService:UsuarioService,private membresiaService:MembresiaService, public dialog: MatDialog,private toatr:ToastrService){}
  llenar_imagen(nombre:string):string{
    return 'http://localhost:8000/api/usuario/imagen/'+nombre
  }
  ngOnInit(): void {
    this.usuarioService.listarPorRol('cliente').subscribe(data => {
        this.clientes = data;
    });
  }
    eliminar(item:Usuario):void{
      Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: item.apellido+" "+item.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          Swal.fire('Eliminar', 'Usuario Eliminado correctamente.', 'success');
          this.usuarioService.eliminar(item.id).subscribe(data=>{
            this.clientes=data
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
          Swal.fire('Removed!', 'Product removed successfully.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Error','Product stil in our database.)', 'error');
        }
      });
    }
  
    openDialog() {
      let user:Usuario
      user={
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
      const dialogRef = this.dialog.open(UsuarioFormComponent,{data:{usuario:user,texto:"Crear Cliente"}});
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result.value);
        if(result.value!=undefined){
          user={
            id:0,
            ci:result.value.ci,
            nombre:result.value.nombre,
            apellido:result.value.apellido,
            password:result.value.password,
            rol:'cliente',
            imagen:result.value.nombreImagen,
            email:result.value.email,
            antecedentes:result.value.antecedentes,
            medicamentos:result.value.medicamentos,
            tratamientos:result.value.tratamientos
          }
          this.usuarioService.agregar(user).subscribe(data=>{
            this.clientes=data
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
    actualizar(item:Usuario) {
      let user:Usuario
      const dialogRef = this.dialog.open(UsuarioFormComponent,{data:{usuario:item,texto:"Editar Usuario"}});
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result.value);
        if(result.value!=undefined){
          user={
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
          this.usuarioService.actualizar(user,item.id).subscribe(data=>{
            this.clientes=data
            this.toatr.success('Exito','Registro Actualizado')
          },
          error=>{
            this.toatr.error('Error','Operacion Fallida')
          })
        }
        else
          this.toatr.error('Nota','Operacion Cancelada')
      });
    }
    formatDate(date: Date): string {
      return date.toISOString().split('T')[0];
    }

    sumarDias(fecha: Date, dias: number): Date {
      const nueva = new Date(fecha);
      nueva.setDate(nueva.getDate() + dias);
      return nueva;
    }
    openPlan(){
    const hoy = new Date();
    const fechaIni = this.formatDate(hoy);
    const fechaFin = this.formatDate(this.sumarDias(hoy, 29));
    let membresia:Membresia
    membresia={
      id:0,
      plan:'',
      p_efectivo:0,
      p_qr:0,
      fecha_ini: fechaIni,
      fecha_fin: fechaFin,
      estado:'',
      detalle:'',
      disciplina:'',
      ext_ini:'',
      ext_fin:'',
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
          p_efectivo:result.value.monto,
          p_qr:result.value.monto,
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
}
