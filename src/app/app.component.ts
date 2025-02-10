import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Ensure the theme is applied globally on app startup
    this.themeService.currentMode$.subscribe();
  }
}
