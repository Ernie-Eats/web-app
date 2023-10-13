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

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email;
    }

    getAddress() {
        this.address = fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => this.address = data.ip);
        return this.address;
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
    constructor(id, name, menu, ownerId, reviews) {
        this.id = id;
        this.name = name;
        this.menu = menu;
        this.ownerId = ownerId;
        this.reviews = (Array.isArray(reviews) && reviews.every((r) => r instanceof string)) 
            ? reviews 
            : undefined;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getMenu() {
        return this.menu;
    }

    getOwnerId() {
        return this.ownerId;
    }

    getReviews() {
        return this.reviews;
    }

    isValidResturant() {
        return this.id !== undefined && 
                this.name !== undefined && 
                this.menu !== undefined && 
                this.owner !== undefined && 
                this.reviews !== undefined;
    }

    equals(resturant) {
        return resturant !== undefined &&
                this.id === resturant.id && 
                this.name === resturant.name && 
                this.menu === resturant.menu && 
                this.owner.equals(resturant.owner) && 
                (Array.isArray(resturant.reviews) && 
                resturant.reviews.every((value, index) => value instanceof Review && value.equals(this.reviews[index])));
    }
}

class Review {
    constructor(id, title, text, rating, resturantId, userId) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.rating = rating;
        this.resturantId = resturantId;
        this.user = user;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getReviewText() {
        return this.text;
    }

    getRating() {
        return this.rating;
    }

    getResturantId() {
        return this.resturantId;
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

export { User, Resturant, Review };