export class Pregunta {
  constructor(
    public id: number,
    public pregunta: string,
    public opcion1: string,
    public opcion2: string,
    public opcion3: string,
    public opcion4: string,
    public opcionCorrecta: number
  ) {}
}
