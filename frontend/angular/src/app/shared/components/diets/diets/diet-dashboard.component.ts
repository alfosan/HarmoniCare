import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../../core/services/diets/diet.service';
import { Router } from '@angular/router';
import { CreateDietModalComponent } from '../create-diet-modal/create-diet-modal.component';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, CreateDietModalComponent]
})
export class DietDashboardComponent implements OnInit {
  diets: any[] = [];
  showModal = false; // Controla la visibilidad del modal
  @Output() dietSelected = new EventEmitter<number>();

  constructor(private dietService: DietService, private router: Router) {}

  ngOnInit(): void {
    this.loadDiets();
  }

  loadDiets(): void {
    this.dietService.getDiets().subscribe((diets) => {
      this.diets = diets;
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createDiet(diet: any): void {
    this.dietService.createDiet(diet).subscribe(() => {
      this.loadDiets();
      this.closeModal();
    });
  }

  deleteDiet(dietId: number): void {
    this.dietService.deleteDiet(dietId).subscribe(() => {
      this.loadDiets();
    });
  }

  editDiet(dietId: number): void {
    this.router.navigate(['/diets', dietId]);
  }

  selectDiet(dietId: number): void {
    this.dietSelected.emit(dietId);
  }
}