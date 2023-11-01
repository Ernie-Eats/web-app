class User {
    constructor(name, username, email, password, isBuisness, resturantId, address) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isBuisness = isBuisness;
        this.resturantId = resturantId;
        this.address = address;
    }

    setId(id) {
        this.id = id;
    }

    async getAddress() {
        return await fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip);
    }

    isBuisnessOwner() {
        return this.isBuisness && this.resturantId !== undefined;
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
                resturant.reviews.every((value, index) => value instanceof String && value.equals(this.reviews[index])));
    }
}

class Review {
    constructor(id, title, text, rating, resturantId, userId) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.rating = rating;
        this.resturantId = resturantId;
        this.userId = userId;
    }

    isValidReview() {
        return this.id !== undefined && 
                this.title !== undefined && 
                this.text !== undefined && 
                this.rating !== undefined && 
                this.resturant !== undefined && 
                this.user !== undefined;
    }

    equals(review) {
        return review !== undefined &&
            this.id === review.id && 
            this.title === review.title && 
            this.text === review.text && 
            this.rating === review.rating && 
            this.resturant === review.resturant && 
            this.user === review.user;
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
    constructor(id, userId, isDarkTheme, banner, profile) {
        this.id = id;
        this.userId = userId;
        this.isDarkTheme = isDarkTheme;
        this.banner = banner;
        this.profile = profile;
    }

    setId(id) {
        this.id = id;
    }

    equals(userSettings) {
        return userSettings !== undefined &&
            this.id === userSettings.id &&
            this.userId === userSettings.userId &&
            this.isDarkTheme === userSettings.isDarkTheme &&
            this.banner === userSettings.banner &&
            this.profile === userSettings.profile;
    }

}

export { User, Resturant, Review, ResturantPage, UserSettings };