# Express API example with RethinkDB

This example demonstrates how to use RethinkDB with an Express JS application. I primarily use Express to build API's so that's what you have here. The API is secured using JSON Web Tokens.

# Setup

Make sure you have RethinkDB installed on your system by following the instructions found here http://rethinkdb.com/docs/install/. Then modify the `database.js` file found in the config directory to your needs. You will need to make sure the database and the users table exists.

In your terminal, change to the directory where you have cloned to repo and run `npm install` to install the dependencies, and `npm start` to start the application.

# What's included?

Here is a list of npm modules I'm using:

* `express` - The application server
* `body-parser` - To parse JSON
* `morgan` - To log activity
* `cors` - To allow requests from other domains
* `helmet` - For a bit of extra security
* `jwt-simple` - To issue access tokens
* `moment` - A date manipulation library
* `bcrypt` - To hash users passwords
* and of course `rethinkdb` - Our database of choice!
