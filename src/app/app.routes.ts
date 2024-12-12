import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './global/guards/auth.guard';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from './global/guards/admin.guard';

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
