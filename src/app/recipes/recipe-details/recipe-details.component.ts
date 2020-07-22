import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute , Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map , switchMap } from 'rxjs/operators';
import * as fromApp from '../../Store/app.reducer';
import * as RecipesActions from '../Store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState> ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }) , switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipeState => {
        return recipeState.recipes.find((recipe , index) => {
          return index === this.id;
        }
      );
    })
    )
    .subscribe( recipe => {
      this.recipe = recipe;
      }
    );
  }

  addToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
  OnEditRecipe() {
    this.router.navigate( ['edit'] , { relativeTo: this.route } );
  }
  OnDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate( ['../'] );
  }
}
