//! https://jsfiddle.net/devkodeio/3mckL4y9/
//! https://web.dev/learn-web-vitals/
//^ css transform creates different layer
//^ Use CSS for animation

//? Solution using FPS
function ProgressBar(el, duration, countEl) {
    let count = 0;
    let startTime = null;
    let isLoading = false;

    const bar = document.createElement("div");
    bar.style.background = "red";
    bar.style.width = "0";
    bar.style.height = "100%";

    el.appendChild(bar);

    function load() {
        count++;
        countEl.innerText = count;

        if (!isLoading) {
            isLoading = true;
            bar.style.width = 0;
            fill();
        }
    }

    function fill() {
        if (startTime === null) {
            startTime = Date.now();
        }
        const elapsedTime = Date.now() - startTime;
        const width = Math.min((elapsedTime / duration) * 100, 100);
        bar.style.width = `${width}%`;

        if (elapsedTime >= duration) {
            count--;
            startTime = null;
            bar.style.width = 0;
            countEl.innerText = count;

            if (count <= 0) {
                isLoading = false;
                return;
            }
        }

        setTimeout(fill, 1000 / 60); //* 1000 / 60 - Frames per second == 60FPS
    }

    return {
        load,
    };
}
