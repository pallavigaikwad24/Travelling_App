const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NodeJs API Project for Travelling App",
            version: "1.0.0",
            description: "API documentation for your Node.js application",
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: [path.resolve(__dirname, "../routes/**/*.js")],
};

module.exports = options;