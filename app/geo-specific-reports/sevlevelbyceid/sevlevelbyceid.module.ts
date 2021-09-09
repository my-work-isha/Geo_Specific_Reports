import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SevlevelbyceidComponent } from './sevlevelbyceid.component';

const routes: Routes = [
  {path: '', component: SevlevelbyceidComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes)
  ],
  declarations: [SevlevelbyceidComponent]
})

export class SevlevelbyceidModule {
  constructor() {
    console.log("SevlevelbyceidModule is loaded!!!");
  }
}
