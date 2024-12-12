import { HttpParams } from '@angular/common/http';
import { ApiRepositoryService } from './interceptors/api-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiPath = 'dashboard';

  constructor(private apiRepositoryService: ApiRepositoryService) {}

  getCoursesEnrolled() {
    const params = new HttpParams();
    return this.apiRepositoryService.getAllDataRepository(
      this.apiPath + '/course_enroll',
      params
    );
  }

  getUserCourseProgerss() {
    const params = new HttpParams();
    return this.apiRepositoryService.getAllDataRepository(
      this.apiPath + '/user_course_progress',
      params
    );
  }
}
