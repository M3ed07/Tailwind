import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() pageName: string = ''
  currentMode: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTheme();
    }
  }

  updateTheme() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      this.currentMode = true;
    }
  }
  

  toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    this.currentMode = !this.currentMode;
  }

}
