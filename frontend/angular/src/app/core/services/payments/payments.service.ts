import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8085/api/payments';

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  getAllPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-payments`);
  }
}