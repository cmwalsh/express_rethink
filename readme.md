## Express API example with RethinkDB

This example demonstrates how to use RethinkDB with an Express JS application. It is an API style application that is secured using JSON web tokens. When a user logs in, they are issued a token. The client then attaches the token to every request to gain access to the protected resources.

### Setup

Make sure you have RethinkDB installed on your system by following the instructions found in the [RethinkDB documentation](http://rethinkdb.com/docs/install/).

In the root directory of the application create a hidden file called `.env` and add the following information:

~~~
DB_HOST=localhost
DB_PORT=28015
DB_NAME=express_example
TOKEN_SECRET=mysupersecretstring
~~~

You will need to modify the above to your needs. If you need more information about how it works, please refer to the [dotenv documentation](https://www.npmjs.com/package/dotenv) and take particular note of the FAQ section.

### What's included?

Here is a list of npm modules I'm using:

* `express` - The application server
* `dotenv` - To configure the application
* `body-parser` - To parse JSON
* `morgan` - To log activity
* `cors` - To allow requests from other domains
* `helmet` - For a bit of extra security
* `jwt-simple` - To issue access tokens
* `moment` - A date manipulation library
* `bcrypt` - To hash users passwords
* and of course `rethinkdb` - our database of choice!
