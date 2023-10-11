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
        review instanceof Resturant &&
        review.isValidReview()) {
            return true;
    }
    return false;
}

async function findAllReviews() {
    let resturants = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let resturant = new Review(item.id, item.name, item.menu, item.owner, item.reviews);
        resturants.push(resturant);
    }
    return { success: true, model: resturants };
}

async function insertReview(review) {
    if (isValidReview(review)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (review.equals(item)) {
                    return { success: true, 
                                message: "Review already in Database", 
                                model: new Review(review.id, review.title, review.text, review.rating, review.resturant, review.user) 
                    };
            }
        }

        await container.items.create(review);
        return { success: true, 
            message: "Created review in Database", 
            model: new Review(review.id, review.title, review.text, review.rating, review.resturant, review.user) 
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
                return { success: true, 
                            message: "Deleted Review from Database", 
                            model: new Review(review.id, review.title, review.text, review.rating, review.resturant, review.user)
                };
            } 
        }

        return { success: true, 
                    message: "Could not find Review in Database", 
                    model: new Review(resturant.id, resturant.name, resturant.menu, resturant.owner, resturant.reviews) 
        };
    }

    return { success: false, 
                message: "Invalid Review", 
                model: undefined 
    };
}

async function deleteAllReviews() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

main().catch(err => console.error(err));

export { insertReview, findAllReviews, deleteAllReviews, deleteReview }
