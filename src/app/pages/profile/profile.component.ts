import { Component } from '@angular/core';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { formatDate } from '@angular/common';
import { ProfileSaveModel } from '../../data/models/profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../data/services/courses.service';
import { CourseByUserIdModel } from '../../data/models/course.model';
import { AuthService } from '../../data/services/interceptors/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private profileService: ProfileService,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.getProfileDetails(this.userId);
      this.getEnrolledCourses(this.userId);
    }
  }

  formDisabled: boolean = true;
  enrolledCourses: CourseByUserIdModel[] = [];
  userId: number | null;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    dob: new FormControl(''),
    bio: new FormControl(''),
    profile_image: new FormControl(''),
  });

  ngOnInit() {
    this.profileForm.disable();
    // this.getProfileDetails(this.userId);
    // this.getEnrolledCourses(this.userId);
  }

  onEdit() {
    this.formDisabled = !this.formDisabled;
    if (this.formDisabled) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
    }
  }

  onUpdate() {
    const profileData: ProfileSaveModel = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      mobile: this.profileForm.value.mobile,
      dob: this.profileForm.value.dob,
      bio: this.profileForm.value.bio,
      profile_img: this.profileForm.value.profile_image,
    };

    this.profileService.updateProfileData(this.userId!, profileData).subscribe({
      next: (data) => {
        this.getProfileDetails(2);
        this.openSnackBar('Profile updated successfully', 'Close');
        this.formDisabled = !this.formDisabled;
        this.profileForm.disable();
      },
      error: (error) => {
        this.openSnackBar('Error updating profile', 'Close');
      },
    });
    // this.formDisabled = !this.formDisabled;
  }

  getProfileDetails(id: number) {
    this.profileService.getProfileDataById(id).subscribe({
      next: (data) => {
        const profile = data.profile[0];
        this.profileForm.setValue({
          name: profile.name,
          email: profile.email,
          mobile: profile.mobile,
          dob: formatDate(profile.dob, 'yyyy-MM-dd', 'en'),
          bio: profile.bio,
          profile_image: profile.profile_img,
        });
      },
      error: (error) => {
        this.openSnackBar('Error loading profile', 'Close');
      },
    });
  }

  getEnrolledCourses(userId: number) {
    this.coursesService.getEnrolledCourses(userId).subscribe({
      next: (data) => {
        this.enrolledCourses = data.courses;
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

  unEnroll(courseId: number) {
    const userIdData = {
      userId: this.userId,
    };
    this.coursesService.unenrollCourseService(courseId, userIdData).subscribe({
      next: (data) => {
        this.getEnrolledCourses(this.userId!);
        this.openSnackBar('Unenrolled successfully', 'Close');
      },
      error: (error) => {
        this.openSnackBar('Error unenrolling', 'Close');
      },
    });
  }
}
