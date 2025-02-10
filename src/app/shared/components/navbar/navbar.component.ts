import { Component ,Input} from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() title: string = ''
  currentMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
