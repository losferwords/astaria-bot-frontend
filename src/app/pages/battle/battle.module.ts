import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { BattlePageComponent } from './battle.page';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsModule,
    MaterialModule,
    NgxAutoScrollModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: BattlePageComponent
      }
    ])
  ],
  declarations: [BattlePageComponent],
  exports: []
})
export class BattlePageModule { }
