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
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { TranslateModule } from '@ngx-translate/core';
import { UpgradeModalComponent } from './upgrade-modal/upgrade.modal';
import { AbilityBtnComponent } from './ability-btn/ability-btn.component';
import { TimerComponent } from './timer/timer.component';
import { TeamInfoComponent } from './team-info/team-info.component';

export const CustomTooltipOptions: TooltipOptions = {
  placement: 'bottom',
  'show-delay': 0,
  'hide-delay': 0
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    TooltipModule.forRoot(CustomTooltipOptions as TooltipOptions)
  ],
  declarations: [
    ProgressSpinnerComponent,
    OverlayPanelComponent,
    IconComponent,
    TeamInfoComponent,
    HeroInfoComponent,
    ResourceBarComponent,
    UpgradeModalComponent,
    AbilityBtnComponent,
    TimerComponent
  ],
  exports: [
    ProgressSpinnerComponent,
    IconComponent,
    TeamInfoComponent,
    HeroInfoComponent,
    MaterialModule,
    ResourceBarComponent,
    UpgradeModalComponent,
    AbilityBtnComponent,
    TimerComponent
  ]
})
export class WidgetsModule {}
