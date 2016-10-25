import {Component} from "angular2/core";
import {CabeceraComponent} from "./cabecera.component";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {JUGADORES, PARTIDAS} from "../services/mock.partidas";
import {PartidasService} from "../services/partidas.service";
import {TrivialConf}  from "../services/mock.config";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "registro",
  templateUrl: "app/views/registro.html",
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES, CabeceraComponent]
})

export class RegistroComponent {
  public numJugadores: string;
  public maxJugadores: number;

  public jugadores: Array<Jugador>;
  public nuevoJugador: Jugador;
  public nombreNuevoJugador: string;
  public ultimoIDJugador: number;

  public ultimoIDPartida: number;

  public texto: string = "Jugar";

  constructor(private _partidasService: PartidasService, private _router: Router){
    this.jugadores = [];
    this.maxJugadores = TrivialConf.MAX_JUGADORES //Necesario para el bindeo en html
    if(!this.jugadores.length){
      this.numJugadores = ""+0;
    }else{
      this.numJugadores = ""+this.jugadores.length;
    }

    this.ultimoIDJugador=this._partidasService.getJugadores()[this._partidasService.getJugadores().length-1].id;
    this.ultimoIDPartida=this._partidasService.getPartidas()[this._partidasService.getPartidas().length-1].id;
  }

  addJugador(){
    if(this.jugadores.length < TrivialConf.MAX_JUGADORES){
      console.log(this.nombreNuevoJugador);
      this.nuevoJugador = new Jugador(this.getNewIDJugador(), this.nombreNuevoJugador, "images/avatar"+(this.jugadores.length+1)+".png", 0, 0, 0);
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
    if(this.jugadores.length >= TrivialConf.MIN_JUGADORES){
      let partida: Partida = new Partida(this.getNewIDPartida(), this.jugadores, this._partidasService.getPreguntas(), true);
      console.log(partida);
      this._partidasService.insertPartida(partida);
      console.log(this._partidasService.getPartidas());
      this._router.navigate(["Juego", {id: partida.id}]);
    }else{
      window.alert("Deben haber registrados al menos 2 jugadores");
    }
  }

  onJugarTest(){
    this._router.navigate(["Juego", {id: 1}]);
  }

  getNewIDPartida(){
    return this.ultimoIDPartida+=1;
  }
}
