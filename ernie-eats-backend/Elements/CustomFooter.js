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
                    <h1 class="logo-text">Ernie's Eats</h1>
                    <p>
                        Ernie's Eats is a website where users can discover, share, and read
                        reviews and recommendations about various restaurants in Bridgewater, Virginia.
                        This website serves as a valuable resource for food enthusiasts, tourists,
                        and Bridgewater college students. If you have any questions, suggestions, or
                        concerns, feel free to contact us using the form to the right.
                    </p>
                    
                </div>
                <form action="https://formsubmit.co/ea416a18c1be6825d717ca57050ceb2d" method="POST">
                
                <div class="honeypot">
                <input type="text" name="_honey" style="display: none;"
                </div>

                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_url" value="https://delightful-sand-023ffca10.3.azurestaticapps.net/index.html">
                <input type="hidden" name="_next" value="https://delightful-sand-023ffca10.3.azurestaticapps.net/successpage.html">

                    <h2>Contact Us</h2>
                    <br>
                    <form action="/action_page.php">
                        <div class="yourname-section">
                        <label for="yourname">Your Name</label>
                        <input type="text" id="yourname" name="Name" placeholder="Your name..">
                        </div>

                        <div class="email-section">
                        <label for="email">Email</label>
                        <input type="email" 
                        id="email" placeholder="Your email..." 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                        size="30"
                        required/>
                        </div>

                        <div class="message-section">
                        <label for="lname">Your Message</label>
                        <textarea id="message" name="Message" placeholder="Write something.."></textarea>
                        </div>
                        
                        <div class="submit-button">
                        <input type="submit" value="Submit">
                        </div>
                    </form>
                </div> 

                <div class="copyright-info">
                    <p> &copy 2023 Ernie's Eats</p>
                </div>

            </div>
            
            

        </div>
        `;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/footer.css";

        this.shadowRoot.appendChild(css);
    }
}

customElements.define("custom-footer", CustomFooter);