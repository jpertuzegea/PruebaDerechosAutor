import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
 

// Guardianes como funciones https://www.youtube.com/watch?v=3aJ8f_hKBPQ&ab_channel=nicobytes
export const AuthenticationGuard: CanActivateFn = () => {

  // Inyeccion de dependencias
  const authenticationsService = inject(AuthenticationService);

  return authenticationsService.IsLoged();
}
