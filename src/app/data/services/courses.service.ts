import { HttpParams } from '@angular/common/http';
import { ApiRepositoryService } from './interceptors/api-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private apiRepositoryService: ApiRepositoryService) {}
  apiPath = 'course';

  getAllCourses() {
    let params: HttpParams = new HttpParams();
    return this.apiRepositoryService.getAllDataRepository(this.apiPath, params);
  }

  getCourseById(id: number) {
    return this.apiRepositoryService.getDataByIdRepository(this.apiPath, id);
  }

  getEnrolledCourses(userId: number) {
    const params = new HttpParams().set('userId', userId);
    return this.apiRepositoryService.getAllDataRepository(this.apiPath, params);
  }

  enrollCourseService(courseId: number, userIdData: any) {
    return this.apiRepositoryService.saveDataRepository(
      this.apiPath + `/enroll/${courseId}`,
      userIdData
    );
  }

  unenrollCourseService(courseId: number, userIdData: any) {
    return this.apiRepositoryService.deleteDataRepository(
      this.apiPath + '/unenroll',
      courseId,
      userIdData
    );
  }

  updateProgress(courseId: number, userId: number, progressData: any) {
    const params = new HttpParams().set('userId', userId);
    return this.apiRepositoryService.updateDataRepository(
      this.apiPath + '/progress',
      courseId,
      progressData,
      params
    );
  }
}
