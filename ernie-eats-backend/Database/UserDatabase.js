// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm
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
        let user = new User(item.name, item.username, item.email, item.password, item.isBusiness, item.restaurantId, item.address);
        user.setId(item.id);
        users.push(user);
    }
    return { success: true, model: users };
}

async function insertUser(user) {
    if (isValidUser(user)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (user.equals(item)) {
                
                let model = new User(item.name, item.username, item.email, item.password, item.isBusiness, item.restaurantId, item.address);
                return { success: true, 
                    message: "User already in Database", 
                    model: model
                };
            }
        }

        const { item } = await container.items.create(user);
        let model = new User(user.name, user.username, user.email, user.password, user.isBusiness, user.restaurantId, user.address);
        model.setId(item.id);

        return { success: true, 
            message: "Created User in Database", 
            model: model
        };
    }
    return { success: false, 
                message: "Invalid User", 
                model: User.NULL 
    };
}

async function updateUser(user) {
    if (isValidUser(user)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (user.id === i.id) {
                const { item } = await container.item(i.id).replace(user);
                let model = new User(user.name, user.username, user.email, user.password, user.isBusinessOwner, user.restaurantId, user.address);
                model.setId(user.id);
                return { success: true, model: model};
            }
        }
    }
    return { success: false, model: User.NULL };
}

async function deleteUser(user) {
    if (isValidUser(user)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (user.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new User(user.name, user.username, user.email, user.password, user.isBusiness, user.restaurantId, user.address);
                model.setId(user.id);
                return { success: true, 
                            message: "Deleted User from Database", 
                            model: model
                };
            } 
        }
      
        let model = new User(user.name, user.username, user.email, user.password, user.isBusiness, user.restaurantId, user.address);
        model.setId(user.id);
        return { success: true, 
                    message: "Could not find User in Database", 
                    model: model 
        };
    }

    return { success: false, 
                message: "Invalid User", 
                model: User.NULL 
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

async function findUserByAddress(address) {
    let result = { success: false, model: User.NULL }
    await findAllUsers().then(users => {
        if (users.success) { 
            const found = users.model.find(value => value.address === address);
            if (found !== undefined) {
                const model = new User(found.name, found.username, found.email, found.password, found.isBusiness, found.restaurantId, found.address);
                model.setId(found.id);
                result = { success: true, model: model };
            }
        }
    });
    return result;
}

async function findUserByUsernamePassword(username, password) {
    let returnObject = { success: false, model: User.NULL };

    await findAllUsers().then(result => {
        if (result.success) {
            const found = result.model.find((user) => user.username === username && user.password === password);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

async function findUserByUsername(username) {
    let returnObject = { success: false, model: User.NULL };
    await findAllUsers().then(result => {
        if (result.success) {
            const found = result.model.find((user) => user.username === username);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

async function findUserById(id) {
    let returnObject = { success: false, model: User.NULL };
    await findAllUsers().then(result => {
        if (result.success) {
            const found = result.model.find((user) => user.id === id);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

async function findUserByName(name) {
    let returnObject = { success: false, model: User.NULL };
    await findAllUsers().then(result => {
        if (result.success) {
            const found = result.model.find((user) => user.name === name);
            if (found !== undefined) {
                returnObject = { success: true, model: found };
            }
        }
    });
    return returnObject;
}

export { insertUser, findAllUsers, deleteUser, deleteAllUsers, findUserByUsernamePassword, findUserByUsername, updateUser, findUserByAddress, findUserById, findUserByName }