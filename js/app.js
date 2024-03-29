// Inicio de constante fuera de cualquier funcion para poder llamarla en cualquier función

// Se crea un arreglo
const ingresos = [
  // llamamos a la clase que se encuentra creadas Ingreso.js
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1500),
];

const egresos = [
  new Egreso("Renta deparamento", 900),
  new Egreso("Buses", 600),
];

let cargarApp = () => {
  // ↑ funcion flecha que se encuentra en el body del index
  cargarCabecero();
  // ↑ funcion para refrescar la informaciòn del cabecero
  cargarEgresos();
  cargarIngresos();
};

let totalIngresos = () => {
  let totalIngreso = 0; /* varible que sumara los elementos del arreglo*/

  // iteramos cada elemento del arreglo
  for (let ingreso of ingresos /*  se crea una variable y se llama el arreglo */) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

// definimos la funcion flecha para modificar los id
let cargarCabecero = () => {
  let presupuestoResultado = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  // se realiza la operaciòn
  // -----------------------------------------------------------------------
  // Se asignan ID en index, para recuperarlo con js
  // Se cambia los valor al id
  document.getElementById("presupuesto").innerHTML =
    formatoMoneda(presupuestoResultado);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

// funcion para agreagar el porcentaje
formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

// -------------------------------------------------
//  funcion para dar formato a los números
// -------------------------------------------------
// se realiza el cambio o asignación de valores

const formatoMoneda = (valor) => {
  // concepto de internacionalización toLocaleString
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // toLocaleString() es un método de JavaScript que formatea números, fechas y horas según la configuración regional del usuario.
  /* 
    Eje: console.log(number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })); */
};

// -------------------------------------------------
// funcion para agregar los ingresos dinamicamante
// -------------------------------------------------
// mandamos a llamar a la funcion en "fun cargarApp"
const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    // concatenamos
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  // recuperamos el id el index para sustituir
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
<div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(
                ingreso.valor
              )}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
              </div>
            </div>
          </div>`;

  return ingresoHTML;
};

const eliminarIngreso = (id) =>{
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
  ingresos.splice(indiceEliminar,1);
  cargarCabecero();
  cargarIngresos();
}

// -------------------------------------------------
// Inicio f agreagar egresos dinamicamente
// ----------------------------------------------------

const cargarEgresos = () => {
  let egresosHTML = "";
  // recorremos cada elemento
  for (let egreso of egresos) {
    egresosHTML += crearEgresosHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresosHTML = (egreso) => {
  // var tics
  let egresosHTML = `
  <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${egreso.descripcion}</div>
  <div class="derecha limpiarEstilos">
    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
    <div class="elemento_porcentaje">${formatoPorcentaje(
      egreso.valor / totalEgresos()
    )}</div>
    <div class="elemento_eliminar">
      <button class="elemento_eliminar--btn">
        <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
      </button>
    </div>
  </div>
</div>`;
  return egresosHTML;
  // cada objeto de tipo egreso retornamos
};

// metodo eliminar Ingreso
let eliminarEgreso = (id) =>{
  // findIndex se utiliza para encontrar el indice de un elemento
let indiceEliminar = egresos.findIndex(egreso => egreso.id === id );
egresos.splice(indiceEliminar, 1);
// splice se utiliza para modificar un array o eliminar
cargarCabecero();
cargarEgresos();
};

let agregarDato = () => {
  // recuperamos el fomulario "id"
  let forma = document.forms['forma'];
  // creamos una varible para recuperar cada valor agregado en el index
  let tipo = forma['tipo'];
  let descripcion = forma['descripcion'];
  let valor = forma['valor'];
  // Antes de procesar un elemento validamos que los valores son diferentes de nulo
  if (descripcion.value !== '' && valor.value !== ''){
    if (tipo.value === 'ingreso') {
      // si el valor es ingreso se agrega al arreglo
      ingresos.push(new Ingreso(descripcion.value,+valor.value ));
      // +valor.value = se convierte el valor en numerico
      cargarCabecero();
      cargarIngresos();
      
  }else if(tipo.value === 'egreso') {
    egresos.push (new Egreso(descripcion.value, +valor.value));
    cargarCabecero();
    cargarEgresos();

  }
}

}
