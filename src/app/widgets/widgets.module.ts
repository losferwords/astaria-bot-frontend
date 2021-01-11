import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelComponent } from './progress-spinner/overlay-panel.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../material.module';
import { IconComponent } from './icon/icon.component';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { ResourceBarComponent } from './resource-bar/resource-bar.component';

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
    IconComponent,
    HeroInfoComponent,
    ResourceBarComponent
  ],
  exports: [
    ProgressSpinnerComponent,
    IconComponent,
    HeroInfoComponent,
    MaterialModule,
    ResourceBarComponent
  ],
  entryComponents: [
    OverlayPanelComponent
  ]
})
export class WidgetsModule { }
