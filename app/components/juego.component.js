System.register(["angular2/core", "./cabecera.component", "../models/jugador.model", "../models/pregunta.model", "../services/partidas.service", "../services/mock.config", "angular2/router"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, cabecera_component_1, jugador_model_1, pregunta_model_1, partidas_service_1, mock_config_1, router_1;
    var JuegoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cabecera_component_1_1) {
                cabecera_component_1 = cabecera_component_1_1;
            },
            function (jugador_model_1_1) {
                jugador_model_1 = jugador_model_1_1;
            },
            function (pregunta_model_1_1) {
                pregunta_model_1 = pregunta_model_1_1;
            },
            function (partidas_service_1_1) {
                partidas_service_1 = partidas_service_1_1;
            },
            function (mock_config_1_1) {
                mock_config_1 = mock_config_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            JuegoComponent = (function () {
                function JuegoComponent(_partidasService, _router, _routeParams) {
                    // Inicializaciones:
                    this._partidasService = _partidasService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    // Arrays
                    this.preguntas = [];
                    this.jugadores = [];
                    // Objetos
                    this.preguntaVacia = new pregunta_model_1.Pregunta(-1, "", "", "", "", "", 0);
                    this.preguntaActual = this.preguntaVacia;
                    //Indices
                    this.indexJugador = -1;
                    this.indexRespuesta = -1;
                    // Momentos y fases
                    this.fase = mock_config_1.TrivialConf.FASE_NUEVA_PREGUNTA;
                    this.esRebote = false;
                    // Scope
                    this.jugadorPenalizado = -1;
                    this.idJugadorPenalizado = -1;
                    this.idJugadorElegido = -1;
                    this.ganador = new jugador_model_1.Jugador(-1, "", "", -1, -1, -1);
                    // Tiempos
                    this.segPregunta = mock_config_1.TrivialConf.TIEMPO_PREGUNTA * 1000;
                    this.segOpcion = mock_config_1.TrivialConf.TIEMPO_OPCION * 1000;
                    this.numPreguntas = 0;
                    this.tiempoRestante = this.segPregunta;
                    this.totalPregunta = mock_config_1.TrivialConf.TIEMPO_PREGUNTA * 1000;
                    this.tamanoBarraActual = 0;
                }
                JuegoComponent.prototype.ngOnInit = function () {
                    // Al iniciar la pantalla obtengo la partida actual
                    // cuyo ID no los envían por parámetro
                    var partidas = this._partidasService.getPartidas();
                    var id = parseInt(this._routeParams.get('id'));
                    for (var i = 0; i < partidas.length; i++) {
                        if (partidas[i].id == id) {
                            this.actualPartida = partidas[i];
                        }
                    }
                    //Obtengo el array de jugadores y lo asigno a la variable global
                    this.jugadores = this.actualPartida.jugadores;
                    this.inicializarPartida();
                    //Obtengo el array de preguntas y lo adigno a la variable global
                    this.preguntas = this.actualPartida.preguntas;
                    //Empieza el juego
                    this.jugar();
                };
                JuegoComponent.prototype.inicializarPartida = function () {
                    var i = 0;
                    for (var _i = 0, _a = this.jugadores; _i < _a.length; _i++) {
                        var jugador = _a[_i];
                        jugador.puntosPartida = 0;
                        i += 1;
                        switch (i) {
                            case 1:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_W;
                            case 2:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_A;
                            case 3:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_S;
                            case 4:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_D;
                            case 5:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_F;
                            case 6:
                                jugador.teclaPartida = mock_config_1.TrivialConf.KEY_G;
                        }
                    }
                };
                /* ****************************************** */
                /* **************** EL JUEGO **************** */
                /* ****************************************** */
                JuegoComponent.prototype.jugar = function () {
                    var _this = this;
                    var finPartida = false;
                    var finPregunta = false;
                    var nPreguntas = 0;
                    var intervalGame;
                    intervalGame = setInterval(function () {
                        if (_this.fase == mock_config_1.TrivialConf.FASE_NUEVA_PREGUNTA && nPreguntas <= mock_config_1.TrivialConf.N_PREGUNTAS) {
                            _this.getSiguiente();
                            _this.pausa(_this.getPreguntaAleatoria(), 100);
                            _this.fase = mock_config_1.TrivialConf.FASE_DESACTIVADA;
                        }
                        else if (_this.fase == mock_config_1.TrivialConf.FASE_FIN_JUEGO) {
                            console.log("Fin del Juego");
                            setTimeout(function () { return _this.finDelJuego(); }, 2000);
                            clearInterval(intervalGame);
                            setTimeout(function () { _this._router.navigate(["Inicio"]); }, 5000);
                        }
                    }, 100);
                };
                JuegoComponent.prototype.activarKeys = function () {
                    var _this = this;
                    this.eventKeyJugador = document.addEventListener('keydown', function (e) {
                        console.log(e.keyCode);
                        if (_this.obtenerJugadorPorKey(e.keyCode) && _this.fase == mock_config_1.TrivialConf.FASE_JUGADOR && _this.indexJugador != _this.jugadorPenalizado) {
                            clearInterval(_this.vBarTimer);
                            clearInterval(_this.vSegTimer);
                            clearTimeout(_this.vSegTotal);
                            _this.idJugadorElegido = _this.jugadores[_this.indexJugador].id;
                            console.log("Jugador:" + _this.indexJugador);
                            console.log("¿Jugador penalizado?: " + _this.jugadorPenalizado);
                            _this.fase = mock_config_1.TrivialConf.FASE_OPCION;
                            _this.tiempoRestante = _this.segPregunta;
                            console.log("Tiempo restante" + _this.tiempoRestante);
                            _this.pausa(_this.getBarraDeTiempoOp(), 1000);
                            console.log("Jugador:" + _this.indexJugador);
                        }
                    });
                    this.eventKeyOpcion = document.addEventListener('keydown', function (e) {
                        if (_this.obtenerOpcionPorKey(e.keyCode) && _this.fase == mock_config_1.TrivialConf.FASE_OPCION) {
                            clearInterval(_this.vBarTimerOp);
                            clearInterval(_this.vSegTimerOp);
                            clearTimeout(_this.vSegTotalOp);
                            console.log("IndexRespuesta" + _this.indexRespuesta);
                            // Si No es rebote y el jugador No acierta --> Fase Jugador y Jugador penalizado indice
                            // Si No es rebote y el jugador acierta --> Fase Desactivada y Jugador penalizado 0
                            // Si es rebote y el jugador No acierta --> Fase Desactivada y Jugador penalizado 0
                            // Si es rebote y el jugador acierta --> Fase Desactivada y Jugador penalizado 0
                            // En los dos casos de acierto, el jugador seleccionado ganará puntos
                            if (!_this.esRebote && !_this.comprobarRespuesta()) {
                                // Fase Jugador
                                _this.fase = mock_config_1.TrivialConf.FASE_JUGADOR;
                                //Jugador penalizado
                                _this.jugadorPenalizado = _this.indexJugador;
                                _this.idJugadorPenalizado = _this.jugadores[_this.indexJugador].id;
                                _this.esRebote = true;
                                _this.getFallo();
                                _this.pausa(_this.getBarraDeTiempo(), 1000);
                            }
                            else {
                                //Si respuesta correcta
                                if (_this.comprobarRespuesta()) {
                                    var jugadorGana = _this.actualPartida.jugadores[_this.indexJugador];
                                    jugadorGana.puntosPartida += mock_config_1.TrivialConf.PUNTOS_ACIERTO;
                                    _this.getAcierto();
                                }
                                else {
                                    _this.getFallo();
                                }
                                clearInterval(_this.vBarTimer);
                                clearInterval(_this.vSegTimer);
                                clearTimeout(_this.vSegTotal);
                                _this.pausa(_this.comprobarFinJuego(), 2000);
                                console.log("ID jugador elegido " + _this.idJugadorElegido);
                                _this.inicializarTrasPregunta();
                                console.log("ID jugador elegido " + _this.idJugadorElegido);
                            }
                        }
                    });
                };
                JuegoComponent.prototype.inicializarTrasPregunta = function () {
                    this.jugadorPenalizado = -1;
                    this.idJugadorElegido = -1;
                    this.idJugadorPenalizado = -1;
                    this.esRebote = false;
                    this.segOpcion = 10;
                    this.segPregunta = mock_config_1.TrivialConf.TIEMPO_PREGUNTA * 1000;
                    this.segOpcion = mock_config_1.TrivialConf.TIEMPO_OPCION * 1000;
                    this.tiempoRestante = this.segPregunta;
                    this.totalPregunta = mock_config_1.TrivialConf.TIEMPO_PREGUNTA * 1000;
                    this.tamanoBarraActual = 0;
                    // Eliminamos la pregunta actual para que no se repita
                    this.preguntas.splice(this.indexPreguntaActual, 1);
                };
                JuegoComponent.prototype.asignarPreguntaActual = function () {
                    console.log(this.preguntas);
                    this.preguntaActual = this.preguntas[this.indexPreguntaActual];
                    this.pausa(this.getBarraDeTiempo(), 1000);
                };
                JuegoComponent.prototype.getPreguntaAleatoria = function () {
                    var _this = this;
                    this.preguntaActual = new pregunta_model_1.Pregunta(0, "", "", "", "", "", 0);
                    // Obtiene un index aleatorio de todas las preguntas
                    this.indexPreguntaActual = Math.floor(Math.random() * (this.preguntas.length));
                    console.log("index pregutna actual:" + this.indexPreguntaActual);
                    setTimeout(function () {
                        _this.asignarPreguntaActual();
                        _this.activarKeys();
                        _this.fase = mock_config_1.TrivialConf.FASE_JUGADOR;
                    }, 1500);
                };
                JuegoComponent.prototype.getFallo = function () {
                    document.getElementById("alertRespuesta").style.display = "block";
                    document.getElementById("alertFallo").style.display = "block";
                    setTimeout(function () {
                        document.getElementById("alertFallo").style.display = "none",
                            document.getElementById("alertRespuesta").style.display = "none";
                    }, 1000);
                };
                JuegoComponent.prototype.getAcierto = function () {
                    document.getElementById("alertRespuesta").style.display = "block";
                    document.getElementById("alertAcierto").style.display = "block";
                    setTimeout(function () {
                        document.getElementById("alertAcierto").style.display = "none";
                        document.getElementById("alertRespuesta").style.display = "none";
                    }, 1000);
                };
                JuegoComponent.prototype.getSiguiente = function () {
                    document.getElementById("alertRespuesta").style.display = "block";
                    document.getElementById("alertSiguiente").style.display = "block";
                    setTimeout(function () {
                        document.getElementById("alertSiguiente").style.display = "none";
                        document.getElementById("alertRespuesta").style.display = "none";
                    }, 2000);
                };
                JuegoComponent.prototype.getBarraDeTiempo = function () {
                    var _this = this;
                    //Inicializamos colores y segundos en la barra de tiempo
                    //console.log("Entra en barra de tiempo");
                    var r, g, b;
                    function obtenerRGB() {
                        var colores = document.getElementById("progress-bar").style.backgroundColor;
                        colores.substring(3);
                        r = colores.split("\( \,")[0];
                        g = colores.split("\( \,")[1];
                        b = colores.split("\( \,")[2];
                    }
                    document.getElementById("progress-bar").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                    // ********* BARRA tiempo
                    this.vBarTimer = setInterval(function () {
                        _this.tamanoBarraActual += 100;
                        document.getElementById("progress-bar").style.width = (_this.tamanoBarraActual / (mock_config_1.TrivialConf.TIEMPO_PREGUNTA * 10)) + "%";
                        if (_this.tamanoBarraActual > 17000) {
                            r += 10;
                            b -= 20;
                            g -= 5;
                            document.getElementById("progress-bar").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                        }
                        //console.log("--------- BARRA TIEMPO ---------");
                        //console.log(this.tamanoBarraActual);
                    }, 100);
                    // ********* SEGUNDOS tiempo
                    this.vSegTimer = setInterval(function () {
                        _this.segPregunta -= 1000;
                        document.getElementById("progress-seg").innerHTML = ((_this.segPregunta) / 1000) + "s";
                        //console.log("--------- NUM SEGUNDOS TIEMPO ---------");
                        //console.log((this.segPregunta - this.tiempoRestante)/1000);
                    }, 1000);
                    console.log("tiempo restante: " + this.tiempoRestante);
                    var cont = 0; // Para pruebas
                    // ********* PREGUNTA tiempo
                    this.vSegTotal = setTimeout(function () {
                        clearInterval(_this.vBarTimer);
                        clearInterval(_this.vSegTimer);
                        clearTimeout(_this.vSegTotal);
                        _this.pausa(_this.comprobarFinJuego(), 100);
                        _this.inicializarTrasPregunta();
                        _this.getSiguiente();
                        cont++; // Para pruebas
                        console.log("contador: " + cont); // Para pruebas
                        console.log("--------- finPregunta ---------");
                        console.log(_this.tiempoRestante);
                    }, this.tiempoRestante);
                };
                JuegoComponent.prototype.getBarraDeTiempoOp = function () {
                    var _this = this;
                    var a = 0;
                    var r = 66;
                    var g = 139;
                    var b = 202;
                    document.getElementById("progress-bar-op").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                    document.getElementById("progress-bar-op").style.display = "block";
                    this.vBarTimerOp = setInterval(function () {
                        a++;
                        document.getElementById("progress-bar-op").style.width = (a) + "%";
                        if (a > 70) {
                            r += 10;
                            b -= 20;
                            g -= 5;
                            document.getElementById("progress-bar-op").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                        }
                        console.log("Seg: " + a);
                        if (a == 100) {
                            clearInterval(_this.vBarTimerOp);
                        }
                    }, (mock_config_1.TrivialConf.TIEMPO_OPCION * 1000) / 100);
                    var i = mock_config_1.TrivialConf.TIEMPO_OPCION;
                    this.vSegTimerOp = setInterval(function () {
                        i--;
                        document.getElementById("progress-seg-op").innerHTML = i + "s";
                        //console.log("PUTA "+i);
                        if (i == 0) {
                            clearInterval(_this.vSegTimerOp);
                        }
                    }, 1000);
                    this.vSegTotalOp = setTimeout(function () {
                        clearInterval(this.vBarTimerOp);
                        clearInterval(this.vSegTimerOp);
                        clearTimeout(this.vSegTotalOp);
                        console.log("Final tiempo opción");
                        a = 0;
                        document.getElementById("progress-bar-op").style.display = "none";
                        if (!this.esRebote) {
                            this.fase = mock_config_1.TrivialConf.FASE_JUGADOR;
                            console.log(this.indexJugador);
                            this.jugadorPenalizado = this.indexJugador;
                            this.idJugadorPenalizado = this.jugadores[this.indexJugador].id;
                            this.esRebote = true;
                            this.pausa(this.getBarraDeTiempo(), 1000);
                        }
                        else {
                            clearInterval(this.vBarTimer);
                            clearInterval(this.vSegTimer);
                            clearTimeout(this.vSegTotal);
                            this.pausa(this.comprobarFinJuego(), 2000);
                            this.inicializarTrasPregunta();
                        }
                    }, mock_config_1.TrivialConf.TIEMPO_OPCION * 1000);
                };
                JuegoComponent.prototype.obtenerJugadorPorKey = function (e) {
                    switch (e) {
                        case mock_config_1.TrivialConf.KEY_W:
                            this.indexJugador = 0;
                            return true;
                        case mock_config_1.TrivialConf.KEY_A:
                            this.indexJugador = 1;
                            return true;
                        case mock_config_1.TrivialConf.KEY_S:
                            if (this.jugadores.length >= 3) {
                                this.indexJugador = 2;
                                return true;
                            }
                        case mock_config_1.TrivialConf.KEY_D:
                            if (this.jugadores.length >= 4) {
                                this.indexJugador = 3;
                                return true;
                            }
                        case mock_config_1.TrivialConf.KEY_F:
                            if (this.jugadores.length >= 5) {
                                this.indexJugador = 4;
                                return true;
                            }
                        case mock_config_1.TrivialConf.KEY_G:
                            if (this.jugadores.length >= 6) {
                                this.indexJugador = 5;
                                return true;
                            }
                        default:
                            return false;
                    }
                };
                JuegoComponent.prototype.obtenerOpcionPorKey = function (e) {
                    switch (e) {
                        case mock_config_1.TrivialConf.KEY_ARROW_UP:
                            this.indexRespuesta = 0;
                            console.log("kiwi");
                            return true;
                        case mock_config_1.TrivialConf.KEY_ARROW_LEFT:
                            this.indexRespuesta = 1;
                            console.log("naranja");
                            return true;
                        case mock_config_1.TrivialConf.KEY_ARROW_DOW:
                            this.indexRespuesta = 2;
                            console.log("manzana");
                            return true;
                        case mock_config_1.TrivialConf.KEY_ARROW_RIGHT:
                            this.indexRespuesta = 3;
                            console.log("platano");
                            return true;
                        default:
                            return false;
                    }
                };
                JuegoComponent.prototype.comprobarRespuesta = function () {
                    if (this.indexRespuesta == (this.preguntaActual.opcionCorrecta)) {
                        console.log("acertaste");
                        return true;
                    }
                    else if (this.indexRespuesta <= 0 || this.indexRespuesta >= 3) {
                        console.log("No acertaste");
                        return false;
                    }
                    else {
                        return false;
                    }
                };
                JuegoComponent.prototype.comprobarFinJuego = function () {
                    if (this.numPreguntas < mock_config_1.TrivialConf.N_PREGUNTAS - 1) {
                        //Inicializar fase
                        this.numPreguntas++;
                        this.fase = mock_config_1.TrivialConf.FASE_NUEVA_PREGUNTA;
                    }
                    else {
                        this.fase = mock_config_1.TrivialConf.FASE_FIN_JUEGO;
                    }
                };
                JuegoComponent.prototype.finDelJuego = function () {
                    this.comprobarGanador();
                    document.getElementById("alertRespuesta").style.display = "block";
                    document.getElementById("alertGanador").style.display = "block";
                };
                JuegoComponent.prototype.comprobarGanador = function () {
                    var ganador = new jugador_model_1.Jugador(-1, "", "", -1, -1, -1);
                    for (var _i = 0, _a = this.jugadores; _i < _a.length; _i++) {
                        var jugador = _a[_i];
                        if (ganador.puntosPartida < jugador.puntosPartida) {
                            ganador = jugador;
                        }
                    }
                    this.ganador = ganador;
                };
                JuegoComponent.prototype.pausa = function (funcion, tiempo) {
                    setInterval(function () { return funcion; }, tiempo);
                };
                JuegoComponent = __decorate([
                    //Necesario para tener enlace desde app.component
                    core_1.Component({
                        selector: "Juego",
                        templateUrl: "app/views/juego.html",
                        providers: [partidas_service_1.PartidasService],
                        directives: [router_1.ROUTER_DIRECTIVES, cabecera_component_1.CabeceraComponent]
                    }), 
                    __metadata('design:paramtypes', [partidas_service_1.PartidasService, router_1.Router, router_1.RouteParams])
                ], JuegoComponent);
                return JuegoComponent;
            }());
            exports_1("JuegoComponent", JuegoComponent);
        }
    }
});
//# sourceMappingURL=juego.component.js.map