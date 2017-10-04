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
  MatSliderModule,
  MatExpansionModule
} from '@angular/material';

const COMPONENTS = [
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatExpansionModule
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
