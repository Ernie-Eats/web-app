class User {
    constructor(id, name, username, email, password) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password
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

    isValidUser() {
        return this.id !== undefined &&
                this.name !== undefined &&
                this.username !== undefined &&
                this.email !== undefined &&
                this.password !== undefined;
    }

    equals(user) {
        return user !== undefined &&
                this.id === user.id &&
                this.name === user.name &&
                this.username === user.username &&
                this.email === user.email &&
                this.password === user.password;
    }
}

class BuisnessUser extends User {
    constructor(id, FName, LName, Username, Email, Password, resturant) {
        super(id, FName, LName, Username, Email, Password);
        this.resturant = (resturant instanceof Resturant) ? resturant : undefined;
    }

    getResturantName() {
        return this.ResturantName;
    }

    isValidBuisnessUser() {
        return this.isValidUser() && this.resturant !== undefined;
    }
}

class Resturant {
    constructor(id, name, menu, owner, reviews) {
        this.id = id;
        this.name = name;
        this.menu = menu;
        this.owner = (owner instanceof User) ? owner : undefined;
        this.reviews = (Array.isArray(reviews) && reviews.every((r) => r instanceof Review)) 
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

    getOwner() {
        return this.owner;
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
    constructor(id, title, text, rating, resturant, user) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.rating = rating;
        this.resturant = (resturant instanceof Resturant) ? resturant : undefined;
        this.user = (user instanceof User) ? user : undefined;
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

    getResturantName() {
        return this.resturant.getName();
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

export { User, BuisnessUser, Resturant, Review };