// filepath: c:\Users\3eias\Documents\PROYECTS\HarmoniCare\frontend\angular\src\app\shared\components\diets\calendar\calendar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMealsComponent } from '../modal-meals/modal-meals.component';
import { AddDietMealsService } from '../../../../core/services/add_diets_meals/add-diet-meals.service';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule, ModalMealsComponent, NgChartsModule]
})
export class CalendarComponent implements OnInit {
  @Input() dietId!: number;
  selectedDay!: string;
  selectedMealType!: string;
  showModal = false;
  mealsByDay: { [key: string]: { [key: string]: any } } = {};
  commonAllergens: string[] = [];
  
  // Nuevas propiedades para estadísticas
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  
  // Datos para gráficos
  macronutrientData: ChartData<'pie'> = {
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
  };
  weeklyCaloriesData: ChartData<'line'> = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0], label: 'Calorías diarias', borderColor: '#42A5F5', fill: false }]
  };

  constructor(
    private addDietMealsService: AddDietMealsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDietMeals();
  }

  loadDietMeals(): void {
    this.addDietMealsService.getDietMealsByDietId(this.dietId).subscribe((dietMeals) => {
      dietMeals.forEach((dietMeal) => {
        const day = this.capitalizeFirstLetter(this.removeAccents(dietMeal.dayOfWeek));
        if (!this.mealsByDay[day]) {
          this.mealsByDay[day] = {};
        }
        this.addDietMealsService.getMealById(dietMeal.mealId).subscribe((meal) => {
          this.mealsByDay[day][dietMeal.mealType] = { ...meal, dietMealId: dietMeal.id };
          this.updateNutritionStats();
          this.updateCharts();
          this.updateCommonAllergens();
        });
      });
    });
  }

  updateNutritionStats(): void {
    this.totalCalories = 0;
    this.totalProtein = 0;
    this.totalCarbs = 0;
    this.totalFat = 0;

    Object.values(this.mealsByDay).forEach(dayMeals => {
      Object.values(dayMeals).forEach((meal: any) => {
        this.totalCalories += Number(meal.calories) || 0;
        this.totalProtein += Number(meal.proteins) || 0;
        this.totalCarbs += Number(meal.carbohydrates) || 0;
        this.totalFat += Number(meal.fats) || 0;
      });
    });
  }

  updateCharts(): void {
    // Datos para el gráfico circular de macronutrientes
    this.macronutrientData.datasets[0].data = [this.totalProtein, this.totalCarbs, this.totalFat];

    // Datos para el gráfico de líneas de calorías semanales
    this.weeklyCaloriesData.datasets[0].data = Object.entries(this.mealsByDay).map(([day, meals]) => 
      Object.values(meals).reduce((acc: number, meal: any) => acc + (Number(meal.calories) || 0), 0)
    );
  }

  updateCommonAllergens(): void {
    const allAllergensSet = new Set<string>();
  
    Object.values(this.mealsByDay).forEach(dayMeals => {
      Object.values(dayMeals).forEach((meal: any) => {
        if (meal.allergens) {
          Object.keys(meal.allergens).forEach((allergen) => {
            if (meal.allergens[allergen]) {
              allAllergensSet.add(allergen);
            }
          });
        }
      });
    });
  
    this.commonAllergens = Array.from(allAllergensSet);
  }
  

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

    const dietMeal = {
      dietId: this.dietId,
      mealId: meal.id,
      dayOfWeek: this.removeAccents(day.toLowerCase()),
      mealType: mealType
    };
    this.addDietMealsService.createDietMeal(dietMeal).subscribe(() => {
      this.updateNutritionStats();
      this.updateCharts();
      this.updateCommonAllergens();
    });
  }

  removeMeal(day: string, mealType: string): void {
    if (this.mealsByDay[day] && this.mealsByDay[day][mealType]) {
      const dietMealId = this.mealsByDay[day][mealType].dietMealId;
      this.addDietMealsService.deleteDietMeal(dietMealId).subscribe(() => {
        delete this.mealsByDay[day][mealType];
        this.updateNutritionStats();
        this.updateCharts();
        this.updateCommonAllergens();
      });
    }
  }
  
  updateAllAllergens(): void {
    const allAllergensSet = new Set<string>();
  
    Object.values(this.mealsByDay).forEach(dayMeals => {
      Object.values(dayMeals).forEach((meal: any) => {
        if (meal.allergens) {
          Object.keys(meal.allergens).forEach((allergen) => {
            if (meal.allergens[allergen]) {
              allAllergensSet.add(allergen);
            }
          });
        }
      });
    });
  
    this.commonAllergens = Array.from(allAllergensSet);
  }

  getAllergensList(allergens: { [key: string]: boolean }): string[] {
    return Object.keys(allergens).filter(key => allergens[key]);
  }
  
  getMealImagePath(img: string): string {
    return `assets/meals/specific/${img}`;
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  goBack(): void {
    this.router.navigate(['../']);
  }
}