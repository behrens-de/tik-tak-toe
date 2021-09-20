// Instans des Spiels
const game = new Game();
// Erzeugen der Spieler
const player = [
    new Player('Mr. WebDev', '🙅🏻‍♂️', 0, game),
    new Player('Mr. GameBot', '🤖', 0, game, false)
];


// Erzeigt eine zufallszahl (0, 1 oder 2)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Set Item
const items = document.querySelectorAll('.item');

// Set BOT
if (player[1].bot) {

    // Freie Felder ermitteln
    function freeFeels() {
        const fields = new Array();
        for (let i = 0; i < 9; i++) {
            if (items[i].innerHTML === "") {
                fields.push(i);
            }
        }
        return fields;
    }

    setInterval(() => {

        const ff = freeFeels().length;

        if (game._currenPlayer === 1) {
            console.log('Bot ist am Zug');
            // Freie Felder ermitteln

            if (ff > 0 && (!game._winner || !game._noWinner)) {
                items[freeFeels()[getRandomInt(ff)]].click();
            }




        } else {
            console.log('Bot muss warten');
        }
        console.log(`${ff} - ${game._end}`);


    }, 1000);
}




items.forEach(item => item.addEventListener('click', clickItem));
function clickItem() {
    // Wenn Spiel nicht zuende ist 
    if (!game._end) {
        const figur = player[game._currenPlayer].figur;

        // Wenn spielfeld gesetzt werden kann
        if (player[game._currenPlayer].setField(this.dataset.row, this.dataset.column)) {


            


            this.innerHTML = figur;// Setzt die Firgur ins Frontend
            game._moves++; // eröht die züge um eins
            // Prüft ob gewonnen
            console.log(game._moves);
            if (game.checkWin(figur)) {
                // Wenn ein Spieler gewonnen hat
                player[game._currenPlayer].points += game.getPoints();
                displayStatus(`${player[game._currenPlayer].name} hat gewonnen (+${game.getPoints()} Punkte)`)
                game._end = true;
                displayPlayer();

            } else if (game.checkNoWin()) {
                displayStatus(`Leider unentschieden`);
            }

            else {
                // Tauscht den spieler
                player[game._currenPlayer].switchPlayer();
                displayStatus(`${player[game._currenPlayer].name} ist am Zug`);
            }


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

// NEW Game - UI Button
const newGameBtn = document.querySelector('.newGame');
newGameBtn.addEventListener('click', newGame);

function newGame() {
    game.new();
    items.forEach(item => item.innerHTML = "");
    player[game._currenPlayer].switchPlayer();
    displayStatus(player[game._currenPlayer].name + ' beginnt!');
}

// Zeigt Name, Punktstand und Figur an
function displayPlayer() {
    // Player 1
    document.querySelector('#gamer1 .name').innerHTML = player[0].name;
    document.querySelector('#gamer1 .points').innerHTML = player[0].points;
    document.querySelector('#gamer1 .figur').innerHTML = player[0].figur;
    // Player 2
    document.querySelector("#gamer2 .name").innerHTML = player[1].name;
    document.querySelector("#gamer2 .points").innerHTML = player[1].points;
    document.querySelector('#gamer2 .figur').innerHTML = player[1].figur;


}

// Zeigt Name und punktstand an
function displayStatus(msg) {

    const status = document.querySelector('.status');
    if (status) {
        document.querySelector('.status').innerHTML = msg;
        return true;
    }
    return false;
}


displayPlayer();
displayStatus(player[0].name + ' beginnt das Spiel');



const splayer = [{
    name: 'Mr. WebDev',
    figur: '🙅🏻‍♂️'
}, {
    name: 'Mr. GameBot',
    figur: '🤖',
    bot: false
}]



function selectPlayerFigur(selector, type) {
    const myFig = document.querySelectorAll(selector);

    myFig.forEach(fig => fig.addEventListener('click', selectFigur));

    function selectFigur() {
        if (type === 0 || type === 1) {
            // Speichert neue Spieler figur
            splayer[type].figur = this.innerHTML;

        } else {
            // Änder die Hintergrind farbe
            document.body.className = '';
            document.body.classList.add(this.dataset.bgc);
        }

        myFig.forEach(fig => fig.classList.add('opcf5'));
        myFig.forEach(fig => fig.classList.remove('selectedFigur'));

        this.classList.remove('opcf5');
        this.classList.add('selectedFigur');
    }

}


// Setzt die aktuell gewählte Spielerfigur 
function setPlayerFigur(selector, playerNr) {
    const element = document.querySelectorAll(selector);
    element.forEach(elm => {
        if (elm.innerHTML === player[playerNr].figur) {
            elm.classList.add('selectedFigur');
        } else {
            elm.classList.remove('selectedFigur');
        }
    });
}


selectPlayerFigur('#figPlayer1 .myfig', 0);
selectPlayerFigur('#figPlayer2 .myfig', 1);
selectPlayerFigur('#bgColor .myfig', 2);


// Wenn Settings geöffnet werden
const openSettings = document.querySelector('.goSettings');
openSettings.addEventListener('click', openSet);
function openSet() {
    document.querySelector('#tttSettings').classList.remove('noDisplay');
    document.querySelector('#tttGame').classList.add('noDisplay');

    // Setzt die aktuellen Namen in das Input Feld
    document.querySelector('.ply1Name').value = player[0].name;
    document.querySelector('.ply2Name').value = player[1].name;

    setPlayerFigur('#figPlayer1 .myfig', 0);
    setPlayerFigur('#figPlayer2 .myfig', 1);


}

const openGame = document.querySelector('.goGame');
openGame.addEventListener('click', openG);
function openG() {
    document.querySelector('#tttGame').classList.remove('noDisplay');
    document.querySelector('#tttSettings').classList.add('noDisplay');
}


const btn_updateSetting = document.querySelector('#updateSettings #saveUpdate');
btn_updateSetting.addEventListener('click', updateSetting);

function updateSetting() {

    console.log(splayer);

    // Update Player 1
    player[0] = new Player(splayer[0].name, splayer[0].figur, 0, game);

    // Update Player 2
    player[1] = new Player(splayer[1].name, splayer[1].figur, 0, game);

    // Zeigt die Spieler an
    displayPlayer();
    // Beginnt neues Spiel
    newGame();

    openGame.click();
}


function renamePlayer(inputSelector, playerNr) {
    const input = document.querySelector(inputSelector);
    if (input) {
        input.addEventListener('change', newPlayerName);
        function newPlayerName() {
            splayer[playerNr].name = input.value;
        }
    }

}

renamePlayer('.ply1Name', 0);
renamePlayer('.ply2Name', 1);



const demo = {};

demo.name = 123;
demo.lang = 'de';