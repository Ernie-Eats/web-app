class CustomerReview extends HTMLElement {
    constructor() {

        super();

        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "customerReviews-wrapper");

        const titleBar = wrapper.appendChild(document.createElement("div"));

        const profilePicture = titleBar.appendChild(document.createElement("img"));
        profilePicture.src = this.hasAccount() ? "" : "./Images/default_profile.svg";
        
        const title = titleBar.appendChild(document.createElement("h3"));
        title.innerText = this.hasAttribute("data-reviewer-title") ? this.getAttribute("data-reviewer-title") : "";

        wrapper.appendChild(document.createElement("hr"));

        const review = wrapper.appendChild(document.createElement("p"));
        review.innerText = this.hasAttribute("data-reviewer-review") ? this.getAttribute("data-reviewer-review") : "";

        document.addEventListener("DOMContentLoaded", (e) => {
            title.innerText = this.hasAttribute("data-reviewer-title")
                ? this.getAttribute("data-reviewer-title")
                : "Unknown Title";

            if (this.hasAttribute("data-reviewer-review")) {
                let reviewText = this.getAttribute("data-reviewer-review");

                if (reviewText.length >= 97) {
                    do {
                        reviewText = reviewText.slice(0, reviewText.lastIndexOf(" "));
                    } while (reviewText.length > 97 && reviewText.lastIndexOf(" ") !== -1);
                    
                    reviewText += "...";
                }

                review.innerText = reviewText;
            } else {
                review.innerHTML = "Unknown Review";
            }

            if (this.hasAttribute("data-reviewer-rating")) {
                const rating = +(this.getAttribute("data-reviewer-rating"));
                const starWrapper = titleBar.appendChild(document.createElement("div"));

                if (rating >= 1 || rating <= 5) {
                    for (let i = 0; i < rating; i++) {
                        let star = starWrapper.appendChild(document.createElement("img"));
                        star.src = "./Images/Review/filled_star.png";
                    }

                    for (let i = 0; i < 5 - rating; i++) {
                        let star = starWrapper.appendChild(document.createElement("img"));
                        star.src = "./Images/Review/unfilled_star.jpg";
                    }
                } else {
                    const warning = starWrapper.appendChild(document.createElement("p"));
                    warning.innerText = "Unknown Review";
                }
                titleBar.appendChild(starWrapper);
            }
        });
        
        shadow.appendChild(wrapper);
    }

    hasAccount()
    {
        return false;
    }
}

customElements.define("customer-review", CustomerReview);
