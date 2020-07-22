import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeStartComponent } from './recipes-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { recipeResolverService } from './recipes-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{path: '', component: RecipesComponent , canActivate: [AuthGuard] , children: [
 {path: '' , component: RecipeStartComponent},
 {path: 'new' , component: RecipeEditComponent},
 {path: ':id' , component: RecipeDetailsComponent , resolve: [recipeResolverService]},
 {path: ':id/edit' , component: RecipeEditComponent , resolve: [recipeResolverService]}
]}];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class RecipesRountingModule {}
