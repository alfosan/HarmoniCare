import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient-2.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { MatButtonModule } from '@angular/material/button';
import { BookingsFiltersComponent } from '../bookings-filters/bookings-filters.component';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookings-view',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, BookingsFiltersComponent, ProfileTabsComponent],
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css'],
  providers: [Subject]
})
export class BookingsViewComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedActivity: any;
  selectedPatient: any;
  patients: UserPatient[] = [];

  constructor(
    private bookingsService: BookingsService,
    private activityService: ActivityService,
    private userPatientService: UserPatientService,
    private route: ActivatedRoute,
    private router: Router,
    private destroy$: Subject<void>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatients().then(() => {
      this.route.queryParams.subscribe(params => {
        const filters = {
          status: params['status'] || '',
          date: params['date'] || '',
          patient: params['patient'] || ''
        };
  
        // Realiza la petición incluso si no hay filtros
        this.fetchBookings(filters);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPatients(): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('UserInfo') || '{}');
      const userId = user.id_user;
  
      if (userId) {
        this.userPatientService.getUserPatientsByUserId(userId).subscribe({
          next: (data) => {
            this.patients = Array.isArray(data) ? data : [data];
            resolve();
          },
          error: (error) => {
            console.error('Error fetching patients:', error);
            reject(error);
          }
        });
      } else {
        console.error('User ID not found in local storage or cookies');
        reject('No user ID found');
      }
    });
  }

  fetchBookings(filters: any = {}): void {
    this.isLoading = true;
    console.log("Enviando filtros a la API:", filters);
  
    // Cancelar peticiones previas
    this.destroy$.next();
  
    const requestFilters = Object.values(filters).some(value => value) ? filters : {};
    console.log("🔍 Filtros procesados para la solicitud:", requestFilters);
  
    this.bookingsService.getBookings(requestFilters).pipe(
      takeUntil(this.destroy$) // Cancela la petición anterior si hay una nueva
    ).subscribe({
      next: (data) => {
        console.log('✅ Bookings data received:', JSON.stringify(data, null, 2));
        this.bookings = data;
        this.filteredBookings = data;
        this.loadAdditionalData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error fetching bookings:', error);
        this.errorMessage = 'Error fetching bookings';
        this.isLoading = false;
      }
    });
  }

  loadAdditionalData(): void {
    console.log('🔍 Checking bookings before loading additional data:', this.bookings);
  
    if (!this.bookings.length) {
      console.warn('⚠️ No bookings found. Skipping additional data fetch.');
      return;
    }
  
    this.bookings.forEach(booking => {
      console.log(`Fetching data for Activity ID: ${booking.idActivity} and Patient ID: ${booking.idPatient}`);
  
      this.activityService.getActivityById(booking.idActivity).subscribe({
        next: (activityData) => {
          console.log(`✅ Activity data for booking ${booking.idActivity}:`, activityData);
          booking.activity = activityData;
        },
        error: (error) => {
          console.error(`❌ Error fetching activity data for ${booking.idActivity}:`, error);
        }
      });
  
      this.userPatientService.getUserPatientsByUser(booking.idPatient).subscribe({
        next: (patientData) => {
          console.log(`✅ Patient data for booking ${booking.idPatient}:`, patientData);
          booking.patient = patientData;
        },
        error: (error) => {
          console.error(`❌ Error fetching patient data for ${booking.idPatient}:`, error);
        }
      });
    });
  }

  showActivityDetails(template: TemplateRef<any>, activity: any): void {
    this.selectedActivity = activity;
    this.dialog.open(template, {
      width: '600px',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: ['custom-dialog-container', 'mat-elevation-z8'],
      data: { activity: this.selectedActivity },
      autoFocus: false,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      position: { top: '50px' },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms'
    });
  }

  showPatientDetails(template: TemplateRef<any>, patient: any): void {
    this.selectedPatient = patient;
    this.dialog.open(template, {
      width: '600px',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: ['custom-dialog-container', 'mat-elevation-z8'],
      data: { patient: this.selectedPatient },
      autoFocus: false,
      disableClose: false,
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      position: { top: '50px' },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms'
    });
  }

  onFiltersChanged(filters: any): void {
    this.fetchBookings(filters);
  }

  setActiveTab(tab: string): void {}
}
