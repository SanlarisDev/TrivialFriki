export class Partida {
  constructor(
    public id: number,
    public jugadores: Array<Object>,
    public preguntas: Array<Object>,
    public fin: boolean
  ) {}
}
