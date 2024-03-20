# React full-stack web application on Azure Static Web Apps

This is a demo React full-stack web application that uses Azure Functions to provide a REST API. The application is deployed to a single Azure Static Web Apps resource, and makes use of Static Web Apps' Functions integration to host the Azure Functions API.

## Local development

To get started with local development, first install the dependencies:
    
    ```bash
    npm install -g @azure/static-web-apps-cli

    npm install
    cd api
    npm install
    ```

Now, from the root of the project, run the following command to start the application:

    ```bash
    swa start http://localhost:5173 --run "npm run dev" --api-location ./api
    ```

Access the application at [http://localhost:4280](http://localhost:4280).

## Deployment

To deploy to Azure Static Web Apps, create a Static Web Apps resource from the Azure Portal. Specify '/' as the app location, 'api' as the API location, and 'dist' as the output location.

Set the following environment variables in the Static Web Apps resource from the Azure Portal:

"COSMOSDB_KEY": "<ENTER COSMOS DB KEY>",
"COSMOSDB_ENDPOINT": "<ENTER COSMOS DB ENDPOINT>",