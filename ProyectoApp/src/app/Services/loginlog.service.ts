import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResultModel } from '../Models/ResultModel';
import { LoginLogModel } from '../Models/LoginLogModel';

@Injectable({
  providedIn: 'root'
})
export class LoginlogService {


  // Inyeccion de dependencias
  private http = inject(HttpClient);


  public GetAllLoginLogs(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.BaseUrl + "api/Loginlog/LoginLogList");
  }

}
