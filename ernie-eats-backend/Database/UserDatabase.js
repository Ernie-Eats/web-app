// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { User } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "users" }); 

function isValidUser(user) {
    if (user !== undefined &&
        user instanceof User &&
        user.isValidUser()) {
            return true;
    }
    return false;
}

async function findAllUsers() {
    let users = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let user = new User(item.id, item.name, item.username, item.email, item.password);
        users.push(user);
    }
    return { success: true, model: users };
}

async function insertUser(user) {
    if (isValidUser(user)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (user.equals(item)) {
                    return { success: true, 
                                message: "User already in Database", 
                                model: new User(user.id, user.name, user.username, user.email, user.password) 
                    };
            }
        }

        await container.items.create(user);
        return { success: true, 
            message: "Created User in Database", 
            model: new User(user.id, user.name, user.username, user.email, user.password) 
        };
    }
    return { success: false, 
                message: "Invalid User", 
                model: undefined 
    };
}

async function deleteUser(user) {
    if (isValidUser(user)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (user.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                return { success: true, 
                            message: "Deleted User from Database", 
                            model: new User(user.id, user.name, user.username, user.email, user.password) 
                };
            } 
        }

        return { success: true, 
                    message: "Could not find User in Database", 
                    model: new User(user.id, user.name, user.username, user.email, user.password) 
        };
    }

    return { success: false, 
                message: "Invalid User", 
                model: undefined 
    };
}

async function deleteAllUsers() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

export { insertUser, findAllUsers, deleteUser, deleteAllUsers }
