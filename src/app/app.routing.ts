import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AppComponent } from './app.component';

export const AppRoutes: Routes = [
  {
    path : 'app',
    component : AppComponent,
    children : [
      {
        path : 'login',
        component : LoginPageComponent
      },
      {
        path : 'home',
        component : HomeComponent
      },
      {
        path : 'register',
        component : RegisterPageComponent
      }
    ]
  },
  {
    path : '**',
    redirectTo : '/home'
  },
  {
    path : '',
    redirectTo : 'app/home',
    pathMatch : 'full'
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { useHash : true, onSameUrlNavigation : 'reload' });
