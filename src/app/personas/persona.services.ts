import { Persona } from '../persona.model';
import { DataServices } from '../data-services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PersonaServices {

    personas: Persona[] = [];
    private indexPersona: number = null;

    constructor(private dataServices: DataServices){
    }

    getIndexPerson(){
        return this.indexPersona;
    }

    setIndexPerson(index:number){
        this.indexPersona = index;
    }

    setPersonas(personas){
        this.personas = personas;
    }

    agregarPersona(persona) {
        (this.personas == null) ? this.personas = []:this;
        this.personas.push(persona);
        return this.dataServices.guardarPersona(this.personas);
    }

    modificarPersona(persona: Persona , index:number) {
        let persona1 = this.personas[index];
        persona1.nombre = persona.nombre;
        persona1.apellido = persona.apellido;
        return this.dataServices.modificarPersona(persona, index);
    }

    eliminarPersona(index) {
        //this.personas.splice(index,1);
        this.dataServices.eliminarPersona(index);
        /*if(this.personas != null){
            this.dataServices.guardarPersona(this.personas);
        }*/
    }

    obtenerPersonas(){
        return this.dataServices.obtenerPersonas();
    }

    buscarPersonas(index) {
        let persona = this.personas[index];
        return persona;
    }

}