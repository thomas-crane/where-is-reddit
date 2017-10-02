import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdCardModule
} from '@angular/material';

const COMPONENTS = [
  MdToolbarModule,
  MdCardModule
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
