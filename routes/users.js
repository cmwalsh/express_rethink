var express = require('express');
var rdb = require('../lib/rethink');
var auth = require('../lib/auth');
var router = express.Router();

router.get('/', auth.authorize, function (request, response) {
    rdb.findAll('users')
    .then(function (users) {
        response.json(users);
    });
});

router.get('/:id', auth.authorize, function (request, response, next) {
    rdb.find('users', request.params.id)
    .then(function (user) {
        if(!user) {
            var notFoundError = new Error('User not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }

        response.json(user);
    });
});

router.post('/', auth.authorize, function (request, response) {
    auth.hash_password(request.body.password)
    .then(function (hash) {
        var newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hash
        };

        rdb.save('users', newUser)
        .then(function (result) {
            response.json(result);
        });
    });
});

router.put('/:id', auth.authorize, function (request, response) {
    rdb.find('users', request.params.id)
    .then(function (user) {
        var updateUser = {
            name: request.body.user || user.name,
            email: request.body.email || user.email
        };

        rdb.edit('user', user.id, updateUser)
        .then(function (results) {
            response.json(results);
        });
    });
});

router.delete('/:id', auth.authorize, function (request, response) {
    rdb.destroy('users', request.params.id)
    .then(function (results) {
        response.json(results);
    });
});

module.exports = router;
