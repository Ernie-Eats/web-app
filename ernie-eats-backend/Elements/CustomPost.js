class CustomPost extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
    
        const title = this.getAttribute('title') || 'Default Title';
        const description = this.getAttribute('description') || 'Default Description';
        const date = this.getAttribute('date') || 'Unknown Date';

        this.shadowRoot.innerHTML = `
            <div class="post">
                <div class="post-title">${title}</div>
                <div class="post-description">${description}</div>
                <div class="post-date">Posted on: ${date}</div><hr>
            </div>
        `;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/posts.css";

        this.shadowRoot.appendChild(css);
    }
    static get observedAttributes() {
        return ['title', 'description', 'date'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
}

customElements.define('custom-post', CustomPost);