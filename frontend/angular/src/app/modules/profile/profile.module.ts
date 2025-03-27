import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { PaymentsViewComponent } from '../../shared/components/profile/payments-view/payments-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule

@NgModule({
  declarations: [
    PaymentsViewComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule, // Agregar MatCardModule
  ],
})
export class ProfileModule {}