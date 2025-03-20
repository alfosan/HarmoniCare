import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-diet-modal',
  templateUrl: './create-diet-modal.component.html',
  styleUrls: ['./create-diet-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateDietModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  diet = {
    nameDiet: '',
    description: '',
    healthyScale: 5,
    calories: 1500,
    isActive: true,
    allergens: '' // Asegurarse de que allergens sea un string
  };

  closeModal(): void {
    this.close.emit();
  }

  createDiet(): void {
    this.create.emit(this.diet);
    this.closeModal();
  }
}