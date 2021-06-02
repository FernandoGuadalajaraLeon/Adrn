import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { Router } from '@angular/router';
import { PersonaServices } from './persona.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = this.services.personas;
  nombreInput: string;
  apellidoInput: string;
  index = null;

  constructor(private router: Router,
    private services: PersonaServices,
    private spinner: NgxSpinnerService) {
      this.index = services.getIndexPerson();
     }
  

  ngOnInit(): void {

    this.index=this.services.getIndexPerson();

    this.services.obtenerPersonas()
      .subscribe(
        (personas: Persona[]) => {
          //Cargamos los datos de la base de datos al arreglo de personas local 
          this.personas = personas;
          this.services.setPersonas(this.personas);
        }
      ),
      error => console.log('Error al intentar obtener la lista de personas: ' + error);

    this.spinner.show();

    setTimeout(() => 
      this.spinner.hide(), 1000);

  }

  ngDoCheck(){
    this.index=this.services.getIndexPerson();
  }

  public agregar() {
    this.services.setIndexPerson(-1);
    this.nombreInput = '';
    this.apellidoInput = '';
    //this.router.navigate(['personas/agregar']);
  }

  llenarForm(indexP){
    this.services.setIndexPerson(indexP);
    if (indexP != null) {
      let personaEdit = this.services.buscarPersonas(indexP);
      this.nombreInput = personaEdit.nombre;
      this.apellidoInput = personaEdit.apellido;
    }
  }

  async guardarPersona() {
    let persona = new Persona(this.nombreInput, this.apellidoInput);
    console.log(persona);

    //if (this.index != null) {
    if (this.index >= 0) {
      try {
        this.spinner.show();
        const data = await this.services.modificarPersona(persona, this.index);
        console.log('ResponseSucces --> ' + data);
        this.spinner.hide();
      } catch (e) {
        console.log('ResponseError --> ' + e);
      }
    } else {
      try {
        this.spinner.show();
        const data = await this.services.agregarPersona(persona);
        console.log('ResponseSucces --> ' + data);
        this.spinner.hide();
      } catch (e) {
        console.log('ResponseError --> ' + e);
      }
    }
    this.services.setIndexPerson(null);
    this.router.navigate(['personas']);
  }

  async eliminarPersona() {
    this.spinner.show();
    const data = await this.services.eliminarPersona(this.index);
    console.log('ResponseSucces --> ' + data);
    this.router.navigate(['personas']);
    this.spinner.hide();
  }

}
