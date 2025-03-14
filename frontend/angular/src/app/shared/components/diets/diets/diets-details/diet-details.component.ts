// filepath: c:\Users\3eias\Documents\PROYECTS\HarmoniCare\frontend\angular\src\app\shared\components\diets\diet-details\diet-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.css'],
  standalone: true,
  imports: [CommonModule, CalendarComponent]
})
export class DietDetailsComponent implements OnInit {
  dietId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dietId = +params['id'];
    });
  }
}