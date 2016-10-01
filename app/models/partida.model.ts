export class Partida {
  constructor(
    public id: number,
    public jugadores: Array<Object>,
    public preguntas: Array<Object>,
    public teclas: Array<string>,
    public aciertos: Array<number>,
    public errores: Array<number>,
    public fin: boolean
  ) {}
}
