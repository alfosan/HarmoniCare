import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietsRoutingModule } from './diets-routing.module';
import { DietsComponent } from '../../shared/components/diets/diets/diets.component';

@NgModule({
  imports: [
    CommonModule,
    DietsRoutingModule,
    DietsComponent
  ]
})
export class DietsModule { }