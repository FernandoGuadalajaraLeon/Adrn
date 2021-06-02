import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaServices } from '../persona.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  personas: Persona[] = [];

  nombreInput: string;
  apellidoInput: string;

  @Input() indexPeople: number = null;

  constructor(private personaServices: PersonaServices,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    console.log("indexForm: "+this.indexPeople);
    this.personas = this.personaServices.personas;
    if (this.indexPeople != null) {
      let personaEdit = this.personaServices.buscarPersonas(this.indexPeople);
      this.nombreInput = personaEdit.nombre;
      this.apellidoInput = personaEdit.apellido;
    }
  }

  ngDoCheck(){
    this.ngOnInit();
  }

  async guardarPersona() {
    let persona = new Persona(this.nombreInput, this.apellidoInput);
    console.log(persona);

    if (this.indexPeople != null) {
      try {
        this.spinner.show();
        const data = await this.personaServices.modificarPersona(persona, this.indexPeople);
        console.log('ResponseSucces --> ' + data);
        this.spinner.hide();
      } catch (e) {
        console.log('ResponseError --> ' + e);
      }
    } else {
      try {
        this.spinner.show();
        const data = await this.personaServices.agregarPersona(persona);
        console.log('ResponseSucces --> ' + data);
        this.spinner.hide();
      } catch (e) {
        console.log('ResponseError --> ' + e);
      }
    }
    this.router.navigate(['personas']);
  }

  async eliminarPersona() {
    this.spinner.show();
    const data = await this.personaServices.eliminarPersona(this.indexPeople);
    console.log('ResponseSucces --> ' + data);
    this.router.navigate(['personas']);
    this.spinner.hide();
  }

}
