import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Obtener el token del localStorage (o cookies si lo guardaste allí)
    const token = this.getCookie("auth_token");

    if (!token) {
      // Si no hay token, redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }

    // Decodificar el token (si no tienes una librería de decodificación, usa atob)
    const decodedToken = this.decodeToken(token);

    // Obtener el rol requerido para la ruta actual
    const requiredRole = route.data['role']; // Por ejemplo, 'Administrador' o 'Cliente'

    // Comprobar si el rol en el token coincide con el rol requerido
    if (decodedToken.role === requiredRole) {
      return true;  // El usuario tiene el rol adecuado, puede acceder a la ruta
    } else {
      this.router.navigate(['/404']);  // Si no tiene el rol, redirigir a una página de acceso no autorizado
      return false;
    }
  }
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  // Función para decodificar el JWT
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }
}