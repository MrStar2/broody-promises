var assert  = require("chai").assert,
	chance  = new require("chance")(),
	Promise = require("../src/promise");

function noop() {};

describe("Promise", function() {

	describe("#constructor", function() {
		
		it("should return Promise", function() {
			var promise;

			promise = new Promise(noop);

			assert.instanceOf(promise, Promise);
		});

	});

	describe("#then", function() {
		
		it("should return Promise", function() {
			var promise,
				chain;

			promise = new Promise(noop);
			chain = promise.then(noop);

			assert.instanceOf(chain, Promise);
			assert.notEqual(chain, promise);
		});

		it("should be resolved after previous", function(done) {
			var promise, 
				val;

			val = chance.word();

			promise = new Promise(function(resolve) {
				resolve(val);
			});

			promise
				.then(function(value) {
					var error;

					try {
						assert.equal(value, val);
					} catch (err) {
						error = err;
					}
					
					done(error);
				});
		});

		it("should be rejected after previous", function(done) {
			var promise, 
				err;

			err = new Error(chance.word());

			promise = new Promise(function(resolve, reject) {
				reject(err);
			});

			promise
				.then(null, function(error) {
					var _error;

					try {
						assert.strictEqual(error, err);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});

		it("should not be called after previous rejection", function(done) {
			var promise, 
				err, val;

			err = new Error(chance.word());
			val = chance.word();

			promise = new Promise(function(resolve, reject) {
				reject(err);
			});

			promise
				.then(function() {
					done(new Error("Called!"));
				})
				.catch(function() {
					done();
				});
		});

	});

	describe("#catch", function() {

		it("should be called on rejection", function(done) {
			var promise, 
				err;

			err = new Error(chance.word());

			promise = new Promise(function(resolve, reject) {
				reject(err);
			});

			promise
				.catch(function(error) {
					var _error;

					try {
						assert.strictEqual(error, err);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});


		it("should be chained properly on rejection", function(done) {
			var promise, 
				val;

			val = chance.word();

			promise = new Promise(function(resolve, reject) {
				reject();
			});

			promise
				.catch(function() {
					return val;
				})
				.then(function(value) {
					var error;

					try {
						assert.equal(value, val);
					} catch (err) {
						error = err;
					}
					
					done(error);
				});
		});

	});


	describe("#finally", function() {

		it("should be called on rejection", function(done) {
			var promise, 
				err;

			err = new Error(chance.word());

			promise = new Promise(function(resolve, reject) {
				reject(err);
			});

			promise
				.finally(function(error, value) {
					var _error;

					try {
						assert.strictEqual(error, err);
						assert.isUndefined(value);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});

		it("should be called on resolving", function(done) {
			var promise, 
				val;

			val = chance.word();

			promise = new Promise(function(resolve, reject) {
				resolve(val);
			});

			promise
				.finally(function(error, value) {
					var _error;

					try {
						assert.strictEqual(value, val);
						assert.isNull(error);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});

	});


	describe("Promise.all", function() {

		it("should return a Promise", function() {
			assert.instanceOf(Promise.all([]), Promise);
		});

		it("should be resolved after all", function(done) {
			var a, b,
				aVal, bVal;

			aVal = chance.word();
			bVal = chance.word();

			a = new Promise(function(resolve) {
				resolve(aVal);
			});

			b = new Promise(function(resolve) {
				resolve(bVal);
			});

			Promise.all([a, b])
				.then(function(results) {
					var _error;

					try {
						assert.equal(results[0], aVal);
						assert.equal(results[1], bVal);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});

	});

	describe("Promise.resolve", function() {

		it("should return a Promise", function() {
			assert.instanceOf(Promise.resolve(), Promise);
		});

		it("should be resolved", function(done) {
			var promise, val;

			val = chance.word();

			promise = Promise.resolve(val);

			promise.then(function(value) {
				var error;

				try {
					assert.equal(value, val);
				} catch (err) {
					error = err;
				}
				
				done(error);
			})
		});
		
	});

	describe("Promise.reject", function() {

		it("should return a Promise", function() {
			assert.instanceOf(Promise.reject(), Promise);
		});

		it("should be resolved", function(done) {
			var promise, 
				err;

			err = new Error(chance.word());

			promise = new Promise.reject(err);

			promise
				.then(null, function(error) {
					var _error;

					try {
						assert.strictEqual(error, err);
					} catch (err) {
						_error = err;
					}
					
					done(_error);
				});
		});
		
	});

	describe("#brood", function() {

		it("should return resolved value", function() {
			var promise, val;

			val = chance.word();

			promise = new Promise(function(resolve) {
				resolve(val);
			});

			assert.equal(val, promise.brood());
		});

		it("should return resolved value", function() {
			var promise, val, value;

			val = chance.word();

			promise = new Promise(function(resolve) {
				resolve();
			});

			value = promise
				.then(function() {
					return 10;
				})
				.then(function() {
					throw new Error();
				})
				.catch(function() {
					return val;
				})
				.brood();

			assert.equal(value, val);
		});

	});

});