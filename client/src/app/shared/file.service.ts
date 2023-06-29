import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
   
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${environment.ANGULAR_APP_BACKEND_URL}/api`);
  }

  sendTextFile(formData: FormData) {
    this.http.post(`${environment.ANGULAR_APP_BACKEND_URL}/api/upload`, formData).subscribe(res => {
      console.log('Upload successful:', res);
    }, err => {
      console.error('Upload failed:', err);
    });
  }
}
