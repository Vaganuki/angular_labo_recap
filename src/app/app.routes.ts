import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './components/shared/homepage/homepage.component';
import { LoginInScreenComponent } from './components/user/login-in-screen/login-in-screen.component';
import { SignInScreenComponent }  from './components/user/sign-in-screen/sign-in-screen.component';
import {DesktopComponent} from './components/shared/desktop/desktop.component';
import {EventCreationComponent} from './components/events/event-creation/event-creation.component';
import {ProfilComponent} from './components/user/profil/profil.component';
import {EditProfileComponent} from './components/user/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/user/change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'main-page',
    component: DesktopComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-event',
        component:EventCreationComponent
      },
      {
        path: 'profil',
        component: ProfilComponent,
        children: [
          {
            path: 'edit-profile',
            component: EditProfileComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          }
        ]
      },
    ]
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
