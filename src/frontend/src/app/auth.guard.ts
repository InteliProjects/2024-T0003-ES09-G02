import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper: JwtHelperService;

  constructor(private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(): Promise<boolean> {
    return this.validateAccessToken().then((isValid) => {
      if (isValid) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }

  private async validateAccessToken(): Promise<boolean> {
    const accessToken = localStorage.getItem('token');

    if(!accessToken) {
      console.error('No tokens found');
      return false;
    }

    if (!this.jwtHelper.isTokenExpired(accessToken)) {
      return true;
    } else {
      console.error('Token inválido');
      return false;
    }
  }
}
