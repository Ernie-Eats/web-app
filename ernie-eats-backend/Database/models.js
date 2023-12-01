class User {
    constructor(name, username, email, password, isBusiness, restaurantId, address) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isBusiness = isBusiness;
        this.restaurantId = restaurantId;
        this.address = address;
    }

    static NULL = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isBusinessOwner() {
        return this.isBusiness && this.restaurantId !== undefined;
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
    constructor(name, menu, ownerId, keywords) {
        this.name = name;
        this.menu = menu;
        this.ownerId = ownerId;
        this.keywords = keywords;
    }

    static NULL = new Restaurant(undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidRestaurant() {
        return this.name !== undefined &&
            this.menu !== undefined &&
            this.ownerId !== undefined &&
            this.keywords !== undefined;
    }

    equals(restaurant) {
        return restaurant !== undefined &&
                this.name === restaurant.name && 
                this.menu === restaurant.menu && 
                this.ownerId === restaurant.ownerId && 
                this.keywords === restaurant.keywords;
    }
}

class Review {
    constructor(title, text, rating, restaurantId, userId) {
        this.title = title;
        this.text = text;
        this.rating = rating;
        this.restaurantId = restaurantId;
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
                this.restaurantId !== undefined && 
                this.userId !== undefined;
    }

    equals(review) {
        return review !== undefined &&
            this.title === review.title && 
            this.text === review.text && 
            this.rating === review.rating && 
            this.restaurantId === review.restaurantId && 
            this.userId === review.userId;
    }
}

class RestaurantPage {
    constructor(restaurantId, email, website, hours, address, contact, description, banner, photos) {
        this.restaurantId = restaurantId;
        this.email = email;
        this.website = website;
        this.hours = Array.isArray(hours) ? hours : undefined;
        this.address = address;
        this.contact = contact;
        this.description = description;
        this.banner = banner;
        this.photos = Array.isArray(photos) ? photos : undefined;
    }

    static NULL = new RestaurantPage(undefined, undefined, undefined, undefined, undefined);

    setId(id) {
        this.id = id;
    }

    isValidRestaurantPage() {
        return this.restaurantId !== undefined;
    }

    equals(restaurantPage) {
        return restaurantPage !== undefined &&
            this.restaurantId === restaurantPage.restaurantId &&
            this.email === restaurantPage.email &&
            this.website === restaurantPage.website &&
            this.address === restaurantPage.address &&
            this.contact === restaurantPage.contact &&
            this.description === restaurantPage.description &&
            this.banner === restaurantPage.banner &&
            restaurantPage.photos.every((value, index) => value === this.photos[index])
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

class Post {
    constructor(title, description, restaurantId) {
        this.title = title;
        this.description = description;
        this.restaurantId = restaurantId;
    }

    setId(id) {
        this.id = id;
    }

    isValidPost() {
        return this.title !== undefined &&
            this.description !== undefined &&
            this.restaurantId !== undefined;
    }

    equals(otherPost) {
        return otherPost !== undefined &&
            this.title === otherPost.title &&
            this.description === otherPost.description &&
            this.restaurantId === otherPost.restaurantId;
    }
}

class Event {
    constructor(title, description, dateTime, restauarntId) {
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.restauarntId = restauarntId;
    }

    setId(id) {
        this.id = id;
    }

    isValidEvent() {
        return this.title !== undefined &&
            this.description !== undefined &&
            this.dateTime !== undefined &&
            this.restauarntId !== undefined;
    }

    equals(otherEvent) {
        return otherEvent !== undefined &&
            this.title === otherEvent.title &&
            this.description === otherEvent.description
            this.dateTime === otherEvent.dateTime &&
            this.restauarntId === otherEvent.restauarntId;
    }
}

export { User, Restaurant, Review, RestaurantPage, UserSettings, Event, Post };
