import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './components/shared/homepage/homepage.component';
import { LoginInScreenComponent } from './components/user/login-in-screen/login-in-screen.component';
import { SignInScreenComponent }  from './components/user/sign-in-screen/sign-in-screen.component';
import {DesktopComponent} from './components/shared/desktop/desktop.component';

export const routes: Routes = [
  {
    path: 'main-page',
    component: DesktopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginInScreenComponent,
  },
  {
    path: 'register',
    component: SignInScreenComponent,
  },
  {
    path: '**',
    redirectTo: 'homepage'
  },
];
