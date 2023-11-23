class User {
    constructor(name, username, email, password, isBusiness, resturantId, address) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isBusiness = isBusiness;
        this.resturantId = resturantId;
        this.address = address;
    }

    static NULL = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isBusinessOwner() {
        return this.isBusiness && this.resturantId !== undefined;
    }

    isValidUser() {
        return this.username !== undefined &&
                this.email !== undefined &&
                this.password !== undefined;
    }

    equals(user) {
        return user !== undefined &&
                this.name === user.name &&
                this.username === user.username &&
                this.email === user.email &&
                this.password === user.password;
    }
}

class Restaurant {
    constructor(name, menu, ownerId, reviews) {
        this.name = name;
        this.menu = menu;
        this.ownerId = ownerId;
        this.reviews = (Array.isArray(reviews)) 
            ? reviews 
            : undefined;
    }

    static NULL = new Restaurant(undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidResturant() {
        return this.name !== undefined && 
                this.menu !== undefined && 
                this.ownerId !== undefined && 
                this.reviews !== undefined;
    }

    equals(restaurant) {
        return restaurant !== undefined &&
                this.name === restaurant.name && 
                this.menu === restaurant.menu && 
                this.ownerId.equals(restaurant.ownerId) && 
                (Array.isArray(restaurant.reviews) && 
                restaurant.reviews.every((value, index) => value.equals(this.reviews[index])));
    }
}

class Review {
    constructor(title, text, rating, resturantId, userId) {
        this.title = title;
        this.text = text;
        this.rating = rating;
        this.resturantId = resturantId;
        this.userId = userId;
    }

    static NULL = new Review(undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidReview() {
        return  this.title !== undefined && 
                this.text !== undefined && 
                this.rating !== undefined && 
                this.resturantId !== undefined && 
                this.userId !== undefined;
    }

    equals(review) {
        return review !== undefined &&
            this.title === review.title && 
            this.text === review.text && 
            this.rating === review.rating && 
            this.resturantId === review.resturantId && 
            this.userId === review.userId;
    }
}

class RestaurantPage {

    constructor(resturantId, photos, website, posts, events) {
        this.resturantId = resturantId;
        this.photos = Array.isArray(photos) ? photos : undefined;
        this.website = website;
        this.posts = Array.isArray(posts) ? posts : undefined;
        this.events = Array.isArray(events) ? events : undefined;
    }

    static NULL = new RestaurantPage(undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidRestaurantPage() {
        return this.restaurant !== undefined &&
            this.photos !== undefined &&
            this.website !== undefined;

    }

    equals(restaurantPage) {
        return restaurantPage !== undefined &&
            this.resturantId !== undefined &&
            restaurantPage.photos.every((value, index) => value === this.photos[index]) &&
            restaurantPage.posts.every((value, index) => value === this.posts[index]) &&
            restaurantPage.events.every((value, index) => value === this.events[index]);
    }
}

class UserSettings {
    constructor(userId, bio, isDarkTheme, banner, profile) {
        this.userId = userId;
        this.bio = bio;
        this.isDarkTheme = isDarkTheme;
        this.banner = banner;
        this.profile = profile;
    }

    static NULL = new UserSettings(undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidUserPage() {
        return this.bio !== undefined &&
            this.isDarkTheme !== undefined &&
            this.banner !== undefined &&
            this.profile !== undefined;
    }

    equals(userSettings) {
        return userSettings !== undefined &&
            this.userId === userSettings.userId &&
            this.bio === userSettings.bio &&
            this.isDarkTheme === userSettings.isDarkTheme &&
            this.banner === userSettings.banner &&
            this.profile === userSettings.profile;
    }

}

export { User, Restaurant, Review, RestaurantPage, UserSettings };