// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { Review } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "reviews" }); 

function isValidReview(review) {
    if (review !== undefined &&
        review instanceof Review &&
        review.isValidReview()) {
            return true;
    }
    return false;
}

async function findAllReviews() {
    let reviews = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let review = new Review(item.title, item.text, item.rating, item.restaurantId, item.userId);
        review.setId(item.id);
        reviews.push(review);
    }
    return { success: true, model: reviews };
}

async function insertReview(review) {
    if (isValidReview(review)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (review.equals(item)) {
                const model = new Review(item.title, item.text, item.rating, item.restaurantId, item.userId);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Review already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(review);
        const model = new Review(review.title, review.text, review.rating, review.restaurantId, review.userId);
        model.setId(item.id);
        return { success: true, 
            message: "Created review in Database", 
            model: model 
        };
    }
    return { success: false, 
                message: "Invalid Review", 
                model: undefined 
    };
}

async function deleteReview(review) {
    if (isValidReview(review)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (review.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                const model = new Review(review.title, review.text, review.rating, review.restaurantId, review.userId);
                model.setId(item.id);
                return { success: true, 
                            message: "Deleted Review from Database", 
                            model: model
                };
            } 
        }

        const model = new Review(review.title, review.text, review.rating, review.restaurantId, review.userId);
        model.setId(item.id);
        return { success: true, 
                    message: "Could not find Review in Database", 
                    model: model 
        };
    }

    return { success: false, 
                message: "Invalid Review", 
                model: Review.NULL 
    };
}

async function findReviewsByUserId(id) {
    let result = { success: false, model: Review.NULL };
    await findAllReviews().then(reviews => {
        if (reviews.success) {
            const filtered = reviews.model.filter(value => value.userId === id);
            result = { success: true, model: filtered };
        }
    });
    return result;
}

async function findReviewsByResturantId(id) {
    let result = { success: false, model: Review.NULL };
    await findAllReviews().then(reviews => {
        if (reviews.success) {
            const filtered = reviews.model.filter(value => value.restaurantId === id);
            result = { success: true, model: filtered };
        }
    });
    return result;
} 

export { insertReview, findAllReviews, findReviewsByResturantId, findReviewsByUserId, deleteReview }
