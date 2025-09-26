import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from './main-admin.component';
import { AuthenticationGuard } from '../../Guards/authentication.guard';
import { UserComponent } from './user/user.component';
import { LoginLogComponent } from './login-log/login-log.component';



const routes: Routes = [
  {
    path: 'Admin', component: MainAdminComponent, canActivate: [AuthenticationGuard],

    children: [
      { path: 'Usuarios', component: UserComponent, canActivate: [AuthenticationGuard] },
      { path: 'LoginLog', component: LoginLogComponent, canActivate: [AuthenticationGuard] },
      
    ]
  },

  //{ path: '**', redirectTo: 'Securit/home' },  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
