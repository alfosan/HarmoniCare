import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietDashboardComponent } from './diet-dashboard.component';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css'],
  standalone: true,
  imports: [CommonModule, DietDashboardComponent, CalendarComponent]
})
export class DietsComponent {
  selectedDietId!: number;

  onDietSelected(dietId: number): void {
    this.selectedDietId = dietId;
  }
}