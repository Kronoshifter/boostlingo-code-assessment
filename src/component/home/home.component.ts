import { Component, OnInit } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { SessionService } from '../../services/session.service'
import { MatButton } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  email: string | null = ''

  get currentDate(): Date {
    return new Date()
  }

  constructor(
    private session: SessionService,
    snackbar: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
    this.email = this.session.session
  }

  logout() {
    this.session.logout()
  }

}
