const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const calcularBtn = document.getElementById('calcular');
const totalGastos = document.getElementById('totalGastos');
let personas = 1; // Empezamos con 1 tarjeta

contenedorTarjetas.addEventListener('input', function(event) {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'input') {
    const tarjetaActual = target.closest('.tarjeta');
    if (tarjetaActual.nextElementSibling === null) { // Si no hay otra tarjeta después
      agregarNuevaTarjeta();
    }
  }
});

calcularBtn.addEventListener('click', function() {
    const totalGastado = calcularTotalGastado();
    const cantidadPersonas = personas - 1;
    const promedio = totalGastado / cantidadPersonas;

    const divTotalGastos = document.getElementById('totalGastos');
    divTotalGastos.style.display = 'block'; // Mostrar el div totalGastos
  
    // Seleccionar los elementos span para mostrar los resultados
    const spanTotalGastos = document.getElementById('spanTotalGastos');
    const spanCantidadPersonas = document.getElementById('spanCantidadPersonas');
    const spanPromedio = document.getElementById('spanPromedio');

    // Actualizar el contenido de los elementos span con los resultados
    spanTotalGastos.textContent = `Total de gastos: $${totalGastado.toFixed(2)}`;
    spanCantidadPersonas.textContent = `Cantidad de personas: ${cantidadPersonas}`;
    spanPromedio.textContent = `Gasto por persona: $${promedio.toFixed(2)}`;
  
    const montosPorPersona = [];
    const nombresPersonas = []; // Agregar este array para almacenar nombres
    const tarjetasResultado = []; // Array para almacenar tarjetas de resultado

    for (let i = 1; i <= cantidadPersonas; i++) {
      let nombre = document.getElementById(`nombre${i}`).value.trim();
      if (nombre === "") {
        nombre = `Persona ${i}`;
      }
      const gasto = parseFloat(document.getElementById(`gasto${i}`).value);
      if (isNaN(gasto)) {
        montosPorPersona.push(0); // Si el gasto es NaN, se toma como 0
      } else {
        montosPorPersona.push(gasto);
      }
      nombresPersonas.push(nombre);
    }
  
    const cantidades = montosPorPersona.map((gasto, index) => {
      const nombre = nombresPersonas[index];
      let mensaje = '';
      if (gasto > promedio) {
        mensaje = `${nombre} debe COBRAR $${(gasto - promedio).toFixed(2)}`;
        tarjetasResultado.push(`<div class="resultadoTarjeta cobrar">${mensaje}</div>`);
      } else if (gasto < promedio) {
        mensaje = `${nombre} debe PAGAR $${(promedio - gasto).toFixed(2)}`;
        tarjetasResultado.push(`<div class="resultadoTarjeta pagar">${mensaje}</div>`);
      } else {
        mensaje = `${nombre} no cobra ni paga`;
        tarjetasResultado.push(`<div class="resultadoTarjeta sinCambios">${mensaje}</div>`);
      }
      return mensaje;
    });

    // Eliminar las tarjetas de resultado existentes si las hay
    const tarjetasAnteriores = document.querySelectorAll('.resultadoTarjeta');
    tarjetasAnteriores.forEach(tarjeta => {
        tarjeta.remove();
    });
  
    tarjetasResultado.forEach(tarjeta => {
      totalGastos.innerHTML += tarjeta;
    });
});
  

function agregarNuevaTarjeta() {
  personas++;
  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.className = 'tarjeta';
  nuevaTarjeta.innerHTML = `
    <h3>Persona ${personas}</h3>
    <label for="nombre${personas}">Nombre:</label>
    <input type="text" id="nombre${personas}" name="nombre${personas}" required><br>
    
    <label for="gasto${personas}">Gasto:</label>
    <input type="number" id="gasto${personas}" name="gasto${personas}" min="0" step="0.01" required><br>
  `;
  contenedorTarjetas.appendChild(nuevaTarjeta);
}

function calcularTotalGastado() {
  let total = 0;
  for (let i = 1; i <= personas; i++) {
    const gasto = parseFloat(document.getElementById(`gasto${i}`).value);
    if (!isNaN(gasto)) { // Solo sumar si el valor es numérico
      total += gasto;
    }
  }
  return total;
}

// Agrega el evento para el botón de reinicio
reiniciarBtn.addEventListener('click', function() {
  // Restablecer el HTML del contenedor de tarjetas y el total de gastos
  contenedorTarjetas.innerHTML = `
    <div class="tarjeta">
      <h3>Persona 1</h3>
      <label for="nombre1">Nombre:</label>
      <input type="text" id="nombre1" name="nombre1" required><br>
      
      <label for="gasto1">Gasto:</label>
      <input type="number" id="gasto1" name="gasto1" min="0" step="0.01" required><br>
    </div>
  `;
  personas = 1; // Reiniciar el contador de personas

  // Eliminar las tarjetas de resultado existentes si las hay
  const tarjetasAnteriores = document.querySelectorAll('.resultadoTarjeta');
  tarjetasAnteriores.forEach(tarjeta => {
      tarjeta.remove();
  });

  const divTotalGastos = document.getElementById('totalGastos');
  divTotalGastos.style.display = 'none'; // Ocultar el div totalGastos
});