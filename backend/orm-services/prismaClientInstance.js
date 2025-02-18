const PrismaClient = require("@prisma/client");

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
export const prismaClientInstance = new PrismaClient();
// { log: ["query"] }
