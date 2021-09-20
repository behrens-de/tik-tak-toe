// Imports
import { Game } from './Game.js';
import { Player } from './Player.js';
import { Gamefield } from './Gamefield.js';
import { Render } from './Render.js';

// Inizialisiere Klassen
const _Game = new Game('Tik Tak Toe');
const _Gamefield = new Gamefield();
const _Render = new Render(_Gamefield);
const _Player = [new Player({}),new Player({})];


// console.log('test');
// _Gamefield.reset();
// console.log(_Gamefield.items.free);
// console.log(_Gamefield.items.notfree);


_Render.title({
    text:_Game.name
});

// Rendert das Spielfeld
_Render.field({
    targetSelector: '#app',
    fieldClass: 'game-field',
    itemClass: 'game-field-item'
});



// Element wird geklickt
const btns = document.querySelectorAll('.game-field-item');
btns.forEach((b) => {
    b.addEventListener('click', clickField);
});

function clickField() {

    // Prüfe ob das Feld setzbar ist 
    const freeItems = _Gamefield.items.free;
    freeItems.forEach(item=>{
        if(item.row === this.dataset.row && item.column === this.dataset.column){
            console.log(item);
        } 
    })

    // Setze Feld
    this.innerHTML = _Player[0].figur;
    _Gamefield.setitem(this.dataset.column,this.dataset.row,_Player[0].figur);
    console.log(_Gamefield.items.notfree);
}
