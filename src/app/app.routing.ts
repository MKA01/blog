import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AppContainerComponent } from './components/app-container/app-container.component';

export const AppRoutes: Routes = [
  {
    path : 'login',
    component : LoginPageComponent
  },
  {
    path : '',
    component : LoginPageComponent
  },
  {
    path : 'register',
    component : RegisterPageComponent
  },
  {
    path : 'app',
    component : AppContainerComponent,
    canActivate : [ AuthGuardService ],
    canActivateChild : [ AuthGuardService ],
    children : [
      {
        path : 'home',
        component : HomeComponent
      }
    ]
  },
  {
    path : '**',
    redirectTo : 'app/home'
  },
  {
    path : '#',
    redirectTo : 'app/home',
    pathMatch : 'full'
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { useHash : true, onSameUrlNavigation : 'reload' });
