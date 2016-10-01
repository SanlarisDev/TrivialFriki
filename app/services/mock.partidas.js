System.register(["../models/jugador.model", "../models/partida.model", "../models/pregunta.model"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jugador_model_1, partida_model_1, pregunta_model_1;
    var mockPartidas, JUGADORES, PARTIDAS, PREGUNTAS;
    return {
        setters:[
            function (jugador_model_1_1) {
                jugador_model_1 = jugador_model_1_1;
            },
            function (partida_model_1_1) {
                partida_model_1 = partida_model_1_1;
            },
            function (pregunta_model_1_1) {
                pregunta_model_1 = pregunta_model_1_1;
            }],
        execute: function() {
            mockPartidas = (function () {
                function mockPartidas() {
                    this.Jugador1 = new jugador_model_1.Jugador(1, "Grupo 1", "images/avatar1.jpg", 0);
                    this.Jugador2 = new jugador_model_1.Jugador(2, "Grupo 2", "images/avatar2.png", 0);
                    this.Jugador3 = new jugador_model_1.Jugador(3, "Grupo 3", "images/avatar3.png", 0);
                    this.Jugador4 = new jugador_model_1.Jugador(4, "Grupo 4", "images/avatar4.png", 0);
                    this.Pregunta1 = new pregunta_model_1.Pregunta(1, "¿Quién marcó el gol que le dió el mundial a la Selección Española?", "Pepito Pérez", "Sergio Ramos", "Andrés Iniesta", "Luis Aragonés", 3);
                    this.Pregunta2 = new pregunta_model_1.Pregunta(2, "¿En qué año se descubrió America?", "1692", "1492", "2015", "568", 2);
                }
                mockPartidas.prototype.getmockJugadores = function () {
                    return [this.Jugador1, this.Jugador2, this.Jugador3, this.Jugador4];
                };
                mockPartidas.prototype.getmockJugadoresPartida = function () {
                    return [this.Jugador1, this.Jugador2];
                };
                mockPartidas.prototype.getmockPreguntasPartida = function () {
                    return [this.Jugador1, this.Jugador2];
                };
                mockPartidas.prototype.getmockPreguntas = function () {
                    return [this.Pregunta1, this.Pregunta2];
                };
                return mockPartidas;
            }());
            exports_1("JUGADORES", JUGADORES = new mockPartidas().getmockJugadores());
            exports_1("PARTIDAS", PARTIDAS = [
                new partida_model_1.Partida(1, new mockPartidas().getmockJugadoresPartida(), new mockPartidas().getmockJugadoresPartida(), ["W", "D"], [1, 1], [1, 1], true)
            ]);
            exports_1("PREGUNTAS", PREGUNTAS = new mockPartidas().getmockPreguntas());
        }
    }
});
//# sourceMappingURL=mock.partidas.js.map