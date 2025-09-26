import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResultModel } from '../../../Models/ResultModel';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Inyeccion de dependencias   
  private toast = inject(ToastrService); 

  Year: any;

  ngOnInit(): void {
    this.Year = new Date().getFullYear();
  }
   
}
