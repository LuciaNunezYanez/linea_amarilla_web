import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LlamadasRealesService } from '../../services/llamadas_reales/llamadas-reales.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-llamadas-reales',
  templateUrl: './llamadas-reales.component.html',
  styleUrls: ['./llamadas-reales.component.css']
})
export class LlamadasRealesComponent implements OnInit {
  // Para el filtro de búsqueda
  formaBusqueda: FormGroup;
  hoy: Date;
  diaAyer: String;
  mes: String;
  anio: number;

  llamadas: Llamada[] = [];
  llamada: Llamada;
  llamada_visible: boolean = false;


  municipiosDurango = [
    { id: 1, municipio: "Canatlán" },
    { id: 5, municipio: "Durango" },
    { id: 8, municipio: "Guadalupe Victoria" },
    { id: 20, municipio: "Pánuco de Coronado" },
    { id: 21, municipio: "Peñón Blanco" },
    { id: 28, municipio: "San Juan del Río" }
  ];
  municipiosSalto = [
    { id: 14, municipio: "Mezquital" },
    { id: 16, municipio: "Nombre de Dios" },
    { id: 22, municipio: "Poanas" },
    { id: 23, municipio: "Pueblo Nuevo" },
    { id: 33, municipio: "Súchil" },
    { id: 38, municipio: "Vicente Guerrero" }
  ];
  municipiosSantiago = [
    { id: 2, municipio: "Canelas" },
    { id: 3, municipio: "Coneto de Comonfort" },
    { id: 9, municipio: "Guanaceví" },
    { id: 11, municipio: "Indé" },
    { id: 17, municipio: "Ocampo" },
    { id: 18, municipio: "El Oro" },
    { id: 19, municipio: "Otáez" },
    { id: 24, municipio: "Rodeo" },
    { id: 25, municipio: "San Bernardo" },
    { id: 26, municipio: "San Dimas" },
    { id: 32, municipio: "Santiago Papasquiaro" },
    { id: 34, municipio: "Tamazula" },
    { id: 35, municipio: "Tepehuanes" },
    { id: 37, municipio: "Topia" },
    { id: 39, municipio: "Nuevo Ideal" }
  ];
  municipiosGomez = [
    { id: 4, municipio: "Cuencamé" },
    { id: 6, municipio: "General Simón Bolívar" },
    { id: 7, municipio: "Gómez Palacio" },
    { id: 10, municipio: "Hidalgo" },
    { id: 12, municipio: "Lerdo" },
    { id: 13, municipio: "Mapimí" },
    { id: 15, municipio: "Nazas" },
    { id: 27, municipio: "San Juan de Guadalupe" },
    { id: 29, municipio: "San Luis del Cordero" },
    { id: 30, municipio: "San Pedro del Gallo" },
    { id: 31, municipio: "Santa Clara" },
    { id: 36, municipio: "Tlahualilo" }
  ];

  constructor(private _llamadasReales: LlamadasRealesService, public fb: FormBuilder) {

    this.tomarFechaHoy();
    this.inicializarForma();

  }

  ngOnInit(): void {
  }

  inicializarForma() {
    this.formaBusqueda = this.fb.group({
      fecha1: [`${this.anio}-${this.mes}-${this.diaAyer}`],
      fecha2: [''],
      motivo: ['TODOS'],
      corporacion: ['CR DGO'],
      denunciante: [''],
      telefono: [''],
      calle: [''],
      numero: [''],
      colonia: [''],
      centro: ['durango'],
      municipio: ['0'],
      descripcion: ['']
    });
  }

  reiniciarForma() {
    this.formaBusqueda.reset({
      fecha1: `${this.anio}-${this.mes}-${this.diaAyer}`,
      fecha2: '',
      motivo: 'TODOS',
      corporacion: 'CR DGO',
      denunciante: '',
      telefono: '',
      calle: '',
      numero: '',
      colonia: '',
      centro: 'durango',
      municipio: '0',
      descripcion: ''
    });
  }

  tomarFechaHoy() {
    this.hoy = new Date();
    this.diaAyer = ((this.hoy.getDate() - 1) <= 9) ? `0${this.hoy.getDate() - 1}` : `${this.hoy.getDate() - 1}`;
    this.mes = ((this.hoy.getMonth() + 1) <= 9) ? `0${this.hoy.getMonth() + 1}` : `${this.hoy.getMonth() + 1}`;
    this.anio = this.hoy.getFullYear();
  }


