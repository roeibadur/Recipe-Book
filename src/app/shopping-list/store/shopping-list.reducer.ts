import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}
export interface State {
    ingredients: Ingredient [];
    edittedIngredient: Ingredient;
    edittedIngredientIndex: number;
}
const initState: State = {
    ingredients:
    [
        new Ingredient('Apples', 5),
        new Ingredient('Tomamatos', 10)
    ],
    edittedIngredient: null,
    edittedIngredientIndex: -1
};
export function ShoppingListReducer(state: State = initState , action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ ...state.ingredients , action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: [ ...state.ingredients , ...action.payload ]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.edittedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.edittedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                edittedIngredientIndex: -1 ,
                edittedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ig , igindex) => {
                    return igindex !== state.edittedIngredientIndex;
                }),
                edittedIngredientIndex: -1 ,
                edittedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                edittedIngredientIndex: action.payload,
                edittedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
              ...state,
              edittedIngredient: null,
              edittedIngredientIndex: -1
            };
        default:
            return state;
    }
}
