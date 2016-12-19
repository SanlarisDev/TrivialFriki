System.register(["angular2/core", "angular2/router", "./components/cabecera.component", "./components/inicio.component", "./components/registro.component", "./components/juego.component"], function(exports_1, context_1) {
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
    var core_1, router_1, cabecera_component_1, inicio_component_1, registro_component_1, juego_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cabecera_component_1_1) {
                cabecera_component_1 = cabecera_component_1_1;
            },
            function (inicio_component_1_1) {
                inicio_component_1 = inicio_component_1_1;
            },
            function (registro_component_1_1) {
                registro_component_1 = registro_component_1_1;
            },
            function (juego_component_1_1) {
                juego_component_1 = juego_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "trivialFriki",
                        templateUrl: "app/views/app.html",
                        directives: [router_1.ROUTER_DIRECTIVES, cabecera_component_1.CabeceraComponent, inicio_component_1.InicioComponent, registro_component_1.RegistroComponent]
                    }),
                    router_1.RouteConfig([
                        { path: "/inicio", name: "Inicio", component: inicio_component_1.InicioComponent, useAsDefault: true },
                        { path: "/registro", name: "Registro", component: registro_component_1.RegistroComponent },
                        { path: "/juego:id", name: "Juego", component: juego_component_1.JuegoComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map