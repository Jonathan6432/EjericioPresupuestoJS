// Se crea una clase padre y agregamos un contructor
class Dato  {
    constructor(descripcion,valor)  {
        this._descripcion = descripcion;
        this._valor = valor;
        // atributos que van a compartir las clses de ingresos y Egreso

    }
    // obtener valor
    get descripcion(){
        return this._descripcion;
    }

    // modificar valor
    set descripcion(descripcion){
        this._descripcion = descripcion;

    }

    get valor(){
        return this._valor;

    }
    set valor(valor){
        this._valor = valor;
    }
}