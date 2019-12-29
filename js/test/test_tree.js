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