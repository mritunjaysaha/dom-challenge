function BinaryCalculator(res, btnContainer) {
    this.res = document.querySelector(res);
    this.btnsContainer = document.querySelector(btnContainer);

    this.value = [];
    this.parsedValue = 0;
    this.symbol = ["+", "-", "*", "/"];
    this.bindEvents();
}

BinaryCalculator.prototype.bindEvents = function () {
    this.btnsContainer.addEventListener("click", (event) => {
        const { id } = event.target;

        if (id === "btn0") {
            console.log("0");
            this.value.push(0);
            this.update();
        } else if (id === "btn1") {
            console.log("1");
            this.value.push(1);
            this.update();
        } else if (id === "btnClr") {
            console.log("clear");
            this.reset();
        } else if (id === "btnEql") {
            console.log("equal");
            this.equal();
        } else if (id === "btnSum") {
            console.log("sum");
            this.value.push("+");
            this.update();
        } else if (id === "btnSub") {
            console.log("sub");
            this.value.push("-");
            this.update();
        } else if (id === "btnMul") {
            console.log("mul");
            this.value.push("*");
            this.update();
        } else if (id === "btnDiv") {
            console.log("div");
            this.value.push("/");
            this.update();
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

BinaryCalculator.prototype.reset = function () {
    this.value = [];
    this.res.value = "";
};

BinaryCalculator.prototype.equal = function () {
    let arr = [];
    let str = "";

    for (let i of this.value) {
        if (this.symbol.includes(i)) {
            arr.push(str);
            arr.push(i);
            str = "";
        } else {
            str += i;
        }
    }

    arr.push(str);

    let op1 = parseInt(arr[0], 2);
    let op2 = parseInt(arr[2], 2);
    let sym = arr[1];

    if (sym === "+") {
        this.parsedValue = op1 + op2;
    } else if (sym === "-") {
        this.parsedValue = op1 - op2;
    } else if (sym === "*") {
        this.parsedValue = op1 * op2;
    } else if (sym === "/") {
        this.parsedValue = op1 / op2;
    }

    this.printValue();
};

BinaryCalculator.prototype.printValue = function () {
    this.reset();

    const val = this.parsedValue.toString(2);

    this.res.value = val;
    this.value.push(val);
};

new BinaryCalculator("#res", "#btns");
