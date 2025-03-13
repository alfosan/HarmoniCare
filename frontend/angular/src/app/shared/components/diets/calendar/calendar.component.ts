import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMealsComponent } from '../modal-meals/modal-meals.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule, ModalMealsComponent]
})
export class CalendarComponent {
  selectedDay!: string;
  selectedMealType!: string;
  showModal = false;
  mealsByDay: { [key: string]: { [key: string]: any } } = {};

  addMeal(day: string, mealType: string): void {
    this.selectedDay = day;
    this.selectedMealType = mealType;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onMealSelected(event: any): void {
    const { day, mealType, meal } = event;
    if (!this.mealsByDay[day]) {
      this.mealsByDay[day] = {};
    }
    this.mealsByDay[day][mealType] = meal;
    this.closeModal();
  }

  removeMeal(day: string, mealType: string): void {
    if (this.mealsByDay[day] && this.mealsByDay[day][mealType]) {
      delete this.mealsByDay[day][mealType];
    }
  }

  getMealImagePath(img: string): string {
    return `assets/meals/specific/${img}`;
  }
}