import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._login.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
