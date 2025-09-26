import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../Shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MainSecurityComponent } from './main-security.component'; 


@NgModule({

  declarations: [
    MainSecurityComponent,
    HomeComponent, 
  ],

  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule

  ],

  exports: [ 
    HomeComponent,
  ],

})
export class SecurityModule { }
