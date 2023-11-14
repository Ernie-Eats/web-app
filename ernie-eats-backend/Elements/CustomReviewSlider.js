class CustomReviewSlider extends HTMLElement {

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
        css.href = "./ernie-eats-frontend/CSS/review-slider.css";

        this.shadowRoot.innerHTML = `
            <div id="slider">
                <input type="radio" name="slider" id="slide1" checked>
                <input type="radio" name="slider" id="slide2">
                <input type="radio" name="slider" id="slide3">
                <input type="radio" name="slider" id="slide4">
                <div id="slides">
                    <div id="overflow">
                        <div class="inner">
                            <div class="slide slide_1">
                                <div class="slide_content" id=Slide1></div>
                            </div>
                            <div class="slide slide_2">
                                <div class="slide_content" id=Slide2></div>
                            </div>
                            <div class="slide slide_3">
                                <div class="slide_content" id=Slide3></div>
                            </div>
                            <div class="slide slide_4">
                                <div class="slide_content" id=Slide4></div>
                            </div>
                        </div>
                    </div>
                    <div id="controls">
                        <label for="slide1"></label>
                        <label for="slide2"></label>
                        <label for="slide3"></label>
                        <label for="slide4"></label>
                    </div>
                    <div id="bullets">
                        <label for="slide1"></label>
                        <label for="slide2"></label>
                        <label for="slide3"></label>
                        <label for="slide4"></label>
                    </div>
                </div>
            </div>
        `;

        window.addEventListener("load", () => {
            const reviews = [...this.getElementsByClassName("review")];
            const inputBoxes = [...this.shadowRoot.querySelectorAll("input")];
            let x = 0;

            reviews.forEach(review => {
                this.shadowRoot.getElementById("Slide" + (x + 1)).appendChild(review);
                x += 1;
            });

            setInterval(() => {
                const next = inputBoxes.findIndex(b => b.checked === true) + 1 < 4 ? inputBoxes.findIndex(b => b.checked === true) + 1 : 1;
                inputBoxes.forEach(b => b.checked = false);
                inputBoxes[next].checked = true;
            }, 10000);
        });

        this.shadowRoot.appendChild(css);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    
}

customElements.define("customer-review-slider", CustomReviewSlider);