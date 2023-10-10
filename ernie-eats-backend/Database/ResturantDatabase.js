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
        let resturant = new Resturant(item.id, item.name, item.menu, item.owner, item.reviews);
        resturants.push(resturant);
    }
    return { success: true, model: resturants };
}

async function insertResturant(resturant) {
    if (isValidResturant(resturant)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (resturant.equals(item)) {
                    return { success: true, 
                                message: "Resturant already in Database", 
                                model: new Resturant(resturant.id, resturant.name, resturant.menu, resturant.owner, resturant.reviews) 
                    };
            }
        }

        await container.items.create(resturant);
        return { success: true, 
            message: "Created resturant in Database", 
            model: new Resturant(resturant.id, resturant.name, resturant.menu, resturant.owner, resturant.reviews) 
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
                return { success: true, 
                            message: "Deleted Resturant from Database", 
                            model: new Resturant(resturant.id, resturant.name, resturant.menu, resturant.owner, resturant.reviews) 
                };
            } 
        }

        return { success: true, 
                    message: "Could not find Resturant in Database", 
                    model: new Resturant(resturant.id, resturant.name, resturant.menu, resturant.owner, resturant.reviews) 
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

main().catch(err => console.error(err));

export { insertResturant, findAllResturants, deleteResturant, deleteAllResturants }
