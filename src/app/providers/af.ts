
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";

@Injectable()
export class AF {
    public messages: FirebaseListObservable<any>;
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

        this.messages = this.af.database.list('messages');
        this.users = this.af.database.list('users');
    }
    /**
     * Logs in the user
     * @returns {firebase.Promise<FirebaseAuthState>}
     */
    loginWithGoogle() {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }
    /**
     * Logs out the current user
     */
    logout() {
        return this.af.auth.logout();
    }

    addUserInfo(){
        this.users.push({
            email: this.email,
            displayName: this.displayName
        });
    }

    sendMessage(text) {
        var message = {
            message: text,
            displayName: this.displayName,
            email: this.email,
            timestamp: Date.now()
        };
        if(message.message){
            this.messages.push(message);
        }
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
}



