import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
  subcription: Subscription;
   recipes: Recipe[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.subcription = this.store.select('recipes').pipe( map(recipesState =>
      recipesState.recipes)).subscribe(
      (recipes: Recipe [] ) => {
        this.recipes = recipes;
      }
    );
  }
  OnNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route} );
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
