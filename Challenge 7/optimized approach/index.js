function Calendar(el) {
    let events;
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
    drawEvents();

    function init() {
        const container = document.createElement("div");
        container.classList.add("container");

        const hours = document.createElement("div");
        hours.classList.add("hours");

        events = document.createElement("div");
        events.classList.add("events");

        const clock = [...Array(24).keys()].map((hour) => {
            const part = hour >= 12 ? "PM" : "AM";
            hour = hour > 12 ? hour - 12 : hour;

            return `${hour}:00 ${part}`;
        });

        for (let i = 0; i < 24; i++) {
            const node = document.createElement("div");
            node.classList.add("row");

            const time = document.createElement("div");
            time.classList.add("time");
            time.innerText = clock[i];

            node.appendChild(time);

            hours.appendChild(node);
        }

        for (let i = 0; i < 24; i++) {
            const node = document.createElement("div");
            node.classList.add("row");
            events.appendChild(node);
        }

        container.appendChild(hours);
        container.appendChild(events);
        el.appendChild(container);
    }

    function drawEvents() {
        const queue = [];
        for (const event of formatData(data)) {
            // console.log(queue);
            const div = document.createElement("div");
            div.classList.add("card");
            div.style.height = `${getTimeDifference(
                event.startHour,
                event.startMin,
                event.endHour,
                event.endMin
            )}px`;
            div.style.background = event.color;
            div.style.position = "absolute";
            div.style.top = `${
                Number(event.startTime.split(":")[0]) * 40 +
                (Number(event.startTime.split(":")[1]) / 60) * 40
            }px`;
            div.innerHTML = `
        <div>${event.title}</div>
        <div>${convertTime(event.startTime)} - ${convertTime(
                event.endTime
            )}</div>
        `;

            div.style.width = "100%";
            events.appendChild(div);
        }
    }

    function getTimeDifference(startHour, startMin, endHour, endMin) {
        return (((endHour - startHour) * 60 + (endMin - startMin)) / 60) * 40;
    }

    function formatData(data) {
        return data.map(({ startTime, endTime, color, title }) => {
            let [startHour, startMin] = startTime.split(":");
            let [endHour, endMin] = endTime.split(":");
            startHour = parseInt(startHour);
            startMin = parseInt(startMin);
            endHour = parseInt(endHour);
            endMin = parseInt(endMin);
            return {
                startHour,
                startMin,
                endHour,
                endMin,
                color,
                startTime,
                endTime,
                title,
            };
        });
    }

    function convertTime(time) {
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        let part = hour > 12 ? "pm" : "am";

        min = (min + "").length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + "").length == 1 ? `0${hour}` : hour;

        return `${hour}:${min} ${part}`;
    }
}

Calendar(document.getElementById("calendar"));
