class Board {
    constructor(el, startEl, scoreEl, highScoreEl, cols = 5) {
        this.el = document.querySelector(el);
        this.startEl = document.querySelector(startEl);
        this.scoreEl = document.querySelector(scoreEl);
        this.highScoreEl = document.querySelector(highScoreEl);

        this.cols = cols;
        this.score = 0;
        this.blinkCellsArr = [];
        this.userClicks = -1;
        this.numberOfTimesClicked = 0;
        this.highScore = 0;

        console.log("highScore", typeof this.highScore);

        this.init();
        this.bindEvents();
    }

    init() {
        this.scoreEl.innerText = this.score;
        this.highScore = localStorage.getItem("highScore") || 0;
        this.highScoreEl.innerText = this.highScore;

        this.generateBoard();
    }

    bindEvents() {
        this.el.addEventListener("click", (e) => {
            const currentCell = Number.parseInt(e.target.dataset["cell"]);

            this.userClicks++;
            this.numberOfTimesClicked++;

            if (this.blinkCellsArr[this.userClicks] === currentCell) {
                console.log("true");

                this.updateScore(currentCell);
            } else {
                this.el.classList.add("shake");

                this.score = 0;
                this.scoreEl.innerText = this.score;
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
                    this.startEl.disabled = false;
                }, 800);
            }
        });

        this.startEl.addEventListener("click", () => {
            console.log("clicked");
            this.startBlink();
            this.startEl.disabled = true;
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

            this.updateHighScore();
            this.startBlink();
        }
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            localStorage.setItem("highScore", this.score);
            console.log("updated high score");

            this.highScoreEl.innerText = this.score;
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

        // setTimeout(() => {
        //     console.log("delay");
        //     blinkCell.style.background = "blue";
        // }, 0);

        blinkCell.classList.add("blink");

        setTimeout(() => {
            blinkCell.classList.remove("blink");
        }, 800);

        // setTimeout(() => {
        //     console.log("delay");
        // }, 800);
    }
}

new Board("#board", "#start", "#score", "#high-score");
