class Gamefield {

    constructor() { }
    _items = [["", "", ""], ["", "", ""], ["", "", ""]];
    _field = {
        columns: 3,
        rows: 3
    }

    // Gibt Items des Spielfeldes zurück und unterteilt diese in belegt und nicht belegt
    get items() {
        let free = [];
        let notfree = [];
        for (let column = 0; column < this._field.columns; column++) {
            for (let row = 0; row < this._field.rows; row++) {
                if (this._items[column][row] === "") {
                    free = [...free, { column: column, row: row }];
                }
                if (this._items[column][row] !== "") {
                    notfree = [...notfree, { column: column, row: row }];
                }

            }
        }
        return { free, notfree };
    }

    // Setzt ein Item 
    setitem(row, column, figur){
        this._items[row][column] = figur;
    }

    // Setzt die Items zurück
    reset() {
        this._items = [["", "", ""], ["", "", ""], ["", "", ""]];
    }

}

export { Gamefield };