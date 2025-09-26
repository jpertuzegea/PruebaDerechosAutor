import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserModel } from '../../../Models/UserModel';
import { ResultModel } from '../../../Models/ResultModel';
import { SelectListModel } from '../../../Models/SelectListModel';
import { AuthenticationService } from '../../../Services/authentication.service';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnDestroy, OnInit, AfterViewInit {

  // Inyeccion de dependencias
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);
  private userService = inject(UserService);

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  isDtInitialized: boolean = false;

  form!: FormGroup;
  List!: UserModel[];

  Registro: string = "Registro";
  Modificacion: string = "Modificacion";

  Action = this.Registro;

  showModal = false;
  ListStates!: SelectListModel[];
  TipoDocumento!: SelectListModel[];
  Permisions: any[] = [];



  ngOnInit(): void {

    this.ListStates = [
      { Value: 'Activo', Text: 'Activo' },
      { Value: 'Inactivo', Text: 'Inactivo' },
    ];

    this.TipoDocumento = [
      { Value: 'Cedula', Text: 'Cedula' },
      { Value: 'Pasaporte', Text: 'Pasaporte' },
      { Value: 'Cedula Extranjeria', Text: 'Cedula Extranjeria' },
    ];


    this.dtOptions = { // Configuracion DataTables
      pagingType: 'full_numbers',
      language: { url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json', }, // esta linea es para idioma español,
      responsive: true,
      destroy: true
    };

    this.form = this.formBuilder.group(
      {
        userId: '',
        TipoDocumento: '',
        NumeroDcumento: '',
        Nombreuser: '',
        FechaNacimiento: '',
        Correo: '',
        Genero: '',
        Direccion: '',
        Telefono: '',
        FechaCreacion: '',
        Estado: '',
        UsuarioCrea: '',
        FechaModificacion: '',
        UsuarioModificacion: '',

      }
    ); 
    this.ListAllusers();
  }


  // DataTables
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }


  ListAllusers() {
    this.userService.GetAllUsers().subscribe(

      ResultModel => {
        let Resu = ResultModel as ResultModel;

        if (!Resu.HasError) {

          let Array = Resu.Data as UserModel[]
          if (Resu.Data) {
            this.List = Array;

            if (this.isDtInitialized) {
              this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(Resu.Data);
              });
            } else {
              this.isDtInitialized = true;
              this.dtTrigger.next(Resu.Data);
            }

          } else {
            console.log('sin datos para mostrar')
          }
        } else {
          this.toast.error(Resu.Messages, "ERROR");
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
  }


  ShowModal(View: boolean, Action: string) {
    if (!View) {
      this.CleanFields();
    }
    this.showModal = View;
    this.Action = Action;
  }


  CleanFields() {
    this.form.controls['Id'].setValue("");
    this.form.controls['Username'].setValue("");
    this.form.controls['Email'].setValue("");
    this.form.controls['FirstName'].setValue("");
    this.form.controls['LastName'].setValue("");
    this.form.controls['Gender'].setValue("");
    this.form.controls['Iat'].setValue("");
    this.form.controls['Exp'].setValue("");
    this.form.controls['Token'].setValue("");
  }


  SaveChanges() {
    if (this.ValidateForm()) {
      return false;
    };

    if (this.Action == "Registro") {
      this.Saveuser();
    }

    if (this.Action == "Modificacion") {
      this.Updateuser();
    }
    return false;
  }


  ValidateForm() {
    let HasError = false;
    let Data = this.GetFields();

    if (this.Action == "Registro") {

      if (Data.Username === null || Data.Username.length < 3) {
        this.toast.error("Nombreuser es obligatorio, 3 caracteres min", "ERROR");
        HasError = true;
      }
      if (Data.Email === null || Data.Email.length < 3) {
        this.toast.error("Email es obligatorio", "ERROR");
        HasError = true;
      }

    }

    if (this.Action == "Modificacion") {

      if (Data.Username === null || Data.Username.length < 3) {
        this.toast.error("Nombreuser es obligatorio, 3 caracteres min", "ERROR");
        HasError = true;
      }
      if (Data.Email === null || Data.Email.length < 3) {
        this.toast.error("Email es obligatorio", "ERROR");
        HasError = true;
      }

    }

    return HasError;
  }


  GetFields() {
    let Field = new UserModel();
    Field.Id = this.form.get("Id")!.value;
    Field.Username = this.form.get("Username")!.value;
    Field.Email = this.form.get("Email")!.value;
    Field.FirstName = this.form.get("FirstName")!.value;
    Field.LastName = this.form.get("LastName")!.value;
    Field.Gender = this.form.get("Gender")!.value;
    Field.Iat = this.form.get("Iat")!.value;
    Field.Exp = this.form.get("Exp")!.value;
    Field.Token = this.form.get("Token")!.value; 
    return Field;
  }


  SetFields(user: UserModel) {

    this.form.controls['Id'].setValue(user.Id);
    this.form.controls['Username'].setValue(user.Username);
    this.form.controls['Email'].setValue(user.Email);
    this.form.controls['FirstName'].setValue(user.FirstName);
    this.form.controls['LastName'].setValue(user.LastName);
    this.form.controls['Gender'].setValue(user.Gender);
    this.form.controls['Iat'].setValue(user.Iat);
    this.form.controls['Exp'].setValue(user.Exp);
    this.form.controls['Token'].setValue(user.Token);

  }


  ViewUser(id: number) {
    this.ShowModal(true, "Modificacion");
    this.GetuserByuserId(id);
  }


  GetuserByuserId(id: number) {
    this.userService.GetUserByUserId(id).subscribe(
      ResultModel => {
        let Resu = ResultModel as ResultModel;

        if (!Resu.HasError) {
          let user = Resu.Data as UserModel;
          this.SetFields(user);
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
  }


  Saveuser() {
    let Fields = this.GetFields();
    this.userService.SaveUser(Fields).subscribe(
      ResultModel => {
        let Resu = ResultModel as ResultModel;
        if (!Resu.HasError) {
          this.toast.success(Resu.Messages, "OK");
          this.ListAllusers();
          this.ShowModal(false, "Registro");
        } else {
          this.toast.error(Resu.Messages, "ERROR");
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
  }


  Updateuser() {
    let Fields = this.GetFields();
    this.userService.UpdateUser(Fields).subscribe(
      ResultModel => {
        let Resu = ResultModel as ResultModel;
        if (!Resu.HasError) {
          this.toast.success(Resu.Messages, 'OK');
          this.ListAllusers();
          this.ShowModal(false, "Registro");
        } else {
          this.toast.error(Resu.Messages, "ERROR");
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
  }

}
