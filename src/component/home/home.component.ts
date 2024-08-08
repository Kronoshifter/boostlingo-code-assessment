import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatToolbar } from '@angular/material/toolbar'
import { SessionService } from '../../services/session.service'
import { MatButton } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DatePipe, NgOptimizedImage } from '@angular/common'
import { ImageApiService, ImageResponse } from '../../services/image-api.service'
import { Subscription } from 'rxjs'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatDivider } from '@angular/material/divider'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    DatePipe,
    NgOptimizedImage,
    MatProgressSpinner,
    MatDivider,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  email: string | null = ''

  image: ImageResponse | null = null
  loading = false

  private sub!: Subscription

  get currentDate(): Date {
    return new Date()
  }

  constructor(
    private session: SessionService,
    private api: ImageApiService,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.email = this.session.session
    this.sub = this.api.image.subscribe(res => {
      this.image = res
    })

    if (this.image?.status !== 'success') {
      this.nextImage()
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  logout() {
    this.session.logout()
  }

  nextImage() {
    this.loading = true
    this.api.nextImage()
  }

}
