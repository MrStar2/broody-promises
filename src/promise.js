var _          = require("lodash"),
	Subscriber = require("./subscriber"),
	utils      = require("./utils"),

	resolve = utils.resolve,
	reject  = utils.reject,
	noop    = utils.noop,

    Promise;

Promise = function(resolver, options) {
	var self = this;

	if (!(this instanceof Promise)) {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    if (!_.isFunction(resolver)) {
    	throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    this.options = _.extend({}, this.constructor.DEFAULTS, options || {});

    this._subscribers = [];

    this._state = null;
    this._value = null;
    this._error = null;

    resolver(resolve(this), reject(this));
};

Promise.DEFAULTS = {};

Promise.prototype = {
    constructor: Promise,

    "then": function(onResolve, onReject) {
    	var subscriber;

    	this._subscribers.push((subscriber = new Subscriber(onResolve, onReject, new Promise(noop))));

    	// if promise is fullfilled already
    	if (!_.isNull(this._state)) {
    		this._state ? subscriber.resolve(this._value) : subscriber.reject(this._error);
    	}

    	return subscriber.promise;
    },

    "finally": function(onAnyWay) {
    	return this.then(function(value) {
    		onAnyWay(null, value);
    	}, function(err) {
    		onAnyWay(err);
    	});
    },

    "catch": function(onReject) {
    	return this.then(null, onReject);
    },

    "done": function() {
    	if (!this._state) {
    		throw new Erorr("Can not retreive value from not fullfilled promise");
    	}

    	return this._value;
    }
};

Promise.all = function(promises, strict) {
	return new Promise(function(resolve, reject) {
		var i, len, results, remaining, rejected;
		
		len       = promises.length;
		remaining = len;
		rejected  = false;

		if (!_.isArray(promises)) {
			throw new TypeError("Array is expected");
		};

		results = new Array(len);

		for (i = 0; i < len; i++) {
			promises[i]
				.then(function(value) {
					return results[i] = value;
				})
				.catch(function(error) {
					if (strict && !rejected) {
						reject(error);
						rejected = true;
					}
				})
				.finally(function(error, value) {
					remaining--;

					if (remaining === 0 && !rejected) {
						resolve(results);
					}
				});
		}
	
	});
}

Promise.resolve = function(value) {
	return new Promise(function(resolve) {
		resolve(value);
	});
}

Promise.reject = function(err) {
	return new Promise(function(resolve, reject) {
		reject(err);
	});
}

module.exports = Promise;