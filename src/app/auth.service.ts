import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';

@Injectable()
export class AuthService {
  auth0 = new WebAuth({
    clientID: 'EG3NB5TEyRWmjOQxsceF9A-dkREI-Ofs',
    domain: 'bepennypacker.auth0.com',
    responseType: 'token id_token',
    audience: 'https://bepennypacker.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/dashboard',
    scope: 'openid profile',

  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize({});
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult: Auth0DecodedHash) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.getProfile(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.error(err);
      }
    });
  }

  private getProfile(authResult: Auth0DecodedHash) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
        console.log('profile:');
        console.log(profile);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const accessToken =  localStorage.getItem('access_token');
    const idToken =  localStorage.getItem('id_token');
    const expiresAt =  localStorage.getItem('expires_at');
    return accessToken && idToken && (parseInt(expiresAt, 10) > new Date().getTime());
  }

  private setSession(authResult: Auth0DecodedHash, profile: any): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
  }
}
