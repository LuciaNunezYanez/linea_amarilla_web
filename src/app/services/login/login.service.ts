import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.url;

  constructor(private _http: HttpClient) { }

  // LOGIN 
  // LOGIN 
  // LOGIN 
  // LOGIN 

  login(data: any){
    return this._http.post(`${this.url}/api/persona/login/usuario`, data );
  }

  cerrarSesion() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo');
    localStorage.removeItem('c');
    localStorage.removeItem('a');
  }

  guardarSesion(id_usuario, usuario, tipo,consulta, admin){
    localStorage.setItem('id', id_usuario);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('tipo', tipo);
    localStorage.setItem('c', consulta);
    localStorage.setItem('a', admin);
  }

  leerID(){
    return localStorage.getItem('id');
  }

  leerUsuario(){
    return localStorage.getItem('usuario');
  }

  leerTipo(){
    return localStorage.getItem('tipo');
  }

  leerConsulta(){
    return Number.parseInt(localStorage.getItem('c'));
  }

  leerAdmin(){
    return Number.parseInt(localStorage.getItem('a'));
  }
}
