// ------------------------------------------------------------
// 1. ESTRUCTURA DE DATOS
// ------------------------------------------------------------
// "nomina" es un arreglo (lista) vacío. Aquí vamos a ir
// guardando un objeto por cada empleado que se registre.
let nomina = [];
 
// ------------------------------------------------------------
// 2. FUNCIONES DE VALIDACIÓN
// ------------------------------------------------------------
// Estas funciones pequeñas revisan que los datos sean correctos
// antes de guardarlos. Cada una hace UNA sola cosa.
 
// Revisa que un texto no esté vacío (después de quitar espacios)
function esTextoValido(texto) {
  return texto !== null && texto.trim().length > 0;
}
 
// Revisa que el salario sea un número válido y mayor a cero
function esSalarioValido(valor) {
  let numero = Number(valor);
  return !isNaN(numero) && numero > 0;
}
 
// Revisa si ya existe un empleado con esa identificación
// (recorre el arreglo "nomina" buscando coincidencias)
function existeIdentificacion(identificacion) {
  for (let i = 0; i < nomina.length; i++) {
    if (nomina[i].identificacion === identificacion) {
      return true; // ya existe
    }
  }
  return false; // no existe
}
 
// ------------------------------------------------------------
// 3. OPERACIONES DEL SISTEMA
// ------------------------------------------------------------
 
// --- Registrar un nuevo empleado ---
function registrarEmpleado() {
  console.log("\n--- Registro de nuevo empleado ---");
 
  let identificacion = prompt("Identificación:");
  if (!esTextoValido(identificacion)) {
    console.log("La identificación no puede quedar vacía.");
    return; // sale de la función si el dato es inválido
  }
 
  if (existeIdentificacion(identificacion)) {
    console.log("Ya existe un empleado con esa identificación.");
    return;
  }
 
  let nombre = prompt("Nombre completo:");
  if (!esTextoValido(nombre)) {
    console.log("El nombre no puede quedar vacío.");
    return;
  }
 
  let cargo = prompt("Cargo:");
  if (!esTextoValido(cargo)) {
    console.log("El cargo no puede quedar vacío.");
    return;
  }
 
  let salario = prompt("Salario:");
  if (!esSalarioValido(salario)) {
    console.log("El salario debe ser un número mayor a cero.");
    return;
  }
 
  let area = prompt("Área de trabajo:");
  if (!esTextoValido(area)) {
    console.log("El área no puede quedar vacía.");
    return;
  }
 
  // Creamos el objeto empleado con los datos capturados
  let nuevoEmpleado = {
    identificacion: identificacion,
    nombre: nombre,
    cargo: cargo,
    salario: Number(salario),
    area: area
  };
 
  // Lo agregamos al arreglo "nomina"
  nomina.push(nuevoEmpleado);
 
  console.log("Empleado registrado correctamente: " + nombre);
}
 
// --- Listar todos los empleados ---
function listarEmpleados() {
  console.log("\n--- Listado de empleados ---");
 
  if (nomina.length === 0) {
    console.log("No hay empleados registrados todavía.");
    return;
  }
 
  // Recorremos el arreglo con un ciclo for
  for (let i = 0; i < nomina.length; i++) {
    let emp = nomina[i];
    console.log("\nEmpleado #" + (i + 1));
    console.log("Identificación: " + emp.identificacion);
    console.log("Nombre: " + emp.nombre);
    console.log("Cargo: " + emp.cargo);
    console.log("Salario: $" + emp.salario);
    console.log("Área: " + emp.area);
  }
}
 
// --- Buscar un empleado por identificación ---
function buscarEmpleadoPorId() {
  console.log("\n--- Búsqueda de empleado ---");
 
  if (nomina.length === 0) {
    console.log("No hay empleados registrados para buscar.");
    return;
  }
 
  let idBuscado = prompt("Ingrese la identificación a buscar:");
  let encontrado = null;
 
  for (let i = 0; i < nomina.length; i++) {
    if (nomina[i].identificacion === idBuscado) {
      encontrado = nomina[i];
      break; // ya lo encontramos, no seguimos buscando
    }
  }
 
  if (encontrado === null) {
    console.log("No se encontró ningún empleado con esa identificación.");
  } else {
    console.log("\nEmpleado encontrado:");
    console.log("Identificación: " + encontrado.identificacion);
    console.log("Nombre: " + encontrado.nombre);
    console.log("Cargo: " + encontrado.cargo);
    console.log("Salario: $" + encontrado.salario);
    console.log("Área: " + encontrado.area);
  }
}
 
// --- Mostrar el total de empleados ---
function totalEmpleados() {
  console.log("\n--- Total de personal ---");
  console.log("Número de empleados registrados: " + nomina.length);
}
 
// ------------------------------------------------------------
// 4. MENÚ PRINCIPAL
// ------------------------------------------------------------
function iniciarSistema() {
  let opcion;
 
  // do...while repite el menú al menos una vez,
  // y sigue repitiéndolo hasta que el usuario elija "5"
  do {
    opcion = prompt(
      "SOLUCIONES EMPRESARIALES S.A.S.\n" +
      "Sistema de Gestión de Personal\n\n" +
      "1. Registrar empleado\n" +
      "2. Listar empleados\n" +
      "3. Buscar empleado por identificación\n" +
      "4. Ver total de empleados\n" +
      "5. Salir\n\n" +
      "Seleccione una opción (1-5):"
    );
 
    if (opcion === "1") {
      registrarEmpleado();
    } else if (opcion === "2") {
      listarEmpleados();
    } else if (opcion === "3") {
      buscarEmpleadoPorId();
    } else if (opcion === "4") {
      totalEmpleados();
    } else if (opcion === "5") {
      console.log("Gracias por usar el sistema. ¡Hasta pronto!");
    } else {
      console.log("Opción no válida. Elija un número entre 1 y 5.");
    }
 
  } while (opcion !== "5");
}
 
// Arrancamos el programa
iniciarSistema();