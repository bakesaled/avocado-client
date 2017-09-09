import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

const materialModules = [
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdSidenavModule,
  MdInputModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules
  ]
})
export class SharedModule { }
