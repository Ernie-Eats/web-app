import * as Userdatabase from '../Database/UserDatabase.js';

class CustomerReview extends HTMLElement {
    constructor() {

        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/review.css";

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "customer-reviews-wrapper");

        const titleBar = wrapper.appendChild(document.createElement("div"));

        const profilePicture = titleBar.appendChild(document.createElement("img"));
        profilePicture.classList.add("profile-picture");

        const name = titleBar.appendChild(document.createElement("div"));
        name.classList.add("profile-name");
        name.innerText = this.getAttribute('data-reviewer');

        const title = titleBar.appendChild(document.createElement("h3"));
        title.innerText = this.hasAttribute("data-reviewer-title") ? this.getAttribute("data-reviewer-title") : "";

        const resturantName = titleBar.appendChild(document.createElement("p"));
        resturantName.setAttribute("id", "resturant-name");

        wrapper.appendChild(document.createElement("hr"));

        const review = wrapper.appendChild(document.createElement("p"));
        review.innerText = this.hasAttribute("data-reviewer-review") ? this.getAttribute("data-reviewer-review") : "1";

        resturantName.innerText = this.hasAttribute("data-resturant-name")
                ? this.getAttribute("data-resturant-name")
                : "Unknown Resturant"; 

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
                starWrapper.setAttribute("class", "star-wrapper");

                if (rating >= 1 || rating <= 5) {
                    for (let i = 0; i < rating; i++) {
                        let star = starWrapper.appendChild(document.createElement("img"));
                        star.src = "./ernie-eats-frontend/Images/filledStar.jpg";
                        star.setAttribute("class", "filled-star");
                    }

                    for (let i = 0; i < 5 - rating; i++) {
                        let star = starWrapper.appendChild(document.createElement("img"));
                        star.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
                        star.setAttribute("class", "unfilled-star");
                    }
                } else {
                    const warning = starWrapper.appendChild(document.createElement("p"));
                    warning.innerText = "Unknown Review";
                }
                titleBar.appendChild(starWrapper);
            }
            this.hasAccount().then(result => {
                if (result.success) {
                    profilePicture.src = "./ernie-eats-frontend/Images/ErnieLogo.jpg";   
                } else {
                    profilePicture.src = "./ernie-eats-frontend/Images/defaultLogin.png";
                }
            });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }

    async hasAccount() {
        if (this.hasAttribute("data-reviewer") && this.getAttribute("data-reviewer").length !== 0) {
                await Userdatabase.findUserByUsername(this.getAttribute('data-reviewer')).then(result => {
                    return result
                });
        }
        return { success: false, model: undefined };
    }
}

customElements.define("customer-review", CustomerReview);