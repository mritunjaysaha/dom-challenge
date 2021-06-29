function BinaryCalculator(res, btnContainer) {
    this.res = document.querySelector(res);
    this.btnsContainer = document.querySelector(btnContainer);

    this.value = [];
    this.parsedValue = 0;

    this.init();
    this.bindEvents();
}

BinaryCalculator.prototype.init = function () {
    // this.res.value = "";
};

BinaryCalculator.prototype.bindEvents = function () {
    this.btnsContainer.addEventListener("click", (event) => {
        const { id } = event.target;

        if (id === "btn0") {
            console.log("0");
        } else if (id === "btn1") {
            console.log("1");
        } else if (id === "btnClr") {
            console.log("clear");
        } else if (id === "btnEql") {
            console.log("equal");
        } else if (id === "btnSum") {
            console.log("sum");
        } else if (id === "btnSub") {
            console.log("sub");
        } else if (id === "btnMul") {
            console.log("mul");
        } else if (id === "btnDiv") {
            console.log("div");
        }
    });
};

BinaryCalculator.prototype.update = function () {
    let string = "";
    for (let s of this.value) {
        string += s;
    }

    this.res.value = string;

    console.log({ string });
};

new BinaryCalculator("#res", "#btns");
