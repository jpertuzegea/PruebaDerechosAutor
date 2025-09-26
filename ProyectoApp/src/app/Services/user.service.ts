import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResultModel } from '../Models/ResultModel';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // Inyeccion de dependencias
  private http = inject(HttpClient);

  public GetAllUsers(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.BaseUrl + "api/User/UserList");
  }

  public SaveUser(User: UserModel) {
    console.log(User);
    return this.http.post(environment.BaseUrl + "api/User/UserAdd", User);
  }

  public GetUserByUserId(id: number) {
    return this.http.post(environment.BaseUrl + "api/User/GetUserByUserId", id);
  }

  public UpdateUser(User: UserModel) {
    return this.http.put(environment.BaseUrl + "api/User/UserUpdt", User);
  }

  public UserSelect(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.BaseUrl + "api/User/UserListSelect");
  }


}
