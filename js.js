const board = document.getElementById('board');

const reinaImagen = "img/reina.jpg";

// Crear las 64 casillas
for (let row = 0; row < 8; row++) 
  for (let col = 0; col < 8; col++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const light = (row + col) % 2 === 0;
    cell.dataset.color = light ? 'light' : 'dark';
    cell.setAttribute('role','gridcell');
    cell.setAttribute('tabindex','0');
    cell.dataset.row = row;
    cell.dataset.col = col;

    cell.addEventListener('click', (ev) => {
      const shift = ev.shiftKey;
      
      if (cell.querySelector('img.reina')) {
        cell.innerHTML = '';
      } else {
        const img = document.createElement('img');
        img.className = 'reina';
        img.alt = 'Reina';
        img.src = reinaImagen;
        cell.appendChild(img);
      }
    });

    cell.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        cell.click();
      }
    });

    board.appendChild(cell);
  }

document.getElementById('clearBtn').addEventListener('click', clearBoard);

function clearBoard() {
  document.querySelectorAll('.cell').forEach(c => c.innerHTML = '');
}
