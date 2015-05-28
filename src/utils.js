function toStringType(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s([a-zA-Z]+)\]/, "$1");
}

exports.isArray = function(obj) {
    return toStringType(obj) === "Array";
};

exports.isObject = function(obj) {
    return toStringType(obj) === "Object";
};

exports.isFunction = function(obj) {
    return toStringType(obj) === "Function";
};

exports.isNull = function(obj) {
    return toStringType(obj) === "Null";
};

exports.isBoolean = function(obj) {
    return toStringType(obj) === "Boolean";
};

exports.noop = function() {};

exports.forEach = function(obj, iterator, context) {
    var len, i;

    if (!exports.isArray(obj)) {
        throw new TypeError("Only Array");
    }

    len = obj.length;
    for (i = 0; i < len; i++) {
        iterator.call(context, obj[i], i, obj);
    }
};

exports.extend = function(target) {
    var args, len, i, prop, source;

    if ( (len = arguments.length) < 2 || target == null ) {
        return target;
    }

    args = Array.prototype.slice.call(arguments, 1);
    len-= 1;

    for (i = 0; i < len; i++) {
        source = args[i];

        for (prop in source) if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
        }
    }

    return target;
};