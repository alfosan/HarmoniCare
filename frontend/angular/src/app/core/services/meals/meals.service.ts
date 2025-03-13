import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.routes';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  constructor(private http: HttpClient) {}

  getMealsByType(typeMeal: string): Observable<any> {
    return this.http.get(`${API_ROUTES.FOOD.MEALS}?type_meal=${typeMeal}`);
  }
}