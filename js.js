// Obtenemos el tablero del HTML
const tablero = document.getElementById('tablero');

// Ruta de la imagen de la reina
const imagenReina = "img/reina.jpg";

// Generamos las 8 filas y 8 columnas del tablero
for (let fila = 0; fila < 8; fila++) {
  for (let columna = 0; columna < 8; columna++) {
    const casilla = document.createElement('div');
    casilla.className = 'casilla';

    // Determinamos si la casilla es clara u oscura
    const esClara = (fila + columna) % 2 === 0;
    casilla.dataset.color = esClara ? 'clara' : 'oscura';

    // Accesibilidad
    casilla.setAttribute('role', 'gridcell');
    casilla.setAttribute('tabindex', '0');

    // Guardamos la posición de la casilla
    casilla.dataset.fila = fila;
    casilla.dataset.columna = columna;

    // Evento al hacer clic en la casilla
    casilla.addEventListener('click', () => {
      if (casilla.querySelector('img.reina')) {
        casilla.innerHTML = '';
      } else {
        const img = document.createElement('img');
        img.className = 'reina';
        img.alt = 'Reina';
        img.src = imagenReina;
        casilla.appendChild(img);
      }
    });

    // Permitir usar Enter o Espacio como clic
    casilla.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        casilla.click();
      }
    });

    // Añadimos la casilla al tablero
    tablero.appendChild(casilla);
  }
}

// Botón para limpiar el tablero
document.getElementById('btnLimpiar').addEventListener('click', limpiarTablero);

function limpiarTablero() {
  document.querySelectorAll('.casilla').forEach(casilla => casilla.innerHTML = '');
}
