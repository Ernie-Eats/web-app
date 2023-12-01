// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { Event } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "events" });

function isValidEvent(event) {
    if (event !== undefined &&
        event instanceof Event &&
        event.isValidEvent()) {
        return true;
    }
    return false;
}

async function findAllEvents() {
    let events = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let event = new Event(item.title, item.description, item.dateTime, item.restaurantId);
        event.id = item.id
        events.push(event);
    }
    return { success: true, model: events };
}

async function insertEvent(event) {
    if (isValidEvent(event)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (event.equals(item)) {
                let model = new Event(item.title, item.description, item.dateTime, item.restaurantId);
                model.id = item.id
                return {
                    success: true,
                    message: "Event already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(event);
        let model = new Event(item.title, item.description, item.dateTime, item.restaurantId);
        model.id = item.id
        return {
            success: true,
            message: "Created event in Database",
            model: model
        };
    }
    return {
        success: false,
        message: "Invalid Event",
        model: undefined
    };
}

async function deleteEvent(event) {
    if (isValidEvent(event)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (event.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new Event(item.title, item.description, item.dateTime, item.restaurantId);
                model.id = item.id
                return {
                    success: true,
                    message: "Deleted Event from Database",
                    model: model
                };
            }
        }

        let model = new Event(event.title, event.description, event.dateTime, event.restaurantId);
        model.id = event.id
        return {
            success: true,
            message: "Could not find Event in Database",
            model: model
        };
    }

    return {
        success: false,
        message: "Invalid Event",
        model: undefined
    };
}

async function deleteAllEvents() {
    const { resources } = await container.items.readAll().fetchAll();
    for (const i of resources) {
        const { item } = await container.item(i.id).read();
        await item.delete();
    }
    return true;
}

export { insertEvent, findAllEvents, deleteEvent, deleteAllEvents }
