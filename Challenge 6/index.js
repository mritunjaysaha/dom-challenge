class Board {
    constructor(el, startEl, scoreEl, cols = 5) {
        this.el = document.querySelector(el);
        this.startEl = document.querySelector(startEl);
        this.scoreEl = document.querySelector(scoreEl);

        this.cols = cols;
        this.score = 0;
        this.blinkCellsArr = [];
        this.userClicks = -1;
        this.numberOfTimesClicked = 0;

        this.init();
        this.bindEvents();
    }

    init() {
        this.scoreEl.innerText = this.score;

        this.generateBoard();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const currentCell = Number.parseInt(e.target.dataset["cell"]);

            this.userClicks++;
            this.numberOfTimesClicked++;

            console.log(
                "user clicks",
                this.userClicks,
                this.blinkCellsArr[this.userClicks]
            );
            if (this.blinkCellsArr[this.userClicks] === currentCell) {
                console.log("true");

                this.updateScore(currentCell);
            } else {
                this.el.classList.add("shake");

                this.score = 0;
                this.blinkCellsArr = [];
                this.userClicks = -1;
                this.numberOfTimesClicked = 0;

                const wrongCell = document.querySelector(
                    `div[data-cell='${currentCell}']`
                );

                wrongCell.style.background = "red";

                setTimeout(() => {
                    wrongCell.style.background = "white";

                    this.el.classList.remove("shake");
                }, 800);
            }
        });

        this.startEl.addEventListener("click", () => {
            console.log("clicked");
            this.startBlink();
        });
    }

    generateBoard() {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.cols; i++) {
            const col = document.createElement("div");
            col.classList.add("col");
            col.dataset["cell"] = i;

            fragment.appendChild(col);
        }

        this.el.appendChild(fragment);
    }

    updateScore(currentCell) {
        console.log("update score");

        this.blinkCellsArr[this.userClicks] = "";

        console.log(this.blinkCellsArr);
        console.log("no clicked", this.numberOfTimesClicked);

        if (this.blinkCellsArr.length === this.numberOfTimesClicked) {
            console.log("start blink");
            this.userClicks = -1;
            this.blinkCellsArr = [];
            this.numberOfTimesClicked = 0;

            this.score++;
            this.scoreEl.innerText = this.score;

            this.startBlink();
        }
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
        this.blinkCellsArr.push(cell);

        console.log(this.blinkCellsArr);

        const blinkCell = document.querySelector(`div[data-cell='${cell}']`);

        blinkCell.style.background = "blue";

        setTimeout(() => {
            blinkCell.style.background = "white";
        }, 800);
    }
}

new Board("#board", "#start", "#score");
