var _ = require("lodash");

module.exports = {
    resolve: function(promise) {
        return function(value) {
            if (!_.isNull(promise._state)) {
                throw new Error("Can not resolve fullfilled promise");
            }

            promise._state = true;
            promise._value = value;

            _.forEach(promise._subscribers, function(subscriber) {
                subscriber.resolve(value);
            });
        }
    },

    reject: function(promise) {
        return function(error) {
            if (!_.isNull(promise._state)) {
                throw new Error("Can not reject fullfilled promise");
            }

            promise._state = false;
            promise._error = error;

            _.forEach(promise._subscribers, function(subscriber) {
                subscriber.reject(error);
            });
        }
    },

    noop: function(){}
}