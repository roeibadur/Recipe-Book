import { Component , OnInit , OnDestroy , ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../Store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('form', {static: false}) slform: NgForm;
  subcription: Subscription;
  editMode = false;
  edittedItem: Ingredient;
  constructor(
     private store: Store <fromApp.AppState> ) {}
  ngOnInit() {
    this.subcription = this.store.select('shoppingList').subscribe( stateData => {
      if (stateData.edittedIngredientIndex  > -1) {
        this.editMode = true;
        this.edittedItem = stateData.edittedIngredient;
        this.slform.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        });
        } else {
          this.editMode = false;
        }
    });
  }

  OnSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient( value.name , value.amount );
    if (this.editMode) {
      this.store.dispatch( new ShoppingListActions.UpdateIngredients(newIngredient));
    } else {
      this.store.dispatch( new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.slform.reset();
  }
  OnClear() {
    this.editMode = false;
    this.slform.reset();
    this.store.dispatch( new ShoppingListActions.StopEdit());
  }
  OnDelete() {
    this.store.dispatch( new ShoppingListActions.DeleteIngredients());
    this.editMode = false;
    this.slform.reset();
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.store.dispatch( new ShoppingListActions.StopEdit());
  }

}
