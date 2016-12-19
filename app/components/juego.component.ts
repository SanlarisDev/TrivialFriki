import {Component, OnInit} from "angular2/core";
import {CabeceraComponent} from "./cabecera.component";
import {Jugador} from "../models/jugador.model";
import {Partida} from "../models/partida.model";
import {Pregunta} from "../models/pregunta.model";
import {JUGADORES, PARTIDAS} from "../services/mock.partidas";
import {PartidasService} from "../services/partidas.service";
import {TrivialConf}  from "../services/mock.config";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams} from "angular2/router"; //Necesario para tener enlace desde app.component

@Component({
  selector: "Juego",
  templateUrl: "app/views/juego.html",
  providers: [PartidasService],
  directives: [ROUTER_DIRECTIVES, CabeceraComponent]
})


export class JuegoComponent implements OnInit{
  /* ----- SCOPE */
  public preguntaActual: Pregunta; // Pregunta actual
  public jugadores: Jugador[];
  public idJugadorPenalizado: number;
  public idJugadorElegido: number;
  public ganador: Jugador;

  /* ----- Variables globales de eventos */
  public eventKeyJugador;
  public eventKeyOpcion;

  /* ----- Variables de tiempo */
  // Variables del tiempo
  public tiempoRestante: number;
  public totalPregunta: number;
  public segPregunta: number;
  public tamanoBarraActual: number;

  public totalOpcion: number;
  public segOpcion: number;

  public fase: number;

  //ID intervalos y setimeout
  public vBarTimer;
  public vSegTimer;
  public vSegTotal;

  public vBarTimerOp;
  public vSegTimerOp;
  public vSegTotalOp;
  
  /* ----- Variables globales */
  public actualPartida: Partida;
  public preguntas: Array<Object>; // Listado de preguntas de la partida

  public indexPreguntaActual: number; // Index de la pregunta actual
  public preguntaVacia: Pregunta;

  public indexJugador: number;
  public indexRespuesta: number;
  public esRebote: boolean;
  public jugadorPenalizado: number;
  public numPreguntas: number;

  constructor(private _partidasService: PartidasService, private _router: Router, private _routeParams: RouteParams){
    // Inicializaciones:

    // Arrays
    this.preguntas = [];
    this.jugadores = [];

    // Objetos
    this.preguntaVacia = new Pregunta(-1,"","","","","",0);
    this.preguntaActual = this.preguntaVacia;

    //Indices
    this.indexJugador = -1;
    this.indexRespuesta = -1;

    // Momentos y fases
    this.fase = TrivialConf.FASE_NUEVA_PREGUNTA;
    this.esRebote = false;

    // Scope
    this.jugadorPenalizado = -1;
    this.idJugadorPenalizado = -1;
    this.idJugadorElegido = -1;
    this.ganador = new Jugador(-1,"","",-1,-1,-1);

    // Tiempos
    this.segPregunta = TrivialConf.TIEMPO_PREGUNTA * 1000;
    this.segOpcion = TrivialConf.TIEMPO_OPCION * 1000;

    this.numPreguntas = 0;
    this.tiempoRestante = this.segPregunta;

    this.totalPregunta = TrivialConf.TIEMPO_PREGUNTA * 1000;
    this.tamanoBarraActual = 0;


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
    //Obtengo el array de jugadores y lo asigno a la variable global
    this.jugadores = <Jugador[]> this.actualPartida.jugadores;
    this.inicializarPartida();

    //Obtengo el array de preguntas y lo adigno a la variable global
    this.preguntas = this.actualPartida.preguntas;

    //Empieza el juego
    this.jugar();
  }

  inicializarPartida(){
    var i=0;
    for(let jugador of this.jugadores){
      jugador.puntosPartida= 0;
      i += 1;
      switch(i){
        case 1:
          jugador.teclaPartida=TrivialConf.KEY_W;
        case 2:
          jugador.teclaPartida=TrivialConf.KEY_A;
        case 3:
          jugador.teclaPartida=TrivialConf.KEY_S;
        case 4:
          jugador.teclaPartida=TrivialConf.KEY_D;
        case 5:
          jugador.teclaPartida=TrivialConf.KEY_F;
        case 6:
          jugador.teclaPartida=TrivialConf.KEY_G;
        }
    }
  }
  /* ****************************************** */
  /* **************** EL JUEGO **************** */
  /* ****************************************** */

