import { Component, HostListener } from '@angular/core';
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
  allCoursesCopy: CoursesModel[] = [];

  ngOnInit() {
    this.courseSerice.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data.courses.courses;
        this.allCoursesCopy = data.courses.courses;
      },
      error: (error) => {
        this.openSnackBar('Error loading courses', 'Close');
      },
    });
  }

  @HostListener('click', ['$event'])

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  searchCourse(event: any) {
    const searchValue = event.target.value;
    if (searchValue === '') {
      this.allCourses = this.allCoursesCopy;
    } else {
      this.allCourses = this.allCoursesCopy.filter((course) => {
        return course.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    // if (searchValue) {
    //   this.courseSerice.searchCourse(searchValue).subscribe({
    //     next: (data) => {
    //       this.allCourses = data.courses.courses;
    //     },
    //     error: (error) => {
    //       this.openSnackBar('Error loading courses', 'Close');
    //     },
    //   });
    // } else {
    //   this.courseSerice.getAllCourses().subscribe({
    //     next: (data) => {
    //       this.allCourses = data.courses.courses;
    //     },
    //     error: (error) => {
    //       this.openSnackBar('Error loading courses', 'Close');
    //     },
    //   });
    // }
  }

  filterCourses(event: any) {
    console.log(event.target.value);
    const searchValue = event.target.value;
    if (searchValue === '' || searchValue === undefined || searchValue === null || searchValue === 'all') {
      this.allCourses = this.allCoursesCopy;
    } else {
      this.allCourses = this.allCoursesCopy.filter((course) => {
        return course.category
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    }
  }
}
