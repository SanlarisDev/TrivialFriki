import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";

@Component({
  selector: "cabecera",
  templateUrl: "app/views/cabecera.html",
  directives: [ROUTER_DIRECTIVES]
})

export class CabeceraComponent{
  public titulo = "Trivial Friki";
}
