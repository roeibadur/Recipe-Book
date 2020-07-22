import { Actions, ofType, Effect} from '@ngrx/effects';
import { switchMap , catchError, map , tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../user.model';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
const hadleAuthentication = (expiresIn: number , email: string , userId: string , token: string) => {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email , userId , token , expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return  new AuthActions.AuthenticateSuccess({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
      redirect: true
    });
};

const hadleError = (errorRes: any) => {
    let errorMessage = 'An unknow error occurred!';
    if ( (!(errorRes.error.error)) || (!(errorRes.error)) ) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exist already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not  exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'the password is not correct';
        break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
};
@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
             + environment.fireBaseAPIKey,
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
            ).pipe(
                tap(resData => {
                    this.Authservice.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return hadleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                        );
                }), catchError(errorRes => {
                    return hadleError(errorRes);
                })
            );
          }
    ));

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                + environment.fireBaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true

            }
                ).pipe(map(resData => {
                     return hadleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken);
                }),
                catchError(errorRes => {
                        return hadleError(errorRes);
                    })
                );
        }),

    );
    @Effect({dispatch: false})
        authRedirect = this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
             if (authSuccessAction.payload.redirect) {
                    this.router.navigate(['/']);
             }
        })
    );

    @Effect()
    autologin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(
          () => {
            const userData: {
              email: string,
              id: string,
              _token: string,
              _tokenExpiredDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
              return { type: 'DUMMY'};
            }
            const loaderuser = new UserModel(
              userData.email,
              userData.id,
              userData._token,
              new Date(userData._tokenExpiredDate));
            if (loaderuser.token) {
              const expirationDuration = new Date(userData._tokenExpiredDate).getTime() -
              new Date().getTime();
              this.Authservice.setLogoutTimer(expirationDuration);
              return new AuthActions.AuthenticateSuccess({
                email: loaderuser.email,
                userId: loaderuser.id,
                token: loaderuser.token,
                expirationDate : new Date(userData._tokenExpiredDate),
                redirect: false
              });
            }
            return { type: 'DUMMY'};
          }
        )
      );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT), tap(() => {
            this.Authservice.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private Authservice: AuthService) {}
}
