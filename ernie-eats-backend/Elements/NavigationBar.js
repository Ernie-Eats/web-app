class NavigationBar extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./CSS/navbar.css";

        const wrapper = document.createElement("nav");
        wrapper.setAttribute("class", "navigation-wrapper");

        const homePage = wrapper.appendChild(document.createElement("a"));
        homePage.href = this.hasAttribute("homePage") ? this.getAttribute("homePage") : "index.html";
        
        const homeLogo = homePage.appendChild(document.createElement("img"));
        homeLogo.src = this.hasAttribute("homeSrc") ? this.getAttribute("homeSrc") : "./Images/ErnieLogo.jpg";

        const searchBar = wrapper.appendChild(document.createElement("input"));
        searchBar.setAttribute("type", "text");
        searchBar.setAttribute("placeholder", "Search..");

        const accountLogin = wrapper.appendChild(document.createElement("a"));
        accountLogin.href = this.hasAccount() ? "" : "./Pages/accountLogin.html";

        const accountPhoto = accountLogin.appendChild(document.createElement("img"));
        accountPhoto.src = this.hasAccount() ? "" : "./Images/defaultLogin.png";

        shadow.appendChild(css);
        shadow.appendChild(wrapper);
    }

    hasAccount() {
        return false;
    }
} 

customElements.define("navigation-bar", NavigationBar);