import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../../Guards/authentication.guard'; 
import { HomeComponent } from './home/home.component';
import { MainSecurityComponent } from './main-security.component';


const routes: Routes = [
  {
    path: 'Securit', component: MainSecurityComponent, canActivate: [AuthenticationGuard],

    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },      
    ]
  },

  // { path: '**', redirectTo: 'Securit/home' },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SecurityRoutingModule { }
