import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { Categoria } from 'src/app/models/categoria';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  categorias: Categoria[] = [];
  categoriaFiltro = new FormControl('');
  categoriasFiltradas: Categoria[] = [];
  productoForm!: FormGroup;
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<ProductoFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private productoServicio:ProductoService, private fb: FormBuilder,
  private categoriaService: CategoriaService){
    this.texto=data.texto
    console.log(data)
    this.nombre?.setValue(data.producto.nombre)
    this.precio_compra?.setValue(data.producto.precio_compra)
    this.precio_venta?.setValue(data.producto.precio_venta)
    this.cantidad_min?.setValue(data.producto.cantidad_min)
    this.stock?.setValue(data.producto.stock)
    if(data.producto.imagen!="")
      this.previsualizacion='http://localhost:8000/api/producto/imagen/'+data.producto.imagen
    if(data.texto=="Editar Producto"){
      this.imagen?.clearValidators()
      this.categoria_id?.clearValidators()
    }
  }
  ngOnInit(): void {
      this.categoriaService.listar_categorias().subscribe(data=>{
      this.categorias = data
      this.categoriasFiltradas = data
      console.log(this.categorias)
    })
    
      this.categoriaFiltro.valueChanges.subscribe(valor => {
        if(!valor){
          this.categoriasFiltradas = this.categorias
          return
        }
      this.categoriasFiltradas = this.categorias.filter(c =>
      c.tipo.toLowerCase().includes(valor.toLowerCase())
      )
    })
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nombre: new FormControl('',[Validators.required]),
    precio_compra: new FormControl('',[Validators.required]),
    precio_venta: new FormControl('',[Validators.required]),
    cantidad_min: new FormControl('',[Validators.required]),
    stock: new FormControl('',[Validators.required]),
    categoria_id: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required]),
    nombreImagen: new FormControl('',[])
  })
  get nombre(){return this.agregar.get('nombre')}
  get precio_venta(){return this.agregar.get('precio_venta')}
  get precio_compra(){return this.agregar.get('precio_compra')}
  get cantidad_min(){return this.agregar.get('cantidad_min')}
  get stock(){return this.agregar.get('stock')}
  get categoria_id(){return this.agregar.get('categoria_id')}
  get imagen(){return this.agregar.get('imagen')}
  get nombreImagen(){return this.agregar.get('nombreImagen')}
    
  error_nombre():string{
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_precio_venta():string{
    if(this.precio_venta?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_precio_compra():string{
    if(this.precio_compra?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_cantidad_min():string{
    if(this.cantidad_min?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_stock():string{
    if(this.stock?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_imagen():string{
    if(this.imagen?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  cargarImagen(event:any):void{
    console.log(event.target.files)
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.nombreImagen?.setValue(this.name)
    this.previsualizar(file)
    this.productoServicio.subirImagen(file,this.name).subscribe(data=>{
      console.log(data)
    })
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
    //console.log(this.previsualizacion)
  };
}