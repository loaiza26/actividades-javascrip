
// Creamos un diccionario (objeto) para asignar el costo en dólares a cada tipo de boleto.
const PrecioTicks = {
    "General": 150,
    "VIP": 450,
    "Platinum": 900,
};

// Con document.getElementById enlazamos las casillas de tu página web con variables de JavaScript.
const paisAnfitrion     = document.getElementById('pais-anfitrion'); 
     // Menú desplegable para elegir el país
const cantidadTickets   = document.getElementById('cantidad-tickets');   
 // Casilla numérica para la cantidad de boletos
const selectCategoria   = document.getElementById('categoria');        
   // Menú desplegable para la categoría (VIP, General...)
const btnGenerar        = document.getElementById('btn-generar');   
      // Botón que creará los campos de los asistentes
const contenedorAsistentes = document.getElementById('contenedor-asistentes');
 // El contenedor vacío donde se dibujarán los asistentes
const divResumen        = document.getElementById('resumen');         
    // Espacio donde mostraremos el precio total en vivo
const formulario        = document.getElementById('formulario');     
     // El formulario completo que agrupa todo
const selecionarPartido = document.getElementById('partidos')     

// Traemos los contenedores de los estadios de cada país para poder mostrarlos u ocultarlos más adelante.
const bloqueCanada = document.getElementById('bloque-Canada');
const bloqueMexico = document.getElementById('bloque-Mexico');
const bloqueUSA    = document.getElementById('bloque-Estados-Unidos');

// Esta función nos ayuda a que reciba los datos seleccionados por el usuario, calcula la matemática del total y genera un objeto ordenado.
function GenerarTicks(categoria, cantidad, estadio, fecha, pais) {
    
    // Buscamos en el objeto 'PrecioTicks' el precio que corresponde a la categoría recibida.
    // Si la categoría no es válida o está vacía, usamos el operador lógico || para asignar 0 por seguridad.
    const precioUnitario = PrecioTicks[categoria] || 0;
    
    // Con 'return' entregamos el paquete (objeto) con toda la información de la compra estructurada.
    return {
        // Genera un número de identificación único basado en los milisegundos exactos del reloj de la computadora.
        id: Date.now(), 
        
        // Convierte el texto de la cantidad en un número entero (ej: de "3" a 3). Si está vacío, pone 0.
        cantidad: parseInt(cantidad) || 0, 
        
        // Guarda la categoría elegida (ej: "VIP")
        categoria: categoria,
        
        // Multiplica el precio de la categoría por la cantidad de boletos transformados en número.
        precioTotal: (precioUnitario * (parseInt(cantidad) || 0)),
        
        // Guarda los datos de ubicación y tiempo del partido
        estadio: estadio,
        fecha: fecha,
        pais: pais
    };
}

    function calcularTotal() {
    const categoria = selectCategoria.value;
    const cantidad = parseInt(cantidadTickets.value) || 0;
    
    const precioUnitario = PrecioTicks[categoria] || 0;
    const total = precioUnitario * cantidad;
    
    // Mostramos la suma en pantalla en tiempo real
    divResumen.innerText = total;
    
    // Cada vez que cambia un dato básico, lo salvamos en LocalStorage
    guardarEnLocalStorage();
    return total;
}

    // Escuchador dinámico para controlar la visibilidad de los bloques de estadios
paisAnfitrion.addEventListener('change', () => {
    const seleccion = paisAnfitrion.value;
    bloqueCanada.classList.add('oculto');
    bloqueMexico.classList.add('oculto');
    bloqueUSA.classList.add('oculto');

    if (seleccion) {
        const bloqueActivo = document.getElementById(`bloque-${seleccion}`);
        if (bloqueActivo) bloqueActivo.classList.remove('oculto');
    }
    guardarEnLocalStorage();
});

seleccionarPartido.addEventListener('change', () => {
    document.getElementById('info-fase').innerText = seleccionarPartido.value ? "Confirmada" : "Fase interactiva";
    guardarEnLocalStorage();
});

    // Tu botón "Generar formularios de asistentes" llama a obtenerInformacion()
function obtenerInformacion() {
    const cantidad = parseInt(cantidadTickets.value) || 0;

    if (cantidad <= 0 || !selectCategoria.value) {
        alert("Por favor, introduce una cantidad y selecciona una categoría primero.");
        return;
    }

    contenedorAsistentes.innerHTML = ""; // Resetear campos antiguos

    for (let i = 1; i <= cantidad; i++) {
        const div = document.createElement('div');
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px 0";
        div.style.borderRadius = "4px";
        
        div.innerHTML = `
            <h4 style="margin:0 0 10px 0;">Asistente #${i}</h4>
            <div style="margin-bottom: 8px;">
                <label style="display:block; font-size:12px;">Nombre Completo:</label>
                <input type="text" class="input-asistente-nombre" placeholder="Juan Pérez" style="width:100%; padding:5px;" oninput="guardarEnLocalStorage()">
            </div>
            <div>
                <label style="display:block; font-size:12px;">DNI / Pasaporte / Cédula:</label>
                <input type="text" class="input-asistente-dni" placeholder="Documento" style="width:100%; padding:5px;" oninput="guardarEnLocalStorage()">
            </div>
        `;
        contenedorAsistentes.appendChild(div);
    }
    guardarEnLocalStorage();
}
    // 1. Modificación de tu función de Confirmar Compra
