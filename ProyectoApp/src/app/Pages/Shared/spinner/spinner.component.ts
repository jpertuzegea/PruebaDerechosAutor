
import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  // Inyeccion de dependencias 
  public loader = inject(LoaderService);

}

// Url del post spinner loading
//https://danielk.tech/home/angular-how-to-add-a-loading-spinner
