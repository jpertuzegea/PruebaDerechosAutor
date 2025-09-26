import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../../Models/LoginModel';
import { ResultModel } from '../../../Models/ResultModel';
import { AuthenticationService } from '../../../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inyeccion de dependencias
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private toast = inject(ToastrService);


  form!: FormGroup;
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        UserNetwork: '',
        Password: '',
        IsLogued: '',
        Token: ''
        // ExpirationToken: ''
      }
    );

    this.authenticationService.LogOut();
  }

  Login() {

    if (this.ValidateForm()) {
      return false;
    };

    let Fields = this.GetFields();

    this.authenticationService.Login(Fields).subscribe(

      ResultModel => {
        let Resu = ResultModel as ResultModel;
        if (Resu.HasError) {
          this.toast.error(Resu.Messages, "ERROR");
        }

        let LoginModel = Resu.Data as LoginModel;

        if (LoginModel.IsLogued) {
          localStorage.setItem("Token", LoginModel.Token);
          localStorage.setItem("ListPermisions", atob(LoginModel.Token.split('.')[1]));

          this.router.navigate(['Securit/home']);
        }
      }, error => {
        console.log(error);

        if (error.status == 401) {
          this.toast.error("No Autorizado", "ERROR");
        } else {
          this.toast.error(JSON.stringify(error), "ERROR");
        }
      }
    );

    return false;
  }



  GetFields() {

    let Field = new LoginModel();
    Field.UserNetwork = this.form.get("UserNetwork")!.value;
    Field.Password = this.form.get("Password")!.value;
    Field.IsLogued = false;
    Field.Token = this.form.get("Token")!.value;
    // Field.ExpirationToken = this.form.get("ExpirationToken").value;

    return Field;
  }

  ValidateForm() {
    let HasError = false;
    let Data = this.GetFields();

    if (Data.UserNetwork === null || Data.UserNetwork.length < 3) {
      this.toast.error("Usuario es obligatorio", "ERROR");
      HasError = true;
    }

    if (Data.Password === null || Data.Password.length < 6) {
      this.toast.error("Clave es obligatorio", "ERROR");
      HasError = true;
    }

    return HasError;
  }

}
