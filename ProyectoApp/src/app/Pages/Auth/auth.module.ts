import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



@NgModule({

  declarations: [
    LoginComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  exports: [
    LoginComponent
  ],

})
export class AuthModule { }
