const { createClient } = require("redis");

const client = createClient({
    password: process.env.password,
    socket: {
        host: process.env.host,
        port: 14455
    }
});

(async () => {
    client.on("error", (err) => console.error("Redis connection error:", err));
    client.on("connect", () => console.log("Connected to Redis!"));
    await client.connect();
})();

module.exports = client;
