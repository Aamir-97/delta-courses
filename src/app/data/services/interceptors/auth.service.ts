import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  saveUser(token: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_id', token.iduser);
      localStorage.setItem('is_admin', token.is_admin);
    }
  }

  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('user_id')) {
        return parseInt(localStorage.getItem('user_id') || '');
      } else {
        return null;
      }
    }
    return null;
  }

  getUserRole(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('is_admin')) {
        return parseInt(localStorage.getItem('is_admin') || '');
      } else {
        return null;
      }
    }
    return null;
  }

  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
