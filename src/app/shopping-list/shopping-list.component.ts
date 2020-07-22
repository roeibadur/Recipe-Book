import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable <{ ingredients: Ingredient [] }>;
   constructor(
    private store: Store<fromApp.AppState> ) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }
  OnEditItem(index: number) {
    this.store.dispatch( new ShoppingListActions.StartEdit(index));
  }
}
