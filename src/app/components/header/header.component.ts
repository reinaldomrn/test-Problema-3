import { Component } from '@angular/core';
import { GlobalService } from "src/app/services/global.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  constructor(private _globalService: GlobalService, private router: Router) {}
  logout(event : any){
      event.preventDefault();
      this._globalService.logout();
      this.router.navigate(['index']);
  }
}