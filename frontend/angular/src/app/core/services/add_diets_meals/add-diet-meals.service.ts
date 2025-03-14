// filepath: c:\Users\3eias\Documents\PROYECTS\HarmoniCare\frontend\angular\src\app\core\services\add_diets_meals\add-diet-meals.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDietMealsService {
  private baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  createDietMeal(dietMeal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/diet-meals/create`, dietMeal);
  }

  getDietMealsByDietId(dietId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/diet-meals/diet=${dietId}`);
  }

  getMealById(mealId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/meals/${mealId}`);
  }
  deleteDietMeal(dietMealId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/diet-meals/delete/${dietMealId}`);
  }
}