import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './Store/auth.actions';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string =  null;
    private storeSub: Subscription;
    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
       this.storeSub = this.store.select('auth').subscribe( authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            }
          );
    }
    OnSwitchMode() {
        this.isLoginMode = ! this.isLoginMode;
    }
    OnSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        if (this.isLoginMode) {
          this.store.dispatch(new AuthActions.LoginStart({email: email , password: password }));
        } else {
          this.store.dispatch(new AuthActions.SignupStart({email: email , password: password }));
        }
        form.reset();
    }

    OnHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }
    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
