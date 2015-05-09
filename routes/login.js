var express = require('express');
var rdb = require('../lib/rethink');
var auth = require('../lib/auth');
var token = require('../lib/token');

var router = express.Router();

router.post('/', function (request, response, next) {
    rdb.findBy('users', 'email', request.body.email)
    .then(function (user) {
        user = user[0];

        if(!user) {
            var userNotFoundError = new Error('User not found');
            userNotFoundError.status = 404;
            return next(userNotFoundError);
        }

        auth.authenticate(request.body.password, user.password)
        .then(function (authenticated) {
            if(authenticated) {
                var currentUser = {
                    name: user.name,
                    email: user.email,
                    token: token.generate(user)
                };

                response.json(currentUser);
            } else {
                var authenticationFailedError = new Error('Authentication failed');
                authenticationFailedError.status = 401;
                return next(authenticationFailedError);
            }
        });
    });
});

module.exports = router;