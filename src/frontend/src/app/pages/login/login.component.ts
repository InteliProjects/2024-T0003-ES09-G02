
import { Component } from '@angular/core';
import { ComponentsModuleModule } from '../../components/components-module/components-module.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { UserActivityService } from '../../services/UserActivityService';
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyA_4mz5sWAYSu7-vdgRrvqa_KETUJkf1rM",
  authDomain: "trackio-auth.firebaseapp.com",
  projectId: "trackio-auth",
  storageBucket: "trackio-auth.appspot.com",
  messagingSenderId: "992589739151",
  appId: "1:992589739151:web:998b57f542333a9e73ecfa",
  measurementId: "G-LB5R1TZKW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true, 
  imports:[ComponentsModuleModule, CommonModule, FormsModule]
})
export class LoginComponent {
  constructor(private router: Router, private userActivityService: UserActivityService) {
  }

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Login realizado com sucesso:', user);

      user.getIdToken().then((token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/pesquisas']);
      });
      this.userActivityService.addUser();

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/invalid-credential') {
        this.errorMessage = 'Credenciais inválidas.';
        throw new Error('Credenciais inválidas.');
      } else if (errorCode == 'auth/invalid-email') {
        this.errorMessage = 'Email invalido.';
        throw new Error('Email invalido.');
      } else {
        this.errorMessage = errorMessage;
        throw error;
      }
    });
  }

  loginGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('Login realizado com sucesso:', user);
      user.getIdToken().then((token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/pesquisas']);
    });

    }).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // console.error('Erro no Login com google:', errorMessage);
      this.errorMessage = 'Erro ao fazer login com o Google.';
      throw new Error('Erro ao fazer login com o Google.');
    });
  }
}
