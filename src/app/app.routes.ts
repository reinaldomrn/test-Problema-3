import { Routes } from "@angular/router";

//Componentes
import { ListadoComponent } from "./components/listado/listado.component";
import { LoginComponent } from "./components/login/login.component";

export const APP_ROUTES: Routes = [
  { path: "index", component: LoginComponent },
  { path: "listado", component: ListadoComponent },  
  { path: "**", pathMatch: "full", redirectTo: "index" },
];

