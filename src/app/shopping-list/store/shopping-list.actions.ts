import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add_ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add_ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update_ingredients';
export const DELETE_INGREDIENT = ' [Shopping List] Delete_ingredient';
export const START_EDIT = '[Shopping List] Start_edit';
export const STOP_EDIT = '[Shopping List] Stop_edit';

export class AddIngredient implements Action {
   readonly type = ADD_INGREDIENT;
   constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
   readonly type = ADD_INGREDIENTS;
   constructor( public payload: Ingredient[] ) {}
}
export class UpdateIngredients implements Action {
   readonly type = UPDATE_INGREDIENT;
   constructor( public payload: Ingredient ) {}
}
export class DeleteIngredients implements Action {
   readonly type = DELETE_INGREDIENT;
}
export class StartEdit implements Action {
   readonly type = START_EDIT;
   constructor(public payload: number) {}
}
export class StopEdit implements Action {
   readonly type = STOP_EDIT;
}
export type ShoppingListActions =
AddIngredient |
AddIngredients |
UpdateIngredients |
DeleteIngredients |
StartEdit |
StopEdit;
