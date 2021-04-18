import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";

  constructor(@Inject(DOCUMENT) private document: any, private router: Router) {    
    if ( localStorage.getItem('token') == null && this.router.url != '/' && this.router.url != '/index')
      this.document.location.href = `/index`;
  }
}
