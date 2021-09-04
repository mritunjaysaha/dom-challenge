class ProgressBar {
    constructor(el, btnEl, count, time = 3) {
        this.el = document.querySelector(el);
        this.btnEl = document.querySelector(btnEl);
        this.count = document.querySelector(count);
        this.time = time;
        this.queue = 0;

        this.init();
        this.bindEvents();
    }

    init() {
        this.el.style.animationDuration = `${this.time}s`;
    }

    bindEvents() {
        this.btnEl.addEventListener("click", () => {
            this.count.innerText = ++this.queue;
            this.animate();
        });
    }

    animate() {
        let count = this.queue;

        this.el.classList.add("start-animation");

        this.el.addEventListener("animationend", () => {
            this.el.classList.remove("start-animation");

            if (count > 1) {
                setTimeout(() => {
                    this.count.innerText = --count;
                    this.queue = count;
                    this.el.classList.add("start-animation");
                }, 0);
            } else {
                this.count.innerText = "";
            }
        });
    }
}

new ProgressBar("#progress-bar", "#btn-run", "#count");
