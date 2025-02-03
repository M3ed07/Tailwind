import { Component} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  menuItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-gauge', path: 'dashboard' },
    { label: 'Maps', icon: 'fa-solid fa-map', path: 'maps' },
    { label: 'Companies', icon: 'fa-solid fa-building', path: 'companies' },
  ];

}
