import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelComponent } from './progress-spinner/overlay-panel.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../material.module';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ProgressSpinnerComponent,
    OverlayPanelComponent,
    IconComponent
  ],
  exports: [
    ProgressSpinnerComponent,
    IconComponent,
    MaterialModule
  ],
  entryComponents: [
    OverlayPanelComponent
  ]
})
export class WidgetsModule { }
