import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient-2.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { MatButtonModule } from '@angular/material/button';
import { BookingsFiltersComponent } from '../bookings-filters/bookings-filters.component';

@Component({
  selector: 'app-bookings-view',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, BookingsFiltersComponent],
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css']
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(filters: any = {}): void {
    this.isLoading = true;
    this.bookingsService.getBookings(filters).subscribe({
      next: (data) => {
        console.log('Bookings data:', data);
        this.bookings = data;
        this.filteredBookings = data;
        this.loadAdditionalData();
        this.extractPatients();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.errorMessage = 'Error fetching bookings';
        this.isLoading = false;
      }
    });
  }

  loadAdditionalData(): void {
    this.bookings.forEach(booking => {
      console.log('Fetching activity for booking:', booking.idActivity);
      this.activityService.getActivityById(booking.idActivity).subscribe({
        next: (activityData) => {
          console.log('Activity data for booking', booking.idActivity, ':', activityData);
          booking.activity = activityData;
        },
        error: (error) => {
          console.error('Error fetching activity data:', error);
        }
      });

      console.log('Fetching patient for booking:', booking.idPatient);
      this.userPatientService.getUserPatientsByUser(booking.idPatient).subscribe({
        next: (patientData) => {
          console.log('Patient data for booking', booking.idPatient, ':', patientData);
          booking.patient = patientData;
          console.log('Assigned patient data to booking:', booking.patient);
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
        }
      });
    });
  }

  extractPatients(): void {
    const patientNames = this.bookings.map(booking => booking.patient?.name_patient).filter(name => name);
    this.patients = [...new Set(patientNames)];
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
}