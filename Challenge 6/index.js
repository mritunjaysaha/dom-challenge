class Board {
    constructor(el, startEl, cols = 5) {
        this.el = document.querySelector(el);
        this.startEl = document.querySelector(startEl);

        this.cols = cols;
        this.score = 0;

        this.error = false;

        this.init();
        this.bindEvents();
    }

    init() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.cols; i++) {
            const col = document.createElement("div");
            col.classList.add("col");
            col.dataset["cell"] = i;

            fragment.appendChild(col);
        }

        this.el.appendChild(fragment);
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {});
        this.startEl.addEventListener("click", () => {
            console.log("clicked");
            this.startBlink();
        });
    }

    startBlink() {
        let count = 0;

        const intervalId = setInterval(() => {
            if (count === this.score) {
                clearInterval(intervalId);
            }

            this.selectRandomCell();

            count++;
        }, 800);
    }

    selectRandomCell(max = this.cols) {
        const cell = Number.parseInt(Math.random() * max);
        console.log("cell", cell);
    }
}

new Board("#board", "#start");
