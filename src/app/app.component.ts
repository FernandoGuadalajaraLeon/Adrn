import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Listado de personas';

  constructor() { }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDI14zG7z2XQx7xQdjiBRbV6KFNcsAOL_E",
      authDomain: "listado-personas-36021.firebaseapp.com"
    })
  }

}
