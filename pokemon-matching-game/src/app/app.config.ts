import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDqUJ9FlEvwrpUb_JH2kIQuUj-YeqTUUPw',
        authDomain: 'parker-pokemon-game.firebaseapp.com',
        projectId: 'parker-pokemon-game',
        storageBucket: 'parker-pokemon-game.firebasestorage.app',
        messagingSenderId: '505978986209',
        appId: '1:505978986209:web:2996c55780e5707d7ae1a0',
        measurementId: 'G-LTN9FR8D7K',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
