import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as Function from '../Database/functions.js';

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
        homeLogo.src = "./ernie-eats-frontend/Images/CoverLogo.jpg";
        homeLogo.id = "homeLogo-img";

        const searchBar = wrapper.appendChild(document.createElement("input"));
        searchBar.setAttribute("type", "text");
        searchBar.setAttribute("placeholder", "Search...");

        const accountLogin = wrapper.appendChild(document.createElement("button"));
        accountLogin.setAttribute("class", "button");

        const accountPhoto = accountLogin.appendChild(document.createElement("img"));

        Function.getAddress().then(address => {
            UserDatabase.findUserByAddress(address).then(async (result) => {
                if (result.success) {
                    await UserSettingsDatabase.findUserSettingsPageById(result.model.id).then(page => {
                        if (page.success) {
                            accountPhoto.src = page.model.profile !== undefined && page.model.profile.length !== 0 ?
                                page.model.profile : "./ernie-eats-frontend/Images/defaultLogin.png";
                        }
                    });
                } else {
                    accountPhoto.src = "./ernie-eats-frontend/Images/defaultLogin.png";
                }
            });
        });

        const hamburgerWrapper = wrapper.appendChild(document.createElement("div"));
        hamburgerWrapper.setAttribute("id", "hamburger-wrapper");

        const hamburger = hamburgerWrapper.appendChild(document.createElement("button"));
        hamburger.setAttribute("class", "hamburger-button");

        const hamburgerImg = hamburger.appendChild(document.createElement("img")); 
        hamburgerImg.src = "./ernie-eats-frontend/Images/cake.jpg";
        hamburgerImg.id = "hamburger-img";

        let searchResult = ""; 

        searchBar.oninput = (e) => searchResult = e.target.value;

        document.addEventListener("keypress", (e) => {
            if (searchResult.length !== 0 && e.key === "Enter") {
                window.close();
                window.open('business-page.html');
            }
        });

        hamburger.addEventListener("click", () => this.hamburgerMenu(hamburgerWrapper, hamburgerImg));

        accountLogin.addEventListener("click", async () => {
            await Function.getAddress().then(address => {
                UserDatabase.findUserByAddress(address).then(result => {
                    window.close();
                    result.success ? window.open('user-page.html') : window.open('login-Signup.html');
                });
            });
        });

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
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
            faqPage.href = "FAQ.html";
            faqPage.innerHTML = "FAQ Page";
          
            const settingsPage = content.appendChild(document.createElement("button"));
            settingsPage.innerHTML = "Settings Page";
            settingsPage.addEventListener("click", async () => {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            window.close();
                            window.open("generalSettings.html");
                        }
                    });
                });
            });

            const logoutButton = content.appendChild(document.createElement("button"));
            logoutButton.innerHTML = "Logout";

            logoutButton.addEventListener("click", async () => {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            result.model.address = "";
                            UserDatabase.updateUser(result.model);
                        }
                    });
                });
            });
          
            const settingsPage = content.appendChild(document.createElement("button"));
            settingsPage.innerHTML = "Settings Page";
            settingsPage.addEventListener("click", async () => {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            window.close();
                            window.open("generalSettings.html");
                        }
                    });
                });
            });

            img.src = "./ernie-eats-frontend/Images/hamburger-menu-selected.png";

        } else {
            wrapper.removeChild(wrapper.lastChild);
            img.src = "./ernie-eats-frontend/Images/cake.jpg";
        }

        wrapper.setAttribute("data-isContentDisplayed", !isContentDisplayed);
    }
} 

customElements.define("navigation-bar", NavigationBar);
