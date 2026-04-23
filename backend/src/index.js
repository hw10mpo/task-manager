//Loads Environment Variables from the .env file into process .env.
import dotenv from 'dotenv';

//Imports the Express Application Instance Defined in app.js
import app from './app.js';

//Initialise Environment Variables.
dotenv.config();

//Determines which PORT the Server Runs on.
//If Available Uses the PORT from .env if not Defaults to 5000.
const PORT = process.env.PORT || 5000;

//Starts the Express Server and Listens for Oncoming HTTP Requests.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

