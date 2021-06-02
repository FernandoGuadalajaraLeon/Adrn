import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from './persona.model';

@Injectable()
export class DataServices {

    url: string = 'https://listado-personas-36021.firebaseio.com/';
    personas: Persona[] = [];

    constructor(private httpClient: HttpClient) {

    }

    //obtenerPersonas(): Observable<Persona[]> {
    obtenerPersonas() {
        //return this.httpClient.get<Persona[]>(this.url + 'personas.json');
        return this.httpClient.get(this.url + 'personas.json');
    }

    guardarPersona(personas): Promise<Response> {
        console.log('Entrada al servicio HTTP');
        return this.httpClient.put<Response>(this.url + 'personas.json', personas).toPromise();
    }

    modificarPersona(persona:Persona, index:number) {
        console.log('Entrada al servicio HTTP: '+index);
        return this.httpClient.put<Response>(this.url + 'personas/'+index+'.json', persona).toPromise();
    }

    eliminarPersona(index:number) {
        console.log('Entrada al servicio HTTP: '+index);
        return this.httpClient.delete<Response>(this.url + 'personas/'+index+'.json').toPromise();
    }

}