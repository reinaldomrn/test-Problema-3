import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DOCUMENT } from "@angular/platform-browser";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  dataGrillaGlobal: any[];
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: any
  ) {}

  //realiza el logueo de la aplicacion
  login(userName:string = '', password:string = '', app:string = 'APP_BCK'): any{
      let headers:any = new HttpHeaders({
        "Content-Type": "application/json",
        'password': password,
        'app': app
      });
     return this.http
       .put(
         `${environment.apiPath}${userName}`, {}, 
         { headers: headers }
       )
       .pipe(map((response) => response));
  }

  //Obtiene el set de registros
  getList(email:string, app:string, token:string, adminemail:string, current:boolean = true): any{
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      email,
      app,
      token,
      adminemail
    });
    return this.http
      .get(
        `${environment.apiPath}contacto%40tuten.cl/bookings?current=${current}`,
        { headers: headers }
      )
      .pipe(map((response) => response));    
  }

  //filtra los reistros segun lo que desee el usuario
  filter(type: string, value:number): any[]{    
    console.log(this.dataGrillaGlobal);
    
    let response =  this.dataGrillaGlobal.filter((row) => { 
    
      switch (type) {
        case "igual":
          return row.bookingPrice === value;          
        case "mayor":
          return row.bookingPrice > value;          
        case "menor":
          return row.bookingPrice < value;
        case "like":
          return row.bookingId.toString().includes(value);

      }
    });
    return response;
  }

  logout(){
    localStorage.removeItem("dataSesion");
  }
}
