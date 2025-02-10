import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorCodeSubject = new BehaviorSubject<number | null>(null);
  errorCode$ = this.errorCodeSubject.asObservable();

  setErrorCode(code: number): void {
    this.errorCodeSubject.next(code);
  }

  clearErrorCode(): void {
    this.errorCodeSubject.next(null);
  }
}
