const Board = function (n) {
    var root = document.getElementById("root");
    let selectedColor;
    for (var i = 0; i < n; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        for (var j = 0; j < n; j++) {
            var col = document.createElement("div");
            col.classList.add("col");
            row.appendChild(col);
            col.dataset["value"] = `${i}${j}`;
            console.log(i);
            col.addEventListener("click", (e) => {
                e.target.style.backgroundColor = selectedColor || "#ff0000";
            });
            col.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = selectedColor || "#ff0000";
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
        col.dataset["color"] = `${i}`;
        col.style.backgroundColor = String(getRandomColor());
        color.appendChild(col);
        col.addEventListener("click", (e) => {
            selectedColor = e.target.style.backgroundColor;
            console.log(selectedColor);
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
