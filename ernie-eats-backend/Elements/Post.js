class PostComponent extends HTMLElement {
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
            <style>

                .post {
                    
                    padding: 10px;
                    margin-bottom: 20px;
                    background-color: #ffff;
                    
                }

                .post-title {
                    font: 600 18px 'Open Sans', sans-serif;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .post-description {
                    margin: 10px 40px 10px 40px;
                    font: 600 14px 'Open Sans', sans-serif;
                    color: #4d4a4a
                }

                .post-date {
                    font: 600 16px 'Open Sans', sans-serif;
                    font-style: italic;
                    color: #555;
                }

                hr{
                    border: none;
                    height: 1px;
                    background-color: #bf1f3b;
                    margin: 15px 0;
                }
            </style>

            <div class="post">
                <div class="post-title">${title}</div>
                <div class="post-description">${description}</div>
                <div class="post-date">Posted on: ${date}</div><hr />
            </div>
        `;
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

customElements.define('post-component', PostComponent);