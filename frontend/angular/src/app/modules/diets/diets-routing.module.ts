import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietsComponent } from '../../shared/components/diets/diets/diets.component';

const routes: Routes = [
  { path: '', component: DietsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietsRoutingModule { }