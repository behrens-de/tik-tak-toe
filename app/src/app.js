// Imports
import { Game } from './Game.js';
import { Player } from './Player.js';
import { Gamefield } from './Gamefield.js';
import { Render } from './Render.js';

// Inizialisiere Klassen
const _Game = new Game('Tik Tak Toe');
const _Gamefield = new Gamefield();
const _Player = [
    new Player({ name: 'JP WebDev', figur: '🙅🏾‍♀️' }),
    new Player({ name: 'Max B.', figur: '🙆🏻‍♀️' })
];
const _Render = new Render(_Player, _Gamefield, '#app');


// Rendert das spiel und lädt die notwendigen funktionen
function runGame() {
    // Das spiel wird gerendert
    _Render.game();

    // Item wird geklickt
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


                // Wenn ein Spieler gewonnen hat
                const winning = _Game.checkWin(_Gamefield, figur);
                if (winning) {
                    display({
                        msg: `${name} hat die Rund gewonnen`
                    });
                    _Game.done = true;
                    // TODO: Punkte dem gewinner zuschreiben
                }

                // Wenn Spiel unentschieden
                const noWinner = _Game.checkNoWin(_Gamefield);
                if (noWinner) {
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
    // Bereinigt das Spielfeld
    function resetField() {
        _Gamefield.reset();
        _Render.clear({});
        document.querySelector('.infobox').innerHTML = '....'
        _Game.done = false;

        display({ msg: 'Neue runde beginnt!' });
        //console.log(_Gamefield._items);
    }

    // Zeigt den Status an 
    function display({ msg = '', timeout = 1500, className = 'info' }) {
        const display = document.querySelector('.infobox');
        if (display) {
            display.innerHTML = `<span class="${className}">${msg}</span>`;
            setTimeout(() => {
                display.innerHTML = null;
            }, timeout);
        }
    }
    clickBtns();
}
// Rendert die einstellungen und lädt die notwendigen funtionen
function runSettings() {
    // Die einstellungen werden gerendert
    _Render.settings();
    // Aussichen der Figur
    function selectFigur(id) {

        const fItem = document.querySelectorAll(id + ' .setFigur');

        if (fItem) {
            fItem.forEach(item => {
                item.addEventListener('click', changeFigur);
            });
        }
        function changeFigur() {
            const activeClass = 'setFigur-active';
            fItem.forEach(item => item.classList.remove(activeClass));
            //console.log(this.innerText);
            this.classList.add(activeClass);
        }
    }

    selectFigur('#setFigurWrap_0');
    selectFigur('#setFigurWrap_1');
    clickBtns();

}
// Buttons um zwischen Spiel und einstellungen hin und her zu springen
function clickBtns() {



    const back2game = document.querySelector('#back2game');
    if (back2game) {
        back2game.addEventListener('click', back2Game);

        function back2Game() {
            document.querySelector('#app').innerHTML = "";
            runGame();
        }
    }



    const go2settings = document.querySelector('#go2settings');
    if (go2settings) {
        go2settings.addEventListener('click', go2Settings);

        function go2Settings() {
            document.querySelector('#app').innerHTML = "";
            runSettings();
        }
    }
}

runGame();