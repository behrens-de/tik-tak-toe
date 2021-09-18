// Game Klasse
class Game {
    constructor() { 
        this._field = [['', '', ''], ['', '', ''], ['', '', '']];
        this._currenPlayer = 0;
        this._moves = 0;
        this._winner = false;
        this._noWinner = false;
    }

    // Startet eine Neue Runde
    newRound() {
        this._moves = 0;
        this._winner = false;
        this._noWinner = false;
        this._field = [['', '', ''], ['', '', ''], ['', '', '']];
    }
}

// Spielerklasse
class Gamer {
    constructor(name, figur) {
        this.name = name ?? 'Unbekannt';
        this.figur = figur ?? '+';
    }

    setField(row, column) {
        // Prüfen ob feld schon belegt ist
        if (!this.checkIsset(row, column)) {
            // Wenn feld noch nicht gesetzt ist
            game._moves++;
            game._field[row][column] = this.figur;

            this.switchPlayers();
            if (this.checkNoWin()) {
                game._noWinner = true;
            }

            // Prüffen ob Spiel gewonnen
            if (this.checkWin()) {
                //console.log('Gewonnen');
                game._winner = true;
            } else {
                //console.log('Nocht gewonnen');
            }

            return true;
        }
        return false;
    }

    checkIsset(row, column) {
        return game._field[row][column] ? true : false;
    }
    switchPlayers() {
        game._currenPlayer = game._currenPlayer === 0 ? 1 : 0;
    }
    checkWin() {
        let win = false;
        // check rows and Columns 
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < 3; y++) {
                win = game._field[i][y] === this.figur ? true : false;
            }
        }
        // check cross
        win = game._field[0][0] === this.figur &&
            game._field[1][1] === this.figur &&
            game._field[2][2] === this.figur ||

            game._field[0][2] === this.figur &&
            game._field[1][1] === this.figur &&
            game._field[2][0] === this.figur ? true : false;

        return win;
    }

    checkNoWin() {
        return game._winner === false && game._moves > 8 ? true : false;
    }
}

// Instanz der Game Klasse
const game = new Game();

// ---
// TestArea
// ---
// Erstellen und initzalisieren von 2 Spielern

const figurs = ["🙅🏻‍♀️","🙆🏻‍♂️","😂","😊","😁","😏","😍","😒","😭","😩","😔","😳","😉","😌","😎","😜","😋","😴","🥰"]
const Player = [
    new Gamer('Max', figurs[0]),
    new Gamer('Papa', figurs[1])
];


// Erzeigt eine zufallszahl (0, 1 oder 2)
function getRandomInt(max) {
    // TODO: Random der noch verfügbaren felder und nicht ein gerelles Random
    return Math.floor(Math.random() * max);
}

// Diese Schleife läuft solange weder gewonnen noch unenschieden ist 

// while (!game._winner && !game._noWinner) {
//     console.log(`Spielzug: ${game._moves}
//     Player: ${game._currenPlayer}`)
//     Player[game._currenPlayer].setField(getRandomInt(3), getRandomInt(3));
//     console.log(game._field);
// }
// if (game._winner) { console.log(`Gewonnen hat ${Player[game._currenPlayer].name}`); }
// if (game._noWinner) { console.log('Unentschieden'); }