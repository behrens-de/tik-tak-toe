class Render {

    constructor(gamefield, target = '#app') {
        this.gamefield = gamefield;
        this.target = target;
    }
    // Erzeugt die Headline
    title({ text = 'Test' }) {
        const headline = document.createElement('h1');
        const txt = document.createTextNode(text);
        headline.appendChild(txt);
        document.querySelector(this.target).appendChild(headline);
    }
    // Erzeugt die SpielerArea
    playerbox({ }) {
        const wrap = document.createElement('div');
        wrap.className = 'player';

        const playerBox = document.createElement('div');
        playerBox.className = 'playerBox';

        const vs = document.createElement('div');
        vs.appendChild(document.createTextNode('vs'));
        vs.className = 'vs';

        playerBox.appendChild(this.player({}));
        playerBox.appendChild(vs);
        playerBox.appendChild(this.player({ playerName: 'max', className: 'playerTow' }));

        wrap.appendChild(playerBox);

        document.querySelector(this.target).appendChild(wrap);

    }
    // Erzeugt die Spiler
    player({ playerName = "Muster", playerFigur = "👨🏻‍💻", className = "playerOne" }) {
        const player = document.createElement('div');
        player.className = className;

        const figur = document.createElement('div');
        figur.appendChild(document.createTextNode(playerFigur));
        figur.className = 'figur';

        const name = document.createElement('div');
        name.className = 'name';
        name.appendChild(document.createTextNode(playerName));

        const points = document.createElement('div');
        points.appendChild(document.createTextNode(0));
        points.className = 'points';

        player.appendChild(figur);
        player.appendChild(name);
        player.appendChild(points);

        return player;
    }
    // Erzeugt die Infobereich
    info({ infoClass = 'infobox' }) {
        const span = document.createElement('span');
        span.appendChild(document.createTextNode('...'))
        span.className = infoClass;
        document.querySelector(this.target).appendChild(span);
    }
    // Erzeugt das Spielfeld
    field({ fieldClass = 'game-field', itemClass = 'game-field-item' }) {
        const field = document.createElement('div');
        field.className = fieldClass;
        const fields = this.gamefield._field.columns * this.gamefield._field.rows
        //console.log(fields);
        for (let col = 0; col < this.gamefield._field.columns; col++) {
            for (let row = 0; row < this.gamefield._field.columns; row++) {
                //console.log(`column: ${col} row: ${row}`);
                // Spielfeld Felder werden erzeugt
                const item = document.createElement('div');
                item.className = itemClass;
                item.dataset.column = col;
                item.dataset.row = row;
                field.appendChild(item);
            }
        }
        document.querySelector(this.target).appendChild(field);
    }
    // Leert alle items im Spielfeld
    clear({ itemClass = 'game-field-item' }) {
        const fields = document.querySelectorAll(`.${itemClass}`);
        fields.forEach(field => field.innerHTML = "");
    }
    // Erzeugt den Reset Button
    reset({ text = 'Zurücksetzen', buttonClass = 'game-field-reset-btn' }) {
        const button = document.createElement('button');
        button.className = buttonClass;
        button.appendChild(document.createTextNode(text));
        document.querySelector(this.target).appendChild(button);
    }
    game() {
        this.title({
            text: "Tic Tac Toe Game"
        });
        this.playerbox({});
        this.info({});
        // Rendert das Spielfeld
        this.field({
            targetSelector: '#app',
            fieldClass: 'game-field',
            itemClass: 'game-field-item'
        });
        // Rendert  den zurück setzen Button
        this.reset({
            text: 'zurücksetzen'
        });
    }
}
export { Render };