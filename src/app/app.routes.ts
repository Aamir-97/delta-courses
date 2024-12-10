import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home',
    children: [
        {
            path: 'courses',
            component: CoursesComponent,
            title: 'Courses'
        },
        {
            path: 'courses/details',
            component: CourseDetailsComponent,
            title: 'Courses'
        },
        {
            path: 'profile',
            component: ProfileComponent,
            title: 'Courses'
        }
    ]
  },
  {
    path: '**',
    async loadComponent() {
        const m = await import('./pages/page-not-found/page-not-found.component');
        return m.PageNotFoundComponent;
    },
    title: 'Page Not Found'
  }
];
