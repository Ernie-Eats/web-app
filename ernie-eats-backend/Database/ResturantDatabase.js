// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { Resturant } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "resturants" }); 

function isValidResturant(resturant) {
    if (resturant !== undefined &&
        resturant instanceof Resturant &&
        resturant.isValidResturant()) {
            return true;
    }
    return false;
}

async function findAllResturants() {
    let resturants = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let resturant = new Resturant(item.name, item.menu, item.owner, item.reviews);
        resturant.id = item.id
        resturants.push(resturant);
    }
    return { success: true, model: resturants };
}

async function insertResturant(resturant) {
    if (isValidResturant(resturant)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (resturant.equals(item)) {
                let model = new Resturant(item.name, item.menu, item.owner, item.reviews);
                model.id = item.id
                return {
                    success: true,
                    message: "Resturant already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(resturant);
        let model = new Resturant(item.name, item.menu, item.owner, item.reviews);
        model.id = item.id
        return { success: true, 
            message: "Created resturant in Database", 
            model: model
        };
    }
    return { success: false, 
                message: "Invalid Resturant", 
                model: undefined 
    };
}

async function deleteResturant(resturant) {
    if (isValidResturant(resturant)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (resturant.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new Resturant(item.name, item.menu, item.owner, item.reviews);
                model.id = item.id
                return { success: true, 
                            message: "Deleted Resturant from Database", 
                            model: model 
                };
            } 
        }

        let model = new Resturant(resturant.name, resturant.menu, resturant.owner, resturant.reviews);
        model.id = resturant.id
        return { success: true, 
                    message: "Could not find Resturant in Database", 
                    model: model 
        };
    }

    return { success: false, 
                message: "Invalid Resturant", 
                model: undefined 
    };
}

async function deleteAllResturants() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

export { insertResturant, findAllResturants, deleteResturant, deleteAllResturants }
