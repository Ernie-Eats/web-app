class CustomQuestion extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/question.css";

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "question-wrapper");

        const question = wrapper.appendChild(document.createElement("h3"));

        const response = wrapper.appendChild(document.createElement("p"));

        let responseList = [];

        document.addEventListener("DOMContentLoaded", () => {
            question.innerText = this.hasAttribute("data-question")
                ? this.getAttribute("data-question")
                : "Unknown Question";
    
            response.innerText = this.hasAttribute("data-response")
                ? this.getAttribute("data-response")
                : "Unknown Response";

            if (this.hasAttribute("data-bordered") 
                && this.getAttribute("data-bordered").toLowerCase() === "true") {
                    wrapper.classList.add("bordered");
            }
              
            responseList = this.getAttribute("data-response-list");

            if (responseList !== null && responseList.length > 0) 
            {
                let phrase = ""
                for(const r of responseList)
                {
                    if (r !== '[') 
                    {
                        phrase += r;
                        if (r === ',' || r === ']') 
                        {
                            phrase.trimEnd();
                            phrase = phrase.slice(0, -1);
                            wrapper.appendChild(document.createElement("ul")).innerText = phrase;
                            phrase = ""
                        }
                    }
                }
            } 
        })

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }
}

customElements.define("custom-question", CustomQuestion);