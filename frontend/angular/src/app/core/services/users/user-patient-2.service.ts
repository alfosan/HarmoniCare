import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPatient } from '../../models/Users/user-patient.model';

@Injectable({
  providedIn: 'root'
})
export class UserPatientService {
  private apiUrl = 'http://localhost:8000/api/users/patient';

  constructor(private http: HttpClient) {}

  getUserPatientsByUser(id_user: number): Observable<UserPatient> {
    return this.http.get<UserPatient>(`${this.apiUrl}/${id_user}/`);
  }

  getUserPatientsByUserId(id_user: number): Observable<UserPatient[]> {
    return this.http.get<UserPatient[]>(`${this.apiUrl}?id_user=${id_user}`);
  }

  getAllPatients(): Observable<UserPatient[]> {
    return this.http.get<UserPatient[]>(this.apiUrl);
  }

  getPatientById(patientId: number): Observable<UserPatient> {
    return this.http.get<UserPatient>(`${this.apiUrl}/${patientId}`);
  }
}