import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentModeSubject = new BehaviorSubject<boolean>(false);
  currentMode$ = this.currentModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = localStorage.getItem('theme') === 'dark';
      this.currentModeSubject.next(isDark);
      this.applyTheme(isDark);
    }
  }

  toggleDarkMode() {
    const newMode = !this.currentModeSubject.value;
    this.currentModeSubject.next(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  private applyTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }
}
