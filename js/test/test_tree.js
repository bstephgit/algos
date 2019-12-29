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

});