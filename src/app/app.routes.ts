
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
import {EventUserComponent} from './components/events/event-user/event-user.component';
import {EventPropertyComponent} from './components/events/event-property/event-property.component';
import {AllEventsComponent} from './components/events/all-events/all-events.component';

export const routes: Routes = [
  {
    path: '',
    component: DesktopComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'events',
        component:AllEventsComponent,
        children: [
          {
            path: 'property/:id',
            component: EventPropertyComponent,
          }
        ]
      },
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
          },
        ]
      },
      {
        path: 'event-user',
        component: EventUserComponent,
        children: [
          {
            path: 'property/:id',
            component: EventPropertyComponent,
          },
        ]
      },
    ]
  },
  {
    path: 'welcome',
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
];
