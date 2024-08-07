import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _session:string | null = null;

  constructor(private router: Router) {
    this._session = localStorage['sessionid']
  }

  get session(): string | null {
    return this._session
  }

  set session(session: string | null) {
    this._session = session

    if (session) {
      localStorage['sessionid'] = session
    } else {
      delete localStorage['sessionid']
    }
  }

  get isAuthenticated(): boolean {
    return !!this.session
  }

  login() {
    if (this.isAuthenticated) {
      this.router.navigate(['/home']).catch(reason => console.error(reason))
    }
  }

  logout() {
    this.session = null
    this.router.navigate(['/login']).catch(reason => console.error(reason))
  }

  authenticateUser(user: string) {
    this.session = user
  }

  canActivate() {
    return this.authenticate()
  }

  canActivateChild() {
    return this.authenticate()
  }

  private authenticate() {
    if (!this.isAuthenticated) {
      this.logout()
      return this.router.createUrlTree(['/login'])
    }

    return true
  }
}
