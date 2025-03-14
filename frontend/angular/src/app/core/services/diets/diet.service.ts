// filepath: HarmoniCare\frontend\angular\src\app\core\services\diets\diet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  createDiet(diet: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/diets/create`, diet);
  }

  getDiets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/diets`);
  }

  getDietById(dietId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/diets/${dietId}`);
  }
}