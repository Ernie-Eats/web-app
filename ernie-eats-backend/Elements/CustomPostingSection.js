import * as EventDatabase from '../Database/EventsDatabase.js';
import * as PostDatabase from '../Database/PostDatabase.js';
import * as Model from '../Database/models.js';

class PostSection extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        this.shadowRoot.innerHTML = `
          <div class="post-section">
            <div class="tabs">
              <div class="tab active">Event</div>
              <div class="tab">Post</div>
          </div>
          <div class="input-section">
            <input type="text" class="title" placeholder="Title">
            <textarea placeholder="Description" rows="5" cols="10" id="description" style="resize: none;"></textarea>
          </div>
          <button class="submit-btn">Submit</button>
          </div>
        `;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/posting-section.css";

        this.shadowRoot.appendChild(css);

        [...this.shadowRoot.querySelector(".tabs").children].forEach(b => b.addEventListener("click",
            () => [...this.shadowRoot.querySelector(".tabs").children].forEach((tab) => tab.classList.toggle("active"))));

        this.shadowRoot.querySelector(".submit-btn").addEventListener("click", async () => await this.submitPost());
    }

    async submitPost() {
        const inputSection = [...this.shadowRoot.querySelector(".input-section").children];
        const title = inputSection[0].value;
        const description = inputSection[1].value;
        const selectedTab = this.shadowRoot.querySelector(".tabs .active").innerText;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("restaurant").replace("%20", " ");

        if (title === undefined && description === undefined) {
            alert("Could not find Title or Description of post!");
            return;
        }

        if (selectedTab === "Event") {
            await EventDatabase.insertEvent(new Model.Event(title, description, new Date(Date.now), id)).then(e => {
                if (e.success) {
                    history.go();
                }
            });
        } else if (selectedTab === "Post") {
            await PostDatabase.insertPost(new Model.Post(title, description, id)).then(e => {
                if (e.success) {
                    history.go();
                }
            });
        } else {
            alert("Could not determine if it is a Post or an Event");
            return;
        }
    }
}

customElements.define("post-section", PostSection);