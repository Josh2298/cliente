import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PromocionComponent } from './promocion/promocion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { VentaComponent } from './venta/venta.component';


const routes: Routes = [
  // Layout público (SIN navbar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

  // Layout privado (CON navbar)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'promocion', component: PromocionComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'venta', component: VentaComponent }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
