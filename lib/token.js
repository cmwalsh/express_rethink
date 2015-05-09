var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.TOKEN_SECRET;

module.exports.generate = function (user) {
    var expires = moment().add(7, 'days').valueOf();
    return jwt.encode({ iss: user.email, exp: expires }, secret);
};

module.exports.verify = function (token, next) {
    if(!token) {
        var notFoundError = new Error('Token not found');
        notFoundError.status = 404;
        return next(notFoundError);
    }

    if(jwt.decode(token, secret) <= moment().format('x')) {
        var expiredError = new Error('Token has expired');
        expiredError.status = 401;
        return next(expiredError);
    }
};
