//var mocha = require('mocha');
var expect = require('chai').expect;
var utils = require('../utils');

describe("utils module: random_array", function() {
	'use strict';

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
	'use strict';

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
				for (index = pivot_index + 1; index < size; index += 1) {
					expect(copy[index]).to.be.least(copy[pivot_index]);
				}
			}
		}
	};

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

describe("Utils Tree and nodes", function() {
	'use strict';

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

	var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	function createTree() {
		var tree = utils.Tree(data[0]);
		tree.setRoot(tree.createNode(data[0]));
		var nb_nodes = 1;
		var ancestors = [tree.getRoot()];

		for (var nbperlayer = 2; nb_nodes < data.length; nbperlayer *= 2) {
			var nextnodes = [];
			//console.log('ancestors', ancestors.length);


			for (var i = 0; nb_nodes < data.length && i < nbperlayer; i += 1) {

				var n = tree.createNode(data[nb_nodes++]);
				nextnodes.push(n);

				var parent = ancestors[0];
				if (nb_nodes % 2 == 0) {
					//console.log('parent[' + parent.getVal() + '].setLeft()', i, n.getVal());
					parent.setLeft(n);
				} else {
					//console.log('parent[' + parent.getVal() + '].setRight()', i, n.getVal());
					parent.setRight(n);
					ancestors.splice(0, 1);
				}
			}
			ancestors = nextnodes;

		}
		return tree;
	}

	it("PreOrder Traversal Tree Iterator", function() {
		var it = utils.PreOrderTraversalIterator(createTree());
		var nbiter = 0;
		var order = [1, 2, 4, 8, 9, 5, 10, 11, 3, 6, 12, 13, 7, 14, 15];

		expect(it.end()).to.be.true;

		it.begin();
		while (!it.end() && nbiter < data.length) {
			var node = it.get();

			expect(node).to.not.be.null;
			expect(node).to.not.be.undefined;
			expect(node.getVal()).to.equal(order[nbiter]);
			nbiter += 1;
			it.next();
		}

		expect(it.end()).to.be.true;
		expect(nbiter).to.equal(data.length);
	});

	it("PreOrder Traversal Tree Iterator - Empty Tree", function() {
		var t = utils.Tree('string');
		var it = utils.PreOrderTraversalIterator(t);
		expect(it.end()).to.be.true;
	});

	it("InOrder Traversal Tree Iterator", function() {
		var it = utils.InOrderTraversalIterator(createTree());
		var nbiter = 0;
		var order = [8, 4, 9, 2, 10, 5, 11, 1, 12, 6, 13, 3, 14, 7, 15];

		expect(it.end()).to.be.true;

		it.begin();
		while (!it.end() && nbiter < data.length) {
			var node = it.get();

			expect(node).to.not.be.null;
			expect(node).to.not.be.undefined;

			expect(node.getVal()).to.equal(order[nbiter]);
			nbiter += 1;
			it.next();
		}

		expect(it.end()).to.be.true;
		expect(nbiter).to.equal(data.length);
	});

	it("InOrder Traversal Tree Iterator - Empty Tree", function() {
		var t = utils.Tree('string');
		var it = utils.InOrderTraversalIterator(t);
		expect(it.end()).to.be.true;
	});

});