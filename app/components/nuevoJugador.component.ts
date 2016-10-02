import {Component, OnInit} from "angular2/core";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {PartidasService} from "../services/partidas.service";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";

@Component({
  selector: "nuevoJugador",
  templateUrl: "app/views/nuevoJugador.html",
  styleUrls: ['assets/css/registro.css'],
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES]
})

export class NuevoJugadorComponent{

  public nuevoJugador: Jugador;

  constructor(private _partidasService: PartidasService){

  }

  onSubmit(){
    let jugador: Jugador = this.nuevoJugador;

  }

}
