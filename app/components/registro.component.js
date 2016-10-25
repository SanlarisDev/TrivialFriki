System.register(["angular2/core", "./cabecera.component", "../models/jugador.model", "../models/partida.model", "../services/partidas.service", "../services/mock.config", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, cabecera_component_1, jugador_model_1, partida_model_1, partidas_service_1, mock_config_1, router_1;
    var RegistroComponent;
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
            function (partida_model_1_1) {
                partida_model_1 = partida_model_1_1;
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
            RegistroComponent = (function () {
                function RegistroComponent(_partidasService, _router) {
                    this._partidasService = _partidasService;
                    this._router = _router;
                    this.texto = "Jugar";
                    this.jugadores = [];
                    this.maxJugadores = mock_config_1.TrivialConf.MAX_JUGADORES; //Necesario para el bindeo en html
                    if (!this.jugadores.length) {
                        this.numJugadores = "" + 0;
                    }
                    else {
                        this.numJugadores = "" + this.jugadores.length;
                    }
                    this.ultimoIDJugador = this._partidasService.getJugadores()[this._partidasService.getJugadores().length - 1].id;
                    this.ultimoIDPartida = this._partidasService.getPartidas()[this._partidasService.getPartidas().length - 1].id;
                }
                RegistroComponent.prototype.addJugador = function () {
                    if (this.jugadores.length < mock_config_1.TrivialConf.MAX_JUGADORES) {
                        console.log(this.nombreNuevoJugador);
                        this.nuevoJugador = new jugador_model_1.Jugador(this.getNewIDJugador(), this.nombreNuevoJugador, "images/avatar" + (this.jugadores.length + 1) + ".png", 0, 0, 0);
                        console.log(this.nuevoJugador);
                        console.log(this.jugadores);
                        this.jugadores.push(this.nuevoJugador);
                        this.nombreNuevoJugador = "";
                    }
                };
                RegistroComponent.prototype.getNewIDJugador = function () {
                    return this.ultimoIDJugador += 1;
                };
                RegistroComponent.prototype.deleteJugador = function (jugador) {
                    if (this.jugadores.length > 0) {
                        console.log(this.jugadores);
                        for (var i = 0; i < this.jugadores.length; i++) {
                            if (this.jugadores[i].id === jugador.id) {
                                this.jugadores.splice(i, 1);
                            }
                        }
                    }
                    console.log(this.jugadores);
                };
                RegistroComponent.prototype.onJugar = function () {
                    if (this.jugadores.length >= mock_config_1.TrivialConf.MIN_JUGADORES) {
                        var partida = new partida_model_1.Partida(this.getNewIDPartida(), this.jugadores, this._partidasService.getPreguntas(), true);
                        console.log(partida);
                        this._partidasService.insertPartida(partida);
                        console.log(this._partidasService.getPartidas());
                        this._router.navigate(["Juego", { id: partida.id }]);
                    }
                    else {
                        window.alert("Deben haber registrados al menos 2 jugadores");
                    }
                };
                RegistroComponent.prototype.onJugarTest = function () {
                    this._router.navigate(["Juego", { id: 1 }]);
                };
                RegistroComponent.prototype.getNewIDPartida = function () {
                    return this.ultimoIDPartida += 1;
                };
                RegistroComponent = __decorate([
                    //Necesario para tener enlace desde app.component
                    core_1.Component({
                        selector: "registro",
                        templateUrl: "app/views/registro.html",
                        providers: [partidas_service_1.PartidasService],
                        directives: [router_1.ROUTER_DIRECTIVES, cabecera_component_1.CabeceraComponent]
                    }), 
                    __metadata('design:paramtypes', [partidas_service_1.PartidasService, router_1.Router])
                ], RegistroComponent);
                return RegistroComponent;
            }());
            exports_1("RegistroComponent", RegistroComponent);
        }
    }
});
//# sourceMappingURL=registro.component.js.map