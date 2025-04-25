const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");
console.log(secret); // Outputs something like: "a3b9c8f7e2d4..."
