import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
//import { UsuarioFormComponent } from './categoria-form/categoria-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
  categorias:Categoria[]=[]
  constructor(private categoriaService:CategoriaService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit():void{
    this.categoriaService.listar_categorias().subscribe(data=>{
      this.categorias=data
      console.log(data)
    })
  }
  eliminar(item:Categoria):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.tipo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Categoria Eliminada correctamente.', 'success');
        this.categoriaService.eliminar(item.id).subscribe(data=>{
          this.categorias=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino la categoria :)', 'error');
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

  /* openDialog() {
    let categoria:Categoria
    categoria={
      id:0,
      tipo:''
    }
    const dialogRef = this.dialog.open(CategoriaFormComponent,{data:{categoria:categoria,texto:"Crear Categoria"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        categoria={
          id:0,
          tipo:result.value.tipo
        }
        this.categoriaService.agregar(categoria).subscribe(data=>{
          this.categorias=data
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

  actualizar(item:Categoria) {
    let categoria:Categoria
    const dialogRef = this.dialog.open(CategoriaFormComponent,{data:{categoria:item,texto:"Editar Categoria"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        categoria={
          id:item.id,
          tipo:result.value.tipo
        }
        this.categoriaService.actualizar(categoria,item.id).subscribe(data=>{
          this.categorias=data
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