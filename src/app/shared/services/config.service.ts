import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs'
import { UtilitiesService } from './utilities.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor( private utilitiesService:UtilitiesService) { }

  public handleError(error: HttpErrorResponse) {
    this.utilitiesService.setLoading(false);
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
