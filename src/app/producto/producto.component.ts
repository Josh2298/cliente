import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
  productos:Producto[]=[]
  constructor(private productoService:ProductoService,public dialog: MatDialog,private toatr:ToastrService){}
  llenar_imagen(nombre:string):string{
    return 'http://localhost:8000/api/producto/imagen/'+nombre
  }
  ngOnInit():void{
    this.productoService.listar_productos().subscribe(data =>{
      this.productos=data
      console.log(data)
    })
  }
  eliminar(item:Producto):void{
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminar', 'Producto Eliminado correctamente.', 'success');
        this.productoService.eliminar(item.id).subscribe(data=>{
          this.productos=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','No se elimino el producto :)', 'error');
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
    let producto:Producto
    producto={
      id:0,
      nombre:'',
      imagen:'',
      precio_compra:0,
      precio_venta:0,
      cantidad_min:0,
      stock:0,
      categoria_id:0
    }
    const dialogRef = this.dialog.open(ProductoFormComponent,{data:{producto:producto,texto:"Crear Producto"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        producto={
          id:0,
          nombre:result.value.nombre,
          imagen:result.value.nombreImagen,
          precio_compra:result.value.precio_compra,
          precio_venta:result.value.precio_venta,
          cantidad_min:result.value.cantidad_min,
          stock:result.value.stock,
          categoria_id:result.value.categoria_id
        }
        this.productoService.agregar(producto).subscribe(data=>{
          this.productos=data
          this.toatr.success('Exito','Producto Guardado')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
        })
      }
      else
        this.toatr.error('Nota','Operacion Cancelada')
    });
  }

  actualizar(item:Producto) {
    let producto:Producto
    const dialogRef = this.dialog.open(ProductoFormComponent,{data:{producto:item,texto:"Editar Producto"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      if(result.value!=undefined){
        producto={
          id:item.id,
          nombre:result.value.nombre,
          imagen:result.value.nombreImagen,
          precio_compra:result.value.precio_compra,
          precio_venta:result.value.precio_venta,
          cantidad_min:result.value.cantidad_min,
          stock:result.value.stock,
          categoria_id:result.value.categoria_id
        }
        this.productoService.actualizar(producto,item.id).subscribe(data=>{
          this.productos=data
          this.toatr.success('Exito','Producto Actualizado')
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
