//Imports the PrismaClient Class, Providing All Access to the database models
//Defined in schema.prisma.
import { PrismaClient } from '@prisma/client';

//Creates a Single Shared Prisma Client Instance.
//Best Practice Because:
//It Avoids Opening Multiple Database Connections.
//It Allows All Controllers and Routes to Reuse the Same Instance.
const prisma = new PrismaClient();

//Exports the Prisma Client so it can be Used Throughout the backend.
export default prisma;