# broody-[promises](http://promises-aplus.github.io/promises-spec/)

> Broody implementation of [Promises/A+](http://promises-aplus.github.io/promises-spec/).

## Whats up?

Broody promises is a minimalistic implementation of Promises/A+, with ability to retreive fullfilled value.
Of course, it is possible to do that **just** when all chain of *thens* and *catchs* are resolved synchronous.
In other way usage of Broodies did not make any sense to you, because it has no any preferences over already existing and great Promises/A+ libraries.

## Getting started

Install with [npm](https://npmjs.org/package/broody-promises)

```
npm install --save broody-promises
```

## Overview

```js
	
	var promise, chain;

	promise = new Promise(function(resolve, reject) {
		// resolve now synchronous
		resolve("my value");
	});

	chain = promise
		.then(function(value) {
			// again synchronous
			return value + "!";
		});

	chain.brood(); // "my value!";

```

## API

### new Promise(resolver, [options])

#### resolver

Type: `Function`

The resolver function. Retreives two arguments - `resolve` and `reject`, that are functions with one argument - `value` and `error` respectively.

#### options

Type: `Object`

Then options object.

### then(onResolve, onReject)

#### onResolve

Type: `Function`

Resolve callack.

#### onReject

Type: `Function`

Reject callack.

### catch(onReject)

#### onReject

Type: `Function`

Reject callack.

### finally(anyWay)

#### anyWay

Type: `Function`

Resolve/reject callack. Called with `(error, value)` signature.

### Promise.all(promises)

#### promises

Type: `Array`

List of Promises;

### Promise.resolve(value)

#### value

Type: `*`

Return new resolved Promise.

### Promise.reject(err)

#### err

Type: `Error`

Return new rejected Promise.



