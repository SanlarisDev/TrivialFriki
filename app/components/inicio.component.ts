import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "inicio",
  templateUrl: "app/views/inicio.html",
  directives: [ROUTER_DIRECTIVES]
})

export class InicioComponent {
  public texto: string ="EMPEZAR";
}
