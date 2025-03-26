import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { UserService } from '../../../../core/services/auth/user.service';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';
import { User } from '../../../../core/models/Users/user.model';
import { NotificationsListComponent } from '../../bell/notifications-list/notifications-list.component';
import { NotificationService } from '../../../../core/services/notifications/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NotificationsListComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  routes = SHARED_ROUTES;
  profileMenuOpen = false;
  notificationsOpen = false;
  user!: User;
  hasUnreadNotifications: boolean = false; // Nueva propiedad para controlar el puntito rojo

  constructor(
    public tokenService: TokenService,
    private userService: UserService,
    private notificationService: NotificationService // Inyectar el servicio de notificaciones
  ) {}

  ngOnInit() {
    if (this.tokenService.isAuthenticated()) {
      const userInfo = this.tokenService.getUserInfo();
      if (userInfo) {
        this.user = userInfo;
      }
      this.checkUnreadNotifications(); // Verificar notificaciones sin leer al iniciar
    }
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleNotifications() {
    this.notificationsOpen = !this.notificationsOpen;
    if (this.notificationsOpen) {
      this.markAllAsRead(); // Marcar todas como leídas al abrir la lista
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.tokenService.clearAll();
      window.location.href = this.routes.NEXT.HOME;
    });
  }

  // Nueva función para verificar si hay notificaciones sin leer
  checkUnreadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications) => {
        this.hasUnreadNotifications = notifications.some(notification => !notification.isRead);
      },
      (error) => {
        console.error('Error al cargar las notificaciones', error);
      }
    );
  }

  // Nueva función para marcar todas las notificaciones como leídas
  markAllAsRead(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications) => {
        notifications.forEach(notification => {
          if (!notification.isRead) {
            this.notificationService.markAsRead(notification.id).subscribe(() => {
              this.hasUnreadNotifications = false; // Actualizar el estado del puntito rojo
            });
          }
        });
      },
      (error) => {
        console.error('Error al marcar las notificaciones como leídas', error);
      }
    );
  }
}