import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';

export interface User {
  uid?: string;
  email?: string;
  display_name?: string;
  image_url?: string;
  roles: any;
}
@Injectable({
  providedIn: 'platform',
})
export class AuthService {
  readonly currentUser$: Observable<any>;
  // readonly currentUser$:Observable<any >
  constructor(
    private _afAuth: AngularFireAuth,
    private _afStore: AngularFirestore,
    private _router: Router
  ) {
    this.currentUser$ = this._afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._afStore.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async signInWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    //
    const credential = await this._afAuth.signInWithPopup(provider);
    //
    const userRef: AngularFirestoreDocument<User> = this._afStore.doc(
      `users/${credential.user?.uid}/`
    );
    //
    const userData: User = {
      uid: credential.user?.uid,
      display_name: credential.user?.displayName || undefined,
      email: credential.user?.email || undefined,
      image_url: credential.user?.photoURL || undefined,
      roles: { member: true },
    };
    //
    await this._router.navigate(['/members']);
    return userRef.set(userData, { merge: true });
  }

  public async signOut() {
    await this._afAuth.signOut();
    await this._router.navigate(['/home']);
  }
}
