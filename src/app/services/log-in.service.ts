import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BaseService } from '../providers/base.service';
import { LogIn } from '../Models/log-in.model';
import { TokenResponse } from '../Models/token.model';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {

    constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
        super();
    }
    login(loginModel: LogIn): Observable<any> {
        const params = new HttpParams()
            .set('grant_type', "password")
            .set('username', loginModel.Email)
            .set('password', loginModel.Password);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        this.triggerLoading(true);
        return this.http.post<TokenResponse>("token", params, httpOptions)
            .pipe(map(token => {
                sessionStorage.setItem('userToken', JSON.stringify(token));
                return token;
            }
            ),
                catchError(this.handleError),
                finalize(() => this.triggerLoading(false))
            );
    }


    SignIn(email, password): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    GoogleAuth(): Promise<any> {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
