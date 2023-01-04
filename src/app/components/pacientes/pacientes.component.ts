import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment, inventario } from '../../../environments/environment';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  personas: any = [];
  
  informacionPersona: any = {}
  informacionReferencias: any = [];

  formaBusqueda: FormGroup;

  // dataFiltro: FiltroPersonas = {
  //   fechai: '01/01/2022',
  //   fechaf: '',
  //   estatus_seguimiento: 'sin atender',
  //   tipo_persona: 'paciente'
  // };

  // Para manejo de divs de información del paciente
  visible: boolean = true;
  personal: boolean = true;
  direccion: boolean = false;
  referencia: boolean = false;
  inventario: boolean = false;

  preguntas = inventario;

  constructor(private _personas: PersonasService, public fb: FormBuilder) {
    this.inicializarForma();
    this.buscarPersonas();
  }
  
  inicializarForma(){
    var hoy = new Date();
    var diaAyer: String = ((hoy.getDate() - 1) <= 9 )? `0${hoy.getDate() - 1}` : `${hoy.getDate() - 1}`;
    var mes: String = ((hoy.getMonth() + 1) <= 9)? `0${hoy.getMonth() + 1}` : `${hoy.getMonth() + 1}`;
    var anio = hoy.getFullYear();

    this.formaBusqueda = this.fb.group({
      fecha1: [`${anio}-${mes}-${diaAyer}`],
      fecha2: [''],
      tipo_persona: ['paciente'],
      estatus_seguimiento: ['sin atender']
    });
  }

  reiniciarForma(){
    this.formaBusqueda.reset({
      fecha1: '', 
      fecha2: '', 
      tipo_persona: '',
      estatus_seguimiento: ''
    });
  }

  buscarPersonas() {
    // Si la fecha 2 está vacia, se le asigna el valor de hoy
    if(this.formaBusqueda.controls['fecha2'].value.length == 0){
      var hoy = new Date();
      var dia: String = ((hoy.getDate() - 1) <= 9 )? `0${hoy.getDate()}` : `${hoy.getDate()}`;
      var mes: String = ((hoy.getMonth() + 1) <= 9)? `0${hoy.getMonth() + 1}` : `${hoy.getMonth() + 1}`;
      var anio = hoy.getFullYear();
      this.formaBusqueda.controls['fecha2'].setValue(`${anio}-${mes}-${dia}`);
    }    
    // console.log(this.formaBusqueda.value);

    this.cerrarPersona();
    this._personas.getPersonasFiltro(this.formaBusqueda.value).subscribe((results: any) => {
      this.personas = results.personas;
    });

  }

  sumarInventario(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14, val15,) {
    return val1 + val2 + val3 + val4 + val5 + val6 + val7 + val8 + val9 + val10 + val11 + val12 + val13 + val14 + val15;
  }

  ngOnInit(): void {
  }

  abrirPersona(idPersona: Number){
    // Traer al paciente con dirección e inventario
    this._personas.getPersonaDirInv(idPersona).subscribe((results: any)=>{
      // console.log(results);
      if(results.persona){
        this.informacionPersona = results.persona;
      } else {
        // Mostrar que no se encontró a la persona
        this.informacionPersona = {};
      }
    });

    // Traer a la persona (referencia) relacionada al paciente
    this._personas.getPersonaRelPaciente(idPersona).subscribe((results: any)=>{
      // console.log(results);
      if(results.persona){
        this.informacionReferencias = results.persona;
      } else {
        this.informacionReferencias = [];
      }
    });

    this.mostrarInfo(true, true, false, false, false);
  }

  cerrarPersona(){
    this.informacionPersona = {};
    this.informacionReferencias = [];
    this.mostrarInfo(true, true, false, false, false);
  }

  mostrarInfo(visible: boolean, personal: boolean, direccion: boolean, inventario: boolean, referencia: boolean) {
    this.visible = visible;
    this.personal = personal;
    this.direccion = direccion;
    this.referencia = referencia;
    this.inventario = inventario;
  }
}
