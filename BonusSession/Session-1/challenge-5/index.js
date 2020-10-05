class Loader {
    constructor(loader, buttons) {
        this.loader = document.querySelector(loader);
        this.buttons = document.querySelector(buttons);

        this.loaderFill = 0;
    }

    bindEvents() {
        this.buttons.addEventListener("click", (e) => {
            const cell = e.target.dataset["action"];

            if (cell === "start") {
            }
        });
    }
}
