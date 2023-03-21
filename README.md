# How to run this app

## Install dependences (1)

Before you run this project, you will need to install dependencies with

### `npm install`

Write this command in your terminal while in the code directory

### Add environment variables (2)

Add a `.env` file and in it put two environment variable
`REACT_APP_API_BASE_URL="http://www.omdbapi.com"`
`REACT_APP_MOVIES_CLIENT_KEY={key}`
The second is a secret API key you can get from the site `http://www.omdbapi.com`

## Running the application locally (3)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
