class CustomEventSection extends HTMLElement {
    constructor() {

        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/event-section.css";

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "customer-event-section-wrapper");

        document.addEventListener("DOMContentLoaded", () => {
            const events = [...this.querySelectorAll("custom-event")];
            const sortedEvents = events.sort((a, b) => this.sortEvents(a, b));

            let currentDate = sortedEvents[0].getAttribute("data-date");
            let date = wrapper.appendChild(document.createElement("h4"));
            date.innerText = currentDate;

            sortedEvents.forEach((e) => {
                if (currentDate !== e.getAttribute("data-date")) {
                    wrapper.appendChild(document.createElement("hr"));
                    date = wrapper.appendChild(document.createElement("h4"));
                    currentDate = e.getAttribute("data-date");
                    date.innerText = currentDate;
                }
                wrapper.appendChild(e);
            });
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }

    sortEvents(event1, event2) {
        const date1 = new Date(event1.getAttribute("data-date")).getTime();
        const date2 = new Date(event2.getAttribute("data-date")).getTime();

        return date1 - date2;
    }
}

customElements.define("customer-event-section", CustomEventSection);
