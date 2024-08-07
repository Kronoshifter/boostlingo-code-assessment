import { Component, OnInit } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { SessionService } from '../../services/session.service'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  email: string | null = ''

  constructor(private session: SessionService) {

  }

  ngOnInit(): void {
    this.email = this.session.session
  }

  logout() {
    this.session.logout()
  }

}
