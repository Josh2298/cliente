import { Component, OnInit } from '@angular/core';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/venta';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import  Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';
import { Usuario } from '../models/usuario';
import { CategoriaService } from '../services/categoria.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{
  categorias:Categoria[]=[]
  productos:Producto[]=[]
  usuarios:Usuario[]=[]
  constructor(
    private categoriaServicio:CategoriaService,
    private usuarioServicio:UsuarioService,
    private toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.categoriaServicio.listar_categorias().subscribe(data=>{
      this.categorias=data
      console.log(this.categorias)
    })
    this.usuarioServicio.listarPorRol('cliente').subscribe(data=>{
      this.usuarios=data
      console.log(this.usuarios)
    })
  }
  listarProductos(id:number):void{
    this.categoriaServicio.productos(id).subscribe(data=>{
      this.productos=data
    })
  }
}