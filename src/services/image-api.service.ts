import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  constructor(private http: HttpClient) { }

  nextImage(): Observable<ImageResponse> {
    return this.http.get<ImageResponse>('https://dog.ceo/api/breeds/image/random')
  }

}

export interface ImageResponse {
  message: string,
  status: string
}
