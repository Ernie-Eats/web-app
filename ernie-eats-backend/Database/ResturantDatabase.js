// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { Restaurant } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "restaurants" }); 

function isValidResturant(restaurant) {
    if (restaurant !== undefined &&
        restaurant instanceof Restaurant &&
        restaurant.isValidResturant()) {
            return true;
    }
    return false;
}

async function findAllResturants() {
    let restaurants = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let resturant = new Restaurant(item.name, item.menu, item.ownerId, item.keywords);
        resturant.id = item.id
        resturants.push(resturant);
    }
    return { success: true, model: restaurants };
}

async function insertResturant(restaurant) {
    if (isValidResturant(restaurant)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (resturant.equals(item)) {
                let model = new Restaurant(item.name, item.menu, item.ownerId, item.keywords);
                model.id = item.id
                return {
                    success: true,
                    message: "Restaurant already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(resturant);
        let model = new Resturant(item.name, item.menu, item.ownerId, item.keywords);
        model.id = item.id
        return { success: true, 
            message: "Created restaurant in Database", 
            model: model
        };
    }
    return { success: false, 
                message: "Invalid Restaurant", 
                model: undefined 
    };
}

async function deleteResturant(restaurant) {
    if (isValidResturant(restaurant)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (restaurant.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new Restaurant(item.name, item.menu, item.ownerId, item.keywords);
                model.id = item.id
                return { success: true, 
                            message: "Deleted Restaurant from Database", 
                            model: model 
                };
            } 
        }

        let model = new Restaurant(restaurant.name, restaurant.menu, restaurant.ownerId, restaurant.keywords);
        model.id = restaurant.id
        return { success: true, 
                    message: "Could not find Restaurant in Database", 
                    model: model 
        };
    }

    return { success: false, 
                message: "Invalid Restaurant", 
                model: undefined 
    };
}

async function findResturantByOwnerId(id) {
    let returnObject = { success: false, model: undefined };
    await findAllResturants().then(result => {
        if (result.success) {
            console.log(result.model);
            const found = result.model.find((restaurant) => restaurant.ownerId === id);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

async function deleteAllResturants() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

export { insertResturant, findAllResturants, findResturantByOwnerId, deleteResturant, deleteAllResturants }
