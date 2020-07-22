import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as RecipesActions from '../recipes/Store/recipe.actions';
import { take , map, switchMap } from 'rxjs/operators';
import { Actions , ofType} from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable({providedIn: 'root' })
export class recipeResolverService implements Resolve <Recipe[]> {
  constructor(
    private store: Store <fromApp.AppState>,
    private actions$: Actions) {}
  resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe( take(1) ,
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch( new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
          ofType(RecipesActions.SET_RECIPE),
          take(1) );
        } else {
            return of(recipes);
          }
      })
    );
 }

}
