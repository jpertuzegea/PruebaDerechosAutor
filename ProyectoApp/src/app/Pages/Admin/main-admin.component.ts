import { Component } from '@angular/core';

declare function Menu(): any; // <script src="/assets/js/plugins/metisMenu/jquery.metisMenu.js"></script>
declare function inspinia(): any; // <script src="/assets/js/inspinia.js"></script>

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent {

  constructor() { }

  ngOnInit(): void {
    Menu();
    inspinia();
  }

}
