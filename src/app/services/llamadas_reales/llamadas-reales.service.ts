import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LlamadasRealesService {

  url = environment.url;

  constructor(private _http: HttpClient) { }

  getLlamadasReales(data: any, subcentro: String){
    return this._http.post(`${this.url}/api/llamada/promad/${subcentro}/busqueda`, data);
  }

  copiarLlamadaReal(llamada){
    return this._http.post(`${this.url}/api/llamadareal/add`, llamada);
  }
}
