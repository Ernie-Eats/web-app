document.addEventListener("DOMContentLoaded", () => {
    class CustomEventSection extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            this.render();
        }

        render() {
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "./ernie-eats-frontend/CSS/event-section.css";

            const events = [...this.querySelectorAll("custom-event")].sort((a, b) => this.sortEvents(a, b));

            this.shadowRoot.innerHTML = `
                <div id="customer-event-section-wrapper"></div>
            `;

            const wrapper = this.shadowRoot.getElementById("customer-event-section-wrapper");
            let currentDate = events[0].getAttribute("date");
            let date = wrapper.appendChild(document.createElement("h4"));
            date.innerText = currentDate;

            events.forEach(e => {
                if (currentDate !== e.getAttribute("date")) {
                    wrapper.appendChild(document.createElement("hr"));
                    let date = wrapper.appendChild(document.createElement("h4"));
                    currentDate = e.getAttribute("date");
                    date.innerText = currentDate;
                }
                wrapper.appendChild(e);
            });

            this.shadowRoot.appendChild(css);
        }

        sortEvents(event1, event2) {
            const date1 = new Date(event1.getAttribute("date")).getTime();
            const date2 = new Date(event2.getAttribute("date")).getTime();

            return date1 - date2;
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.render();
            }
        }
    }

    customElements.define("customer-event-section", CustomEventSection);

});