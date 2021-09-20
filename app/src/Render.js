class Render {

    constructor(gamefield) {
        this.gamefield = gamefield;
    }

    // Erzeugt die Headline
    title({targetSelector='#app', text='Test'}){
        const headline = document.createElement('h1');
        const txt = document.createTextNode(text);
        headline.appendChild(txt);
        document.querySelector(targetSelector).appendChild(headline);

    }

    // Erzeugt das Spielfeld
    field({targetSelector = '#app', fieldClass = 'game-field', itemClass = 'game-field-item'}) {
        const field = document.createElement('div');
        field.className = fieldClass;
        const fields = this.gamefield._field.columns * this.gamefield._field.rows
        console.log(fields);
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
        document.querySelector(targetSelector).appendChild(field);
    }
}
export { Render };