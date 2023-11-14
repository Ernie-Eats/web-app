class CustomEvent extends HTMLElement {
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
        css.href = "./ernie-eats-frontend/CSS/event.css";

        let title = this.getAttribute("event-name") || "Default Event";
        let description = this.getAttribute("event-description") || "Default Description";
        const name = this.getAttribute("resturant-name") || "";

        if (name.length !== 0) {
            title += `- Hosted By ${name}`;
        }

        while (description.length > 97 && description.lastIndexOf(" ") !== -1) {
            description = description.slice(0, description.lastIndexOf(" "));
        }

        description += "...";

        this.shadowRoot.innerHTML = `
            <div class=customer-event-wrapper>
                <h3> ${title} </h3>
                <p> ${description} </p>
            </div>
        `;

        this.shadowRoot.appendChild(css);
    }

    static get observedAttributes() {
        return ["resturant-name", "date", "event-name", "event-description"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
}

customElements.define("custom-event", CustomEvent);
