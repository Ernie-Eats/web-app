class CustomFooter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div class="footer">
            <div class=" footer-content">
                <div class="footer-section about">
                    <!-- <img src="./ernie-eats-frontend/Images/ErnieLogo.jpg" alt="ErnieEats_logo" width="50" height="50"> -->
                    <h1 class="logo-text">ErnieEats</h1>
                    <p>
                        ErnieEats is a website where users can discover,share, and read
                        reviews and reccomendations about various restaurants in Bridgewater Virginia.
                        This website serves as a valuable resource for food enthusiasts, tourists,
                        and Bridgewater college students.
                    </p>
                </div>
                <div class="footer-section-contact-form">
                    <h2>Contact Us</h2>
                    <br>
                    <form action="/action_page.php">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Your name..">

                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name..">

                        <label for="country">Country</label>
                        <select id="country" name="country">
                            <option value=""></option>
                            <option value="australia">Australia</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
            <div class="footer-bottom"> &copy; ErnieEats.com </div>
        </div>
        `;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/footer.css";

        this.shadowRoot.appendChild(css);
    }
}

customElements.define("custom-footer", CustomFooter);