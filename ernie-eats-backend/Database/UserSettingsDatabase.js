// https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm @azure/cosmos
import { CosmosClient } from "https://cdn.jsdelivr.net/npm/@azure/cosmos@4.0.0/+esm";
import { UserSettings } from './models.js';

const endpoint = "https://ernie-eats-nosql-database.documents.azure.com:443/";
const key = "jWWm092N6SwaFUQVY9zRuearTtupAn9tDcR7r3tIXe2cob9LWbXHogSqSt0KVYsVCpEFLrMY3zaAACDbEwyEbQ==";
const client = new CosmosClient({ endpoint, key });
const { database } = await client.databases.createIfNotExists({ id: "Ernie-Eats" });
const { container } = await database.containers.createIfNotExists({ id: "userPage" });

function isValidUserSettingsPage(userSettings) {
    if (userSettings !== undefined &&
        userSettings instanceof UserSettings &&
        userSettings.isValidUserPage()) {
        return true;
    }
    return false;
}

async function findAllUserPages() {
    let pages = [];
    const { resources } = await container.items.readAll().fetchAll();
    for (const item of resources) {
        let userPage = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
        userPage.setId(item.id);
        pages.push(userPage);
    }
    return { success: true, model: pages };
}

async function insertUserPage(userPage) {
    if (isValidUserSettingsPage(userPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const item of resources) {
            if (userPage.equals(item)) {
                let model = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
                model.setId(item.id);
                return {
                    success: true,
                    message: "User Page already in Database",
                    model: model
                };
            }
        }

        const { item } = await container.items.create(userPage);
        let model = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
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

async function updateUserPage(userPage) {
    if (isValidUserSettingsPage(userPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (userPage.id === i.id) {
                const { item } = await container.item(i.id).replace(userPage);
                let model = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
                model.setId(item.id);
                return { success: true, model: model };
            }
        }
    }
    return { success: false, model: undefined };
}

async function deleteUserPage(userPage) {
    if (isValidUserSettingsPage(userPage)) {
        const { resources } = await container.items.readAll().fetchAll();
        for (const i of resources) {
            if (userPage.equals(i)) {
                const { item } = await container.item(i.id).read();
                await item.delete();
                let model = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
                model.setId(item.id);
                return {
                    success: true,
                    message: "Deleted Resturant Page from Database",
                    model: model
                };
            }
        }

        let model = new UserSettings(item.userId, item.bio, item.isDarkTheme, item.banner, item.profile);
        model.setId(userPage.id);
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

export { deleteUserPage, findAllUserPages, insertUserPage, updateUserPage }