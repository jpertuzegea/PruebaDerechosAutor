import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InterceptorService } from './Interceptor/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Pages/Auth/auth.module';
import { SecurityModule } from './Pages/Security/security.module';
import { SharedModule } from './Pages/Shared/shared.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { LoadingService } from './Interceptor/loading.service';
import { AdminModule } from './Pages/Admin/admin.module';


@NgModule({

  declarations: [
    AppComponent,
  ],

  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    SecurityModule,
    AdminModule,
    AuthModule, 
    FormsModule,
    CommonModule, 


    DataTablesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ToastrModule.forRoot({
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true
    })

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingService, multi: true }// Spinner Loading 
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }

