import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ConfigurationViewComponent } from './configuration-view.component';

const routes: Routes = [
  {path: '', component: ConfigurationViewComponent}
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
    ConfigurationViewComponent
  ]
})

export class ConfigurationViewModule {
  constructor() {
    console.log("ConfigurationViewModule is loaded!!!")
  }
}
