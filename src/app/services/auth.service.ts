import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable /*,FirebaseAuthState*/ } from 'angularfire2';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/first';
// import 'rxjs/add/operator/map';

// import { BaseService } from 'app/services/base.service';
// import { User } from 'app/models/user.model';

@Injectable()
export class AuthService {
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });

    this.users = this.af.database.list('users');
  }


  loginWithEmail(email, password) {
    return this.af.auth.login({
      email: email,
      password: password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  logout() {
    return this.af.auth.logout();
  }

  addUserInfo() {
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  registerUser(email, password) {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email
    });
  }

  // createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState> {
  //   return this.auth.createUser(user)
  //     .catch(this.handlePromiseError);
  // }

  // loginWithEmail(user: {email: string, password: string}): firebase.Promise<boolean> {
  //   return this.auth.login(user)
  //     .then((authState: FirebaseAuthState) => {
  //         return authState != null;
  //     }).catch(this.handlePromiseError);
  // }

  // logout(): Promise<void> {
  //   return this.auth.logout();
  // }

  // get authenticated(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.auth
  //       .first()
  //       .subscribe((authState: FirebaseAuthState) => {
  //         (authState) ? resolve(true) : reject(false);
  //       });
  //   });
  // }

}
