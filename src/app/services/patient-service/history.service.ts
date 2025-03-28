import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(id: number): Observable<any> {
    return this.http.get<any>(`${APP_CONFIG.baseUrl}/order` + `/${id}`)
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${APP_CONFIG.baseUrl}/order`+ `/${id}`)
  }

}
