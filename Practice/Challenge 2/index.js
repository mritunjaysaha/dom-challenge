class Board {
    constructor(el, reset, rows = 5, cols = 5) {
        this.el = document.querySelector(el);
        this.reset = document.querySelector(reset);

        this.rows = rows;
        this.cols = cols;
        this.activeColor = "#000";
        this.draw = false;

        this.init();
        this.colorPanel();
        this.bindEvents();
    }

    init() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.rows; i++) {
            const rows = document.createElement("div");
            rows.classList.add("row");

            for (let j = 0; j < this.cols; j++) {
                const col = document.createElement("div");
                col.classList.add("col");
                col.dataset["cell"] = i + ":" + j;
                rows.appendChild(col);
            }

            fragment.appendChild(rows);
        }

        this.el.appendChild(fragment);
    }

    colorPanel() {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let i = 0; i < this.cols; i++) {
            const col = document.createElement("div");
            const color = this.generateRandomColor();

            col.classList.add("col");
            col.dataset["color"] = color;
            col.style.background = color;

            row.appendChild(col);
        }

        this.el.appendChild(row);
    }

    bindEvents() {
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

        this.reset.addEventListener("click", (e) => {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    document.querySelector(
                        `div[data-cell='${i}:${j}']`
                    ).style.background = "#fff";
                }
            }
        });
    }

    fill(e) {
        const cell = e.target.dataset["cell"];
        const color = e.target.dataset["color"];

        if (color) {
            this.activeColor = color;
        }

        if (cell) {
            e.target.style.background = this.activeColor;
        }
    }

    generateRandomColor() {
        const list = "0123456789ABCDEF";

        let color = "#";

        for (let i = 0; i < 6; i++) {
            color += list[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

new Board("#board", "#reset");
