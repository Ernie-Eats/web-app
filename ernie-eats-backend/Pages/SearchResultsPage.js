import * as RestaurantDatabase from '../Database/RestaurantDatabase.js';
import * as RestaurantPageDatabase from '../Database/RestaurantPageDatabase.js';
import * as ReviewsDatabase from '../Database/ReviewsDatabase.js';

const urlParams = new URLSearchParams(window.location.search);
const searchResults = urlParams.get("result").replace("%20", " ").split(",");
const results = document.querySelector(".results");
const restaurantResult = [];

await RestaurantDatabase.findAllRestaurants().then(restaurants => {
    if (restaurants.success) {
        for (const result of searchResults) {
            restaurants.model.forEach(async (restaurant) => {
                const keys = restaurant.keywords.split(",").join("").split(" ");
                if (keys.find(value => value === result) !== undefined) {
                    if (!restaurantResult.find(value => value.model === restaurant)) {
                        restaurantResult.push({ valid: true, model: restaurant });
                    }
                } else {
                    if (!restaurantResult.find(value => value.model === restaurant)) {
                        restaurantResult.push({ valid: false, model: restaurant });
                    }
                }
            });
        }
    }
});

if (restaurantResult.length > 0) {
    for (const r of restaurantResult.filter(value => value.valid)) {
        console.log(r);
        await createSearchResult(r.model);
    }
    results.appendChild(document.createElement("hr"));
    restaurantResult.filter(value => !value.valid).forEach((r) => createSearchResult(r.model));
}

async function createSearchResult(restaurant) {
    let rating = 0;
    let image;
    let description;

    await RestaurantPageDatabase.findRestaurantPageByRestaurantId(restaurant.id).then(page => {
        if (page.success) {
            image = page.model.photos[0];
            description = page.model.description;
        }
    });

    await ReviewsDatabase.findReviewsByRestaurantId(restaurant.id).then(reviews => {
        if (reviews.success) {
            for (const review of reviews.model) {
                rating += +(review.rating);
            }
            rating /= reviews.model.length;
            rating = round(rating);
        }
    });

    const wrapper = results.appendChild(document.createElement("div"));
    wrapper.classList.add("search-results-wrapper");
    wrapper.onclick = () => {
        window.open(`business-page.html?name=${encodeURIComponent(restaurant.name)}&restaurant=${encodeURI(restaurant.id)}`);
        window.close();
    };

    const result = wrapper.appendChild(document.createElement("div"));
    result.classList.add("result-container");

    const resultImg = result.appendChild(document.createElement("img"));
    resultImg.classList.add("restaurant-picture");
    resultImg.src = image !== undefined ? image : "./ernie-eats-frontend/Images/ErnieLogo.jpg";

    const infoContainer = result.appendChild(document.createElement("div"));
    infoContainer.classList.add("info-container");

    const nameAndRating = infoContainer.appendChild(document.createElement("div"));
    nameAndRating.classList.add("name-and-rating");

    const restaurantName = nameAndRating.appendChild(document.createElement("p"));
    restaurantName.classList.add("restaurant-name");
    restaurantName.innerText = restaurant.name;

    const ratingContainer = nameAndRating.appendChild(document.createElement("div"));
    ratingContainer.classList.add("rating-container");

    for (let i = 0; i < 5; i++) {
        const star = ratingContainer.appendChild(document.createElement("img"));
        star.src = i < Math.trunc(rating) ? "./ernie-eats-frontend/Images/greyFilledStar.png"
            : "./ernie-eats-frontend/Images/greyUnfilledStar.png";
        star.classList.add("star");
    }

    const descriptionElm = infoContainer.appendChild(document.createElement("p"));
    descriptionElm.classList.add("description");
    descriptionElm.innerText = description !== undefined ? description : "";
}

function round(num) {
    let rounded = (Number)(num.toFixed(1));
    if (rounded - Math.trunc(num) === 0) {
        return rounded;
    } else if (rounded - Math.trunc(num) > 0) {
        return rounded.toFixed();
    } else {
        return Math.trunc(rounded);
    }
}