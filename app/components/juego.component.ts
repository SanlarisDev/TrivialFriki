import {Component, OnInit} from "angular2/core";
import {CabeceraComponent} from "./cabecera.component";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {Pregunta} from "../models/pregunta.model";
import {JUGADORES, PARTIDAS} from "../services/mock.partidas";
import {PartidasService} from "../services/partidas.service";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "Juego",
  templateUrl: "app/views/juego.html",
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES, CabeceraComponent]
})

export class JuegoComponent implements OnInit{
  public actualPartida: Partida;

  public preguntas: Array<Object>; // Listado de preguntas de la partida
  public preguntaActual: Pregunta; // Pregunta actual
  public indexPreguntaActual: number; // Index de la pregunta actual
  public preguntaVacia: Pregunta;

  constructor(private _partidasService: PartidasService, private _router: Router, private _routeParams: RouteParams){
    this.preguntas = []; // Inicialización del array
    this.preguntaVacia = new Pregunta(0,"","","","","",0);
    this.preguntaActual = this.preguntaVacia;
  }

  ngOnInit(): any {
      // Al iniciar la pantalla obtengo la partida actual
      // cuyo ID no los envían por parámetro
      var partidas: Array<Partida> =  this._partidasService.getPartidas();
      var id: number = parseInt(this._routeParams.get('id'));

      for(var i=0; i < partidas.length; i++){
          if(partidas[i].id == id){
            this.actualPartida = partidas[i];
        }
      }

      this.jugar();
    }

    jugar(){
      var finPartida = false;
      var finPregunta = false;

      // Me guardo el listado de las preguntas de la partida actual
      this.preguntas = this.actualPartida.preguntas;
      console.log(this.actualPartida);
      console.log(this.preguntas);

      while(!finPartida){
         var myVar=setTimeout(this.getPreguntaAleatoria(), 5000);
         finPartida = true;
      }

    }

  getPreguntaAleatoria(){
    // Obtiene un index aleatorio de todas las preguntas
    this.indexPreguntaActual = Math.floor(Math.random() * (this.preguntas.length-1)) +1;
    this.preguntaActual = <Pregunta> this.preguntas[this.indexPreguntaActual];
    console.log(this.preguntaActual);
  }


}
