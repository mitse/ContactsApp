import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatComponentsModule } from './mat-components.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports: [
    ConfirmationDialogComponent,
    MatComponentsModule,
    LoaderComponent
  ]
})
export class SharedModule { }
