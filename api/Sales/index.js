const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const database = client.database("SWAStore");
    const container = database.container("Sales");

    if (req.method === "GET" && req.params.id) { // Return single sale
        try {
            const saleId = req.params.id;
            const { resource } = await container.item(saleId, saleId).read();
            context.res = {
                status: 200,
                body: resource
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error retrieving sale from the database: ${error.message}`
            };
        }
    // Uncomment mutations to have CRUD access, leaving READ access only for demo purposes
    // } else if (req.method === "GET") { // Return all sales
    //     try {
    //         const { resources } = await container.items.readAll().fetchAll();
    //         context.res = {
    //             status: 200,
    //             body: resources
    //         };
    //     } catch (error) {
    //         context.res = {
    //             status: 500,
    //             body: `Error retrieving sales from the database: ${error.message}`
    //         };
    //     }
    // } else if (req.method === "POST") { // Create new sale
    //     try {
    //         const newSale = req.body;
    //         const { resource: createdSale } = await container.items.create(newSale);
    //         context.res = {
    //             status: 201,
    //             body: createdSale
    //         };
    //     } catch (error) {
    //         context.res = {
    //             status: 500,
    //             body: `Error creating sale in the database: ${error.message}`
    //         };
    //     }
    // } else if (req.method === "PUT") { // Update sale
    //     try {
    //         const saleId = req.params.id;
    //         const updatedSale = req.body;
    //         const { resource: replacedSale } = await container.item(saleId, saleId).replace(updatedSale);
    //         context.res = {
    //             status: 200,
    //             body: replacedSale
    //         };
    //     } catch (error) {
    //         context.res = {
    //             status: 500,
    //             body: `Error updating sale in the database: ${error.message}`
    //         };
    //     }
    // } else if (req.method === "DELETE") { // Delete sale
    //     try {
    //         const saleId = req.params.id;
    //         await container.item(saleId, saleId).delete();
    //         context.res = {
    //             status: 204
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         context.res = {
    //             status: 500,
    //             body: `Error deleting sale from the database: ${error.message}`
    //         };
    //     }
    } else {
        context.res = {
            status: 405,
            body: "Method Not Allowed"
        };
    }
}
