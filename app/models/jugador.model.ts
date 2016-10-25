export class Jugador {
  constructor(
    public id: number,
    public nombre: string,
    public avatar: string,
    public puntosPartida: number,
    public teclaPartida: number,
    public puntosTotal: number
  ) {}
}
