import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  formaBusqueda: FormGroup;
  formaUsuario: FormGroup;

  usuarios = [];
  selectUsuario = false;

  btnRegistrar = false;
  btnEditar = true;

  constructor(public fb: FormBuilder, private _personas: PersonasService) {

    this.inicializarFormaBusqueda();
    this.inicializarFormaUsuario();
  }

  ngOnInit(): void {
  }

  inicializarFormaBusqueda() {
    this.formaBusqueda = this.fb.group({
      nombre: [''],
      paterno: [''],
      materno: [''],
      usuario: [''],
      tipo: ['']
    });
  }

  reiniciarFormaBusqueda() {
    this.formaBusqueda.reset({
      nombre: '',
      paterno: '',
      materno: '',
      usuario: '',
      tipo: ''
    });
  }


  inicializarFormaUsuario() {
    this.formaUsuario = this.fb.group({
      id_persona: [0],
      fecha_hora_registro_persona: [''],
      estatus_persona: [0],
      tipo_persona: ['', Validators.required],
      nombre_persona: ['', Validators.required],
      ap_paterno_persona: ['', Validators.required],
      ap_materno_persona: [''],
      genero_persona: [''],
      telefono_persona: [''],
      correo_persona: [''],
      usuario_persona: ['', Validators.required],
      contrasena_persona: ['', Validators.required],
      permiso_admin: [0],
      permiso_consulta: [0]

    });
  }

  reiniciarFormaUsuario() {
    this.formaUsuario.reset({
      id_persona: 0,
      fecha_hora_registro_persona: '',
      estatus_persona: 1,
      tipo_persona: '',
      nombre_persona: '',
      ap_paterno_persona: '',
      ap_materno_persona: '',
      genero_persona: '',
      telefono_persona: '',
      correo_persona: '',
      usuario_persona: '',
      contrasena_persona: '',
      permiso_admin: 0,
      permiso_consulta: 0
    });
  }

  buscarUsuarios() {
    this.selectUsuario = false;
    this.usuarios = []
    this.reiniciarFormaUsuario();

    this._personas.getUsuariosBusqueda(this.formaBusqueda.value).subscribe((res: any) => {
      this.usuarios = res.usuarios;
      if (this.usuarios.length == 0) {
        Swal.fire({
          text: 'No se encontró coincidencia de búsqueda',
          icon: 'info',
          confirmButtonColor: '#D43A2F'
        });
      }
    });
  }

  limpiarFiltros() {
    this.reiniciarFormaBusqueda();
    this.reiniciarFormaUsuario();
    this.usuarios = [];
    this.selectUsuario = false;
  }

  abrirUsuario(posicion: number) {

    this.selectUsuario = true;
    this.btnRegistrar = false;
    this.btnEditar = true;

    // Asignar valor a la forma
    let usuario = this.usuarios[posicion]
    this.formaUsuario.patchValue({
      id_persona: usuario.id_persona,
      fecha_hora_registro_persona: usuario.fecha_hora_registro_persona,
      estatus_persona: usuario.estatus_persona,
      tipo_persona: usuario.tipo_persona,
      nombre_persona: usuario.nombre_persona,
      ap_paterno_persona: usuario.ap_paterno_persona,
      ap_materno_persona: usuario.ap_materno_persona,
      genero_persona: usuario.genero_persona,
      telefono_persona: usuario.telefono_persona,
      correo_persona: usuario.correo_persona,
      usuario_persona: usuario.usuario_persona,
      contrasena_persona: usuario.contrasena_persona,
      permiso_admin: usuario.permiso_admin,
      permiso_consulta: usuario.permiso_consulta
    });
  }

  guardarCambios() {

    // Comprobar si es válido el formulario
    if(!this.formaUsuario.valid){
      Swal.fire({
        text: 'Información incompleta',
        icon: 'error',
        confirmButtonColor: '#D43A2F'
      });
      return;
    } 

    if (this.formaUsuario.get('id_persona').value > 0) {
      this._personas.editarPersonaID(this.formaUsuario.value, this.formaUsuario.get('id_persona').value).subscribe((res: any) => {
        console.log(res);
        if (res.ok) {
          if (res.results.affectedRows != 0) {
            Swal.fire({
              text: 'Se actualizó la información correctamente',
              icon: 'success',
              confirmButtonColor: '#198754'
            });
          } else {
            Swal.fire({
              text: res.mensaje ?? 'Ocurrió un error al modificar el usuario',
              icon: 'error',
              confirmButtonColor: '#D43A2F'
            });
          }
        } else {
          Swal.fire({
            text: res.mensaje ?? 'Ocurrió un error al modificar el usuario',
            icon: 'error',
            confirmButtonColor: '#D43A2F'
          });
        }

      });
    } else {
      Swal.fire({
        text: 'No existe un usuario que modificar',
        icon: 'error',
        confirmButtonColor: '#D43A2F'
      });
    }

  }

  agregarNuevoUsuario() {
    
  
    this.reiniciarFormaUsuario();
    this.selectUsuario = true;
    this.btnRegistrar = true;
    this.btnEditar = false;

    var fecha = new Date();

    this.formaUsuario.patchValue({
      fecha_hora_registro_persona: fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear(),
      estatus_persona: '1',
      tipo_persona: 'internoc5',
      // nombre_persona: usuario.nombre_persona,
      // ap_paterno_persona: usuario.ap_paterno_persona,
      // ap_materno_persona: usuario.ap_materno_persona,
      // genero_persona: usuario.genero_persona,
      // telefono_persona: usuario.telefono_persona,
      // correo_persona: usuario.correo_persona,
      // usuario_persona: usuario.usuario_persona,
      // contrasena_persona: usuario.contrasena_persona,
      permiso_admin: 0,
      permiso_consulta: 1
    });
  }

  registrarNuevoUsuario() {
    if (this.formaUsuario.get('id_persona').value != 0) {
      Swal.fire({
        text: 'No se puede agregar un usuario existente',
        icon: 'info',
        confirmButtonColor: '#007ACC'
      });
      return;
    }

    // Comprobar si es válido el formulario
    if(!this.formaUsuario.valid){
      Swal.fire({
        text: 'Información incompleta',
        icon: 'error',
        confirmButtonColor: '#D43A2F'
      });
      return;
    }    

    this.selectUsuario = true;
    this.btnRegistrar = false;
    this.btnEditar = true;
    // console.log(this.formaUsuario.value);
    this._personas.addUsuario(this.formaUsuario.value).subscribe((res: any) => {
      Swal.fire({
        text: res.mensaje,
        icon: (res.ok)? 'success': 'error',
        confirmButtonColor: (res.ok)? '#198754' : 'D43A2F'
      });

      if(res.ok){
        this.btnRegistrar = false;
        this.btnEditar = false;
      }
    })
  }

  cerrarUsuario() {
    this.reiniciarFormaUsuario();
    this.selectUsuario = false;
  }

}
