import { Component } from '@angular/core';
import { CoursesService } from '../../data/services/courses.service';
import { CoursesModel } from '../../data/models/course.model';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MaterialUiModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  constructor(
    private courseSerice: CoursesService,
    private snackBar: MatSnackBar
  ) {}

  allCourses: CoursesModel[] = [];

  ngOnInit() {
    this.courseSerice.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data.courses.courses;
        // this.openSnackBar('Courses loaded successfully', 'Close');
      },
      error: (error) => {
        this.openSnackBar('Error loading courses', 'Close');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
