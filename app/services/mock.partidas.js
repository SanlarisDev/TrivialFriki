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
                    this.Jugador1 = new jugador_model_1.Jugador(1, "Grupo 1", "images/avatar1.png", 50, 87, 100);
                    this.Jugador2 = new jugador_model_1.Jugador(2, "Grupo 2", "images/avatar2.png", 20, 65, 20);
                    this.Jugador3 = new jugador_model_1.Jugador(3, "Grupo 3", "images/avatar3.png", 30, 83, 30);
                    this.Jugador4 = new jugador_model_1.Jugador(4, "Grupo 4", "images/avatar4.png", 10, 68, 40);
                    this.Pregunta1 = new pregunta_model_1.Pregunta(1, "¿Quién marcó el gol que le dió el mundial a la Selección Española?", "Pepito Pérez", "Sergio Ramos", "Andrés Iniesta", "Luis Aragonés", 2);
                    this.Pregunta2 = new pregunta_model_1.Pregunta(2, "¿En qué año se descubrió América?", "1962", "1492", "2015", "1568", 1);
                    this.Pregunta3 = new pregunta_model_1.Pregunta(3, "En Marketing Digital ¿En qué nos ayuda el SEO?", "A vender más servicios o productos", "A tener una web más bonita", "A mejorar la funcionalidad", "A mejorar nuestro posicionamiento", 3);
                    this.Pregunta4 = new pregunta_model_1.Pregunta(4, "¿Quién es el actual rey de España?", "Don Juan Carlos I", "Don Felipe VI", "Don Felipe V", "Don Carlos III", 1);
                    this.Pregunta5 = new pregunta_model_1.Pregunta(5, "¿En qué ciudad del mundo nunca se pone el Sol?", "Nueva York", "Tokyo", "Ibiza", "Sevilla", 0);
                    this.Pregunta6 = new pregunta_model_1.Pregunta(6, "¿Cómo se llama el protagonista del videojuego 'The Legend of Zelda'?", "Zelda", "Link", "Navy", "Ganondorf", 1);
                    this.Pregunta7 = new pregunta_model_1.Pregunta(7, "Di qué pelicula no pertenece al mismo estudio de animación", "Big Hero 6", "Enredados", "Frozen", "Totoro", 3);
                    this.Pregunta8 = new pregunta_model_1.Pregunta(8, "¿Quién comentó la famosa frase 'Sólo sé que no sé nada'?", "Steves Jobs", "Jesucristo", "Rajoy", "Platón", 3);
                    this.Pregunta9 = new pregunta_model_1.Pregunta(9, "¿Qué personaje de ámbito político nacional ha dimitido recientemente de su puesto?", "Rajoy", "Pedro Sánchez", "Pablo Iglesias", "Albert Rivera", 1);
                    this.Pregunta10 = new pregunta_model_1.Pregunta(10, "¿Qué nota se le va a poner a este proyecto?", "2", "4,50", "7", "¡ 10 !", 3);
                }
                mockPartidas.prototype.getmockJugadores = function () {
                    return [this.Jugador1, this.Jugador2, this.Jugador3, this.Jugador4];
                };
                mockPartidas.prototype.getmockJugadoresPartida = function () {
                    return [this.Jugador1, this.Jugador2];
                };
                mockPartidas.prototype.getmockPreguntasPartida = function () {
                    return [this.Pregunta1, this.Pregunta2, this.Pregunta3, this.Pregunta4, this.Pregunta5, this.Pregunta6, this.Pregunta7, this.Pregunta8, this.Pregunta9, this.Pregunta10];
                };
                mockPartidas.prototype.getmockPreguntas = function () {
                    return [this.Pregunta1, this.Pregunta2, this.Pregunta3, this.Pregunta4, this.Pregunta5, this.Pregunta6, this.Pregunta7, this.Pregunta8, this.Pregunta9, this.Pregunta10];
                };
                return mockPartidas;
            }());
            exports_1("JUGADORES", JUGADORES = new mockPartidas().getmockJugadores());
            exports_1("PARTIDAS", PARTIDAS = [
                new partida_model_1.Partida(1, new mockPartidas().getmockJugadoresPartida(), new mockPartidas().getmockPreguntasPartida(), true)
            ]);
            exports_1("PREGUNTAS", PREGUNTAS = new mockPartidas().getmockPreguntas());
        }
    }
});
//# sourceMappingURL=mock.partidas.js.map