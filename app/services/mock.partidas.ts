import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {Pregunta} from "../models/pregunta.model";

class mockPartidas{
  public Jugador1: Jugador;
  public Jugador2: Jugador;
  public Jugador3: Jugador;
  public Jugador4: Jugador;

  public Pregunta1: Pregunta;
  public Pregunta2: Pregunta;

  constructor(){
    this.Jugador1 = new Jugador(1, "Grupo 1", "images/avatar1.jpg", 0);
    this.Jugador2 = new Jugador(2, "Grupo 2", "images/avatar2.png", 0);
    this.Jugador3 = new Jugador(3, "Grupo 3", "images/avatar3.png", 0);
    this.Jugador4 = new Jugador(4, "Grupo 4", "images/avatar4.png", 0);

    this.Pregunta1 = new Pregunta(1, "¿Quién marcó el gol que le dió el mundial a la Selección Española?",
                                                  "Pepito Pérez", "Sergio Ramos", "Andrés Iniesta", "Luis Aragonés", 2);
    this.Pregunta2 = new Pregunta(2, "¿En qué año se descubrió America?",
                                                  "1692", "1492", "2015", "568", 1);
  }

  getmockJugadores(){
    return [this.Jugador1, this.Jugador2, this.Jugador3, this.Jugador4];
  }

  getmockJugadoresPartida(){
    return [this.Jugador1, this.Jugador2];
  }

  getmockPreguntasPartida(){
    return [this.Pregunta1, this.Pregunta2];
  }

  getmockPreguntas(){
    return [this.Pregunta1, this.Pregunta2];
  }
}

export const JUGADORES: Jugador[] = new mockPartidas().getmockJugadores();

export const PARTIDAS: Partida[] = [
  new Partida(1, new mockPartidas().getmockJugadoresPartida(), new mockPartidas().getmockPreguntasPartida(), ["W","D"], [1,1], [1,1], true)
];

export const PREGUNTAS: Pregunta[] = new mockPartidas().getmockPreguntas();
