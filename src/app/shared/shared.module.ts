import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { DndModule, DragDropService } from 'ng2-dnd';

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
    materialModules,
    DndModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules,
    DndModule
  ],
})
export class SharedModule { }
