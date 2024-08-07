import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://dog.ceo/api/'

  private imageSubject = new BehaviorSubject<ImageResponse | null>(null);
  image = this.imageSubject.asObservable()

  nextImage(): void {
    this.http.get<ImageResponse>(this.baseUrl + 'breeds/image/random')
      .subscribe(val => {
        this.imageSubject.next(val)
      })
  }

}

export interface ImageResponse {
  message: string,
  status: string
}
