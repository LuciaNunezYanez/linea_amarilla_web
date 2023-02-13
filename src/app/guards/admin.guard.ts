import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private auth: LoginService, private router: Router) {

  }

  canActivate(): boolean {
    if(this.auth.leerAdmin() == 1){
      return true;
    } else {
      Swal.fire({
        text: 'No cuenta con los permisos para acceder a este modulo',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#D43A2F'
      });
      return false;
    }
  }
  
}
