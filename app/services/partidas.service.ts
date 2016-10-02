// Con esto le decimos que este archivo va a ser un servicio, un injectable
import {Injectable} from "angular2/core";
import {JUGADORES, PREGUNTAS, PARTIDAS} from "./mock.partidas";
import {Jugador} from "../models/jugador.model";
import {Pregunta} from "../models/pregunta.model";
import {Partida} from "../models/partida.model";

@Injectable()

export class PartidasService {
  getJugadores() {
    return JUGADORES;
  }
  getPreguntas() {
    return PREGUNTAS;
  }
  getPartidas() {
    return PARTIDAS;
  }

  insertJugadores(jugador: Jugador) {
    Promise.resolve(JUGADORES).then((jugadores: Jugador[]) => jugadores.push(jugador));
  }

  insertPartida(partida: Partida) {
    Promise.resolve(PARTIDAS).then((partidas: Partida[]) => partidas.push(partida));
  }
}
