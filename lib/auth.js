const bcrypt = require('bcrypt');
const token = require('./token');
const Promise = require('bluebird');

const authorize = (request, response, next) => {
    const apiToken = request.headers['x-api-token'];
    token.verify(apiToken, next);
    next();
};

const hash_password = (password) => {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (error, salt) {
            if(error) return reject(error);

            bcrypt.hash(password, salt, function (error, hash) {
                if(error) return reject(error);
                return resolve(hash);
            });
        });
    });
};

const authenticate = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error, response) => {
            if(error) return reject(error);
            return resolve(response);
        });
    });
};

module.exports = {
    authorize,
    hash_password,
    authenticate
};
