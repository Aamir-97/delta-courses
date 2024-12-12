import { ProfileService } from './../../data/services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialUiModule } from './../../global/module/material-ui/material-ui.module';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [MaterialUiModule, RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  showPassword: boolean = false;
  loaderVisible: boolean = false;
  errorMessage: string = '';

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  myFunction() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.password.nativeElement.type = 'text';
      this.confirmPassword.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
      this.confirmPassword.nativeElement.type = 'password';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loaderVisible = true;
      this.errorMessage = '';
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        this.loaderVisible = false;
        this.errorMessage = 'Password and Confirm Password do not match';
        return;
      } else {
        const data = {
          name: this.registerForm.value.name,
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
        };
        this.profileService.saveUser(data).subscribe({
          next: (response) => {
            this.loaderVisible = false;
            this.registerForm.reset();
            this.openSnackBar(
              'User Registered Successfully, Please re-login',
              'Close'
            );
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.loaderVisible = false;
            this.errorMessage = error.error.error;
          },
        });
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
    this.registerForm.valid;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
