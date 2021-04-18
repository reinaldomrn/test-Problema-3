import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  message: string = "";
  userName:string = '';
  password:string = '';
  constructor(private _globalService: GlobalService, private router: Router) {
    if (localStorage.getItem("dataSesion")) this.router.navigate(["listado"]);
  }

  ngOnInit() {}

  login() {
    if(this.userName == '' || this.password == ''){
      this.message  = 'Disculpe debe especificar un nombre de usuario y una clave.';
    }else{
      this._globalService.login(this.userName, this.password).subscribe(
        ({ sessionTokenBck, firstName, lastName, email }) => {        
          localStorage.setItem("dataSesion", JSON.stringify({ sessionTokenBck, firstName, lastName, email }));
          this.router.navigate(['listado']);
        },
        (err) => {
          this.message = err.error;
        }
      );
    }
  }
}
