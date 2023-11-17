import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as ReviewDatabase from '../Database/ReviewsDatabase.js';
import * as Function from '../Database/functions.js';

const name = document.getElementById("name");
const ratingHeader = document.getElementById("ratingHeader")
const reviewCount = document.getElementById("reviewCount");
const reviewScroller = document.getElementById("reviewScroll");
const profilePicture = document.getElementById("profilePicture");
const profileBanner = document.getElementById("banner");

await Function.getAddress().then(address => {
    UserDatabase.findUserByAddress(address).then(user => {
        if (user.success) {
            if (user.model.name !== undefined && user.model.name.length !== 0) {
                name.innerText = user.model.name;
                ratingHeader.innerText = user.model.name + "'s ratings: ";
            } else {
                name.innerText = user.model.username;
                ratingHeader.innerText = user.model.username + "'s ratings: ";
            }

            UserSettingsDatabase.findUserSettingsPageById(user.model.id).then(settings => {
                if (settings.success) {
                    profilePicture.src = settings.model.profile !== undefined && settings.model.profile.length !== 0 ?
                        settings.model.profile : "../../ernie-eats-frontend/Images/defaultLogin.png";
                    profileBanner.src = settings.model.banner !== undefined && settings.model.banner.length !== 0 ?
                        settings.model.banner : "../../ernie-eats-frontend/Images/userCover.jpg";
                } else {
                    profilePicture.src = "../../ernie-eats-frontend/Images/defaultLogin.png";
                    profileBanner.src = "../../ernie-eats-frontend/Images/userCover.jpg";
                }
            });

            ReviewDatabase.findAllReviews().then(reviews => {
                if (reviews.success) {
                    const foundReviews = reviews.model.filter(value => value.userId == user.model.id);
                    reviewCount.innerText = foundReviews.length;
                    foundReviews.forEach(review => {
                        const reviewTitle = reviewScroller.appendChild(document.createElement("p"));
                        reviewTitle.innerText = review.title;
                        reviewScroller.appendChild(document.createElement("br"));
                        reviewScroller.appendChild(document.createElement("hr"));
                    });
                }
            });
        }
    });
});