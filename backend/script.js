//Was to Test whether the Prisma was Working with the Application.
//Creates a Test User.
//To check if it was Working I Ran npx prisma studio.


//Imports the PrismaClient Class, this Allows Access to your Database.
import { PrismaClient } from "@prisma/client";

//Creates a New Prisma Client Instance.
const prisma = new PrismaClient();

//Creates a New User in the Database.
async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@example.com",
        },
    });

    //Logs the New User to Confirm the Insert Worked.
    console.log("Created user:", user);

    //Grabs all Users from the Database.
    const allUsers = await prisma.user.findMany();

    //Logs All Users to Confirm the Database Query Works.
    console.log("All users:", allUsers);
}

//Executes the Main Function and Handles Errors Safely.
main()
    .catch((err) => console.error(err))
    .finally(async () => {
        //Always Disconnects the Prisma when Finished to Close the Database Connection.
        await prisma.$disconnect();
    });
