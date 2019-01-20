import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

export const AppRoutes: Routes = [
  {
    path : '',
    component : LoginPageComponent
  },
  {
    path : 'login',
    component : LoginPageComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : '**',
    redirectTo : '/home'
  },
  {
    path : 'register',
    component : RegisterPageComponent
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
