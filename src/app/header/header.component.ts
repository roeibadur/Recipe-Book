import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as AuthActions from '../auth/Store/auth.actions';
import * as RecipeActions from '../recipes/Store/recipe.actions';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    subuser: Subscription;
    isAuthenticated = false;
    constructor( private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subuser = this.store.select('auth').pipe( map ( authState => authState.user))
        .subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    OnSave() {

       this.store.dispatch( new RecipeActions.StoreRecipe());
    }
    OnFetch() {

        this.store.dispatch( new RecipeActions.FetchRecipes());
    }
    OnLogout() {

        this.store.dispatch(new AuthActions.Logout());
    }
    ngOnDestroy() {

        this.subuser.unsubscribe();
    }
 }