  consultar() {
    this.llamada_visible = false;
    this.llamadas = [];
    this.llamada = {};
    // Si la fecha 2 está vacia, se le asigna el valor de hoy
    if (this.formaBusqueda.controls['fecha2'].value.length == 0) {
      var dia: String = ((this.hoy.getDate()) <= 9) ? `0${this.hoy.getDate()}` : `${this.hoy.getDate()}`;
      this.formaBusqueda.controls['fecha2'].setValue(`${this.anio}-${this.mes}-${dia}`);
    }

    Swal.fire({
      title: 'Buscando..',
      text: 'Por favor espere',
      icon: 'info',
      showCloseButton: false,
      showConfirmButton: false
    });

    // DEPENDE EL CENTRO ES LA CORPORACIÓN QUE SE BUSCA
    if(this.formaBusqueda.get('centro').value == 'durango'){
      this.formaBusqueda.get('corporacion').setValue('CR DGO');
    }
    if(this.formaBusqueda.get('centro').value != 'durango'){
      this.formaBusqueda.get('corporacion').setValue('');
    }

    console.log(this.formaBusqueda.value);

    this._llamadasReales.getLlamadasReales(this.formaBusqueda.value, this.formaBusqueda.get('centro').value).subscribe((res: any) => {

      console.log(res);

      if (res.ok) {
        Swal.close();
        this.llamadas = res.llamadas;
        if(this.llamadas.length == 0){
          Swal.fire({
            text: 'No se encontraron coincidencias de búsqueda',
            icon: 'info',
            showConfirmButton: true,
            confirmButtonColor: '#A5DC86'
          });
        }
      } else {
        Swal.close();
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error en el servidor',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    });
  }

  selectLlamada(posicion: number) {
    this.llamada = this.llamadas[posicion];
    this.llamada_visible = true;
  }

  limpiar() {
    this.llamada_visible = false;
    this.llamadas = [];
    this.llamada = {};
    this.reiniciarForma();
  }

  descargarBusqueda() {
    // Genera un excel con la información que arrojó la búsqueda de llamadas
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.llamadas);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // Obtener la fecha de hoy
    let dia = ((this.hoy.getDate()) <= 9) ? `0${this.hoy.getDate()}` : `${this.hoy.getDate()}`;
    let mes = ((this.hoy.getMonth() + 1) <= 9) ? `0${this.hoy.getMonth() + 1}` : `${this.hoy.getMonth() + 1}`;
    let anio = this.hoy.getFullYear();
    XLSX.writeFile(book, `consulta_linea_amarilla_${dia}${mes}${anio}.xlsx`);

  }

  copiarLlamada() {
    console.log('COPIAR LLAMADA');
    this._llamadasReales.copiarLlamadaReal(this.llamada).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        title: (res.ok)? null: 'Error',
        text: res.mensaje,
        icon: (res.ok)? 'success': 'error',
        confirmButtonColor: '#A5DC86'
      });
    });
  }

  descargarLlamada(){
    // Genera un excel con la información de la llamada abierta
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.llamada]);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // Obtener la fecha de hoy
    let dia = ((this.hoy.getDate()) <= 9) ? `0${this.hoy.getDate()}` : `${this.hoy.getDate()}`;
    let mes = ((this.hoy.getMonth() + 1) <= 9) ? `0${this.hoy.getMonth() + 1}` : `${this.hoy.getMonth() + 1}`;
    let anio = this.hoy.getFullYear();
    XLSX.writeFile(book, `llamada_${dia}${mes}${anio}.xlsx`);
  }  

  cambioCentro(){
    this.formaBusqueda.get('municipio').setValue('0');
  }

}



interface Llamada {
  FECHA_HORA_INICIO_LLAMADA?: String;
  FECHA_LLAMADA?: String;
  HORA_LLAMADA?: String;
  NUMERO_TELEFONO?: String;
  MOTIVO_TELEFONISTA?: String;
  ES_ALTO_IMPACTO?: String;
  ID_MUNICIPIO?: number;
  MUNICIPIO?: String;
  REFERENCIAS?: String;
  COLONIA?: String;
  CALLE?: String;
  ENTRE_CALLE?: String;
  NUMERO?: String;
  COORDENADA_X?: String;
  COORDENADA_Y?: String;
  DESCRIPCION_DE_LA_LLAMADA?: String;
  NOMBRE_CORPORACION?: String;
  FOLIO_LLAMADA?: String;
  PRIORIDAD?: String;
  NOMBRE_TIPO_RAZONAMIENTO?: String;
  OBSERVACION_RAZONAMIENTO?: null,
  RAZON_NO_ATENCION?: String;
  MOTIVO_RADIO_OPERADOR?: String;
  NOMBRE_DENUNCIANTE?: String;
  CALLE_DENUNCIANTE?: String;
  NUMERO_DENUNCIANTE?: String;
  COLONIA_DENUNCIANTE?: String;
  TELEFONO_DENUNCIANTE?: String;
  MUNICIPIO_DENUNCIANTE?: String;
  CANTIDAD_DETENIDOS?: number;
  CANTIDAD_LESIONADOS?: number;
  CANTIDAD_MUERTOS?: number;
} 