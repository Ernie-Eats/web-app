// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { RestaurantPage } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "restaurantPage" });

function isValidResturantPage(restaurantPage) {
    console.log(restaurantPage);
    if (restaurantPage !== undefined &&
        restaurantPage instanceof RestaurantPage &&
        restaurantPage.isValidResturantPage()) {
        return true;
    }
    return false;
}

async function findAllResturantPages() {
    let pages = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let restaurantPage = new RestaurantPage(item.restaurantId, item.email, item.website, item.hours, item.address, item.contact, item.description, item.banner, item.photos);
        restaurantPage.setId(item.id);
        pages.push(restaurantPage);
    }
    return { success: true, model: pages };
}

async function insertResturantPage(restaurantPage) {
    if (isValidResturantPage(restaurantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (restaurantPage.equals(item)) {
                let model = new RestaurantPage(item.restaurantId, item.email, item.website, item.hours, item.address, item.contact, item.description, item.banner, item.photos);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Restuant Page already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(restaurantPage);
        let model = new RestaurantPage(item.restaurantId, item.email, item.website, item.hours, item.address, item.contact, item.description, item.banner, item.photos);
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
        model: undefined
    };
}

async function updateResturantPage(restuarantPage) {
    if (isValidUser(restuarantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (restuarantPage.id === i.id) {
                const { item } = await container.item(i.id).replace(restuarantPage);
                let model = new RestaurantPage(item.restaurantId, item.email, item.website, item.hours, item.address, item.contact, item.description, item.banner, item.photos);
                model.setId(item.id);
                return { success: true, model: model };
            }
        }
    }
    return { success: false, model: undefined };
}

async function deleteRestuarantPage(restaurantPage) {
    if (isValidResturantPage(restaurantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (restaurantPage.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new RestaurantPage(item.restaurantId, item.email, item.website, item.hours, item.address, item.contact, item.description, item.banner, item.photos);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Deleted Restaurant Page from Database",
                    model: model
                };
            }
        }

        let model = new RestaurantPage(restaurantPage.restaurantId, restaurantPage.email, restaurantPage.website, restaurantPage.hours, restaurantPage.address, restaurantPage.contact, restaurantPage.description, restaurantPage.banner, restaurantPage.photos);
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
        model: undefined
    };
}

async function findResturantPageByResturantId(id) {
    let returnObject = { success: false, model: undefined };
    await findAllResturantPages().then(result => {
        if (result.success) {
            const found = result.model.find((page) => page.restaurantId === id);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

export { deleteRestuarantPage, findAllResturantPages, findResturantPageByResturantId, insertResturantPage, updateResturantPage }