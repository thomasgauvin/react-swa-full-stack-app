const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const database = client.database("SWAStore");
    const container = database.container("Items");

    if(req.method === "GET" && req.params.id){ //return single item
        try {
            const itemId = req.params.id;
            console.log(itemId);
            const { resource } = await container.item(itemId, itemId).read();
            context.res = {
                status: 200,
                body: resource
            };
        }
        catch (error) {
            context.res = {
                status: 500,
                body: `Error retrieving item from the database: ${error.message}`
            };
        }
    }
    else if(req.method === "GET"){ //return all items
        try {
            const { resources } = await container.items.readAll().fetchAll();
            context.res = {
                status: 200,
                body: resources
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error retrieving items from the database: ${error.message}`
            };
        }
    } else if(req.method === "POST"){ //create new item in the database
        try {
            const newItem = req.body;
            const { resource: createdItem } = await container.items.create(newItem);
            context.res = {
                status: 201,
                body: createdItem
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error creating item in the database: ${error.message}`
            };
        }
    } else if (req.method === "PUT") {
        try {
            const itemId = req.params.id;
            const updatedItem = req.body;
            const { resource: replacedItem } = await container.item(itemId, itemId).replace(updatedItem);
            context.res = {
                status: 200,
                body: replacedItem
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error updating item in the database: ${error.message}`
            };
        }
    } else if (req.method === "DELETE") {
        try {
            const itemId = req.params.id;
            await container.item(itemId, itemId).delete();
            context.res = {
                status: 204
            };
        } catch (error) {
            console.log(error);
            context.res = {
                status: 500,
                body: `Error deleting item from the database: ${error.message}`
            };
        }
    } else {
        context.res = {
            status: 405,
            body: "Method Not Allowed"
        };
    }
}