    jugar(){
      var finPartida = false;
      var finPregunta = false;
      var nPreguntas = 0;
      var intervalGame;

      intervalGame=setInterval(() =>{
                          if(this.fase==TrivialConf.FASE_NUEVA_PREGUNTA && nPreguntas <=TrivialConf.N_PREGUNTAS){
                            this.getSiguiente()
                            this.pausa(this.getPreguntaAleatoria(), 100);
                            this.fase=TrivialConf.FASE_DESACTIVADA;
                          }else if(this.fase==TrivialConf.FASE_FIN_JUEGO){
                            console.log("Fin del Juego");

                            setTimeout(()=>this.finDelJuego(),2000);

                            clearInterval(intervalGame);
                            setTimeout(()=>{this._router.navigate(["Inicio"])} ,5000);
                          }

                        }, 100);

    }

  activarKeys(){
    this.eventKeyJugador = document.addEventListener('keydown', (e :KeyboardEvent)=>{
                            console.log(e.keyCode);
                            if(this.obtenerJugadorPorKey(e.keyCode) && this.fase==TrivialConf.FASE_JUGADOR && this.indexJugador!=this.jugadorPenalizado){
                              
                              clearInterval(this.vBarTimer);
                              clearInterval(this.vSegTimer);
                              clearTimeout(this.vSegTotal);

                              this.idJugadorElegido = this.jugadores[this.indexJugador].id;
                              console.log("Jugador:" + this.indexJugador);
                              console.log("¿Jugador penalizado?: "+this.jugadorPenalizado);
                              
                              this.fase=TrivialConf.FASE_OPCION;

                              this.tiempoRestante = this.segPregunta;
                              console.log("Tiempo restante"+ this.tiempoRestante);
                              
                              this.pausa(this.getBarraDeTiempoOp(), 1000);
                              
                              console.log("Jugador:" + this.indexJugador);
                            }
                        });

    this.eventKeyOpcion = document.addEventListener('keydown', (e :KeyboardEvent)=>{
                            if(this.obtenerOpcionPorKey(e.keyCode) && this.fase==TrivialConf.FASE_OPCION){

                              clearInterval(this.vBarTimerOp);
                              clearInterval(this.vSegTimerOp);
                              clearTimeout(this.vSegTotalOp);
                              

                              console.log("IndexRespuesta"+this.indexRespuesta);
                              // Si No es rebote y el jugador No acierta --> Fase Jugador y Jugador penalizado indice
                              // Si No es rebote y el jugador acierta --> Fase Desactivada y Jugador penalizado 0
                              // Si es rebote y el jugador No acierta --> Fase Desactivada y Jugador penalizado 0
                              // Si es rebote y el jugador acierta --> Fase Desactivada y Jugador penalizado 0
                              // En los dos casos de acierto, el jugador seleccionado ganará puntos
                              if(!this.esRebote && !this.comprobarRespuesta()){
                                // Fase Jugador
                                this.fase=TrivialConf.FASE_JUGADOR;
                                //Jugador penalizado
                                this.jugadorPenalizado = this.indexJugador;

                                this.idJugadorPenalizado = this.jugadores[this.indexJugador].id;
                                this.esRebote = true;
                                this.getFallo();

                                this.pausa(this.getBarraDeTiempo(),1000);

                              }else{
                                //Si respuesta correcta
                                if(this.comprobarRespuesta()){
                                  var jugadorGana = <Jugador> this.actualPartida.jugadores[this.indexJugador];
                                  
                                  jugadorGana.puntosPartida+=TrivialConf.PUNTOS_ACIERTO;
                                  
                                  this.getAcierto();
                                }else{
                                  this.getFallo();
                                }

                                clearInterval(this.vBarTimer);
                                clearInterval(this.vSegTimer);
                                clearTimeout(this.vSegTotal);                               
                                
                                
                                this.pausa(this.comprobarFinJuego(), 2000);
                                console.log("ID jugador elegido "+this.idJugadorElegido);
                                this.inicializarTrasPregunta();
                                console.log("ID jugador elegido "+this.idJugadorElegido);

                              }
                            }
                        });
  }

  inicializarTrasPregunta(){
    this.jugadorPenalizado=-1;
    this.idJugadorElegido=-1;
    this.idJugadorPenalizado=-1;
    this.esRebote = false;
    this.segOpcion = 10;
    this.segPregunta = TrivialConf.TIEMPO_PREGUNTA * 1000;
    this.segOpcion = TrivialConf.TIEMPO_OPCION * 1000;
    this.tiempoRestante = this.segPregunta;
    this.totalPregunta = TrivialConf.TIEMPO_PREGUNTA * 1000;
    this.tamanoBarraActual = 0;

    // Eliminamos la pregunta actual para que no se repita
    this.preguntas.splice(this.indexPreguntaActual,1);
  }

