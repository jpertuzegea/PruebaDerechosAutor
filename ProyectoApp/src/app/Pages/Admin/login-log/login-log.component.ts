import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoginLogModel } from '../../../Models/LoginLogModel';
import { ResultModel } from '../../../Models/ResultModel';
import { AuthenticationService } from '../../../Services/authentication.service';
import { LoginlogService } from '../../../Services/loginlog.service';


@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnDestroy, OnInit, AfterViewInit {

  // Inyeccion de dependencias
  private authenticationService = inject(AuthenticationService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);
  private LoginLogService = inject(LoginlogService);

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  isDtInitialized: boolean = false;

  form!: FormGroup;
  List!: LoginLogModel[];

  Registro: string = "Registro";
  Modificacion: string = "Modificacion";

  Action = this.Registro;

  showModal = false;



  ngOnInit(): void {

    this.dtOptions = { // Configuracion DataTables
      pagingType: 'full_numbers',
      language: { url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json', }, // esta linea es para idioma español,
      responsive: true,
      destroy: true
    };

    this.ListAllLoginLog();
  }


  // DataTables
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }

  ListAllLoginLog() {
    this.LoginLogService.GetAllLoginLogs().subscribe(

      ResultModel => {
        let Resu = ResultModel as ResultModel;

        if (!Resu.HasError) {

          let Array = Resu.Data as LoginLogModel[]
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
   
}
