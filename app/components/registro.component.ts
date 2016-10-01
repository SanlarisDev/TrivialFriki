import {Component} from "angular2/core";
import {CabeceraComponent} from "./cabecera.component";
import {NuevoJugadorComponent} from "./nuevoJugador.component";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {JUGADORES, PARTIDAS} from "../services/mock.partidas";
import {PartidasService} from "../services/partidas.service";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "registro",
  templateUrl: "app/views/registro.html",
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES, CabeceraComponent, NuevoJugadorComponent]
})

export class RegistroComponent {
  public numJugadores: string;
  public partida: Partida;
  public jugadores;
  public texto: string = "Siguiente";

  constructor(private _partidasService: PartidasService){
    this.partida = this._partidasService.getPartidas()[0];
    this.jugadores = this.partida.jugadores;
  }
}
