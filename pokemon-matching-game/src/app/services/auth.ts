import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, authState, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$ = authState(this.auth);

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(this.auth, provider);
      await this.saveUserData(credential.user);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  }

  private async saveUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date()
    }, { merge: true });
  }

  async logout() {
    await this.auth.signOut();
  }

  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map(doc => doc.data());
  }
}