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
            this.value.push(0);
        } else if (id === "btn1") {
            console.log("1");
            this.value.push(1);
        } else if (id === "btnClr") {
            console.log("clear");
            this.clear();
        } else if (id === "btnEql") {
            console.log("equal");
            this.equal();
        } else if (id === "btnSum") {
            console.log("sum");
            this.value.push("+");
        } else if (id === "btnSub") {
            console.log("sub");
            this.value.push("-");
        } else if (id === "btnMul") {
            console.log("mul");
            this.value.push("*");
        } else if (id === "btnDiv") {
            console.log("div");
            this.value.push("/");
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

BinaryCalculator.prototype.clear = function () {
    this.value = [];

    console.clear();
};

BinaryCalculator.prototype.equal = function () {
    let arr = [];
    let str = "";
    const symbol = ["+", "-", "*", "/"];

    for (let i of this.value) {
        if (symbol.includes(i)) {
            arr.push(str);
            arr.push(i);
            str = "";
        } else {
            str += i;
        }
    }

    arr.push(str);

    console.log({ str, arr });

    let op1 = parseInt(arr[0], 2);
    let op2 = parseInt(arr[2], 2);
    let sym = arr[1];

    console.log({ op1, sym, op2 });

    if (sym === "+") {
        this.parsedValue = op1 + op2;
    } else if (sym === "-") {
        this.parsedValue = op1 - op2;
    } else if (sym === "*") {
        this.parsedValue = op1 * op2;
    } else if (sym === "/") {
        this.parsedValue = op1 / op2;
    }

    console.log(this.parsedValue);
};

new BinaryCalculator("#res", "#btns");
