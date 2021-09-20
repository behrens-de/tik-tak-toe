class Game {
    constructor(name) {
        this.name = name;
        this.started = false;
        this.moves = 0;
    }



    start(){
        this.started = true;
    }
}

export { Game };