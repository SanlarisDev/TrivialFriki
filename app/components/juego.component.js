System.register(["angular2/core", "./cabecera.component", "../services/partidas.service", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, cabecera_component_1, partidas_service_1, router_1;
    var JuegoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cabecera_component_1_1) {
                cabecera_component_1 = cabecera_component_1_1;
            },
            function (partidas_service_1_1) {
                partidas_service_1 = partidas_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            JuegoComponent = (function () {
                function JuegoComponent(_partidasService) {
                    this._partidasService = _partidasService;
                    this.pregunta = "¿Cómo se llama?";
                    this.opcion1 = "Cynthia";
                    this.opcion2 = "Javi";
                    this.opcion3 = "No tengo ni idea";
                    this.opcion4 = "Tu puta madre";
                    this.partida = this._partidasService.getPartidas()[0];
                    this.pregunta = this.partida.preguntas;
                }
                JuegoComponent = __decorate([
                    //Necesario para tener enlace desde app.component
                    core_1.Component({
                        selector: "Juego",
                        templateUrl: "app/views/juego.html",
                        providers: [partidas_service_1.PartidasService],
                        directives: [router_1.ROUTER_DIRECTIVES, cabecera_component_1.CabeceraComponent]
                    }), 
                    __metadata('design:paramtypes', [partidas_service_1.PartidasService])
                ], JuegoComponent);
                return JuegoComponent;
            }());
            exports_1("JuegoComponent", JuegoComponent);
        }
    }
});
//# sourceMappingURL=juego.component.js.map