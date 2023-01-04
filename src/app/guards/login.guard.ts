import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private auth: LoginService, private router: Router) {

  }

  canActivate(): boolean {
    if(this.auth.leerID()!=undefined){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
