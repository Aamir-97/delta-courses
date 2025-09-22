import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../data/services/login.service';
import { AuthService } from '../../data/services/interceptors/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialUiModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage: string = '';
  appVersion: string = '1.0.0';
  isPasswordVisible: boolean = false;
  loaderVisible: boolean = false;
  showPassword: boolean = false;

  @ViewChild('password') password: ElementRef;

  ngOnInit() {
    // if (this.authService.getUserId()) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.authService.onLogout();
    // }
    this.authService.onLogout();
  }

  onEnter(event: any) {
    const keyBoardEvent = event as KeyboardEvent;
    keyBoardEvent.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loaderVisible = true;
      this.errorMessage = '';
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loaderVisible = false;
          this.authService.saveUser(response.user[0]);
          this.navigateUserByRole();
        },
        error: (error) => {
          this.loaderVisible = false;
          this.errorMessage = error.error.error;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all fields';
    }
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
      this.isPasswordVisible = true;
    } else {
      if (passwordInput) {
        passwordInput.setAttribute('type', 'password');
        this.isPasswordVisible = false;
      }
    }
  }

  navigateUserByRole() {
    const userRole = this.authService.getUserRole();
    if (userRole === 1) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/home/courses']);
    }
  }

  myFunction() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
  }
}