  asignarPreguntaActual(){
      console.log(this.preguntas);
      this.preguntaActual = <Pregunta> this.preguntas[this.indexPreguntaActual];
      this.pausa(this.getBarraDeTiempo(),1000);
  }

  getPreguntaAleatoria(){
    this.preguntaActual = new Pregunta(0,"","","","","",0);
    // Obtiene un index aleatorio de todas las preguntas
    this.indexPreguntaActual = Math.floor(Math.random() * (this.preguntas.length));
    console.log("index pregutna actual:"+this.indexPreguntaActual);
    setTimeout(()=>{
                    this.asignarPreguntaActual();
                    this.activarKeys();
                    this.fase=TrivialConf.FASE_JUGADOR;
                  }, 1500);
  }

  getFallo(){
    document.getElementById("alertRespuesta").style.display="block";
    document.getElementById("alertFallo").style.display="block";
    setTimeout(()=>{document.getElementById("alertFallo").style.display="none",
                    document.getElementById("alertRespuesta").style.display="none";}, 1000);
  }

  getAcierto(){
    document.getElementById("alertRespuesta").style.display="block";
    document.getElementById("alertAcierto").style.display="block";
    setTimeout(()=>{document.getElementById("alertAcierto").style.display="none";
                    document.getElementById("alertRespuesta").style.display="none";}, 1000);
  }

  getSiguiente(){
    document.getElementById("alertRespuesta").style.display="block";
    document.getElementById("alertSiguiente").style.display="block";
    setTimeout(()=>{document.getElementById("alertSiguiente").style.display="none";
                    document.getElementById("alertRespuesta").style.display="none";}, 2000);
  }

  getBarraDeTiempo(){
    //Inicializamos colores y segundos en la barra de tiempo
    //console.log("Entra en barra de tiempo");
    var r, g, b;
    function obtenerRGB(){
      var colores=document.getElementById("progress-bar").style.backgroundColor;
      colores.substring(3);
      r=colores.split("\( \,")[0];
      g=colores.split("\( \,")[1];
      b=colores.split("\( \,")[2];
    }

    document.getElementById("progress-bar").style.backgroundColor = "rgb("+r+","+g+","+b+")";
    
    // ********* BARRA tiempo
    this.vBarTimer = setInterval(()=>{
                    this.tamanoBarraActual +=100;
                    document.getElementById("progress-bar").style.width = (this.tamanoBarraActual/(TrivialConf.TIEMPO_PREGUNTA*10)) +"%";

                    if(this.tamanoBarraActual>17000){
                      r+=10; b-=20; g-=5;
                      document.getElementById("progress-bar").style.backgroundColor = "rgb("+r+","+g+","+b+")";
                    }
                    //console.log("--------- BARRA TIEMPO ---------");
                    //console.log(this.tamanoBarraActual);

    }, 100);

    // ********* SEGUNDOS tiempo
    this.vSegTimer = setInterval(()=>{
                       this.segPregunta-=1000;
                       document.getElementById("progress-seg").innerHTML = ((this.segPregunta)/1000)+"s";
                       
                       //console.log("--------- NUM SEGUNDOS TIEMPO ---------");
                       //console.log((this.segPregunta - this.tiempoRestante)/1000);
    }, 1000);

    console.log("tiempo restante: "+this.tiempoRestante);
    var cont=0; // Para pruebas
    // ********* PREGUNTA tiempo
     this.vSegTotal = setTimeout(()=>{
       clearInterval(this.vBarTimer);
       clearInterval(this.vSegTimer);
       clearTimeout(this.vSegTotal);

       this.pausa(this.comprobarFinJuego(),100);
       this.inicializarTrasPregunta();
       this.getSiguiente();
       cont++; // Para pruebas
       console.log("contador: "+cont); // Para pruebas

       console.log("--------- finPregunta ---------");
       console.log(this.tiempoRestante);

     }
      ,this.tiempoRestante);
  }

