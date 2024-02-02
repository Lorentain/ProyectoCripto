/*
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario:any;
  email:string = "";
  pass:string = "";
  isActivo:boolean = false;
  usuarioActivo:any = getAuth().currentUser;
  mensajeInicioSesion: string = "";

  constructor(private router:Router) { }

  
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
        onAuthStateChanged(auth, (user) => {
          this.usuario = user;
        });

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

    registrarUsuario(email:any,pass:any) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
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

    loginUsuario(email:any,pass:any) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
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
*/

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, onSnapshot } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import {  onAuthStateChanged } from '@angular/fire/auth';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario:any;
  constructor(private http: HttpClient, private router:Router, private firestore: Firestore) { }


  iniciaSesison() {
    console.log("hola")
    const auth = getAuth();  
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        onAuthStateChanged(auth, (user) => {
          this.usuario = user;
        });
        console.log("Login Google exitoso")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode,errorMessage)
        // ...
      });
  }
  cerrarSesion(){
    const auth = getAuth();
    signOut(auth).then(() => {
      
    }).catch((error) => {
      
    });
  }
  usuarioActual() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.usuario = user;
    });
  }

  monedasGuardaar(id:any){
    const auth = getAuth();
    const uid = this.usuario?.uid;
    if (uid) {
      console.log("hola")
      addDoc(collection(this.firestore, 'monedas'), {
        id:id,
        uid:uid
      })
      .then(() => {console.log('Moneda guardada');})
      .catch((error) => {console.error('Error al guardar la moneda:', error);});
    }else{
      console.error('Error: No se pudo obtener el UID del usuario.');
    }
  }

  eliminarMoneda(uid: string, idMoneda: string) {
    const firestore = getFirestore();
    const colRef = collection(firestore, 'monedas');
  
    const q = query(colRef, where('uid', '==', uid), where('idMoneda', '==', idMoneda));
  
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Obtener la referencia al documento y eliminarlo
          const docRef = doc.ref;
          deleteDoc(docRef)
            .then(() => {
              console.log('Moneda eliminada exitosamente');
            })
            .catch((error) => {
              console.error('Error al eliminar la moneda:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al realizar la consulta:', error);
      });
  }
}