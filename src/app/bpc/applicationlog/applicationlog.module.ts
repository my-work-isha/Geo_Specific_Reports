import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ApplicationlogComponent } from './applicationlog.component';

const routes: Routes = [
  {path: '', component: ApplicationlogComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ApplicationlogComponent
  ]
})

export class ApplicationlogModule {
  constructor() {
    console.log("ApplicationlogModule is loaded!!!")
  }
}
