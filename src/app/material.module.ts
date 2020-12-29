import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule
  ],
  entryComponents: []
})
export class MaterialModule { }
