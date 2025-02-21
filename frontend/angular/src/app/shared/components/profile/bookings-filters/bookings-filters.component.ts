import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPatientService } from '../../../../core/services/users/user-patient-2.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';

@Component({
  selector: 'app-bookings-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings-filters.component.html',
  styleUrls: ['./bookings-filters.component.css']
})
export class BookingsFiltersComponent implements OnInit {
  @Input() patients: UserPatient[] = [];

  filters = {
    status: '',
    date: '',
    patient: ''
  };

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private userPatientService: UserPatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    const user = JSON.parse(localStorage.getItem('UserInfo') || '{}');
    const userId = user.id_user;

    if (userId) {
      this.userPatientService.getUserPatientsByUserId(userId).subscribe({
        next: (data) => {
          this.patients = Array.isArray(data) ? data : [data];
        },
        error: (error) => {
          console.error('Error fetching patients:', error);
        }
      });
    } else {
      console.error('User ID not found in local storage or cookies');
    }
  }

  applyFilters() {
    const filtersToSend: { status?: string; date?: string; idPatient?: string } = {};

    if (this.filters.status) {
      filtersToSend['status'] = this.filters.status;
    }

    if (this.filters.date) {
      filtersToSend['date'] = this.filters.date;
    }

    if (this.filters.patient) {
      filtersToSend['idPatient'] = this.filters.patient;
    }

    this.filtersChanged.emit(filtersToSend);
  }
}