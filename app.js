const Board = function (n) {
    var root = document.getElementById("root");

    for (var i = 0; i < n; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        for (var j = 0; j < n; j++) {
            var col = document.createElement("div");
            col.classList.add("col");
            row.appendChild(col);
            col.dataset["value"] = `${i}${j}`;
            console.log(i);
            col.addEventListener("mouseover", (e) => {
                console.log(e.target.dataset["value"]);
            });
        }
        root.appendChild(row);
    }

    var color = document.createElement("div");
    color.classList.add("row");
    color.classList.add("color");

    for (var i = 0; i < n; i++) {
        var col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("color-box");
        col.dataset["value"] = `${i}${j}`;
        col.style.backgroundColor = String(getRandomColor());
        color.appendChild(col);
        col.addEventListener("click", (e) => {
            const data = e.target.dataset;
            console.log(data);
        });
    }

    root.appendChild(color);
};

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

new Board(8);
