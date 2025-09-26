import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginModel } from '../Models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Inyeccion de dependencias
  private http = inject(HttpClient);
  private router = inject(Router);


  private Response: boolean = false;
  public srcImageUser!: string;

  public Login(LoginModel: LoginModel) {
    return this.http.post(environment.BaseUrl + "api/Login/Login", LoginModel);
  }

  public IsLoged(): boolean {
    let Token = "";

    if (localStorage.getItem("Token")) {

      Token = localStorage.getItem("Token")!;
      let TokenObject = JSON.parse(atob(Token.split('.')[1]));

      if ((Token.length < 6)) {
        this.Response = false;
        this.LogOut();
      }

      let ExpireToken = Number(TokenObject.exp);
      let Expire = new Date(ExpireToken * 1000);

      if (Expire < new Date()) {
        this.Response = false;
        this.LogOut();
      }
      else {
        this.Response = true;
      }
    }
    else {
      this.Response = false;
      this.LogOut();
    }
    return this.Response;
  }

  public LogOut() {
    localStorage.removeItem("Token");
    localStorage.removeItem("ExpirationToken");
    localStorage.removeItem("UserImage");
    localStorage.removeItem("ContentType");
    localStorage.removeItem("ListPermisions");

    this.router.navigate(['']);
  }



  public GetUserIdByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserId;
  }

  public GetRolNameByToken(): string {
    let Token: any = "";
    Token = localStorage.getItem("Token");
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.RolName;
  }

  public GetUserNetworkByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserNetwork;
  }

  public GetUserFullNameByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserFullName;
  }

  public GetEmailByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserEmail;
  }

  public GetUserPermisionsByToken() {

    let loadData = localStorage.getItem("ListPermisions")!;
    let Permi = JSON.parse(loadData);
    let Permisions = JSON.parse(Permi.UserPermisions).map((x: { Name: any; }) => x.Name);
    Permisions.unshift('');

    return Permisions;
  }

  public GetUserDependencyIdByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserDependency;
  }

  public GetUserDependencyNameByToken(): string {
    let Token = "";

    Token = localStorage.getItem("Token")!;
    let TokenObject = JSON.parse(atob(Token.split('.')[1]));
    return TokenObject.UserDependencyName;
  }

  public GetBase64UserImage() {
    this.srcImageUser = `data:${localStorage.getItem("ContentType")};base64, ${localStorage.getItem("UserImage")}`;
    return this.srcImageUser;
  }

  public SetBase64UserImage(Image: any, ContentType: string) {
    localStorage.setItem("UserImage", Image);
    localStorage.setItem("ContentType", ContentType);
  }


}
