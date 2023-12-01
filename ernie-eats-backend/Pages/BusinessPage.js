import * as ReviewDatabase from '../Database/ReviewsDatabase.js';
import * as EventDatabase from '../Database/EventsDatabase.js';
import * as RestaurantDatabase from '../Database/RestaurantDatabase.js';
import * as RestaurantPageDatabase from '../Database/RestaurantPageDatabase.js';
import * as PostDatabase from '../Database/PostDatabase.js';
import * as UserDatabase from '../Database/UserDatabase.js';
import * as Function from '../Database/functions.js';
import { Review } from '../Database/models.js';

 
const urlParams = new URLSearchParams(window.location.search);
const page = decodeURIComponent(urlParams.get("name"));
const id = decodeURIComponent(urlParams.get("restaurant"));
const reviewsDiv = document.getElementById("reviews");
const rating = document.getElementById("rating");
const stars = document.getElementById("stars");
const addReview = document.getElementById("add-review");

const address = document.getElementById("address");
const hours = document.getElementById("hours");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const banner = document.querySelector(".restaurant-picture");

document.getElementById("name").innerText = page;
document.querySelector(".overlay-text").innerText = page;
document.getElementById("reviewHeader").innerText = `See ${page} Reviews: `;
document.getElementById("imageHeader").innerText = `More images of ${page}: `;

let userId = "";
let starAverage = 0;

await Function.getAddress().then(address => {
    UserDatabase.findUserByAddress(address).then(user => {
        if (user.success) {
            userId = user.model.id;
        }
    });
});

addReview.addEventListener("click", async () => {
    if (!document.querySelector(".container").classList.contains("blur")) {
        document.querySelector(".container").classList.add("blur");

        const review = document.createElement("div");
        review.classList.add("review");

        const title = review.appendChild(document.createElement("input"));

        const stars = review.appendChild(document.createElement("div"));

        for (let i = 0; i < 5; i++) {
            let star = stars.appendChild(document.createElement("img"));
            star.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
            star.classList.add("unfilled-star");
            star.onclick = (ev) => clickStar(ev, stars);
        }
        review.appendChild(document.createElement("hr"));

        const text = review.appendChild(document.createElement("input"));

        const saveButton = review.appendChild(document.createElement("button"));
        saveButton.innerText = "Save";
        saveButton.addEventListener('click', async () => {
            if (title.value.length === 0 && text.value.length === 0) {
                alert("Unknown Title and Review");
            } else {
                let rating = 0;
                [...stars.children].forEach(s => {
                    if (s.classList.contains("filled-star")) {
                        rating++;
                    }
                });
                await ReviewDatabase.insertReview(new Review(title.value, text.value, rating, id, userId)).then(r => {
                    if (r.success) {
                        document.querySelector(".container").classList.toggle("blur");
                        document.querySelector(".review").remove();
                    }
                });
            }
        });

        const cancelButton = review.appendChild(document.createElement("button"));
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener("click", () => {
            document.querySelector(".container").classList.toggle("blur");
            document.querySelector(".review").remove();
        })
        document.body.appendChild(review);

    } else {
        document.querySelector(".container").classList.toggle("blur");
        document.querySelector(".review").remove();
    }
});

