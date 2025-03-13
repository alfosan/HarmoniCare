import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { UserService } from '../../../../core/services/auth/user.service';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';
import { User } from '../../../../core/models/Users/user.model';
import { NotificationsListComponent } from '../../bell/notifications-list/notifications-list.component';

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

  constructor(
    public tokenService: TokenService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    if (this.tokenService.isAuthenticated()) {
      const userInfo = this.tokenService.getUserInfo();
      if (userInfo) {
        this.user = userInfo;
      }
    }
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleNotifications() {
    this.notificationsOpen = !this.notificationsOpen;
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
}