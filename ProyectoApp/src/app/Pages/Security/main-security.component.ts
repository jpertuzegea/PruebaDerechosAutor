import { Component, OnInit } from '@angular/core';

declare function Menu(): any; // <script src="/assets/js/plugins/metisMenu/jquery.metisMenu.js"></script>
declare function inspinia(): any; // <script src="/assets/js/inspinia.js"></script>

@Component({
  selector: 'app-main-security',
  templateUrl: './main-security.component.html',
})
export class MainSecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Menu();
    inspinia();
  }

}
