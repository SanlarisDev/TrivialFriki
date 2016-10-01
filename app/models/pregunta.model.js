System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Pregunta;
    return {
        setters:[],
        execute: function() {
            Pregunta = (function () {
                function Pregunta(id, pregunta, opcion1, opcion2, opcion3, opcion4, opcionCorrecta) {
                    this.id = id;
                    this.pregunta = pregunta;
                    this.opcion1 = opcion1;
                    this.opcion2 = opcion2;
                    this.opcion3 = opcion3;
                    this.opcion4 = opcion4;
                    this.opcionCorrecta = opcionCorrecta;
                }
                return Pregunta;
            }());
            exports_1("Pregunta", Pregunta);
        }
    }
});
//# sourceMappingURL=pregunta.model.js.map