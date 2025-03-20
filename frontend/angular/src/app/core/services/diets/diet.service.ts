import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  getDiets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/diets`);
  }

  createDiet(diet: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/diets/create`, diet);
  }

  deleteDiet(dietId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/diets/delete/${dietId}`);
  }

  getMealsByDietId(dietId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/diet-meals/diet=${dietId}`);
  }
}