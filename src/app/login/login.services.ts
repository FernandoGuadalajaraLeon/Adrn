import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Injectable()
export class LoginServices {

    token: string;

    constructor(private router: Router) {
    }

    getIdToken() {
        return this.token;
    }

    logIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userData => resolve(userData.user.getIdToken()),
                    error => reject(error));
        });
    }

    singIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userData => resolve(userData),
                    error => reject(error));
        });
    }

    singOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

}