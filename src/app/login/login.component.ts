import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServices } from './login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;

  constructor(private loginServices:LoginServices,
              private router: Router) { }

  ngOnInit() {
  }

  getIdToken() {
    return this.token;
}

  login(form:NgForm): void{
    const user = form.value.user;
    const password = form.value.password;
    this.loginServices.logIn(user, password)
    .then((response:string) => {
      this.token = response;
      this.router.navigate(['personas']);
    }).catch(error => console.log('Error: '+error.message));
  }
}
