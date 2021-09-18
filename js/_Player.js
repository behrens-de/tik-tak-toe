class Player {
    constructor(name, figur, points, game) {
        this.name = name ?? 'Unbekannt';
        this.figur = figur ?? '+';
        this.points = points ?? 0;
        this.game = game;
    }

    setField(row, column) {
        // Wenn Feld noch nicht besetzt
        if (this.isSetField(row, column)) {
            // Setze spielerfigur auf das Feld
            this.game._field[row][column] = this.figur;
            // Ändert den Spieler
            return true;
        }
        // Gibt zurück das das Feld nicht gesetzt werden konnte
        return false;
    }

    switchPlayer(){
        game._currenPlayer = game._currenPlayer === 0 ? 1 : 0;
    }

    isSetField(row, column) {
        return this.game._field[row][column] === "" ? true : false;
    }
}