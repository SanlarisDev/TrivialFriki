System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Jugador;
    return {
        setters:[],
        execute: function() {
            Jugador = (function () {
                function Jugador(id, nombre, avatar, puntosTotal) {
                    this.id = id;
                    this.nombre = nombre;
                    this.avatar = avatar;
                    this.puntosTotal = puntosTotal;
                }
                return Jugador;
            }());
            exports_1("Jugador", Jugador);
        }
    }
});
//# sourceMappingURL=jugador.model.js.map