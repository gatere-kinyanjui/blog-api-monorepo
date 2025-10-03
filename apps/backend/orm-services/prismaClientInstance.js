import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
const prismaClientInstance = new PrismaClient();
// { log: ["query"] } - uncomment to enable query logging
// const prisma = new PrismaClient({ log: ["query"] });

export default prismaClientInstance;
