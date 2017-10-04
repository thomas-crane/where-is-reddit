import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSliderModule
} from '@angular/material';

const COMPONENTS = [
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSliderModule
];

@NgModule({
  imports: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class MaterialImportsModule { }
