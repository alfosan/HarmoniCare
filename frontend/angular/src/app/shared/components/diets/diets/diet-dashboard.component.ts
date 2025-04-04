import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietService } from '../../../../core/services/diets/diet.service';
import { Router } from '@angular/router';
import { CreateDietModalComponent } from '../create-diet-modal/create-diet-modal.component';
import { AssignPatientModalComponent } from './assign-patient-modal/assign-patient-modal.component';
import { UserPatientService } from '../../../../core/services/users/user-patient-2.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { NotificationService } from '../../../../core/services/notifications/notification.service';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, CreateDietModalComponent, AssignPatientModalComponent]
})
export class DietDashboardComponent implements OnInit {
  diets: any[] = [];
  patients: UserPatient[] = [];
  showModal = false;
  showAssignModal = false;
  selectedDietId: number | null = null;

  @Output() dietSelected = new EventEmitter<number>();

  constructor(
    private dietService: DietService,
    private userPatientService: UserPatientService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDiets();
    this.loadPatients();
  }

  loadDiets(): void {
    this.dietService.getDiets().subscribe((diets) => {
      this.diets = diets;
    });
  }

  loadPatients(): void {
    this.userPatientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
        console.log('Pacientes cargados:', this.patients);
      },
      (error) => {
        console.error('Error al cargar los pacientes:', error);
      }
    );
  }
  
  getPatientName(patientId: number | null): string {
    if (!patientId) {
      return '';
    }
    const patient = this.patients.find((p) => p.id === patientId);
    return patient ? patient.name_patient : 'Desconocido';
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openAssignModal(dietId: number): void {
    this.selectedDietId = dietId;
    this.showAssignModal = true;
  }

  closeAssignModal(): void {
    this.showAssignModal = false;
    this.selectedDietId = null;
  }

  assignPatientToDiet(event: { dietId: number; patientId: number }): void {
    console.log('Asignando paciente con ID:', event.patientId);
    console.log('Lista de pacientes:', this.patients);
  
    const patient = this.patients.find((p) => p.id === +event.patientId);
    if (!patient) {
      console.error('Paciente no encontrado');
      return;
    }
  
    this.dietService.updateDietWithPatient(event.dietId, event.patientId).subscribe(
      (response) => {
        console.log(`Paciente ${event.patientId} asignado a la dieta ${event.dietId}`);
        console.log('Respuesta del backend:', response);
        this.loadDiets();
      },
      (error: any) => {
        console.error('Error al asignar la dieta', error);
      }
    );

    const tutorId = patient.id_user;
    const patientName = patient.name_patient;
  
    if (tutorId === undefined || tutorId === null) {
      console.error('El tutor del paciente no está definido');
      return;
    }
  
    this.notificationService.createNotification(
      'Nueva dieta asignada',
      `Se ha asignado una nueva dieta al paciente ${patientName}.`,
      tutorId
    ).subscribe(
      () => {
        console.log('Notificación enviada al tutor');
      },
      (error: any) => {
        console.error('Error al enviar la notificación', error);
      }
    );
  }

  createDiet(diet: any): void {
    this.dietService.createDiet(diet).subscribe(() => {
      this.loadDiets();
      this.closeModal();
    });
  }

  deleteDiet(dietId: number): void {
    this.dietService.deleteDiet(dietId).subscribe(() => {
      this.loadDiets();
    });
  }

  editDiet(dietId: number): void {
    this.router.navigate(['/diets', dietId]);
  }

  selectDiet(dietId: number): void {
    this.dietSelected.emit(dietId);
  }
}