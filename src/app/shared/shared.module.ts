import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from './dropDown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropDownDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    DropDownDirective
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
