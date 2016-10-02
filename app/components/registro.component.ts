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
  public maxJugadores: number;

  public jugadores: Array<Jugador>;
  public nuevoJugador: Jugador;
  public nombreNuevoJugador: string;
  public ultimoIDJugador: number;

  public ultimoIDPartida: number;

  public texto: string = "Siguiente";

  constructor(private _partidasService: PartidasService, private _router: Router){
    this.maxJugadores = 4;

    this.jugadores = [];
    if(!this.jugadores.length){
      this.numJugadores = ""+0;
    }else{
      this.numJugadores = ""+this.jugadores.length;
    }

    this.ultimoIDJugador=this._partidasService.getJugadores()[this._partidasService.getJugadores().length-1].id;
    this.ultimoIDPartida=this._partidasService.getPartidas()[this._partidasService.getPartidas().length-1].id;
  }

  addJugador(){
    if(this.jugadores.length < this.maxJugadores){
      console.log(this.nombreNuevoJugador);
      this.nuevoJugador = new Jugador(this.getNewIDJugador(), this.nombreNuevoJugador, "images/avatar1.jpg", 0);
      console.log(this.nuevoJugador);
      console.log(this.jugadores);
      this.jugadores.push(this.nuevoJugador);
      this.nombreNuevoJugador = "";
    }
  }

  getNewIDJugador(){
    return this.ultimoIDJugador+=1;
  }

  deleteJugador(jugador){
    if(this.jugadores.length > 0){
      console.log(this.jugadores);
      for(var i=0; i<this.jugadores.length;i++){
        if(this.jugadores[i].id===jugador.id){
          this.jugadores.splice(i,1);
        }
      }
    }
    console.log(this.jugadores);
  }

  onJugar(){

    let partida: Partida = this.inicializarPartida();
    console.log(partida);
    this._partidasService.insertPartida(partida);
    console.log(this._partidasService.getPartidas());
    this._router.navigate(["Juego", {id: partida.id}]);
  }

  inicializarPartida(){
    var teclas: string[]= [];
    var aciertosJugadores: number[] = [];
    var erroresJugadores: number[] = [];

    for(var i=0; i<this.jugadores.length;i++){
      aciertosJugadores[i]= 0;
      erroresJugadores[i]= 0;

      switch(i){
        case 1:
          teclas[i]="W";
        case 2:
          teclas[i]="A";
        case 3:
          teclas[i]="S";
        case 4:
          teclas[i]="D";
        case 5:
          teclas[i]="F";
        case 6:
          teclas[i]="G";
        }
    }

    return new Partida(this.getNewIDPartida(), this.jugadores, this._partidasService.getPreguntas(), teclas, aciertosJugadores, erroresJugadores, true);
  }

  getNewIDPartida(){
    return this.ultimoIDPartida+=1;
  }
}
