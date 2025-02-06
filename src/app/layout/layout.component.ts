import { Component} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  menuItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-gauge', path: 'dashboard' },
    { label: 'Users', icon: 'fa-solid fa-users', path: 'users' },
    { label: 'Attendance', icon: 'fa-solid fa-clipboard-user', path: 'attendance' },
  ];

}
