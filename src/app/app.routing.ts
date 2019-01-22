import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
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

@NgModule({
  imports : [
    CommonModule,
    RouterModule.forRoot(routes, { useHash : true, onSameUrlNavigation : 'reload' })
  ],
  exports : [
    RouterModule
  ]
})

export class AppRouting {

}
