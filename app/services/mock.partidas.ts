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
  public Pregunta3: Pregunta;
  public Pregunta4: Pregunta;
  public Pregunta5: Pregunta;
  public Pregunta6: Pregunta;
  public Pregunta7: Pregunta;
  public Pregunta8: Pregunta;
  public Pregunta9: Pregunta;
  public Pregunta10: Pregunta;

  constructor(){
    this.Jugador1 = new Jugador(1, "Grupo 1", "images/avatar1.png", 50, 87, 100);
    this.Jugador2 = new Jugador(2, "Grupo 2", "images/avatar2.png", 20, 65, 20);
    this.Jugador3 = new Jugador(3, "Grupo 3", "images/avatar3.png", 30, 83, 30);
    this.Jugador4 = new Jugador(4, "Grupo 4", "images/avatar4.png", 10, 68, 40);

    this.Pregunta1 = new Pregunta(1, "¿Quién marcó el gol que le dió el mundial a la Selección Española?",
                                                  "Pepito Pérez", "Sergio Ramos", "Andrés Iniesta", "Luis Aragonés", 2);

    this.Pregunta2 = new Pregunta(2, "¿En qué año se descubrió América?",
                                                  "1962", "1492", "2015", "1568", 1);

    this.Pregunta3 = new Pregunta(3, "En Marketing Digital ¿En qué nos ayuda el SEO?",
                                                  "A vender más servicios o productos", "A tener una web más bonita", "A mejorar la funcionalidad", "A mejorar nuestro posicionamiento", 3);

    this.Pregunta4 = new Pregunta(4, "¿Quién es el actual rey de España?",
                                                  "Don Juan Carlos I", "Don Felipe VI", "Don Felipe V", "Don Carlos III", 1);

    this.Pregunta5 = new Pregunta(5, "¿En qué ciudad del mundo nunca se pone el Sol?",
                                                  "Nueva York", "Tokyo", "Ibiza", "Sevilla", 0);

    this.Pregunta6 = new Pregunta(6, "¿Cómo se llama el protagonista del videojuego 'The Legend of Zelda'?",
                                                  "Zelda", "Link", "Navy", "Ganondorf", 1);

    this.Pregunta7 = new Pregunta(7, "Di qué pelicula no pertenece al mismo estudio de animación",
                                                  "Big Hero 6", "Enredados", "Frozen", "Totoro", 3);

    this.Pregunta8 = new Pregunta(8, "¿Quién comentó la famosa frase 'Sólo sé que no sé nada'?",
                                                  "Steves Jobs", "Jesucristo", "Rajoy", "Platón", 3);

    this.Pregunta9 = new Pregunta(9, "¿Qué personaje de ámbito político nacional ha dimitido recientemente de su puesto?",
                                                  "Rajoy", "Pedro Sánchez", "Pablo Iglesias", "Albert Rivera", 1);

    this.Pregunta10 = new Pregunta(10, "¿Qué nota se le va a poner a este proyecto?",
                                                  "2", "4,50", "7", "¡ 10 !", 3);




  }

  getmockJugadores(){
    return [this.Jugador1, this.Jugador2, this.Jugador3, this.Jugador4];
  }

  getmockJugadoresPartida(){
    return [this.Jugador1, this.Jugador2];
  }

  getmockPreguntasPartida(){
    return [this.Pregunta1, this.Pregunta2, this.Pregunta3, this.Pregunta4, this.Pregunta5, this.Pregunta6, this.Pregunta7, this.Pregunta8, this.Pregunta9, this.Pregunta10];
  }

  getmockPreguntas(){
    return [this.Pregunta1, this.Pregunta2, this.Pregunta3, this.Pregunta4, this.Pregunta5, this.Pregunta6, this.Pregunta7, this.Pregunta8, this.Pregunta9, this.Pregunta10];
  }
}

export const JUGADORES: Jugador[] = new mockPartidas().getmockJugadores();

export const PARTIDAS: Partida[] = [
  new Partida(1, new mockPartidas().getmockJugadoresPartida(), new mockPartidas().getmockPreguntasPartida(), true)
];

export const PREGUNTAS: Pregunta[] = new mockPartidas().getmockPreguntas();
