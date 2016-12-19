System.register(["angular2/core", "./mock.partidas"], function(exports_1, context_1) {
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
    var core_1, mock_partidas_1;
    var PartidasService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_partidas_1_1) {
                mock_partidas_1 = mock_partidas_1_1;
            }],
        execute: function() {
            PartidasService = (function () {
                function PartidasService() {
                }
                PartidasService.prototype.getJugadores = function () {
                    return mock_partidas_1.JUGADORES;
                };
                PartidasService.prototype.getPreguntas = function () {
                    return mock_partidas_1.PREGUNTAS;
                };
                PartidasService.prototype.getPartidas = function () {
                    return mock_partidas_1.PARTIDAS;
                };
                PartidasService.prototype.insertJugadores = function (jugador) {
                    Promise.resolve(mock_partidas_1.JUGADORES).then(function (jugadores) { return jugadores.push(jugador); });
                };
                PartidasService.prototype.insertPartida = function (partida) {
                    Promise.resolve(mock_partidas_1.PARTIDAS).then(function (partidas) { return partidas.push(partida); });
                };
                PartidasService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PartidasService);
                return PartidasService;
            }());
            exports_1("PartidasService", PartidasService);
        }
    }
});
//# sourceMappingURL=partidas.service.js.map