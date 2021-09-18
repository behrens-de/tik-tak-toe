console.log('Start Game:');

const game = new Game();

const player = [
    new Player('Max', '🙅🏻‍♀️', 0, game),
    new Player('Jan', '🙆🏻‍♂️', 0, game)
];


// Set Item
const items = document.querySelectorAll('.item');
items.forEach(item => item.addEventListener('click', clickItem));
function clickItem(item) {
    // Wenn Spiel nicht zuende ist 
    if (!game._end) {
        const status = document.querySelector('.status');

        const figur = player[game._currenPlayer].figur;

        if (player[game._currenPlayer].setField(this.dataset.row, this.dataset.column)) {
            // Setzt die Firgur ins Frontend
            this.innerHTML = figur;
            if (game.checkWin(figur)) {

                if (status) {
                    status.innerHTML = `${player[game._currenPlayer].name} hat gewonnen`;
                }
                player[game._currenPlayer].points += 1;
                game._end = true;
                displayPlayer();

            }
            // Tauscht den spieler
            player[game._currenPlayer].switchPlayer();

        } else {
            //alert('Hier ist doch schon eine Figur');
            this.classList.add("error");
            setTimeout(() => {
                this.classList.remove("error");  
            }, 400);
            
        }
    } else {
        this.classList.add("error");
        setTimeout(() => {
            this.classList.remove("error");  
        }, 400);
    }
}

// NEW Game

const newGameBtn = document.querySelector('.newGame');
newGameBtn.addEventListener('click', newGame);

function newGame() {
    game.new();
    items.forEach(item => { item.innerHTML = ""; });
}




function displayPlayer() {
 
    // document.querySelector('#gamer1 .name').innerHTML = player[0].name;
    // document.querySelector(' #gamer1.punkte').innerHTML = player[0].points;

    // document.querySelector('#gamer2 .name').innerHTML = player[1].name;
    // document.querySelector('#gamer2 .punkte').innerHTML = player[1].points;

    console.log('PLAYER');
    console.log(player[0].name);
    console.log(player[1].name);

    document.querySelector('#gamer1 .name').innerHTML = player[0].name;
    document.querySelector('#gamer1 .points').innerHTML = player[0].points;
    document.querySelector("#gamer2 .name").innerHTML = player[1].name;
    document.querySelector("#gamer2 .points").innerHTML = player[1].points;

}

document.querySelector('.status').innerHTML = player[0].name+' ist am zug!';

displayPlayer();

