import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Chart, registerables } from 'chart.js';
import { PaymentService } from '../../../../core/services/payments/payments.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-payments-view',
  templateUrl: './payments-view.component.html',
  styleUrls: ['./payments-view.component.css'],
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void <=> *', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('600ms ease-in-out')),
    ]),
  ],
})
export class PaymentsViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'price', 'paymentMethod', 'state', 'transactionReference', 'createdAt'];
  dataSource = new MatTableDataSource<any>();
  errorMessage: string = '';
  isLoading: boolean = true;
  chartColors = {
    primary: 'rgba(75, 192, 192, 0.6)',
    border: 'rgba(75, 192, 192, 1)',
    background: 'rgba(255, 255, 255, 0.9)'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentService: PaymentService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  private formatDate(dateArray: number[]): Date {
    return new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4],
      dateArray[5],
      Math.floor(dateArray[6] / 1000000)
    );
  }

  loadPayments(): void {
    this.isLoading = true;
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        data.forEach((payment: any) => {
          payment.createdAt = this.formatDate(payment.createdAt);
          payment.updatedAt = this.formatDate(payment.updatedAt);
        });

        this.dataSource.data = data;
        this.createChart(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = '¡Ups! Ha ocurrido un error al cargar los pagos. Por favor, inténtalo de nuevo.';
        console.error('Error en la carga de pagos:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'createdAt': return new Date(item.createdAt).getTime();
        default: return item[property];
      }
    };
  }

  createChart(data: any[]): void {
    setTimeout(() => {
      const ctx = document.getElementById('paymentsChart') as HTMLCanvasElement;
      if (!ctx) {
        console.error('No se pudo encontrar el contexto del canvas');
        return;
      }

      const chartData = data.map(payment => payment.price);
      const chartLabels = data.map(payment => {
        const date = new Date(payment.createdAt);
        return `${date.toLocaleDateString()} - ID: ${payment.id}`;
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Monto de Pago (€)',
            data: chartData,
            backgroundColor: this.chartColors.primary,
            borderColor: this.chartColors.border,
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: this.chartColors.border,
            hoverBorderColor: this.chartColors.border,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                padding: 20,
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: this.chartColors.background,
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: this.chartColors.border,
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: (context) => `Monto: ${context.raw}€`,
                title: (tooltipItems) => {
                  const item = tooltipItems[0];
                  return `Pago #${data[item.dataIndex].id}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 0
              },
              ticks: {
                callback: (value) => `${value}€`,
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                font: {
                  size: 11
                }
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
          }
        }
      });
    }, 100);  }
}