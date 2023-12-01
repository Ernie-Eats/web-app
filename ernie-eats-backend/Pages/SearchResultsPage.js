import * as ResturantDatabase from '../Database/ResturantDatabase.js';
import * as ResturantPageDatabase from '../Database/ResturantPageDatabase.js';
import * as ReviewsDatabase from '../Database/ReviewsDatabase.js';

const urlParams = new URLSearchParams(window.location.search);
const searchResults = urlParams.get("result").replace("%20", " ").split(",");
const results = document.querySelector(".results");

await ResturantDatabase.findAllResturants().then(resturants => {
    if (resturants.success) {
        for (const result of searchResults) {
            resturants.model.forEach(async (resturant) => {
                const keys = resturant.keywords.split(",").join("").split(" ");
                if (keys.find(value => value === result) !== undefined) {
                    await createSearchResult(resturant);
                }
            });
        }
    }
});

async function createSearchResult(resturant) {
    let rating = 0;
    let image;

    await ResturantPageDatabase.findResturantPageByResturantId(resturant.id).then(page => {
        if (page.success) {
            image = page.model.photos[0];
        }
    });

    await ReviewsDatabase.findReviewsByResturantId(resturant.id).then(reviews => {
        if (reviews.success) {
            for (const review of reviews.model) {
                rating = +(review.rating);
            }
            rating /= reviews.model.length;
            rating = round(rating);
        }
    });

    const wrapper = results.appendChild(document.createElement("div"));
    wrapper.classList.add("search-results-wrapper");
    wrapper.onclick = () => {
        window.open(`business-page.html?page=${encodeURI(resturant.name)}&resturant=${encodeURI(resturant.id)}`);
        window.close();
    };

    const result = wrapper.appendChild(document.createElement("div"));
    result.classList.add("result-container");

    const resultImg = result.appendChild(document.createElement("img"));
    resultImg.classList.add("resturant-picture");
    resultImg.src = image !== undefined ? image : "./ernie-eats-frontend/Images/ErnieLogo.jpg";

    const infoContainer = result.appendChild(document.createElement("div"));
    infoContainer.classList.add("info-container");

    const nameAndRating = infoContainer.appendChild(document.createElement("div"));
    nameAndRating.classList.add("name-and-rating");

    const resturantName = nameAndRating.appendChild(document.createElement("p"));
    resturantName.classList.add("resturant-name");
    resturantName.innerText = resturant.name;

    const ratingContainer = nameAndRating.appendChild(document.createElement("div"));
    ratingContainer.classList.add("rating-container");

    for (let i = 0; i < 5; i++) {
        const star = ratingContainer.appendChild(document.createElement("img"));
        star.src = i < Math.trunc(rating) ? "./ernie-eats-frontend/Images/greyFilledStar.png"
            : "./ernie-eats-frontend/Images/greyUnfilledStar.png";
        star.classList.add("star");
    }

    const description = infoContainer.appendChild(document.createElement("p"));
    description.classList.add("description");
    description.innerText = "This is a test description";
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