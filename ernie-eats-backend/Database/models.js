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

class Resturant {
    constructor(name, menu, ownerId, reviews) {
        this.name = name;
        this.menu = menu;
        this.ownerId = ownerId;
        this.reviews = (Array.isArray(reviews)) 
            ? reviews 
            : undefined;
    }

    setId(id) {
        this.id = id;
    }

    isValidResturant() {
        return this.name !== undefined && 
                this.menu !== undefined && 
                this.ownerId !== undefined && 
                this.reviews !== undefined;
    }

    equals(resturant) {
        return resturant !== undefined &&
                this.name === resturant.name && 
                this.menu === resturant.menu && 
                this.ownerId.equals(resturant.ownerId) && 
                (Array.isArray(resturant.reviews) && 
                resturant.reviews.every((value, index) => value.equals(this.reviews[index])));
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

class ResturantPage {
    constructor(resturant, photos) {
        this.resturant = resturant;
        this.photos = Array.isArray(photos) ? photos : undefined;
    }

    setId(id) {
        this.id = id;
    }

    isValidResturantPage() {
        return this.resturant !== undefined &&
                this.photos !== undefined;
    }

    equals(resturantPage) {
        return resturantPage !== undefined &&
            this.resturant.equals(resturantPage.resturant) &&
            resturantPage.photos.every((value, index) => value === this.photos[index]);
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

export { User, Resturant, Review, ResturantPage, UserSettings, Post, Event };