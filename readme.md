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

	chain = Promise.sync(function() {
		return promise
			.then(function(value) {
				// again synchronous
				return value + "!";
			});
	});

	chain.result(); // my value!

```

## API

### new Promise(resolver: Function(resolve: Function(value: any), reject: Function(reason: any)))

### then(onResolve: Function(value: any), onReject: Function(reason: any)) -> Promise

### catch(onReject: Function(reason: any)) -> Promise

### finally(anyWay: Function(error: any, value: any)) -> Promise

### result() -> any

Returns resolved value.

Throws an error in two cases:
 - target promise is in `pending` state.
 - target promise was rejected.

### isPending() -> Boolean

### isFulfilled() -> Boolean

### isRejected() -> Boolean

________

### Promise.sync(fn: Function()) -> any

Enters in a new context with given functon, when any `new Promise` (created synchronously) will have synchronous resolution of `onFulfilled` and `onRejected` callbacks in `.then` chains. This brings ability to use `.value()` method.

> Note, that with this feature, Broodies will not pass the 2.2.4 rule of the Promises/A+ [spec](https://promisesaplus.com).

### Promise.all(promises: Array[Promise]) -> Promise

### Promise.resolve(value: any) -> Promise

Returns new resolved Promise.

### Promise.reject(error: any) -> Promise

Returns new rejected Promise.

