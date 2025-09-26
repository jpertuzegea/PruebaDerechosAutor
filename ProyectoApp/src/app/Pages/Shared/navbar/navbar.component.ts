import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service'; 
import { ResultModel } from '../../../Models/ResultModel';
import { UserImageModel } from '../../../Models/UserImageModel';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Inyeccion de dependencias 
  private authenticationService = inject(AuthenticationService);
  private toast = inject(ToastrService);


  Permisions: any[] = [];
  srcImage!: string;
  UserFullName!: string;
  UserRolName!: string ;

  ngOnInit(): void {
   
  }

  

}
