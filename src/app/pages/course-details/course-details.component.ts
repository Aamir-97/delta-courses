import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../data/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loggedInUserId } from '../../app.component';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { CourseDetailModel } from '../../data/models/course.model';

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
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParams.subscribe({
      next: (value) => {
        this.getCourseDetailById(value['id']!);
      },
    });
  }

  courseDetails: CourseDetailModel;
  userId: number = loggedInUserId;

  getCourseDetailById(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (value) => {
        this.courseDetails = value.courses[0];
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
        this.openSnackBar('Enrolled successfully', 'close');
      },
      error: (err) => {
        this.openSnackBar('Error enrolling', 'close');
      },
    });
  }
}
