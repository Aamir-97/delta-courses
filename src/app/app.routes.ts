import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component.js';
import { CoursesComponent } from './pages/courses/courses.component.js';
import { ProfileComponent } from './pages/profile/profile.component.js';
import { CourseDetailsComponent } from './pages/course-details/course-details.component.js';
import { LoginComponent } from './pages/login/login.component.js';
import { authGuard } from './global/guards/auth.guard.js';
import { UserRegisterComponent } from './pages/user-register/user-register.component.js';
import { AdminPageComponent } from './pages/admin-page/admin-page.component.js';
import { DashboardComponent } from './pages/dashboard/dashboard.component.js';
import { adminGuard } from './global/guards/admin.guard.js';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
    title: 'Register',
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    title: 'Admin',
    canActivate: [adminGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
    ],
  },
  {
    path: 'home',
    component: HomePageComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    title: 'Home',
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
        title: 'Courses',
      },
      {
        path: 'courses/details',
        component: CourseDetailsComponent,
        title: 'Courses',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Courses',
      },
    ],
  },
  {
    path: '**',
    async loadComponent() {
      const m = await import('./pages/page-not-found/page-not-found.component');
      return m.PageNotFoundComponent;
    },
    title: 'Page Not Found',
  },
];
