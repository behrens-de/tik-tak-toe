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
    const appPlayerOne = document.querySelector('.spieler1');
    const appPlayerOneName = appPlayerOne.querySelector('.name');
    const appPlayerOnePoints = appPlayerOne.querySelector('.punkte');

    appPlayerOneName.innerHTML = player[0].name;
    appPlayerOnePoints.innerHTML = player[0].points;


    const appPlayerTow = document.querySelector('.spieler2');
    const appPlayerTowName = appPlayerTow.querySelector('.name');
    const appPlayerTowPoints = appPlayerTow.querySelector('.punkte');

    appPlayerTowName.innerHTML = player[1].name;
    appPlayerTowPoints.innerHTML = player[1].points;
}


displayPlayer();


// console.log(player[0].setField(0, 0));
// console.log(game._field);
// console.log(player[0].setField(0, 0));
// console.log(game._field);
// console.log(player[0].setField(1, 0));
// console.log(game._field);
// console.log(player[0].setField(0, 0));
// console.log(game._field);


