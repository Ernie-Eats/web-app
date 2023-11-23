// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { RestaurantPage } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "restaurantPage" });

function isValidRestaurantPage(restaurantPage) {
    console.log(restaurantPage);
    if (restaurantPage !== undefined &&
        restaurantPage instanceof RestaurantPage &&
        restaurantPage.isValidRestaurantPage()) {
        return true;
    }
    return false;
}

async function findAllRestaurantPages() {
    let pages = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let restaurantPage = new RestaurantPage(item.resturantId, item.photos, item.website, item.posts, item.events);Id, item.photos, item.website, item.posts, item.);
        restaurantPage.setId(item.id);
        pages.push(restaurantPage);
    }
    return { success: true, model: pages };
}

async function insertRestaurantPage(restaurantPage) {
    if (isValidRestaurantPage(restaurantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (restaurantPage.equals(item)) {
                let model = new RestaurantPage(item.resturantId, item.photos, item.website, item.posts, item.events);, item.photos);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Restuant Page already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(restaurantPage);
        let model = new RestaurantPage(item.resturantId, item.photos, item.website, item.posts, item.events);, item.photos);
        model.setId(item.id);
        return {
            success: true,
            message: "Created Restuarant Page in Database",
            model: model
        };
    }
    return {
        success: false,
        message: "Invalid Restuarant Page",
        model: RestaurantPage.NULL
    };
}

async function updateRestaurantPage(restuarantPage) {
    if (isValidUser(restuarantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (restuarantPage.equals(i)) {
                const { item } = await container.item(i.id).replace(restuarantPage);
                let model = new RestaurantPage(item.resturantId, item.photos, item.website, item.posts, item.events);
                model.setId(item.id);
                return { success: true, model: model };
            }
        }
    }
    return { success: false, model: RestaurantPage.NULL };
}

async function deleteRestuarantPage(restaurantPage) {
    if (isValidRestaurantPage(restaurantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (restaurantPage.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new RestaurantPage(item.resturantId, item.photos, item.website, item.posts, item.events);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Deleted Restaurant Page from Database",
                    model: model
                };
            }
        }

        let model = new RestaurantPage(restaurantPage.restaurant, restaurantPage.photos, restaurantPage.website, restaurantPage.posts, restaurantPage.events);
        model.setId(restaurantPage.id);
        return {
            success: true,
            message: "Could not find Restaurant Page in Database",
            model: model
        };
    }

    return {
        success: false,
        message: "Invalid Restaurant Page",
        model: RestaurantPage.NULL
    };
}

export { deleteRestuarantPage, findAllRestaurantPages, insertRestaurantPage, updateRestaurantPage }