import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  // El constructor recibe una instancia del Router para redirigir a las rutas necesarias
  constructor(private router: Router) {}

  /**
   * Método que verifica si el usuario tiene acceso a la ruta solicitada.
   * 
   * @param route La ruta activada solicitada que contiene la información sobre la ruta.
   * @param state El estado del router, que incluye información sobre la URL solicitada.
   * 
   * @returns Un observable, promesa o valor booleano que indica si la ruta se puede activar.
   */
  canActivate(
    route: ActivatedRouteSnapshot, // Contiene información sobre la ruta activa solicitada
    state: RouterStateSnapshot // Contiene información sobre el estado actual del router
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Obtener el token de autenticación desde las cookies
    const token = this.getCookie("auth_token");

    // Si no se encuentra un token, redirige al usuario a la página de login
    if (!token) {
      this.router.navigate(['/login']); // Redirige a la ruta de login si no hay token
      return false; // Bloquea la ruta si no hay token
    }

    // Decodificar el token JWT para obtener la información del usuario
    const decodedToken = this.decodeToken(token);

    // Obtener el rol requerido para la ruta actual desde los datos de la ruta
    const requiredRole = route.data['role']; // Se espera que el rol esté en los datos de la ruta

    // Verificar si el rol del token coincide con el rol requerido para la ruta
    if (decodedToken.role === requiredRole) {
      return true; // El rol coincide, permite el acceso a la ruta
    } else {
      // Si el rol no coincide, redirige a la página de acceso no autorizado
      this.router.navigate(['/404']); // Redirige a una página de error o acceso denegado
      return false; // Bloquea la ruta si el rol no coincide
    }
  }

  /**
   * Método auxiliar para obtener el valor de una cookie por su nombre.
   * 
   * @param name El nombre de la cookie que deseas obtener.
   * @returns El valor de la cookie o null si no se encuentra.
   */
  getCookie(name: string): string | null {
    // Obtener el valor de la cookie utilizando el nombre
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    // Si la cookie existe, devuelve el valor
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    
    // Si la cookie no se encuentra, retorna null
    return null;
  }

  /**
   * Método auxiliar para decodificar el token JWT.
   * 
   * @param token El token JWT que deseas decodificar.
   * @returns El contenido decodificado del token como un objeto JSON.
   */
  decodeToken(token: string): any {
    // Obtener la parte del payload del token (la segunda parte)
    const payload = token.split('.')[1];
    
    // Decodificar el payload en base64
    const decoded = atob(payload);
    
    // Convertir el payload decodificado a un objeto JSON y retornarlo
    return JSON.parse(decoded);
  }
}