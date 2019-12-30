var expect = require('chai').expect;
var trees = require('../trees');
var createTree = require('./trees_gen').createTree;
var createUnbalancedTree = require('./trees_gen').createUnbalancedTree;


describe("Tree - depth ", function() {

	it("Balanced", function() {
		"use strict";
		var t = createTree();
		expect(trees.depth(t)).to.equal(4);

	});

	it("Unbalanced", function() {
		"use strict";
		var t = createUnbalancedTree();
		expect(trees.depth(t)).to.equal(4);
	});

	it("Non trivial tree", function() {
		var tree = require('../utils').Tree('string');

		var node = tree.createNode('root__x__y__z__');

		tree.setRoot(node);

		node.setLeft(tree.createNode('child1')).setRight(tree.createNode('child2_2312312'));

		node.getLeft().setLeft(tree.createNode('342356436556')).setRight(tree.createNode('234zdasdad'));
		node.getLeft().getLeft().setLeft(tree.createNode('1234')).setRight(tree.createNode('43'));
		node.getLeft().getRight().setLeft(tree.createNode('asdwewqrqwr')).setRight(tree.createNode('3213123'));
		node.getLeft().getLeft().getRight().setLeft(tree.createNode('1')).setRight(tree.createNode('2'));
		node.getLeft().getRight().getLeft().setLeft(tree.createNode('1')).setRight(tree.createNode('4'));

		node.getRight().setLeft(tree.createNode('23')).setRight(tree.createNode('23435456456'));
		node.getRight().getLeft().setLeft(tree.createNode('23')).setRight(tree.createNode('23432499234234'));
		node.getRight().getLeft().getRight().setLeft(tree.createNode('123')).setRight(tree.createNode('456'));
		node.getRight().getRight().setLeft(tree.createNode('123')).setRight(tree.createNode('93459345435'));

		expect(trees.depth(tree)).to.equal(5);
	});

});

describe("Tree - BinaryTree", function() {

	var createRandomArray = function() {
		return require('../utils').random_array(30, 1, 200);
	};
	var bt = trees.BinaryTree(typeof 0);
	var ar = createRandomArray();

	var checkTree = function(tree) {

		var _checkNode = function(node) {
			if (node) {
				if (node.getLeft()) {
					expect(node.getVal()).to.be.least(node.getLeft().getVal());
					_checkNode(node.getLeft());
				}
				if (node.getRight()) {
					expect(node.getVal()).to.be.most(node.getRight().getVal());
					_checkNode(node.getRight());
				}
			}
		};
		_checkNode(tree.getRoot());
	};

	it("binary tree - insert", function() {
		for (var i = 0; i < ar.length; i += 1) {
			bt.insert(ar[i]);
		}
		var it = require('../utils').InOrderTraversalIterator(bt);
		var count = 0;
		it.begin();
		while(!it.end()){
			count+=1;
			it.next();
		}
		expect(count).to.equal(ar.length);
		checkTree(bt);
	});

	it("binary tree - remove", function() {

		var random_value = require('../utils').random_value;
		for (i = 0; i < 10; i += 1) {
			var val = ar[random_value(0, ar.length - 1)];

			var j = 0;
			var count = 0;
			while (j < ar.length) {
				if (ar[j] === val) count += 1;
				j += 1;
			}
			expect(bt.find(val) == val).to.be.true;
			j = 0;
			while (j < count) {
				bt.remove(val);
				j += 1;
			}
			j = 0;
			while (j < count) {
				var k = 0;
				while (k < ar.length) {
					if (ar[k] == val) {
						ar.splice(k, 1);
						j += 1;
						break;
					}
					k += 1;
				}
			}
			var writable = {
				str: '',
				write: function(s) {
					this.str = this.str.concat(s);
				}
			};
			bt.print(writable);
			expect(bt.find(val), val + " should have been removed " + count + " times\n" + writable.str +
				'\nar[' + ar.length + ']=' + ar.toString() + '\n').to.be.null;

			checkTree(bt);
		}
	});
});