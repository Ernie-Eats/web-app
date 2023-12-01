import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as ResturantDatabase from '../Database/ResturantDatabase.js';
import * as Function from '../Database/functions.js';

class NavigationBar extends HTMLElement {

    isContentDisplayed = true;
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
        css.href = "./ernie-eats-frontend/CSS/navbar.css";

        let account = "./ernie-eats-frontend/Images/defaultLogin.png";

        this.shadowRoot.innerHTML = `
            <div class="navigation-wrapper">
                <a href="index.html"><img src="./ernie-eats-frontend/Images/CoverLogo.jpg" id="homeLogoImg"></a>
                <input type="text" placeholder="Search..." id="searchBar"></input>
                <button class="button"><img src=${account} id="profile-picture"></button>
                <div id="hamburger-wrapper">
                    <button class="hamburger-button"><img src="./ernie-eats-frontend/Images/cake.jpg" id="hamburgerImg"></button>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(css);

        document.addEventListener("keydown", async (e) => await this.search(this.shadowRoot.querySelector("#searchBar").value, e.key))

        await Function.getAddress().then(address => {
            UserDatabase.findUserByAddress(address).then(user => {
                if (user.success) {
                    UserSettingsDatabase.findUserSettingsPageById(user.model.id).then(settings => {
                        if (settings.success) {
                            if (settings.model.profile !== undefined && settings.model.profile.length !== 0) {
                                this.shadowRoot.querySelector('#profile-picture').src = settings.model.profile;
                            }
                        }
                    });
                }
            });
        });
        this.shadowRoot.querySelector("button").addEventListener("click", async () => await this.login());

        const hamburgerWrapper = this.shadowRoot.querySelector("#hamburger-wrapper");
        hamburgerWrapper.querySelector("button").addEventListener("click", async () => await this.hamburgerMenu(hamburgerWrapper));
    }

    async search(result, key) {
        if (result !== undefined && result.length !== 0 && key === "Enter") {
            await ResturantDatabase.findAllResturants().then(resturants => {
                if (resturants.success) {
                    let found = resturants.model.find(value => value.name.toLowerCase() === result.toLowerCase());
                    if (found !== undefined) {
                        window.open(`business-page.html?page=${encodeURI(found.name)}&resturant=${encodeURI(found.id)}`);
                    } else {
                        window.open(`search-results.html?result=${encodeURI(result.split(" "))}`);
                    }
                    window.close();
                }
            });
        }
    }

    async login() {
        await UserDatabase.findAllUsers().then(result => {
            if (result.success) {
                Function.getAddress().then(address => {
                    let found = result.model.find((value) => value.address === address) !== undefined;
                    found ? window.open('user-page.html') : window.open('login-Signup.html');
                    window.close();
                });
            }
        });
    }

    async hamburgerMenu(wrapper) {
        const img = wrapper.querySelector("#hamburgerImg");
        let content;
        if (this.isContentDisplayed) {
            content = wrapper.appendChild(document.createElement("div"));
            content.setAttribute("id", "content-wrapper");

            const aboutPage = content.appendChild(document.createElement("a"));
            aboutPage.href = "about.html";
            aboutPage.innerHTML = "About Page";

            const faqPage = content.appendChild(document.createElement("a"));
            faqPage.href = "FAQ.html";
            faqPage.innerHTML = "FAQ Page";
          
            const settingsPage = content.appendChild(document.createElement("button"));
            settingsPage.innerHTML = "Settings Page";

            settingsPage.addEventListener("click", async () => {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            window.close();
                            window.open("generalsettings.html");
                        }
                    });
                });
            });
            const logoutButton = content.appendChild(document.createElement("button"));
            logoutButton.innerHTML = "Logout";

            logoutButton.addEventListener("click", async () => {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(user => {
                        if (user.success) {
                            user.model.address = "";
                            UserDatabase.updateUser(user.model).then(result => {
                                if (result.success) {
                                    window.close();
                                    window.open("index.html");
                                }
                            });
                            
                        }
                    });
                });
            });

            img.src = "./ernie-eats-frontend/Images/hamburger-menu-selected.png";

        } else {
            wrapper.removeChild(wrapper.lastChild);
            img.src = "./ernie-eats-frontend/Images/cake.jpg";
        }

        this.isContentDisplayed = !this.isContentDisplayed;
    }
} 

customElements.define("navigation-bar", NavigationBar);