await ReviewDatabase.findReviewsByRestaurantId(id).then(reviews => {
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

function clickStar(ev, stars) {
    const starList = [...stars.children];
    starList.forEach(s => {
        if (s.classList.contains("filled-star")) {
            s.classList.add("unfilled-star");
            s.classList.remove("filled-star");
            s.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
        }
    })
    starList.forEach((s, index) => {
        if (s === ev.target) {
            if (index !== 0) {
                for (let i = 0; i < index + 1; i++) {
                    if (starList[i].classList.contains("unfilled-star")) {
                        starList[i].classList.add("filled-star");
                        starList[i].classList.remove("unfilled-star");
                        starList[i].src = "./ernie-eats-frontend/Images/filledStar.jpg";
                    } else {
                        starList[i].classList.add("unfilled-star");
                        starList[i].classList.remove("filled-star");
                        starList[i].src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
                    }
                }
            } else {
                if (ev.target.classList.contains("unfilled-star")) {
                    ev.target.classList.add("filled-star");
                    ev.target.classList.remove("unfilled-star");
                    ev.target.src = "./ernie-eats-frontend/Images/filledStar.jpg";
                } else {
                    ev.target.classList.add("unfilled-star");
                    ev.target.classList.remove("filled-star");
                    ev.target.src = "./ernie-eats-frontend/Images/unfilledStar.jpg";
                }
            }
        }
    });
}

await RestaurantDatabase.findRestaurantByOwnerId(userId).then(restaurant => {
    if (restaurant.success) {
        console.log(restaurant);
        console.log(restaurant.model.id === id);
        if (restaurant.model.id === id) {
            document.getElementById("add-review").style.display = "none";
        } else {
            document.querySelector(".posting-section").style.display = "none";
            document.querySelector(".reviews-section").style.gridRowStart = 1;
            document.querySelector(".reviews-section").style.height = "810px"; 
        }
    } else {
        document.querySelector(".posting-section").style.display = "none";
        document.querySelector(".reviews-section").style.gridRowStart = 1;
        document.querySelector(".reviews-section").style.height = "810px"; 
    }
});

await RestaurantPageDatabase.findRestaurantPageByRestaurantId(id).then(p => {
    if (p.success) {
        address.innerHTML = `${p.model.address} <br> Bridgewater, VA 22812`;
        banner.src = p.model.banner;
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let html = '';

        for (let i = 0; i < 7; i++) {
            let starting = p.model.hours[2 * i];
            let ending = p.model.hours[(2 * i) + 1];
            html += `${days[i]}: `
            if (starting.length === 0 && ending.length === 0) {
                    html += `Closed <br>`;
            } else {
                if (+(starting.slice(0, 2)) < 12) {
                    if (+(starting.slice(0, 2)) == 0) {
                        starting = "12:00";
                    }
                    starting += "AM"
                } else if (+(starting.slice(0, 2)) === 12) {
                    starting += "PM"
                } else {
                    starting = `${(+(starting.slice(0,2)) - 12).toString()}${starting.slice(2)}PM`
                }

                if (+(ending.slice(0, 2)) <= 12) {
                    if (+(ending.slice(0, 2)) == 0) {
                        ending = "12:00";
                    }
                    ending += "AM"
                } else if (+(ending.slice(0, 2)) === 12) {
                    ending += "PM"
                }  else {
                    ending = `${(+(ending.slice(0,2)) - 12).toString()}${ending.slice(2)}PM`
                }

                html += `${starting} - ${ending} <br>`;
            }
        }

        hours.innerHTML = html;
        phone.innerText = `Phone: ${p.model.contact}`;
        p.model.photos.forEach(photo => {
            const pic = document.querySelector(".more-pictures").appendChild(document.createElement("img"));
            pic.classList.add("pillar-food");
            pic.src = photo;
        });

        website.href = p.model.website;
        website.innerText = p.model.website;


    }
});

await PostDatabase.findAllPosts().then(posts => {
    if (posts.success) {
        const restaurantPosts = posts.model.filter(value => value.restaurantId === id);
        restaurantPosts.forEach(p => {
            const post = document.getElementById("posts-container").appendChild(document.createElement("custom-post"));

            const date = (new Date().getMonth() + 1).toString() + "-" +
                new Date().getDate().toString() + "-" +
                new Date().getFullYear().toString();

            post.setAttribute("title", p.title);
            post.setAttribute("description", p.description);
            post.setAttribute("date", date);
        });
    }
});

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
        let star = wrapper.appendChild(document.createElement("img"));
        star.src = i < Math.trunc(filledCount) ? "./ernie-eats-frontend/Images/filledStar.jpg"
            : "./ernie-eats-frontend/Images/unfilledStar.jpg";
        star.setAttribute("class", "filled-star");
    }
}
