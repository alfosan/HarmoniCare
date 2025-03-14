// filepath: c:\Users\3eias\Documents\PROYECTS\HarmoniCare\frontend\angular\src\app\shared\components\diets\diet-dashboard\diet-dashboard.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../../core/services/diets/diet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DietDashboardComponent implements OnInit {
  diets: any[] = [];
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

  createDiet(): void {
    const diet = {
      nameDiet: 'Nueva Dieta',
      allergens: '{"Gluten": true, "Lactosa": false}',
      isActive: true,
      healthyScale: 8,
      calories: 1500,
      description: 'Descripción de la nueva dieta.'
    };

    this.dietService.createDiet(diet).subscribe(() => {
      this.loadDiets();
    });
  }

  deleteDiet(dietId: number): void {
    // Implementar la lógica para eliminar una dieta
  }

  editDiet(dietId: number): void {
    this.router.navigate(['/diets', dietId]);
  }

  selectDiet(dietId: number): void {
    this.dietSelected.emit(dietId);
  }
}