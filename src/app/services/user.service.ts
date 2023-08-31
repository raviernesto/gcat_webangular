import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  getUserRoles(userId:string){
    const params = new HttpParams({
      fromObject: {
        userId
      }
  });
    return this.apiService
    .get("/user/api/userroles",params);
   
  }
}
