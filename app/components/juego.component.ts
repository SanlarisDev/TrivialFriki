import {Component} from "angular2/core";
import {CabeceraComponent} from "./cabecera.component";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {JUGADORES, PARTIDAS} from "../services/mock.partidas";
import {PartidasService} from "../services/partidas.service";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "Juego",
  templateUrl: "app/views/juego.html",
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES, CabeceraComponent]
})

export class JuegoComponent{
  public pregunta: string = "¿Cómo se llama?";
  public opcion1: string = "Cynthia";
  public opcion2: string = "Javi";
  public opcion3: string = "No tengo ni idea";
  public opcion4: string = "Tu puta madre";

  public partida;
  public preguntas;
  constructor(private _partidasService: PartidasService){
    this.partida = this._partidasService.getPartidas()[0];
    this.pregunta = this.partida.preguntas;
  }
}
