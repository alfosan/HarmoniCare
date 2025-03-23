import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notifications/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8085/notifications';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user`, { headers: this.getAuthHeaders() });
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificationId}/read`, {}, { headers: this.getAuthHeaders() });
  }

  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`, { headers: this.getAuthHeaders() });
  }

  createNotification(title: string, concept: string, userId: number): Observable<any> {
    const notification = {
      title,
      concept,
      idUser: userId // Asegúrate de que el campo coincida con el backend
    };
  
    return this.http.post<any>(`${this.apiUrl}/create`, notification, { headers: this.getAuthHeaders() });
  }
}