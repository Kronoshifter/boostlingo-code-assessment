import { Component, OnInit } from '@angular/core'
import { MatFormField } from '@angular/material/form-field'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { SessionService } from '../../services/session.service'
import { FormsModule, NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatButton,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''

  constructor(
    private session: SessionService,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.login()
  }

  login() {
    this.session.login()
  }

  authenticateAndLogin(form: NgForm) {
    if (this.validateInputs(form)) {
      this.session.authenticateUser(this.email)
      this.login()
    } else {
      this.showSnackbar('Please enter valid email and password')
    }
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'dismiss', {
      duration: 3000
    })
  }

  validateInputs(form: NgForm): boolean {
    return (form.valid && !form.pristine && !!this.email.trim() && !!this.password.trim()) as boolean
  }
}
