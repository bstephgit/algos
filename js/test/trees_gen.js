var utils = require('../utils');

function createTree() {

	var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	
	var tree = utils.Tree(data[0]);
	var nb_nodes = 1;

	tree.setRoot(tree.createNode(data[0]));

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

module.exports.createTree = createTree;

module.exports.createUnbalancedTree = function () {

	var t = createTree();

	//remove 8
	t.getRoot().getLeft().getLeft().removeLeft();
	//remove 5
	t.getRoot().getLeft().removeRight();
	//remove 6
	t.getRoot().getRight().removeLeft();
	//remove 15
	t.getRoot().getRight().getRight().removeRight();
	return t;
};