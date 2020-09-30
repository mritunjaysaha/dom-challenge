class Loader {
    constructor(loader, increment) {
        this.loader = document.querySelector(loader);
        this.increment = document.querySelector(increment);

        this.loaderFilled = 0;

        this.bindEvents();
    }

    bindEvents() {
        this.increment.addEventListener("click", (e) => {
            const cell = e.target.dataset["inc"];

            this.loaderFilled += Number(cell);

            this.loader.style.width = `${this.loaderFilled}%`;
        });
    }
}
