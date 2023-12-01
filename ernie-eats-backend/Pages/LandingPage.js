import * as EventDatabase from '../Database/EventsDatabase.js';
import * as RestaurantDatabase from '../Database/RestaurantDatabase.js';
import * as RestaurantPageDatabase from '../Database/RestaurantPageDatabase.js';
import * as ReviewDatabase from '../Database/ReviewsDatabase.js';

const milliseconds = 86400000;
const restaurantMap = new Map();
const upcomingEvents = document.getElementById("events");
const topRestaurants = document.querySelector(".top-restaurants");

await EventDatabase.findAllEvents().then(events => {
    if (events.success) {
        const currentDate = new Date();
        events.model.forEach(event => {
            const eventTime = (new Date(event.dateTime).getTime() - currentDate.getTime()) / milliseconds;
            if (eventTime > 0 && eventTime < 7) {
                RestaurantDatabase.findAllRestaurants().then(restaurants => {
                    if (restaurants.success) {
                        const foundRestaurant = restaurants.model.find(value => value.id === event.restauarntId);
                        if (foundRestaurant !== undefined) {
                            const eventElm = upcomingEvents.appendChild(document.createElement('custom-event'));
                            eventElm.setAttribute("restaurant-name", foundRestaurant.name);
                            eventElm.setAttribute("date", event.dateTime);
                            eventElm.setAttribute("event-name", event.title);
                            eventElm.setAttribute("event-description", event.description);
                        }
                    }
                });
            }
        });
    }
});

await ReviewDatabase.findAllReviews().then(reviews => {
    if (reviews.success) {
        reviews.model.forEach(review => restaurantMap.set(review.restaurantId,
            restaurantMap.has(review.restaurantId)
                ? +(restaurantMap.get(review.restaurantId)) + +(review.rating)
                : +(review.rating))
        );
    }
});

await RestaurantDatabase.findAllRestaurants().then(restaurants => {
    if (restaurants.success) {
        const reviewRestaurantRating = [...restaurantMap.entries()].sort((a, b) => b[1] - a[1]);
        const topThree = reviewRestaurantRating.slice(0, 2);
        topThree.forEach((pair, index) => {
            const foundRestaurant = restaurants.model.find(value => value.id === pair[0]);
            if (foundRestaurant !== undefined) {
                RestaurantPageDatabase.findRestaurantPageByRestaurantId(foundRestaurant.id).then(page => {
                    if (page.success) {
                        const item = topRestaurants.appendChild(document.createElement("div"));
                        item.classList.add("restaurant-item");

                        const info = item.appendChild(document.createElement("div"));
                        info.classList.add("restaurant-info");

                        info.appendChild(document.createElement("h2")).innerText = `#${index + 1}`;
                        info.appendChild(document.createElement("h3")).innerText = foundRestaurant.name;
                        info.appendChild(document.createElement("p")).innerText = page.model.description;
                    }

                });
            }
        });
    }
});

