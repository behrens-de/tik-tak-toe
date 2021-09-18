// Erstelle Spielfeld
const gameField = [['', '', ''], ['', '', ''], ['', '', '']];

// Spieler
class Gamer {
    constructor(name, figur) {
        this.name = name ?? 'Unbekannt';
        this.figur = figur ?? '+';
    }

    setField(row, column) {
        // Prüfen ob feld schon belegt ist
        if(!this.checkIsSet(row, column)){
            // Wenn feld noch nicht gesetzt ist
            gameField[row][column] = this.figur;
            // Prüffen ob Spiel gewonnen
            if(this.checkWin()){
                console.log('Gewonnen');
            } else {
                console.log('Nocht gewonnen');
            }
        }
    }

    checkIsSet(row, column) {
        return gameField[row][column]?true:false;
    }
    checkWin() {
        let win = false;
        // check rows and Columns 
        for(let i = 0; i<3; i++){
            for(let y = 0; y<3; y++){
               win =  gameField[i][y] === this.figur ? true: false;
            }
        }
        // check cross
        win = gameField[0][0] === this.figur &&
        gameField[1][1] === this.figur &&
        gameField[2][2] === this.figur ||

        gameField[0][2] === this.figur &&
        gameField[1][1] === this.figur &&
        gameField[2][0] === this.figur ? true: false;

        return win;
    }
}

const Player = [
    new Gamer('Max', 'x'),
    new Gamer('Papa', 'o')
];



// Feld anklicken
Player[1].setField(0, 0);
console.log(gameField);
Player[1].setField(1, 1);
console.log(gameField);
Player[1].setField(2, 2);
console.log(gameField);
