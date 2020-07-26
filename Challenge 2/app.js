function Board(el, rows = 5, cols = 5) {
    this.el = document.querySelector(el);
    this.rows = rows;
    this.cols = cols;
    this.activeColor = "#000";
    this.draw = false;
    this.init();
    this.bindEvents();
    this.colorPanel();
}

Board.prototype.init = function () {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.rows; i++) {
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

Board.prototype.colorPanel = function () {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < this.cols; i++) {
        const col = document.createElement("div");
        const color = this.genarateRandomColor();
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

Board.prototype.genarateRandomColor = function () {
    const list = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += list[Math.floor(Math.random() * 16)];
    }
    return color;
};
