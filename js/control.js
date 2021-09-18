//
console.log('Start Control');

const items = document.querySelectorAll('.item');
const appGamer = document.querySelector('.spieler');
const appStatus = document.querySelector('.spieler');

items.forEach(item => item.addEventListener('click', clickItem));

function clickItem(item) {


    if (Player[game._currenPlayer].setField(this.dataset.row, this.dataset.column)) {
        // Wenn Feld anklickbar


        const statusTxt = () =>{
            if(game._winner){
                return 'Spiel wurde gewonnen';
            } else if(game._noWinner){
                return 'unenschieden';
            } else {
                return `${Player[game._currenPlayer].name} ist am Zug!`;
            }
        }


        appStatus.innerHTML = statusTxt();


        this.innerHTML = Player[game._currenPlayer].figur;
        console.log(game._field);

    } else {
        // Wenn Feld schon besetzt
        console.log('Ohhh Nooo ;(')
    }

}
/**
 * Spieler 1
 */
const appPlayerOne = document.querySelector('.spieler1');
const appPlayerOneName = appPlayerOne.querySelector('.name');
const appPlayerOnePoints = appPlayerOne.querySelector('.punkte');

appPlayerOneName.innerHTML = Player[0].name;
appPlayerOnePoints.innerHTML = 0;


const appPlayerTow = document.querySelector('.spieler2');
const appPlayerTowName = appPlayerTow.querySelector('.name');
const appPlayerTowPoints = appPlayerTow.querySelector('.punkte');

appPlayerTowName.innerHTML = Player[1].name;
appPlayerTowPoints.innerHTML = 0;