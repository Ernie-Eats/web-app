import * as UserDatabase from '../Database/UserDatabase.js';

class CustomerReview extends HTMLElement {
    constructor() {

        super();

        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/review.css";

        const name = this.getAttribute("reviewer") || "Default Name";
        const title = this.getAttribute("reviewer-title") || "Default Title";
        const resturantName = this.getAttribute("resturant-name") || "Default Resturant";
        const rating = this.getAttribute("reviewer-rating") || 1;
        let review = this.getAttribute("reviewer-review") || "";
        let image;

        if (name === "Default Name") {
            image = "./ernie-eats-frontend/Images/defaultLogin.png";
        } else {
            await UserDatabase.findUserByUsername(name).then(user => {
                if (user.success) {
                    image = "./ernie-eats-frontend/Images/defaultLogin.png"; // Need to update when UserSettings is implemented!
                } else {
                    image = "./ernie-eats-frontend/Images/defaultLogin.png";
                }
            })
        }

        while (review.length > 97 && review.lastIndexOf(" ") !== -1) {
            review = review.slice(0, review.lastIndexOf(" "));
        }
        review += "..."

        this.shadowRoot.innerHTML = `
            <div class="customer-reviews-wrapper">
                <div> 
                    <img class="profile-picture" src=${image}>
                    <div class="profile-name">${name}</div>
                    <h3> ${title} </h3>
                    <p id="resturant-name"> ${resturantName} </p><hr>
                    <div id=star-wrapper></div>
                    <p> ${review} </p>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(css);

        for (let i = 0; i < 5; i++) {
            this.createStar(i < rating, this.shadowRoot.getElementById("star-wrapper"));
        }
    }

    createStar(isFilled, starWrapper) {
        if (isFilled) {
            let star = starWrapper.appendChild(document.createElement("img"));
            star.src = "./ernie-eats-frontend/Images/filledStar.jpg";
            star.setAttribute("class", "filled-star");
        } else {
            let star = starWrapper.appendChild(document.createElement("img"));
            star.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
            star.setAttribute("class", "unfilled-star");
        }
    }

    static get observedAttributes() {
        return ["resturant-name", "reviwer-title", "reviewer", "reviewer-date", "reviewer-rating", "reviewer-review"];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            await this.render();
        }
    }
}

customElements.define("customer-review", CustomerReview);