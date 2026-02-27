import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { PruebaComponent } from './prueba/prueba.component';
import { Prueba2Component } from './prueba2/prueba2.component';
import { Prueba3Component } from './prueba3/prueba3.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { ImagenRotaDirective } from './imagen-rota.directive';
import { ProductoComponent } from './producto/producto.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CajaComponent } from './caja/caja.component';
import { CajaLogComponent } from './caja-log/caja-log.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HistorialCorporalComponent } from './historial-corporal/historial-corporal.component';
import { ItemComponent } from './item/item.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { PromocionComponent } from './promocion/promocion.component';
import { VentaComponent } from './venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    Prueba2Component,
    Prueba3Component,
    UsuarioComponent,
    ClienteComponent,
    UsuarioFormComponent,
    ImagenRotaDirective,
    ProductoComponent,
    AsistenciaComponent,
    CajaComponent,
    CajaLogComponent,
    CategoriaComponent,
    HistorialCorporalComponent,
    ItemComponent,
    MembresiaComponent,
    PromocionComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