  getBarraDeTiempoOp(){
    var a=0;
    var r=66; var g=139; var b=202;
    document.getElementById("progress-bar-op").style.backgroundColor = "rgb("+r+","+g+","+b+")";

    document.getElementById("progress-bar-op").style.display = "block";
    this.vBarTimerOp = setInterval(()=>{
      a++;
      document.getElementById("progress-bar-op").style.width = (a)+"%";
      if(a>70){
        r+=10;
        b-=20;
        g-=5;
        document.getElementById("progress-bar-op").style.backgroundColor = "rgb("+r+","+g+","+b+")";
      }

      console.log("Seg: "+a);
      if(a==100){
        clearInterval(this.vBarTimerOp);
      }
    }, (TrivialConf.TIEMPO_OPCION*1000)/100);

    var i=TrivialConf.TIEMPO_OPCION;
    this.vSegTimerOp = setInterval(()=>{

      i--;
      document.getElementById("progress-seg-op").innerHTML = i+"s";
      //console.log("PUTA "+i);
      if(i==0){
        clearInterval(this.vSegTimerOp);
        //console.log("DEBE MORIR");
      }
    }, 1000);
    

     this.vSegTotalOp = setTimeout( function(){
       clearInterval(this.vBarTimerOp);
       clearInterval(this.vSegTimerOp);
       clearTimeout(this.vSegTotalOp);

       console.log("Final tiempo opción");

       a=0;
       document.getElementById("progress-bar-op").style.display = "none";

       if(!this.esRebote){
          this.fase=TrivialConf.FASE_JUGADOR;
          console.log(this.indexJugador);
          this.jugadorPenalizado = this.indexJugador;

          this.idJugadorPenalizado = this.jugadores[this.indexJugador].id;
          this.esRebote = true;
          this.pausa(this.getBarraDeTiempo(),1000);
        }else{
          clearInterval(this.vBarTimer);
          clearInterval(this.vSegTimer);
          clearTimeout(this.vSegTotal);
          this.pausa(this.comprobarFinJuego(), 2000);
          this.inicializarTrasPregunta();
        }
     }
      , TrivialConf.TIEMPO_OPCION*1000)
  }

  obtenerJugadorPorKey(e){
    switch(e){
      case TrivialConf.KEY_W: // W
        this.indexJugador = 0;
        return true;
      case TrivialConf.KEY_A: // A
        this.indexJugador = 1;
        return true;
      case TrivialConf.KEY_S: // S
        if(this.jugadores.length>=3){
          this.indexJugador = 2;
          return true;
        }
      case TrivialConf.KEY_D: // D
        if(this.jugadores.length>=4){
          this.indexJugador = 3;
          return true;
        }
      case TrivialConf.KEY_F: // F
        if(this.jugadores.length>=5){
          this.indexJugador = 4;
          return true;
        }
      case TrivialConf.KEY_G: // G
        if(this.jugadores.length>=6){
          this.indexJugador = 5;
          return true;
        }
      default:
        return false;
    }
  }

  obtenerOpcionPorKey(e){
    switch(e){
      case TrivialConf.KEY_ARROW_UP: // Kiwi
        this.indexRespuesta = 0;
        console.log("kiwi");
        return true;
      case TrivialConf.KEY_ARROW_LEFT: // Naranja
        this.indexRespuesta = 1;
        console.log("naranja");
        return true;
      case TrivialConf.KEY_ARROW_DOW: // manzana
        this.indexRespuesta = 2;
        console.log("manzana");
        return true;
      case TrivialConf.KEY_ARROW_RIGHT: // platano


        this.indexRespuesta = 3;
        console.log("platano");
        return true;
      default:
        return false;
    }
  }

  comprobarRespuesta(){
    if(this.indexRespuesta==(this.preguntaActual.opcionCorrecta)){
        console.log("acertaste");
      return true;
    }else if(this.indexRespuesta <=0 || this.indexRespuesta >=3){
      console.log("No acertaste");
      return false;
    }else{
      return false;
    }

  }

  comprobarFinJuego(){
    if(this.numPreguntas < TrivialConf.N_PREGUNTAS-1){
    //Inicializar fase
      this.numPreguntas++;
      this.fase=TrivialConf.FASE_NUEVA_PREGUNTA;
    }else{
      this.fase=TrivialConf.FASE_FIN_JUEGO;
    }
  }

  finDelJuego(){
    this.comprobarGanador();
    document.getElementById("alertRespuesta").style.display="block";
    document.getElementById("alertGanador").style.display="block";
  }

  comprobarGanador(){
    var ganador=new Jugador(-1, "", "", -1, -1, -1);
    for(let jugador of this.jugadores){
      if(ganador.puntosPartida < jugador.puntosPartida){
        ganador=jugador;
      }
    }
    this.ganador=ganador;
  }

  pausa(funcion, tiempo){
    setInterval(()=>funcion, tiempo);
  }
}
