class CustomReviewSlider extends HTMLElement {
    
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/review-slider.css";

        const wrapper = document.createElement("div");
        let reviews = [];
        wrapper.setAttribute("id", "slider"); 

        document.addEventListener("DOMContentLoaded", () => {
            const slideDiv = document.createElement("div");
            slideDiv.setAttribute("id", "slides");

            const overflow = slideDiv.appendChild(document.createElement("div"));
            overflow.setAttribute("id", "overflow");

            const innerDiv = overflow.appendChild(document.createElement("div"));
            innerDiv.setAttribute("class", "inner")

            const controls = document.createElement("div");
            controls.setAttribute("id", "controls");

            const bullets = document.createElement("div");
            bullets.setAttribute("id", "bullets");

            reviews = [...document.getElementsByClassName("review")]
            console.log(reviews.length);
            let x = 1;
            let radioButtons = [];
            
            reviews.forEach((r) => {
                let radio = wrapper.appendChild(document.createElement("input"));
                radio.setAttribute("type", "radio");
                radio.setAttribute("name", "slider");
                radio.setAttribute("id", "slide" + x);

                if (x === 1) {
                    radio.setAttribute("checked", "");
                }
    
                radioButtons.push(radio);

                let review_container = innerDiv.appendChild(document.createElement("div"));
                review_container.setAttribute("class", "slide slide_" + x);

                let content = review_container.appendChild(document.createElement("div"));
                content.setAttribute("class", "slide_content");
                content.appendChild(r);
    
                let label = controls.appendChild(document.createElement("label"));
                label.setAttribute("for", "slide" + x);

                let bullet = bullets.appendChild(document.createElement("label"));
                bullet.setAttribute("for", "slide" + x);

                x = x + 1;
            });

            slideDiv.appendChild(controls);
            slideDiv.appendChild(bullets);
            wrapper.appendChild(slideDiv);

            setInterval(() => {
                radioButtons.forEach((r) => r.checked = false);
                let current = this.hasAttribute("data-current-review") ? +(this.getAttribute("data-current-review")) : 0;
                current = current + 1 >= reviews.length ? 0 : current + 1;
                radioButtons[current].checked = true;
                this.setAttribute("data-current-review", current);
            }, 10000);
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }
}

customElements.define("customer-review-slider", CustomReviewSlider);