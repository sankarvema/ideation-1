var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var _ = require('lodash');

var usersDb = require('../schemas/userSchema')
var config = require('../../../config.json');

// Service method definition -- Begin

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

// Service method definition -- Begin

function authenticate(username, password) {
    var deferred = Q.defer();
	
	console.log("user service:" + username + "-" + password);

    usersDb.findOne({ handle: username }, function (err, user) {
        if (err) deferred.reject(err);

        if (user && bcrypt.compareSync(password, user.pwdHash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll(){
    var deferred = Q.defer();

	usersDb.find(function(err, userList){
        console.log(userList);
		if(err) {
            console.log(err);
            deferred.reject(err);
        }
		else
			deferred.resolve(userList);
	});

	return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findOne(
        { handle: userParam.handle },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // handle already exists
                deferred.reject('Username "' + userParam.handle + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        if(userParam.password == null)
            userParam.password = "dummystring";

        // add hashed password to user object
        user.pwdHash = bcrypt.hashSync(userParam.password, 10);

        usersDb.create(
            user,
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                }

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user.handle !== userParam.handle) {
            // username has changed so check if the new username is already taken
            usersDb.findOne(
                { handle: userParam.handle },
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.handle + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstname: userParam.firstname,
            lastname: userParam.lastname,
            handle: userParam.handle,
        };

        // update password if it was entered
        if (userParam.pwdHash) {
            set.hash = bcrypt.hashSync(userParam.pwdHash, 10);
        }

        usersDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    usersDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}