function SumadeTicks() {
    const total = calcularTotal();
    const inputsNombres = document.querySelectorAll('.input-asistente-nombre');
    const inputsDnis = document.querySelectorAll('.input-asistente-dni');

    // Validaciones de seguridad básicas
    if (total <= 0 || !seleccionarPartido.value || !paisAnfitrion.value) {
        alert("Por favor, rellene todos los campos del partido.");
        return;
    }

    if (inputsNombres.length === 0) {
        alert("Debe generar la información de asistentes primero.");
        return;
    }

    // Validar que no haya asistentes vacíos e inyectar datos en la plantilla de impresión
    const listaImpresion = document.getElementById('print-asistentes-lista');
    listaImpresion.innerHTML = "";

    for (let i = 0; i < inputsNombres.length; i++) {
        if (!inputsNombres[i].value.trim() || !inputsDnis[i].value.trim()) {
            alert(`Por favor, complete los datos del Asistente #${i + 1}`);
            return;
        }
        
        const li = document.createElement('li');
        li.innerText = `${inputsNombres[i].value} (Doc: ${inputsDnis[i].value})`;
        listaImpresion.appendChild(li);
    }

    // Rellenamos los textos del ticket oculto con la información del formulario
    document.getElementById('print-id').innerText = '#' + Date.now();
    document.getElementById('print-partido').innerText = seleccionarPartido.options[seleccionarPartido.selectedIndex].text;
    document.getElementById('print-pais').innerText = paisAnfitrion.value;
    document.getElementById('print-categoria').innerText = selectCategoria.value;
    document.getElementById('print-cantidad').innerText = cantidadTickets.value;
    document.getElementById('print-total').innerText = total;

    // Guardamos en LocalStorage el estado final
    guardarEnLocalStorage();

    // ¡MAGIA!: Hacemos visible el botón de impresión en la pantalla para que el usuario le dé clic
    mostrarMensaje("¡Compra procesada con éxito! Su boleto está listo para imprimir.", "exito");
    document.getElementById('btn-print').style.display = "block";
    
  
}

// 2. NUEVA FUNCIÓN: Exclusiva para el botón de impresión
function imprimirBoletoNativo() {
    // Lanza directamente la ventana de impresión del sistema
    window.print();
}
    
// FUNCIÓN PARA ELIMINAR BOLETOS Y LIMPIAR STORAGE

function eliminarBoletos() {
    // Preguntamos al usuario por seguridad si de verdad quiere borrar todo
    const confirmar = confirm("¿Estás seguro de que deseas eliminar los boletos y vaciar todos los datos?");
    
    if (confirmar) {
        // 1. Borramos la clave del LocalStorage para que no se recupere al recargar
        localStorage.removeItem('reserva_mundial');

        // 2. Reseteamos los valores de los inputs principales del formulario
        cantidadTickets.value = "";
        selectCategoria.value = "";
        paisAnfitrion.value = "";
        seleccionarPartido.value = "";

        // 3. Limpiamos el contenedor de los asistentes
        contenedorAsistentes.innerHTML = "";

        // 4. Ocultamos los bloques de estadios por si había alguno abierto
        bloqueCanada.classList.add('oculto');
        bloqueMexico.classList.add('oculto');
        bloqueUSA.classList.add('oculto');

        // 5. Reiniciamos el contador visual de la suma a cero
        divResumen.innerText = "0";
        document.getElementById('info-fase').innerText = "Fase interactiva";

        alert("Todos los datos han sido eliminados correctamente."); 
    }
   
}


    // Cuando el formulario se envía correctamente, llamamos a rellenarTicket()
// con los datos que el usuario llenó en el formulario.

function generarTicketDesdeFormulario() {
  const datos = {
    // Tomamos el texto del partido seleccionado
    partido: selPartido.options[selPartido.selectedIndex].text,

    // Tomamos los datos del asistente 1 (el principal)
    nombre: document.getElementById('nombre-1').value,
    doc: document.getElementById('tipo-doc-1').value
         + ' ' + document.getElementById('num-doc-1').value,

    // Categoría y precio
    categoria: selectCategoria.value,
    precio: PrecioTicks[selectCategoria.value] || 0,

    // ID único basado en el tiempo actual
    id: '#' + Date.now(),
  };

  // Llamamos la función del tiquete con esos datos
  rellenarTicket(datos);

  // Mostramos el tiquete (si estaba oculto)
  document.getElementById('ticket').scrollIntoView({ behavior: 'smooth' });
}
function guardarEnLocalStorage() {
    const nombres = Array.from(document.querySelectorAll('.input-asistente-nombre')).map(i => i.value);
    const dnis = Array.from(document.querySelectorAll('.input-asistente-dni')).map(i => i.value);

    const data = {
        cantidad: cantidadTickets.value,
        categoria: selectCategoria.value,
        pais: paisAnfitrion.value,
        partido: seleccionarPartido.value,
        asistentes: nombres,
        documentos: dnis
    };

    localStorage.setItem('reserva_mundial', JSON.stringify(data));
}

function recuperarDeLocalStorage() {
    const guardado = localStorage.getItem('reserva_mundial');
    if (!guardado) return;

    const data = JSON.parse(guardado);

    // Reasignar valores al formulario
    cantidadTickets.value = data.cantidad;
    selectCategoria.value = data.categoria;
    paisAnfitrion.value = data.pais;
    seleccionarPartido.value = data.partido;

    // Disparar vista de estadios correspondientes
    paisAnfitrion.dispatchEvent(new Event('change'));
    calcularTotal();

    // Re-renderizar asistentes si es que ya existían
    if (data.asistentes && data.asistentes.length > 0) {
        obtenerInformacion();
        const inputsNombres = document.querySelectorAll('.input-asistente-nombre');
        const inputsDnis = document.querySelectorAll('.input-asistente-dni');

        inputsNombres.forEach((input, index) => {
            if (data.asistentes[index]) input.value = data.asistentes[index];
            if (data.documentos[index]) inputsDnis[index].value = data.documentos[index];
        });
    }
}

// Cargar la información guardada automáticamente al iniciar la pestaña
window.onload = recuperarDeLocalStorage;