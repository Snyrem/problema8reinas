const tablero = document.getElementById('tablero');
const infoEl = document.getElementById('info');
const limpiarBtn = document.getElementById('limpiarBtn');
const TAM = 8;
let reinas = [];

// Crear tablero
for (let fila = 0; fila < TAM; fila++) {
  for (let col = 0; col < TAM; col++) {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla');
    casilla.classList.add((fila + col) % 2 === 0 ? 'blanca' : 'negra');
    casilla.dataset.fila = fila;
    casilla.dataset.col = col;

    casilla.addEventListener('mouseenter', previsualizarAtaque);
    casilla.addEventListener('mouseleave', limpiarPrevisualizacion);
    casilla.addEventListener('click', colocarReina);

    tablero.appendChild(casilla);
  }
}

limpiarBtn.addEventListener('click', limpiarTodasReinas);

function colocarReina(e) {
  const casilla = e.target;
  const fila = parseInt(casilla.dataset.fila);
  const col = parseInt(casilla.dataset.col);

  if (casilla.classList.contains('reina')) {
    casilla.textContent = '';
    casilla.classList.remove('reina');
    reinas = reinas.filter(r => !(r.fila === fila && r.col === col));
    limpiarBloqueo();
    aplicarBloqueo();
    actualizarInfo();
    return;
  }

  if (casilla.classList.contains('bloqueada')) return;

  casilla.textContent = '♛';
  casilla.classList.add('reina');
  reinas.push({ fila, col });
  aplicarBloqueo();
  actualizarInfo();
}

function previsualizarAtaque(e) {
  const casilla = e.target;
  const fila = parseInt(casilla.dataset.fila);
  const col = parseInt(casilla.dataset.col);

  if (casilla.classList.contains('reina') || casilla.classList.contains('bloqueada')) return;

  marcarAtaques(fila, col, 'preview');
}

function limpiarPrevisualizacion() {
  document.querySelectorAll('.preview').forEach(c => c.classList.remove('preview'));
}

function marcarAtaques(fila, col, clase) {
  for (let i = 0; i < TAM; i++) {
    if (i !== col) getCasilla(fila, i).classList.add(clase);
    if (i !== fila) getCasilla(i, col).classList.add(clase);
  }

  for (let d = 1; d < TAM; d++) {
    const dirs = [
      [fila + d, col + d],
      [fila - d, col - d],
      [fila + d, col - d],
      [fila - d, col + d]
    ];
    for (const [f, c] of dirs) {
      if (f >= 0 && f < TAM && c >= 0 && c < TAM) {
        getCasilla(f, c).classList.add(clase);
      }
    }
  }
}

function aplicarBloqueo() {
  limpiarBloqueo();
  reinas.forEach(r => marcarAtaques(r.fila, r.col, 'bloqueada'));
}

function limpiarBloqueo() {
  document.querySelectorAll('.bloqueada').forEach(c => c.classList.remove('bloqueada'));
}

function limpiarTodasReinas() {
  // quitar visualmente todas las reinas del tablero
  document.querySelectorAll('.reina').forEach(c => {
    c.classList.remove('reina');
    c.textContent = '';
  });
  // limpiar array de reinas y bloqueos
  reinas = [];
  limpiarBloqueo();
  actualizarInfo();
}

function actualizarInfo() {
  infoEl.textContent = `Reinas: ${reinas.length}`;
}

function getCasilla(fila, col) {
  return document.querySelector(`.casilla[data-fila="${fila}"][data-col="${col}"]`);
}

// inicializar info
actualizarInfo();