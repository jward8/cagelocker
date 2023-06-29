import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TeamResponse {
  message: string,
  data: Pokemon[]
}

export interface Pokemon {
  name: string,
  minLevel: number,
  maxLevel: number
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public team: any[] = [];
   
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${environment.ANGULAR_APP_BACKEND_URL}/api`);
  }

  sendTextFile(formData: FormData) {
    this.http.post<TeamResponse>(`${environment.ANGULAR_APP_BACKEND_URL}/api/upload`, formData).subscribe(res => {
      console.log('Upload successful:', res);
      this.team = res.data;
    }, err => {
      console.error('Upload failed:', err);
    });
  }
}
