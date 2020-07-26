function Star(el, count, callback) {
    this.el = document.querySelector(el);
    this.count = count;
    this.callback = callback;
    this.active = -1;
}

Star.prototype.init = function () {
    var div = document.createDocumentFragment("div");
    for (var i = 0; i < this.count; i++) {
        var iElem = document.createElement("i");
        iElem.classList.add("fa fa-star-o");
        iElem.dataset["ratingVal"] = i;

        div.appendChild(iElem);
    }
    this.el.appendChild(div);
};

function getStar(value) {
    document.getElementById("display-star").innerHTML = value;
}

new Star("#star", 5, getStar);
