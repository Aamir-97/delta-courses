import { AuthService } from './../../data/services/interceptors/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../data/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import {
  CourseByUserIdModel,
  CourseDetailModel,
} from '../../data/models/course.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe({
      next: (value) => {
        this.getCourseDetailById(value['id']!);
      },
    });
    this.userId = this.authService.getUserId();
  }

  courseDetails: CourseDetailModel;
  userId: number | null;
  isCourseEnrolled: boolean = false;
  enrolledCourses: CourseByUserIdModel[] = [];
  enrolledCourseDetails: CourseByUserIdModel;
  progressValue: number = 0;

  getCourseDetailById(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (value) => {
        this.courseDetails = value.courses[0];
        this.getEnrolledCourses(this.userId!);
      },
      error: (err) => {
        this.openSnackBar('', 'close');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onEnroll(courseId: number) {
    const userIdData = {
      userId: this.userId,
    };
    this.courseService.enrollCourseService(courseId, userIdData).subscribe({
      next: (value) => {
        this.getCourseDetailById(courseId);
        this.openSnackBar('Enrolled successfully', 'close');
      },
      error: (err) => {
        this.openSnackBar(err.error.error, 'close');
      },
    });
  }

  getEnrolledCourses(userId: number) {
    this.courseService.getEnrolledCourses(userId).subscribe({
      next: (data) => {
        this.enrolledCourses = data.courses;
        this.checkForEnrollment();
      },
      error: (err) => {
        this.openSnackBar(err.error.error, 'Close');
      },
    });
  }

  checkForEnrollment() {
    return this.enrolledCourses.map((course) => {
      if (this.courseDetails.idcourses === course.idcourses) {
        this.isCourseEnrolled = true;
        this.enrolledCourseDetails = course;
        this.progressValue = course.progress;
        return;
      }
    });
  }

  updateProgress() {
    const progressData = {
      progress: this.progressValue,
    };
    this.courseService
      .updateProgress(this.courseDetails.idcourses, this.userId!, progressData)
      .subscribe({
        next: (data) => {
          this.getCourseDetailById(this.courseDetails.idcourses);
          this.openSnackBar('Progress updated successfully', 'Close');
        },
        error: (err) => {
          this.openSnackBar(err.error.error, 'Close');
        },
      });
  }
}
