'use strict';

const {
	describe,
	it
} = require('mocha');
const {
	expect
} = require('chai');
var utils = require('../utils');

describe("utils module: random_array", function() {
	var min = 12,
		max = 500;
	var size = 1000;
	var arr = utils.random_array(size, min, max);
	it("test random array size", function() {
		expect(arr.length).to.equal(size);
	});
	it("test random array values", function() {
		for (var index in arr) {
			expect(arr[index]).to.be.least(min).to.be.most(max);
		}
	});
});

describe("utils module: partition", function() {
	var opt = {
		min: 12,
		max: 500,
		size: 1000
	};

	this.timeout(8000);

	var check_function = function(opt) {
		var min = opt.min || 100;
		var max = opt.max || 500;
		var size = opt.size || 250;

		for (var outer_counter = 0; outer_counter < 10; outer_counter += 1) {

			var arr = utils.random_array(size, min, max);

			for (var inner_counter = 0; inner_counter < 10; inner_counter += 1) {
				var pivot_index = utils.random_value(0, size - 1);

				var copy = arr.slice();
				pivot_index = utils.partition(copy, 0, size - 1, pivot_index);

				for (var index = 0; index < pivot_index; index += 1) {
					expect(copy[index]).to.be.most(copy[pivot_index]);
				}
				for (var index = pivot_index + 1; index < size; index += 1) {
					expect(copy[index]).to.be.least(copy[pivot_index]);
				}
			}
		}
	}

	it("test partition array/big size", function() {

		check_function(opt);
	});
	opt.size = 15;
	it("test partition array/small size", function() {
		check_function(opt);
	});
	opt.size = 20;
	opt.min = 5;
	opt.max = 8;
	it("test partition array/small size and small range", function() {
		check_function(opt);
	});
});

describe("Tree and nodes", function() {

	it("Numerical tree", function() {
		var t = utils.Tree(0);
		expect(t.getType()).to.equal('number');

		var n = t.createNode(10);
		t.setRoot(n);
		expect(t.getRoot().getVal()).to.equal(10);
		expect(n.isLeaf()).to.be.true;

		n.setLeft(t.createNode(12)).setRight(t.createNode(15));
		expect(n.getLeft().getVal()).to.equal(12);
		expect(n.getRight().getVal()).to.equal(15);
		n = n.getLeft();
		expect(n.isLeaf()).to.be.true;
		n = t.getRoot().getRight();
		expect(n.isLeaf()).to.be.true;
		expect(t.getRoot().isLeaf()).to.be.false;
		
	});

});