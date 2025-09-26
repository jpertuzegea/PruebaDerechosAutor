import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../Shared/shared.module';
import { MainAdminComponent } from './main-admin.component';
import { UserComponent } from './user/user.component';
import { LoginLogComponent } from './login-log/login-log.component';



@NgModule({

  declarations: [
    MainAdminComponent,
    UserComponent,
    LoginLogComponent
  ],

  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    SharedModule
  ],

  exports: [
  ],
})
export class AdminModule { }
