// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { ResturantPage } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "resturantPage" });

function isValidResturantPage(resturantPage) {
    console.log(resturantPage);
    if (resturantPage !== undefined &&
        resturantPage instanceof ResturantPage &&
        resturantPage.isValidResturantPage()) {
        return true;
    }
    return false;
}

async function findAllResturantPages() {
    let pages = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let resturantPage = new ResturantPage(item.resturant, item.photos);
        resturantPage.setId(item.id);
        pages.push(resturantPage);
    }
    return { success: true, model: pages };
}

async function insertResturantPage(resturantPage) {
    if (isValidResturantPage(resturantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (resturantPage.equals(item)) {
                let model = new ResturantPage(item.resturant, item.photos);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Restuant Page already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(resturantPage);
        let model = new ResturantPage(item.resturant, item.photos);
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
            if (restuarantPage.equals(i)) {
                const { item } = await container.item(i.id).replace(restuarantPage);
                let model = new ResturantPage(item.resturant, item.photos);
                model.setId(item.id);
                return { success: true, model: model };
            }
        }
    }
    return { success: false, model: undefined };
}

async function deleteRestuarantPage(resturantPage) {
    if (isValidResturantPage(resturantPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (resturantPage.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new ResturantPage(item.resturant, item.photos);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Deleted Resturant Page from Database",
                    model: model
                };
            }
        }

        let model = new ResturantPage(resturantPage.resturant, resturantPage.photos);
        model.setId(resturantPage.id);
        return {
            success: true,
            message: "Could not find Resturant Page in Database",
            model: model
        };
    }

    return {
        success: false,
        message: "Invalid Resturant Page",
        model: undefined
    };
}

export { deleteRestuarantPage, findAllResturantPages, insertResturantPage, updateResturantPage }