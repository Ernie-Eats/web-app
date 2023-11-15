import * as ReviewDatabase from '../Database/ReviewsDatabase.js';
import * as UserDatabase from '../Database/UserDatabase.js';

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page").replace("%20", " ");
const id = urlParams.get("restaurant").replace("%20", " ");
document.getElementById("name").innerText = page;
const reviewsDiv = document.getElementById("reviews");
const rating = document.getElementById("rating");
const stars = document.getElementById("stars");
let starAverage = 0;

await ReviewDatabase.findReviewsByResturantId(id).then(reviews => {
    if (reviews.success) {
        for (const review of reviews.model) { 
            UserDatabase.findUserById(review.userId).then(user => {
                if (user.success) {
                    const customerReview = document.createElement("small-customer-review");
                    customerReview.setAttribute("restaurant-name", "");
                    customerReview.setAttribute("reviewer-title", review.title);
                    customerReview.setAttribute("reviewer",
                        user.model.name !== undefined && user.model.name.length !== 0 ? user.model.name : user.model.username);
                    customerReview.setAttribute("reviewer-date", "");
                    reviewsDiv.appendChild(customerReview);
                    const reviewText = reviewsDiv.appendChild(document.createElement("p"));
                    if (review.text.length > 37) {
                        while (review.text.length > 37 && review.text.lastIndexOf(" ") !== -1) {
                            review.text = review.text.slice(0, review.text.lastIndexOf(" "));
                        }
                        review.text += "..."
                    }
                    reviewText.innerText = review.text;
                    const reviewStars = reviewsDiv.appendChild(document.createElement("div"));
                    reviewStars.classList.add("starWrapper");
                    createStars(+(review.rating), reviewStars);
                    reviewsDiv.appendChild(document.createElement("hr"));
                }
            });
            starAverage += +(review.rating);
        }
        starAverage /= reviews.model.length;
        starAverage = round(starAverage);
        rating.innerText = starAverage;
        createStars(starAverage, stars);
    }
});

console.log(starAverage);


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

function createStars(filledCount, wrapper) {
    for (let i = 0; i < 5; i++) {
        if (i < Math.trunc(filledCount)) {
            let star = wrapper.appendChild(document.createElement("img"));
            star.src = "./ernie-eats-frontend/Images/filledStar.jpg";
            star.setAttribute("class", "filled-star");
        } else {
            let star = wrapper.appendChild(document.createElement("img"));
            star.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
            star.setAttribute("class", "unfilled-star");
        }
    }
}
