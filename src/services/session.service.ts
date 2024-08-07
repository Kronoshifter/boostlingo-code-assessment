import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _session:string | null = null;

  constructor(private router: Router) {
    this._session = sessionStorage['sessionid']
  }

  get session(): string | null {
    return this._session
  }

  set session(session: string | null) {
    this._session = session

    if (session) {
      sessionStorage['sessionid'] = session
    } else {
      delete sessionStorage['sessionid']
    }
  }

  get isAuthenticated(): boolean {
    return !!this.session
  }

  logout() {
    this.session = null
    this.router.navigate(['/login']).catch(reason => console.error(reason))
  }

  canActivate() {
    return this.authenticate()
  }

  canActivateChild() {
    return this.authenticate()
  }

  private async authenticate(): Promise<boolean | UrlTree> {
    if (!this.isAuthenticated) {
      this.logout()
      return this.router.createUrlTree(['/login'])
    }

    return true
  }
}
