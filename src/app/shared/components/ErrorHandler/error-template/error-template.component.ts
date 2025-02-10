import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from '../error.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-error-template',
  templateUrl: './error-template.component.html',
  styleUrl: './error-template.component.css'
})
export class ErrorTemplateComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  errorMsg:string = ''
  errorImg:string = ''
  constructor(private errorService: ErrorService) {}
  ngOnInit(): void {
    this.subscription = this.errorService.errorCode$.subscribe(code => {
      switch (code) {
        case 400:
          this.errorMsg = 'Bad Request, the server could not understand the request';
          this.errorImg = '/assets/errors/400.svg';
          break;
        case 401:
          this.errorMsg = 'Unauthorized, please log in to access this resource';
          this.errorImg = '/assets/errors/401.svg';
          break;
        case 403:
          this.errorMsg = 'Forbidden, you do not have permission to access this resource';
          this.errorImg = '/assets/errors/403.svg';
          break;
        case 404:
          this.errorMsg = 'Not Found, the requested resource could not be found';
          this.errorImg = '/assets/errors/404.svg';
          break;
        case 429:
          this.errorMsg = 'Too Many Requests, you have sent too many requests in a short period. Please try again later';
          this.errorImg = '/assets/errors/429.svg';
          break;
        case 500:
          this.errorMsg = 'Internal Server Error, something went wrong on the server';
          this.errorImg = '/assets/errors/500.svg';
          break;
        case 503:
          this.errorMsg = 'Service Unavailable, the server is currently unavailable';
          this.errorImg = '/assets/errors/503.svg';
          break;
        default:
          this.errorMsg = 'An unknown error occurred, please try again';
          this.errorImg = '/assets/errors/unknown.svg';
          break;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
