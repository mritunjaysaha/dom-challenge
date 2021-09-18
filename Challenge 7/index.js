function Calendar(timeEl, eventEl) {
    const height = "80px"; // height of one block for one hour
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
        console.log("events");
        const fragmentNode = document.createDocumentFragment();

        const span = document.createElement("span");

        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event-content");

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("event-details");

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("event-time");

        for (let i = 0; i < 24; i++) {
            const eventNode = eventDiv.cloneNode();
            const detailsNode = detailsDiv.cloneNode();
            const spanNode = span.cloneNode();
            const timeNode = timeDiv.cloneNode();

            detailsNode.appendChild(spanNode);

            eventNode.appendChild(detailsNode);
            eventNode.appendChild(timeNode);

            fragmentNode.appendChild(eventNode);
        }

        console.log(fragmentNode);
        console.log("events");

        eventEl.appendChild(fragmentNode);
    }
}
