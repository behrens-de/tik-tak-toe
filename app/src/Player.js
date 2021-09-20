class Player{
    constructor({name = 'JP WebDev',figur = '👨🏻‍💻'}){
        this.name = name;
        this.figur = figur;
        this.points = 0;
        this.isBot = false;
    }

    getPoints(){
        return this.points;
    }
    setPoints(addPoints=0){
        this.points += addPoints;

    }
    
}

export {Player};