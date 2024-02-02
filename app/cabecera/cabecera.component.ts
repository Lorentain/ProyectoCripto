import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from '@angular/fire/auth';
import { FirestoreService } from '../firestore.service';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  constructor(private router:Router, public firestore:FirestoreService) {}

  usuarioActivo:any = "";
  email:string = "";
  pass:string = "";
  isActivo:boolean = false;
  mensajeInicioSesion: string = "";
  verCartera:boolean = false;


  loginGithub() {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken;
    
        // The signed-in user info.
        const user = result.user;
        this.isActivo = true;
        this.usuarioActivo = user;
        this.mensajeInicioSesion = "Iniciaste sesión con éxito";
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  loginGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        this.isActivo = true;
        this.usuarioActivo = user;
        this.mensajeInicioSesion = "Iniciaste sesión con éxito";
        console.log("Login Google exitoso");

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Login Google erroneo",errorCode,errorMessage);
        // ...
    });
  }

    registrarUsuario() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.pass)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            this.mensajeInicioSesion = "Te registrate con éxito";
            this.email = "";
            this.pass = "";
            console.log("Registrado exitoso",user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error",errorCode,errorMessage);
            // ..
          });
    }

    loginUsuario() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.pass)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            this.isActivo = true;
            this.usuarioActivo = user;
            this.mensajeInicioSesion = "Iniciaste sesión con éxito";
            this.email = "";
            this.pass = "";
            console.log("Login exitoso",user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error",errorCode,errorMessage);
          });
    }

    cerrarSesion() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Cerrar sesión exitosa");
        this.isActivo = false;
        this.usuarioActivo = "";
        this.mensajeInicioSesion = "";
        this.email = "";
        this.pass = "";
      }).catch((error) => {
        console.log("Cerrar sesión fallida");
        // An error happened.
      });
      this.router.navigate(['cuerpo']);
  }

  cerrarModal() {
    this.mensajeInicioSesion = "";
  }

}