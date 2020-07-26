function Board(el, rows = 8, cols = 8, color = "red") {
    this.el = document.querySelector(el);
    console.log(this.el);
    this.rows = rows;
    this.cols = cols;
    this.color = color;
    this.activeCell = "";

    this.generateBoard();
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

            (i + j) % 2 === 0
                ? col.classList.add("white")
                : col.classList.add("black");
            row.appendChild(col);
        }
        fragment.appendChild(row);
    }
    this.el.appendChild(fragment);
};

Board.prototype.bindEvents = function () {
    this.el.addEventListener("click", (e) => {
        this.activeCell && this.diagonals(this.activeCell, null);

        var cell = e.target.dataset["cell"];
        this.activeCell = cell;
        this.diagonals(cell, this.color);

        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
        this.activeCell && this.diagonals(this.activeCell, null);
    });
};

Board.prototype.fill = function (cell, color) {
    document.querySelector(`div[data-cell='${cell}']`).style.background = color;
};

Board.prototype.diagonals = function (cell, color) {
    console.log(cell);

    let [row, col] = cell.split(":");
    row = Number.parseInt(row);
    col = Number.parseInt(col);

    this.fill(cell, color);

    // 1:2 active cell

    // top-left
    // 0:1
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        console.log(i + ":" + j);
        this.fill(i + ":" + j, color);
    }
    // bottom-left
    // 2:1
    // 3:0
    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
        console.log(i + ":" + j);
        this.fill(i + ":" + j, color);
    }
    // top-right
    // 0:3
    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
        console.log(i + ":" + j);
        this.fill(i + ":" + j, color);
    }
    // bottom-right
    // 2:3
    // 3:4
    // 4:5
    // 5:6
    // 6:7
    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
        console.log(i + ":" + j);
        this.fill(i + ":" + j, color);
    }
};
