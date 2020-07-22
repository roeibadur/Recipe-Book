import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
export interface State {
  recipes: Recipe [];
}
const initialstate: State = {
    recipes: []
};
export function recipeReducer(state = initialstate , action: RecipeActions.RecipesActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPE:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes , action.payload ]
      };
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
       recipes: updatedRecipes
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
