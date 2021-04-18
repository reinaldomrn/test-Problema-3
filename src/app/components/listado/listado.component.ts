import { Component, OnInit } from '@angular/core';
import { GlobalService } from "src/app/services/global.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.css"],
})
export class ListadoComponent implements OnInit {
  constructor(private _globalService: GlobalService, private router: Router) {
    if(!localStorage.getItem('dataSesion')) this.router.navigate(["index"]);
  }

  dataGrillaLocal: any[] = [];
  value: string = "";
  type: string = "like";
  star: boolean = false;

  ngOnInit() {
    this.getlist();    
  }

  getlist() {
    let dataLocalStore = this.getData();
    this._globalService
      .getList(
        "contacto@tuten.cl",
        "APP_BCK",
        dataLocalStore.sessionTokenBck,
        dataLocalStore.email
      )
      .subscribe((response) => {
        response.map(
          ({
            bookingId,
            bookingTime,
            bookingPrice,
            tutenUserClient: { firstName, lastName },
            locationId: { streetAddress },
          }) => {            
            
            this.dataGrillaLocal.push({
              bookingId,
              bookingTime,
              firstName,
              lastName,
              streetAddress,
              bookingPrice,
            });
            this.star = true;
          }
        );
        this._globalService.dataGrillaGlobal = this.dataGrillaLocal;
      });
  }

  getData(): any {
    return JSON.parse(localStorage.getItem("dataSesion"));
  }

  _keyUp(event: any): boolean {
    event.preventDefault();
    if (
      (event.keyCode < 96 || event.keyCode > 105) &&
      (event.keyCode < 48 || event.keyCode > 57)
    ) {
      return false;
    }
  }

  filter() {
    this.dataGrillaLocal =
      this.value != ""
        ? this._globalService.filter(this.type, parseFloat(this.value))
        : this._globalService.dataGrillaGlobal;
  }
}
