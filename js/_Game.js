class Game {
    constructor() {
        this._field = [['', '', ''], ['', '', ''], ['', '', '']];
        this._status = 0;
        this._moves = 0;
        this._currenPlayer = 0;
        this._end = false;
    }

    new() {
        this._field = [['', '', ''], ['', '', ''], ['', '', '']];
        this._status = 0;
        this._moves = 0;
        this._end = false;
    }

    checkWin(figur) {


        const cross1 = this._field[0][0] === figur &&
            this._field[1][1] === figur &&
            this._field[2][2] === figur ? true : false;

        const cross2 = this._field[0][2] === figur &&
            this._field[1][1] === figur &&
            this._field[2][0] === figur ? true : false;

        const row1 = this._field[0][0] === figur &&
            this._field[0][1] === figur &&
            this._field[0][2] === figur ? true : false;

        const row2 = this._field[1][0] === figur &&
            this._field[1][1] === figur &&
            this._field[1][2] === figur ? true : false;

        const row3 = this._field[2][0] === figur &&
            this._field[2][1] === figur &&
            this._field[2][2] === figur ? true : false;

        const column1 = this._field[0][0] === figur &&
            this._field[1][0] === figur &&
            this._field[2][0] === figur ? true : false;

        const column2 = this._field[0][1] === figur &&
            this._field[1][1] === figur &&
            this._field[2][1] === figur ? true : false;

        const column3 = this._field[0][2] === figur &&
            this._field[1][2] === figur &&
            this._field[2][2] === figur ? true : false;

        return cross1 || cross2 || row1 || row2 || row3 || column1 || column2 || column3;
    }
    checkNoWin() {
        return this._moves > 8 ? true : false;
    }
    getPoints() {
        let points = 1;
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < 3; y++) {
                if (this._field[i][y] === "") {
                    points++;
                }
            }
        }
        return points;
    }
}