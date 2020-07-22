function Board(el, rows, cols) {
    this.el = document.querySelector(el);
    this.rows = rows;
    this.cols = cols;
    this.activeColor = "black";
    this.draw = false;

    // this.getBoardSize();
    this.generateBoard();
    this.addColorPanel();
    this.bindEvents();
}

Board.prototype.generateBoard = function () {
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < this.rows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (var j = 0; j < this.cols; j++) {
            const col = document.createElement("div");
            col.classList.add("col");
            col.dataset["cell"] = i + ":" + j;
            row.appendChild(col);
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);
};

Board.prototype.addColorPanel = function () {
    const row = document.createElement("div");
    row.classList.add("row");

    for (var i = 0; i < this.rows; i++) {
        const col = document.createElement("div");
        const color = getRandomColor();
        col.classList.add("col");
        col.dataset["color"] = color;
        col.style.background = color;

        row.appendChild(col);
    }
    this.el.appendChild(row);
};

Board.prototype.bindEvents = function () {
    this.el.addEventListener("mousedown", (e) => {
        this.draw = true;
        this.fill(e);
    });

    this.el.addEventListener("mouseover", (e) => {
        this.draw && this.fill(e);
    });

    this.el.addEventListener("mouseup", (e) => {
        this.draw = false;
    });
};
Board.prototype.fill = function (e) {
    const cell = e.target.dataset["cell"];
    const color = e.target.dataset["color"];
    if (color) {
        this.activeColor = color;
    }
    if (cell) {
        e.target.style.background = this.activeColor;
    }
};

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

btn = document.getElementById("set-board");
btn.onclick = function changeContent() {
    console.log("here", btn);
    const row = document.getElementById("row-size");
    const col = document.getElementById("col-size");
    console.log(row.value, col.value);

    new Board("#board", row.value, col.value);
};
