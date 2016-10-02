System.register(["angular2/core", "./cabecera.component", "../models/pregunta.model", "../services/partidas.service", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, cabecera_component_1, pregunta_model_1, partidas_service_1, router_1;
    var JuegoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cabecera_component_1_1) {
                cabecera_component_1 = cabecera_component_1_1;
            },
            function (pregunta_model_1_1) {
                pregunta_model_1 = pregunta_model_1_1;
            },
            function (partidas_service_1_1) {
                partidas_service_1 = partidas_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            JuegoComponent = (function () {
                function JuegoComponent(_partidasService, _router, _routeParams) {
                    this._partidasService = _partidasService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.preguntas = []; // Inicialización del array
                    this.preguntaVacia = new pregunta_model_1.Pregunta(0, "", "", "", "", "", 0);
                    this.preguntaActual = this.preguntaVacia;
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
                    this.jugar();
                };
                JuegoComponent.prototype.jugar = function () {
                    var finPartida = false;
                    var finPregunta = false;
                    // Me guardo el listado de las preguntas de la partida actual
                    this.preguntas = this.actualPartida.preguntas;
                    console.log(this.actualPartida);
                    console.log(this.preguntas);
                    while (!finPartida) {
                        var myVar = setTimeout(this.getPreguntaAleatoria(), 5000);
                        finPartida = true;
                    }
                };
                JuegoComponent.prototype.getPreguntaAleatoria = function () {
                    // Obtiene un index aleatorio de todas las preguntas
                    this.indexPreguntaActual = Math.floor(Math.random() * (this.preguntas.length - 1)) + 1;
                    this.preguntaActual = this.preguntas[this.indexPreguntaActual];
                    console.log(this.preguntaActual);
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