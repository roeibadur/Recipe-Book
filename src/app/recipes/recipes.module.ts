import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { RecipesRountingModule } from './recipes-rounting.module';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent} from './recipes-start/recipe-start.component';
import { RecipeEditComponent} from './recipe-edit/recipe-edit.component';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [ RouterModule , SharedModule , ReactiveFormsModule , RecipesRountingModule, RecipesRountingModule]

})
export class RecipesModule {}
