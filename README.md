# goodbits_oauth2

## Requirements

- [Node.js](https://nodejs.org/en/) (v14.17 or higher)
- [NPM](https://www.npmjs.com/) (v6.14.5 or higher)

## Installation

1. Install the [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) packages.

2. Run the following command to install the dependencies:

   ```
   npm install
   ```

3. Run the following command in the project directory to create .env file:

   ```
   cp .env.example .env
   ```

4. Run the following command to start the server:

   ```
   npm start
   ```

   Or, run the following command to start the server in development mode:

   ```
   npm run dev
   ```

5. Open the browser and go to http://localhost:4444/api/docs to see the API documentation.

6. API Call Sequence:
   1. Call `/api/v1/auth/google/url` to get the authorization request url. Copy and execute the resulting url in a new tab
   2. After authorization the user will be redirected to `/api/v1/auth/google` where a json response will be returned.
   3. Copy the json response from previous step and make the POST request to `api/v1/auth/google/me` with the copied json data in the body to get the user's details.
