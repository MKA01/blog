import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginPageComponent } from './components/login/login-page.component';
import { HomeComponent } from './components/home/home.component';

export const AppRoutes: Routes = [
  { path : '', component : LoginPageComponent },
  { path : 'home', component : HomeComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
