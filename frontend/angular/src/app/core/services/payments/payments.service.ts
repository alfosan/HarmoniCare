import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8085/payments';

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { amount });
  }
  
  // Método para obtener todos los pagos del usuario
  getAllPayments(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Asegúrate de que el token esté almacenado en localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/user-payment`, { headers }); // Cambiado a /user-payment
  }
}