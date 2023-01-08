import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class MaterialModule {}
