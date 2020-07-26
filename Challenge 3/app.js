function Board(el, rows = 8, cols = 8) {
    this.el = document.querySelector(el);
    console.log(this.el);
    this.rows = rows;
    this.cols = cols;
    this.color = "red";
    this.activeCell = "";

    this.generateBoard();
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

// Board.prototype.bindEvents = function () {
//     this.el.addEventListener("click", (e) => {
//         this.activeCell && this.diagonals(this.activeCell, null);

//         var cell = e.target.dataset["cell"];
//         this.activeCell = cell;
//         cell && this.diagonals(cell, this.color);

//         e.stopPropagation();
//     });

//     document.addEventListener("click", (e) => {
//         this.activeCell && this.diagnols(this.activeCell, null);
//     });
// };

// Board.prototype.fill = function (cell, color) {
//     document.querySelector(`div[data-cell='${cell}']`).style.background = color;
// };

// Board.prototype.diagnols = function (activeCell, color) {
//     const [left, right] = activeCell.split(":");

// }

new Board("#board");
