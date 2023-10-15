import * as Userdatabase from '../Database/UserDatabase.js';
import * as Models from '../Database/models.js';

class NavigationBar extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/navbar.css";

        const wrapper = document.createElement("nav");
        wrapper.setAttribute("class", "navigation-wrapper");

        const homePage = wrapper.appendChild(document.createElement("a"));
        homePage.href = "index.html";
        
        const homeLogo = homePage.appendChild(document.createElement("img"));
        homeLogo.src = "./ernie-eats-frontend/Images/ErnieLogo.jpg";

        const searchBar = wrapper.appendChild(document.createElement("input"));
        searchBar.setAttribute("type", "text");
        searchBar.setAttribute("placeholder", "Search...");

        const accountLogin = wrapper.appendChild(document.createElement("button"));
        accountLogin.setAttribute("class", "button");

        const accountPhoto = accountLogin.appendChild(document.createElement("img"));
        accountPhoto.src = "./ernie-eats-frontend/Images/defaultLogin.png";

        const hamburgerWrapper = wrapper.appendChild(document.createElement("div"));
        hamburgerWrapper.setAttribute("id", "hamburger-wrapper");

        const hamburger = hamburgerWrapper.appendChild(document.createElement("button"));
        hamburger.setAttribute("class", "hamburger-button");

        const hamburgerImg = hamburger.appendChild(document.createElement("img"));
        hamburgerImg.src = "./ernie-eats-frontend/Images/cake.jpg";
        hamburgerImg.id = "hamburger-img";

        hamburger.addEventListener("click", () => this.hamburgerMenu(hamburgerWrapper, hamburgerImg));

        accountLogin.addEventListener("click", async () => {
            await Userdatabase.findAllUsers().then(result => {
                if (result.success) {
                    this.getAddress().then(address => {
                        let found = result.model.find((value) => value.address == address) !== undefined;
                        found ? console.log("Found the Account") : window.open('login-Signup.html');
                    })
                }
            });
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }

    async getAddress() {
        return await fetch('https://api.ipify.org?format=json')
                        .then(async response => await response.json())
                        .then(data => { return data.ip });
    }

    hamburgerMenu(wrapper, img) {
        if (!wrapper.getAttribute("data-isContentDisplayed")) {
            wrapper.setAttribute("data-isContentDisplayed", "true");
        }

        const isContentDisplayed = wrapper.getAttribute("data-isContentDisplayed") === "true";

        let content;

        if (isContentDisplayed) {
            content = wrapper.appendChild(document.createElement("div"));
            content.setAttribute("id", "content-wrapper");

            const aboutPage = content.appendChild(document.createElement("a"));
            aboutPage.href = "about.html";
            aboutPage.innerHTML = "About Page";

            const faqPage = content.appendChild(document.createElement("a"));
            faqPage.href = "faqpage.html";
            faqPage.innerHTML = "FAQ Page";

            img.src = "./ernie-eats-frontend/Images/hamburger-menu-selected.png";

        } else {
            wrapper.removeChild(wrapper.lastChild);
            img.src = "./ernie-eats-frontend/Images/cake.jpg";
        }

        wrapper.setAttribute("data-isContentDisplayed", !isContentDisplayed);
    }
} 

customElements.define("navigation-bar", NavigationBar);