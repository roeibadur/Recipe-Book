import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './Store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    token: string = null;
    private tokenExpirationTimer: any;
    constructor(private store: Store<fromApp.AppState>) {}
    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }
    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}
