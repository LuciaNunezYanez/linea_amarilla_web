import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formaLogin: FormGroup;

  constructor(public fb: FormBuilder, private _login: LoginService, private router: Router) {
    this.inicializarForma();
  }

  ngOnInit(): void {
  }

  inicializarForma() {
    this.formaLogin = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      tipo: ['internoc5']
    });
  }

  reiniciarForma() {
    this.formaLogin.reset({
      usuario: '',
      contrasena: '',
      tipo: 'internoc5'
    });
  }

  comenzar() {
    if (this.formaLogin.invalid) {
      Swal.fire({
        text: 'Campos incompletos',
        icon: 'error',
        showConfirmButton: false
      });
    } else {
      this._login.login(this.formaLogin.value).subscribe((res: any) => {
        // console.log(res);
        if (res.persona?.id_persona != undefined) {
          // Guardar preferencias
          this._login.guardarSesion(res.persona.id_persona,
            res.persona.nombre_persona,
            res.persona.tipo_persona, 
            res.persona.permiso_consulta, 
            res.persona.permiso_admin);
          this.router.navigate(['/inicio']);
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Verifique sus credenciales',
            showConfirmButton: false
          });
        }
      });
    }

  }
}
