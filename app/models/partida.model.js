System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Partida;
    return {
        setters:[],
        execute: function() {
            Partida = (function () {
                function Partida(id, jugadores, preguntas, fin) {
                    this.id = id;
                    this.jugadores = jugadores;
                    this.preguntas = preguntas;
                    this.fin = fin;
                }
                return Partida;
            }());
            exports_1("Partida", Partida);
        }
    }
});
//# sourceMappingURL=partida.model.js.map