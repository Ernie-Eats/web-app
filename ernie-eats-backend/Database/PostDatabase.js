// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { Post } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "posts" });

function isValidPost(post) {
    if (post !== undefined &&
        post instanceof Post &&
        post.isValidPost()) {
        return true;
    }
    return false;
}

async function findAllPosts() {
    let posts = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let post = new Post(item.title, item.description, item.restaurantId);
        post.id = item.id
        posts.push(post);
    }
    return { success: true, model: posts };
}

async function insertPost(post) {
    if (isValidPost(post)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (post.equals(item)) {
                let model = new Post(item.title, item.description, item.restaurantId);
                model.id = item.id
                return {
                    success: true,
                    message: "Post already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(post);
        let model = new Post(item.title, item.description, item.restaurantId);
        model.id = item.id
        return {
            success: true,
            message: "Created post in Database",
            model: model
        };
    }
    return {
        success: false,
        message: "Invalid Post",
        model: undefined
    };
}

async function deletePost(post) {
    if (isValidPost(post)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (post.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new Post(item.title, item.description, item.restaurantId);
                model.id = item.id
                return {
                    success: true,
                    message: "Deleted Post from Database",
                    model: model
                };
            }
        }

        let model = new Post(post.title, post.description, post.restaurantId);
        model.id = post.id
        return {
            success: true,
            message: "Could not find Post in Database",
            model: model
        };
    }

    return {
        success: false,
        message: "Invalid Post",
        model: undefined
    };
}

async function deleteAllPosts() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

export { insertPost, findAllPosts, deletePost, deleteAllPosts }
