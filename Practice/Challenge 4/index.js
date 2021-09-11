class Board {
    constructor(el, score, rows = 4, cols = 4) {
        this.el = document.querySelector(el);
        this.scoreEl = document.querySelector(score);

        this.rows = rows;
        this.cols = cols;
        this.score = 0;
        this.resetScore = false;
        this.oddCell = "";

        this.init();
        this.bindEvents();
    }

    init() {
        this.oddCell = this.generateRandomCell();

        const { color, oddColor } = this.getRandomColors();
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement("div");
            row.classList.add("row");

            for (let j = 0; j < this.cols; j++) {
                const col = document.createElement("div");
                const cell = i + ":" + j;

                col.classList.add("col");
                col.dataset["cell"] = cell;
                col.style.background = color;

                if (this.oddCell === cell) {
                    col.style.background = oddColor;
                }

                row.appendChild(col);
            }
            fragment.appendChild(row);
        }

        this.el.appendChild(fragment);
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const cell = e.target.dataset["cell"];

            if (this.oddCell === cell) {
                this.regenerateBoard();
                this.score++;
                this.spanScore.innerText = this.score;
            } else {
                this.el.classList.add("shake");

                setTimeout(() => {
                    this.resetBoard();
                    this.score = 0;
                    this.spanScore.innerText = this.score;
                }, 800);
            }
        });
    }

    regenerateBoard() {
        this.rows++;
        this.cols++;
        this.el.innerHTML = "";
        this.regenerateBoard();
    }

    resetBoard() {
        this.el.innerHTML = "";
        this.el.classList.remove("shake");
        this.rows = this.cols = 4;
        this.resetScore = false;
        this.init();
    }

    generateRandomCell(min = 0, max = this.rows) {
        const row = Number.parseInt(Math.random() * (max - min));
        const col = Number.parseInt(Math.random() * max);
        return row + ":" + col;
    }

    getRandomColors() {
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
    }
}
