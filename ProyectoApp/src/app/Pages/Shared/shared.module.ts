import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
 
@NgModule({

  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,

    SpinnerComponent

  ],

  // Se debe exportar todos los componentes del modulo e importarl el SharedModule en app-module
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent

  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

  ],

})
export class SharedModule { }
