import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  url = environment.url;

  constructor(private _http: HttpClient) { }

  getPersonasFiltro(data: any){
    // console.log('.---------');
    // console.log(data);
    return this._http.post(`${this.url}/api/persona/busqueda/filtro`, data);
  }

  getPersonaDirInv(id_persona: Number){
    return this._http.get(`${this.url}/api/persona/id/${id_persona}`);
  }

  getReferencia(id_paciente: Number){
    return this._http.get(`${this.url}/api/persona/id/${id_paciente}`);
  }

  getPersonaRelPaciente(id_paciente: Number){
    // Obtener las personas relacionadas a un paciente
    return this._http.get(`${this.url}/api/persona/fkpaciente/${id_paciente}`);
  }

}


// TODO: 
/*
Mostrar todos los usuarios pacientes registrados con su puntaje
y al dar click mostrar todo el formulario que llenaron 
Agregar botón de dar seguimiento y cambiar estatus a 1 



*/


