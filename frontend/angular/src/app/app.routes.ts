import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotificationsListComponent } from './shared/components/bell/notifications-list/notifications-list.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'payments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: NotificationsListComponent
  },
  { 
    path: '404', 
    component: ErrorComponent 
  },
  { 
    path: '**', 
    redirectTo: '404' 
  },
];