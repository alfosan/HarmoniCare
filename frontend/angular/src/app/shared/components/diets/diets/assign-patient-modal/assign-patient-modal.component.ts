import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPatientService } from '../../../../../core/services/users/user-patient-2.service';
import { UserPatient } from '../../../../../core/models/Users/user-patient.model';

@Component({
  selector: 'app-assign-patient-modal',
  templateUrl: './assign-patient-modal.component.html',
  styleUrls: ['./assign-patient-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AssignPatientModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() dietId: number | null = null; // Recibe el ID de la dieta
  @Output() close = new EventEmitter<void>();
  @Output() assign = new EventEmitter<{ dietId: number; patientId: number }>();

  patients: UserPatient[] = [];
  selectedPatientId: number | null = null;
  selectedPatient: UserPatient | null = null; // Nueva propiedad para almacenar el paciente seleccionado

  constructor(private userPatientService: UserPatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.userPatientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
        console.log('Pacientes cargados:', this.patients); // Verifica que los pacientes se carguen correctamente
      },
      (error) => {
        console.error('Error al cargar los pacientes:', error);
      }
    );
  }

  onSelectPatient(): void {
    if (this.selectedPatientId) {
      this.userPatientService.getPatientById(this.selectedPatientId).subscribe((patient) => {
        // Procesar allergies y difficulties para asegurarse de que sean arrays
        patient.allergies = typeof patient.allergies === 'string' ? patient.allergies.split(',').map(a => a.trim()) : patient.allergies || [];
        patient.difficulties = typeof patient.difficulties === 'string' ? patient.difficulties.split(',').map(d => d.trim()) : patient.difficulties || [];
        this.selectedPatient = patient;
      });
    } else {
      this.selectedPatient = null;
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  getProcessedAllergies(): string[] {
    if (!this.selectedPatient || !this.selectedPatient.allergies) {
      return [];
    }
    return this.selectedPatient.allergies;
  }
  
  getProcessedDifficulties(): string[] {
    if (!this.selectedPatient || !this.selectedPatient.difficulties) {
      return [];
    }
    return this.selectedPatient.difficulties;
  }

  assignPatient(): void {
    if (this.dietId && this.selectedPatientId) {
      console.log('Asignando paciente desde el modal:', this.selectedPatientId); // Verifica el ID del paciente seleccionado
      this.assign.emit({ dietId: this.dietId, patientId: this.selectedPatientId });
      this.closeModal();
    }
  }
}