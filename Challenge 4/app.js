function Board(el, rows = 4, cols = 4) {
    this.el = document.querySelector(el);
    this.spanScore = document.querySelector("#score");
    this.rows = rows;
    this.cols = cols;
    this.score = 0;
    this.resetScore = false;
    this.oddCell = "";

    this.generateBoard();
    this.bindEvents();
}

Board.prototype.generateBoard = function () {
    this.oddCell = this.generateRandomCell();

    const { color, oddColor } = getRandomColors();
    const fragment = document.createDocumentFragment();

    for (var i = 0; i < this.rows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (var j = 0; j < this.cols; j++) {
            const col = document.createElement("div");
            const cell = i + ":" + j;
            col.classList.add("col");
            col.dataset["cell"] = cell;

            row.appendChild(col);
            col.style.background = color;
            if (this.oddCell === cell) {
                col.style.background = oddColor;
            }
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);
};

Board.prototype.bindEvents = function () {
    this.el.addEventListener("click", (e) => {
        const cell = e.target.dataset["cell"];

        if (this.oddCell === cell) {
            this.regenerateBoard();
            this.score++;
            this.spanScore.innerHTML = this.score;
        } else {
            this.el.classList.add("shake");
            setTimeout(() => {
                this.resetBoard();
                this.score = 0;
                this.spanScore.innerHTML = this.score;
            }, 800);
        }
    });
};

Board.prototype.regenerateBoard = function () {
    this.rows++;
    this.cols++;
    this.el.innerHTML = "";
    this.generateBoard();
};

Board.prototype.resetBoard = function () {
    this.el.innerHTML = "";
    this.el.classList.remove("shake");
    this.rows = this.cols = 4;
    this.resetScore = false;
    this.generateBoard();
};

Board.prototype.generateRandomCell = function (min = 0, max = this.rows) {
    const row = Number.parseInt(Math.random() * (max - min));
    const col = Number.parseInt(Math.random() * max);
    return row + ":" + col;
};

const getRandomColors = function () {
    var ratio = 0.618033988749895;

    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color =
        "hsl(" +
        Math.round(360 * hue) +
        "," +
        saturation +
        "%," +
        lightness +
        "%)";
    var oddColor =
        "hsl(" +
        Math.round(360 * hue) +
        "," +
        saturation +
        "%," +
        (lightness + 5) +
        "%)";

    return {
        color,
        oddColor,
    };
};
new Board("#board");
