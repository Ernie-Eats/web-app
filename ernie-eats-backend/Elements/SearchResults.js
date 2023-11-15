window.onload = () => {
    class SearchResults extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({ mode: "open" });

            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "./ernie-eats-frontend/CSS/search-results.css";

            const wrapper = document.createElement("div");
            wrapper.setAttribute("class", "search-results-wrapper");

            const resultContainer = wrapper.appendChild(document.createElement("div"));
            resultContainer.setAttribute("class", "result-container");

            const restaurantPicture = resultContainer.appendChild(document.createElement("img"));
            restaurantPicture.classList.add("restaurant-picture");
            restaurantPicture.src = "./ernie-eats-frontend/Images/ErnieLogo.jpg";
            if (this.hasAttribute("data-image")) {
                restaurantPicture.src = this.getAttribute("data-image");
            }

            const infoContainer = resultContainer.appendChild(document.createElement("div"));
            infoContainer.classList.add("info-container");

            const nameAndRating = infoContainer.appendChild(document.createElement("div"));
            nameAndRating.classList.add("name-and-rating");

            const restaurantName = nameAndRating.appendChild(document.createElement("div"));
            restaurantName.classList.add("restaurant-name");
            restaurantName.innerText = this.getAttribute('data-restaurant-name');

            const rating = nameAndRating.appendChild(document.createElement("img"));
            rating.classList.add("rating");
            const ratingContainer = nameAndRating.appendChild(document.createElement("div"));
            ratingContainer.classList.add("rating-container");

            if (this.hasAttribute("data-rating")) {
                const ratingValue = +(this.getAttribute("data-rating"));
                if (ratingValue >= 1 && ratingValue <= 5) {
                    for (let i = 0; i < ratingValue; i++) {
                        let star = ratingContainer.appendChild(document.createElement("img"));
                        star.src = "./ernie-eats-frontend/Images/greyFilledStar.png";
                        star.classList.add("star");
                    }

                    for (let i = 0; i < 5 - ratingValue; i++) {
                        let star = ratingContainer.appendChild(document.createElement("img"));
                        star.src = "./ernie-eats-frontend/Images/greyUnfilledStar.png";
                        star.classList.add("star");
                    }
                } else {
                    const warning = ratingContainer.appendChild(document.createElement("p"));
                    warning.innerText = "Unknown Review";
                }
            }

            const description = infoContainer.appendChild(document.createElement("p"));
            description.classList.add("description");
            description.innerText = this.getAttribute("data-description");

            if (this.hasAttribute("data-description")) {
                let descriptionText = this.getAttribute("data-description");

                if (descriptionText.length >= 97) {
                    do {
                        descriptionText = descriptionText.slice(0, descriptionText.lastIndexOf(" "));
                    } while (descriptionText.length > 97 && descriptionText.lastIndexOf(" ") !== -1);

                    descriptionText += "...";
                }

                description.innerText = descriptionText;
            } else {
                description.innerHTML = "Unknown Review";
            }

            wrapper.appendChild(document.createElement("hr"));

            shadow.appendChild(css);
            shadow.appendChild(wrapper);
        }
    }

    customElements.define("search-results", SearchResults);
}
