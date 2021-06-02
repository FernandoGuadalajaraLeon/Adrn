import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/persona.model';
import { PersonaServices } from '../persona.services';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @Input() persona : Persona;
  @Input() index : number;

  nombrePersona : string = 'Fernando';
  apellidoPersona : string = 'Guadalajara';

  constructor(private services: PersonaServices) { }

  ngOnInit() {
  }

  editPerson(indexP:number){
    this.services.setIndexPerson(indexP);
  }

}
