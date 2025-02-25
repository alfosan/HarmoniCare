import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../core/services/payments/payments.service';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-payments-view',
  standalone: true,
  imports: [CommonModule, ProfileTabsComponent],
  templateUrl: './payments-view.component.html',
  styleUrls: ['./payments-view.component.css']
})
export class PaymentsViewComponent implements OnInit {
  payments: any[] = [];
  activeTab: string = 'payments';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe((data) => {
      this.payments = data;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}