function Calendar(timeEl, eventEl) {
    const HEIGHT = 80; // height of one block for one hour
    const data = [
        {
            startTime: "00:00",
            endTime: "01:30",
            color: "#f6be23",
            title: "#TeamDevkode",
        },
        {
            startTime: "4:30",
            endTime: "7:30",
            color: "#f6501e",
            title: "#TeamDevkode",
        },
        {
            startTime: "12:00",
            endTime: "13:30",
            color: "#029be5",
            title: "#TeamDevkode",
        },
        {
            startTime: "9:00",
            endTime: "10:00",
            color: "#029be5",
            title: "#TeamDevkode",
        },
        {
            startTime: "16:00",
            endTime: "19:00",
            color: "#029be5",
            title: "#TeamDevkode",
        },
        {
            startTime: "20:30",
            endTime: "22:30",
            color: "#029be5",
            title: "#TeamDevkode",
        },
    ];

    init();

    function init() {
        generateTime();
        generateEvents();

        data.map(({ startTime, endTime, color, title }) =>
            addData({ startTime, endTime, color, title })
        );
    }

    function generateTime(fragment) {
        const fragmentNode = document.createDocumentFragment();

        const div = document.createElement("div");
        div.classList.add("time");

        const span = document.createElement("span");

        for (let i = 0; i < 24; i++) {
            const node = div.cloneNode();

            const spanNode = span.cloneNode();

            spanNode.innerText = `${i !== 0 ? i : ""}`;

            node.appendChild(spanNode);

            fragmentNode.appendChild(node);
        }

        timeEl.appendChild(fragmentNode);
    }

    function generateEvents(fragment) {
        const fragmentNode = document.createDocumentFragment();
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event-content");

        for (let i = 0; i < 24; i++) {
            const eventNode = eventDiv.cloneNode();

            eventNode.dataset["time"] = `${i}`;

            fragmentNode.appendChild(eventNode);
        }

        eventEl.appendChild(fragmentNode);
    }

    function addData(data) {
        const { startTime, endTime, title, color } = data;

        const start = getTime(startTime);
        const end = getTime(endTime);
        const hour = Math.abs(end.hour - start.hour);
        const min = Math.abs(end.min - start.min);
        const duration = hour + min / 60;
        const totalHeight = HEIGHT * duration;
        const fromTop = (start.min / 60) * HEIGHT;

        const container = document.querySelector(
            `div[data-time='${start.hour}']`
        );

        const eventDetailsContainer = document.createElement("div");
        eventDetailsContainer.classList.add("event-details-container");

        eventDetailsContainer.style.backgroundColor = color;
        eventDetailsContainer.style.height = `${totalHeight}px`;
        eventDetailsContainer.style.top = `${fromTop}px`;

        const detailsEl = document.createElement("div");
        detailsEl.classList.add("event-details");
        detailsEl.innerText = title;

        const timeEl = document.createElement("div");
        timeEl.classList.add("event-time");
        timeEl.innerText = `${startTime} - ${endTime}`;

        const fragmentEl = document.createDocumentFragment();
        fragmentEl.appendChild(detailsEl);
        fragmentEl.appendChild(timeEl);

        eventDetailsContainer.appendChild(fragmentEl);

        container.appendChild(eventDetailsContainer);
    }

    function getTime(time) {
        const arr = time.split(":");

        return {
            hour: Number.parseInt(arr[0]),
            min: Number.parseInt(arr[1]),
        };
    }
}
