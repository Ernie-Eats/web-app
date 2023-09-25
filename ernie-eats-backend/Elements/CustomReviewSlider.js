class CustomReviewSlider extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./CSS/review-slider.css";

        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "customer-review-slider-wrapper");

        const backArrow = document.createElement("button");
        const forwardArrow = document.createElement("button");
        let currentReview = document.createElement("customer-review");

        document.addEventListener("DOMContentLoaded", (e) => {
            backArrow.addEventListener("click", this.previousReview);
            backArrow.innerText = "<";
            wrapper.appendChild(backArrow);

            const reviews = [...document.getElementsByClassName("review")]
            reviews.forEach((r) => r.style.display = "none");

            if (!this.hasAttribute("data-current-review")) {
                this.setAttribute("data-current-review", 0);
            }
            
            let currentReviewIndex = +(this.getAttribute("data-current-review"));

            currentReview = reviews[currentReviewIndex].cloneNode();
            currentReview.setAttribute("id", "review-clone")
            currentReview.style.display = "block";

            wrapper.appendChild(currentReview);

            forwardArrow.addEventListener("click", this.nextReview);
            forwardArrow.innerText = ">";
            wrapper.appendChild(forwardArrow);
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }

    nextReview() {
        const wrapper = this.parentElement;
        const reviews = [...document.getElementsByClassName("review")];

        let currentReviewIndex = +(document.getElementById("review-slider").getAttribute("data-current-review"));
        let currentReview = [...wrapper.children][1];

        if (currentReviewIndex < reviews.length) {
            currentReviewIndex = currentReviewIndex + 1;
            reviews.forEach((r) => r.style.display = "none");
            currentReview = reviews[currentReviewIndex].cloneNode();
            currentReview.style.display = "block";
            wrapper.removeChild([...wrapper.children][1]);
            wrapper.insertBefore(currentReview, [...wrapper.children][1]);
            document.getElementById("review-slider").setAttribute("data-current-review", currentReviewIndex.toString());
        }
    }

    previousReview() {
        const wrapper = this.parentElement;
        const reviews = [...document.getElementsByClassName("review")];

        let currentReviewIndex = +(document.getElementById("review-slider").getAttribute("data-current-review"));
        let currentReview = [...wrapper.children][1];

        if (currentReviewIndex > 0) {
            currentReviewIndex = currentReviewIndex - 1;
            reviews.forEach((r) => r.style.display = "none");
            currentReview = reviews[currentReviewIndex].cloneNode();
            currentReview.style.display = "block";
            wrapper.removeChild([...wrapper.children][1]);
            wrapper.insertBefore(currentReview, [...wrapper.children][1]);
            document.getElementById("review-slider").setAttribute("data-current-review", currentReviewIndex.toString());
        } 
    }
}

customElements.define("customer-review-slider", CustomReviewSlider);