import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService } from '../../../../core/services/meals/meals.service';

@Component({
  selector: 'app-modal-meals',
  templateUrl: './modal-meals.component.html',
  styleUrls: ['./modal-meals.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalMealsComponent implements OnInit {
  @Input() day!: string;
  @Input() mealType!: string;
  @Output() close = new EventEmitter<void>();
  @Output() mealSelected = new EventEmitter<any>();
  meals: any[] = [];

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.mealsService.getMealsByType(this.mealType).subscribe((response) => {
      this.meals = response;
    });
  }

  getMealImagePath(img: string): string {
    return `assets/meals/specific/${img}`;
  }

  closeModal(): void {
    this.close.emit();
  }

  selectMeal(meal: any): void {
    this.mealSelected.emit({ day: this.day, mealType: this.mealType, meal });
    this.closeModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    this.closeModal();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }
}