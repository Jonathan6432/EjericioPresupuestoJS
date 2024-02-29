class Ingreso extends Dato{
    static contadorIngreso = 0;

    constructor(descripcion,valor){
        super (descripcion,valor);
        // Heredamos los atributos de la clase padre
        this._id = ++Ingreso.contadorIngreso;
    }

    get id(){
        return this._id;
    }
}