import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { TeamSetupPageComponent } from './team-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsModule,
    MaterialModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: TeamSetupPageComponent
      }
    ])
  ],
  declarations: [TeamSetupPageComponent],
  exports: []
})
export class TeamSetupPageModule {}
