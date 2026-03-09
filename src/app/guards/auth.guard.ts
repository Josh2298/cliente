import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return false;
    }
    const rol = localStorage.getItem('rol');
    const rolesPermitidos = route.data['roles'];

    if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}