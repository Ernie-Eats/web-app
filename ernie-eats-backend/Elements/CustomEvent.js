class CustomEvent extends HTMLElement {
    constructor() {

        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/event.css";

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "customer-event-wrapper");

        const eventTitle = wrapper.appendChild(document.createElement("h3"));

        const eventDescription = wrapper.appendChild(document.createElement("p"));

        document.addEventListener("DOMContentLoaded", () => {
            eventTitle.innerText = (this.hasAttribute("data-event-name")
                && this.hasAttribute("data-resturant-name"))
                ? this.getAttribute("data-event-name") + " - Hosted By " + this.getAttribute("data-resturant-name")
                : "Unknown Event";

            eventDescription.innerText = this.hasAttribute("data-event-description")
                ? this.getAttribute("data-event-description")
                : "Unknown Description";

            if (eventDescription.innerText.length >= 97) {
                do {
                    eventDescription.innerText
                        .slice(0, eventDescription.innerText.lastIndexOf(" "));
                } while (eventDescription.innerText.length < 97);
            }
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }
}

customElements.define("custom-event", CustomEvent);
