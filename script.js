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
  
    totalGastos.innerHTML = `
      <p>Total de gastos: $${totalGastado.toFixed(2)}</p>
      <p>Cantidad de personas: ${cantidadPersonas}</p>
      <p>Gasto por persona: $${promedio.toFixed(2)}</p>
    `;
  
    const montosPorPersona = [];
    const nombresPersonas = []; // Agregar este array para almacenar nombres
    for (let i = 1; i <= cantidadPersonas; i++) {
      const nombre = document.getElementById(`nombre${i}`).value.trim(); // Obtener el nombre
      const gasto = parseFloat(document.getElementById(`gasto${i}`).value);
      if (!isNaN(gasto)) {
        montosPorPersona.push(gasto);
        nombresPersonas.push(nombre); // Almacenar el nombre en el array
      }
    }
  
    const cantidades = montosPorPersona.map((gasto, index) => { // Usar index para acceder al nombre correspondiente
      const nombre = nombresPersonas[index]; // Obtener el nombre correspondiente
      if (gasto > promedio) {
        return `${nombre} debe COBRAR $${(gasto - promedio).toFixed(2)}`;
      } else if (gasto < promedio) {
        return `${nombre} debe PAGAR $${(promedio - gasto).toFixed(2)}`;
      } else {
        return `${nombre} no cobra ni paga`;
      }
    });
  
    totalGastos.innerHTML += `<p>${cantidades.join('<br>')}</p>`;
});
  

function agregarNuevaTarjeta() {
  personas++;
  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.className = 'tarjeta';
  nuevaTarjeta.innerHTML = `
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
