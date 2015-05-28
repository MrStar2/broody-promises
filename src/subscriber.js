var utils   = require("./utils"),

    resolve = utils.resolve,
    reject  = utils.reject,
    noop    = utils.noop,

    Subscriber;

Subscriber = function(resolve, reject, promise) {
    this._resolve = resolve;
    this._reject  = reject;

    this.promise = promise;
};

Subscriber.prototype = {
    constructor: Subscriber,

    _notify: function(action, error, val) {
        var response, err, strategy, value;

        strategy = error ? reject : resolve;
        value    = error ? error  : val;

        if (!utils.isFunction(action)) {
            strategy(this.promise)(value);
            return;
        }

        try {
            response = action.call(null, value);
        } catch(_err) {
            reject(this.promise)(_err);
            return;
        }

        if (response && response.then && utils.isFunction(response.then)) {
            response.then(resolve(this.promise), reject(this.promise));
        } else {
            resolve(this.promise)(response);
        }
    },

    resolve: function(value) {
        this._notify(this._resolve, null, value);
    },

    reject: function(error) {
        this._notify(this._reject, error);
    }
};


module.exports = Subscriber;