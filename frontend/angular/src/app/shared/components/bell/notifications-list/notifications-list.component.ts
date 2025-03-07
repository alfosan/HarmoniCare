import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notifications/notification.service';
import { Notification } from '../../../../core/models/notifications/notification.model';

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  @Input() isOpen: boolean = false;
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data: Notification[]) => {
        // Ordenar las notificaciones para que las nuevas se muestren primero
        this.notifications = data.sort((a, b) => Number(a.isRead) - Number(b.isRead));
      },
      (error: any) => {
        console.error('Error loading notifications', error);
      }
    );
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.map(notification =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        );
        // Reordenar las notificaciones después de marcar como leída
        this.notifications.sort((a, b) => Number(a.isRead) - Number(b.isRead));
      },
      (error: any) => {
        console.error('Error marking notification as read', error);
      }
    );
  }

  deleteNotification(notificationId: number): void {
    this.notificationService.deleteNotification(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      },
      (error: any) => {
        console.error('Error deleting notification', error);
      }
    );
  }
}