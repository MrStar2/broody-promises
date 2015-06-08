# broody-[promises](http://promises-aplus.github.io/promises-spec/)

[![Build Status](https://travis-ci.org/gobwas/broody-promises.svg?branch=master)](https://travis-ci.org/gobwas/broody-promises)

> Broody implementation of [Promises/A+](http://promises-aplus.github.io/promises-spec/).

## Whats up?

<a href="https://promisesaplus.com/">
    <img src="https://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo"
         title="Promises/A+ 1.0 compliant" align="right" />
</a>

Broody promises is a minimalistic lightweight (~1.5KB gzipped) implementation of Promises/A+, with ability to retrieve fulfilled value.
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

	chain.done(); // "my value!";

```

## API

### new Promise(resolver, options)

#### resolver

Type: `Function`

The resolver function. Retreives two arguments - `resolve` and `reject`, that are functions with one argument - `value` and `error` respectively.

#### options

Type: `object`

##### options.sync

Type: `boolean`
Default: `true`

Used to switch behavior of Promise into a sync mode, when `onFullfilled` of `onRejected` callbacks in `then` chains invoked synchronously - this brings ability to use `.value()` method.

> Note, that with `true` value, Broodys will not pass the 2.2.4 rule of the Promises/A+ [spec](https://promisesaplus.com).

### then(onResolve, onReject)

#### onResolve

Type: `Function`

Resolve callack.

#### onReject

Type: `Function`

Reject callack.

### value()

Returns resolved value.

### catch(onReject)

#### onReject

Type: `Function`

Reject callack.

### finally(anyWay)

#### anyWay

Type: `Function`

Resolve/reject callack. Called with `(error, value)` signature.

### Promise.all(promises, options)

#### promises

Type: `Array`

List of Promises;

#### options

The same, as [Promise constructor](### new Promise(resolver, options)) options.

### Promise.resolve(value, options)

#### value

Type: `*`

Return new resolved Promise.

#### options

The same, as [Promise constructor](### new Promise(resolver, options)) options.

### Promise.reject(err, options)

#### err

Type: `Error`

Return new rejected Promise.

#### options

The same, as [Promise constructor](### new Promise(resolver, options)) options.

