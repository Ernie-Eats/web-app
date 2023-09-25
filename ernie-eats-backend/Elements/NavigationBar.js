class NavigationBar extends HTMLElement
{
    constructor()
    {
        super();

        const shadow = this.attachShadow({ mode: "open" });

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
        accountLogin.href = hasAccount() ? "" : "./Pages/accountLogin.html";

        const accountPhoto = accountLogin.appendChild(document.createElement("img"));
        accountPhoto.src = hasAccount() ? "" : "./Images/defaultLogin.png";

        shadow.appendChild(wrapper);
    }
}

function hasAccount()
{
    return false;
}

customElements.define("navigation-bar", NavigationBar);