// Imports
import { Game } from './Game.js';
import { Player } from './Player.js';
import { Gamefield } from './Gamefield.js';
import { Render } from './Render.js';

// Inizialisiere Klassen
const _Game = new Game('Tik Tak Toe');
const _Gamefield = new Gamefield();
const _Render = new Render(_Gamefield, '#app');
const _Player = [new Player({ name: 'JP WebDev', figur: '👨🏻‍💻' }), new Player({ name: 'Max B.', figur: '👨🏻' })];




// console.log('test');
// _Gamefield.reset();
// console.log(_Gamefield.items.free);
// console.log(_Gamefield.items.notfree);

_Render.game();


// Element wird geklickt
const btns = document.querySelectorAll('.game-field-item');
btns.forEach((b) => {
    b.addEventListener('click', clickField);
});

function clickField() {

    // Prüfe ob das Feld setzbar ist 
    const freeItems = _Gamefield.items.free;

    let isFree = false;

    freeItems.forEach(item => {
        if (item.row === Number(this.dataset.row) && item.column === Number(this.dataset.column)) {
            isFree = true;
        }
    });


    if (!_Game.done) {
        // Feld noch setzbar
        if (isFree) {
            const currentPlayer = _Game.currentPlayer;
            const figur = _Player[currentPlayer].figur;
            const name = _Player[currentPlayer].name;
            // Setze Feld
            this.innerHTML = figur;
            _Gamefield.setitem(this.dataset.column, this.dataset.row, figur);

            // Zählt die Anzahl der Züge hoch
            _Game.moves++;


            const winning = _Game.checkWin(_Gamefield, figur);

            // Wenn ein Spieler gewonnen hat
            if (winning) {
                display({
                    msg: `${name} hat die Rund gewonnen`
                });
                _Game.done = true;
            }

            const noWinner = _Game.checkNoWin(_Gamefield);
            if(noWinner){
                display({
                    msg: `Diese Runde ist leider unentschienden`
                });
                _Game.done = true;  
            }


            // Ändert den Spieler
            _Game.switchPlayer();


        } else {
            // Fehlermeldung wenn Feld schon belegt
            this.classList.add('game-field-item_error');
            setTimeout(() => {
                this.classList.remove('game-field-item_error');
            }, 1000);
            display({
                msg: 
                'Dieses Feld ist schon belegt',
                className: 'error'
            });
        }

    } else {
        display({ msg: 'Spiel ist beendet', className: 'error' });
    }

    //console.log(_Gamefield.items.notfree);
}



// Wenn der Reset Button gelickt wird
const resetButton = document.querySelector('.game-field-reset-btn');
if (resetButton) {
    resetButton.addEventListener('click', resetField);
}

function resetField() {
    _Gamefield.reset();
    _Render.clear({});
    document.querySelector('.infobox').innerHTML = '....'
    _Game.done = false;

    display({ msg: 'Neue runde beginnt!' });
    console.log(_Gamefield._items);
}





function display({ msg = '', timeout = 1500, className = 'info' }) {


    const display = document.querySelector('.infobox');
    if (display) {
        display.innerHTML = `<span class="${className}">${msg}</span>`;
        setTimeout(() => {
            display.innerHTML = null;
        }, timeout);
    }
}