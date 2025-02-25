import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private userPatientService: UserPatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.loadFiltersFromUrl();
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

  loadFiltersFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.status = params['status'] || '';
      this.filters.date = params['date'] || '';
      this.filters.patient = params['patient'] || '';
      this.applyFilters(false); // No emitir evento al cargar desde la URL
    });
  }

  applyFilters(emitEvent: boolean = true) {
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

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: 'merge'
    }).then(() => {
      if (emitEvent) {
        this.filtersChanged.emit(filtersToSend);
      }
    });
  }
}