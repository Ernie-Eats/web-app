import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettings from '../Database/UserSettingsDatabase.js';

class SmallCustomerReview extends HTMLElement {
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
        css.href = "./ernie-eats-frontend/CSS/small-review.css";

        const name = this.getAttribute("reviewer") || "Default Name";
        const title = this.getAttribute("reviewer-title") || "Default Title";
        const resturantName = this.getAttribute("resturant-name") || "Default Resturant";
        let review = this.getAttribute("reviewer-review") || "";
        const image = "./ernie-eats-frontend/Images/defaultLogin.png";

        await this.loadImage(name);

        this.shadowRoot.innerHTML = `
            <div class="customer-reviews-wrapper">
                <div> 
                    <img class="profile-picture" src=${image}>
                    <div class="profile-name">${name}</div>
                    <h3> ${title} </h3>
                    <p id="resturant-name"> ${resturantName} </p>
                    <hr>
                    <p id="review"> ${review} </p>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(css);
        this.shadowRoot.querySelector("#review").innerText = review;
    }

    async loadImage(name) {
        await UserDatabase.findUserByName(name).then(user => {
            if (user.success) {
                UserSettings.findUserSettingsPageById(user.model.id).then(settings => {
                    if (settings.success) {
                        if (settings.model.profile !== undefined && settings.model.profile.length !== 0) {
                            this.shadowRoot.querySelector(".profile-picture").src = settings.model.profile;
                        }
                    }
                });
            }
        });
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

customElements.define("small-customer-review", SmallCustomerReview);