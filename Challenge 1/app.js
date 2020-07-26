function Star(el, count, callback) {
    this.el = document.querySelector(el);
    console.log(el);
    this.count = count;
    this.callback = callback;
    this.active = -1;

    this.init();
    this.bindEvents();
}

Star.prototype.init = function () {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.count; i++) {
        const iElem = document.createElement("i");
        iElem.classList.add("far");
        iElem.classList.add("fa-star");
        iElem.dataset["val"] = i + 1;
        fragment.appendChild(iElem);
    }

    this.el.appendChild(fragment);
};

Star.prototype.bindEvents = function () {
    this.el.addEventListener("mouseover", (e) => {
        const star = e.target.dataset["val"];
        console.log(star);
        this.fill(star);
    });

    this.el.addEventListener("mouseout", (e) => {
        this.fill(this.active);
    });

    this.el.addEventListener("click", (e) => {
        this.active = e.target.dataset["val"];
        this.callback(this.active);
    });
};

Star.prototype.fill = function (activeVal) {
    for (var i = 1; i <= this.count; i++) {
        if (i <= activeVal) {
            document
                .querySelector("i[data-val='" + i + "']")
                .classList.add("fa");
        } else {
            document
                .querySelector("i[data-val='" + i + "']")
                .classList.remove("fa");
        }
    }
};
function getStar(value) {
    document.getElementById("display-star").innerHTML = value;
}
