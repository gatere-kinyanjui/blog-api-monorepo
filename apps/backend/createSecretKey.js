import { randomBytes } from "crypto";
const secret = randomBytes(32).toString("hex");
console.log(secret); // Outputs something like: "a3b9c8f7e2d4..."
