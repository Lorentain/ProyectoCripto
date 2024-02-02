import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"criptoweb-53c89","appId":"1:397061805682:web:57076cdbb1bab41d26d4eb","storageBucket":"criptoweb-53c89.appspot.com","apiKey":"AIzaSyAnS8d5avOPkQlvZcdIG9xiTqpDSYLp6D8","authDomain":"criptoweb-53c89.firebaseapp.com","messagingSenderId":"397061805682","measurementId":"G-75ZWD4EGJ8"}))), 
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
