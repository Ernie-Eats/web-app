class CustomQuestion extends HTMLElement {
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
        css.href = "./ernie-eats-frontend/CSS/question.css";

        const question = this.getAttribute("question") || "Default Question";
        const response = this.getAttribute("response") || "Default Response";
        const bordered = this.getAttribute("bordered").toLowerCase() === "true" ? "bordered" : "";
        const responseList = this.getAttribute("responseList") || "";


        this.shadowRoot.innerHTML = `
            <div class="question-wrapper ${bordered}">
                <h3> ${question} </h3>
                <p> ${response} </p>
                <div id="list"></div>
            </div>
        `;

        responseList = responseList.slice(0, responseList.length - 1);
        responseList = responseList.replace(", ", " ");

        while (responseList.length !== 0) {
            let phrase = responseList.slice(0, responseList.indexOf(" "));
            this.shadowRoot.getElementById("list").appendChild(document.createElement("ul")).innerText = phrase;
            responseList = responseList.slice(responseList.indexOf(" "));
        }

        this.shadowRoot.appendChild(css);
    }

    static get observedAttributes() {
        return ["question", "response", "bordered", "list"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

}

customElements.define("custom-question", CustomQuestion);