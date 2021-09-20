class Game {
    constructor(name) {
        this.name = name;
        this.started = false;
        this.done = false;
        this.moves = 0;
        this.currentPlayer = 0;
    }

    start() {
        this.started = true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    }

    setFiled() {

    }

    checkWin(gamefield, figur) {
        const cross1 = gamefield._items[0][0] === figur &&
        gamefield._items[1][1] === figur &&
        gamefield._items[2][2] === figur ? true : false;

        const cross2 = gamefield._items[0][2] === figur &&
        gamefield._items[1][1] === figur &&
        gamefield._items[2][0] === figur ? true : false;

        const row1 = gamefield._items[0][0] === figur &&
        gamefield._items[0][1] === figur &&
        gamefield._items[0][2] === figur ? true : false;

        const row2 = gamefield._items[1][0] === figur &&
        gamefield._items[1][1] === figur &&
        gamefield._items[1][2] === figur ? true : false;

        const row3 = gamefield._items[2][0] === figur &&
        gamefield._items[2][1] === figur &&
        gamefield._items[2][2] === figur ? true : false;

        const column1 = gamefield._items[0][0] === figur &&
        gamefield._items[1][0] === figur &&
        gamefield._items[2][0] === figur ? true : false;

        const column2 = gamefield._items[0][1] === figur &&
        gamefield._items[1][1] === figur &&
        gamefield._items[2][1] === figur ? true : false;

        const column3 = gamefield._items[0][2] === figur &&
        gamefield._items[1][2] === figur &&
        gamefield._items[2][2] === figur ? true : false;

        return cross1 || cross2 || row1 || row2 || row3 || column1 || column2 || column3;

    }
    checkNoWin(gamefield) {
        return gamefield.items.notfree.length > 8 ? true : false;
    }
}

export { Game };