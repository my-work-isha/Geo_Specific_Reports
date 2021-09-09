import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './bpc/welcome-page/welcome-page.component';

// Route configuration
export const routes: Routes = [
  { path: '', redirectTo: "welcome", pathMatch: "full"},
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'report/:type', loadChildren: './bpc/csvexport/csvexport.module#CsvexportModule'} 
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
