
const tablero = document.getElementById('tablero');

const imagenReina = "img/reina.jpg";

let contadorReinas = 0;

// Generamos las 8 filas y 8 columnas del tablero
for (let fila = 0; fila < 8; fila++) {
  for (let columna = 0; columna < 8; columna++) {
    const casilla = document.createElement('div');
    casilla.className = 'casilla';

    // Determinamos si la casilla es clara u oscura
    const esClara = (fila + columna) % 2 === 0;
    casilla.dataset.color = esClara ? 'clara' : 'oscura';

    casilla.setAttribute('role', 'gridcell');
    casilla.setAttribute('tabindex', '0');

    casilla.dataset.fila = fila;
    casilla.dataset.columna = columna;

    // Evento al hacer clic en la casilla
casilla.addEventListener('click', () => {

  if (casilla.querySelector('img.reina')) {
    alert("Ya hay una reina en esta casilla.");
    return;
  }

  if (contadorReinas >= 8) {
    alert("No puedes colocar más de 8 reinas.");
    return;
  }

  // Colocar una nueva reina
  const img = document.createElement('img');
  img.className = 'reina';
  img.alt = 'Reina';
  img.src = imagenReina;
  casilla.appendChild(img);

  contadorReinas++; 
});

    tablero.appendChild(casilla);
  }
}

// Botón para limpiar el tablero
document.getElementById('btnLimpiar').addEventListener('click', limpiarTablero);

function limpiarTablero() {
  document.querySelectorAll('.casilla').forEach(casilla => casilla.innerHTML = '');
  contadorReinas = 0; 
}

