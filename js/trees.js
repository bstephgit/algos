var Tree = require('./utils').Tree;

function treedepth(tree) {
	'use strict';
	var _depth = function(n) {
		if (!n)
			return 0;
		else {
			var l_depth = _depth(n.getLeft());
			var r_depth = _depth(n.getRight());

			//console.log('node val:', n.getVal(),'depths',l_depth,r_depth);
			if (l_depth > r_depth)
				return l_depth + 1;
			else
				return r_depth + 1;
		}
	};
	return _depth(tree.getRoot());

}

module.exports.depth = treedepth;
/*
ex:
root__x__y__z__                                                            // root layer
child1                              child2_2312312                         // layer + 1
342356436556  234zdasdad            23                  23435456456        // layer + 2 : parent can be bigger than sum of children
1234  43      asdwewqrqwr  3213123  23  23432499234234  123  93459345435   // layer + 3
      3  4    5  6         7  8     9   10								   // sparse layer
etc...

*/
module.exports.printTree = function(tree, writable_stream) {

	'use strict';

	var sibling_space = 2;

	var _toString = function(item) {
		if (item == null)
			return '(null)';
		if (item == undefined)
			return '(undefined)';
		if (item.getVal)
			return _toString(item.getVal());
		return item.toString();
	};

	var ndlen = function(item) {
		return _toString(item).length;
	};

	var children = function(node) {
		if (node && !node.isLeaf()) {
			return [node.getLeft(), node.getRight()];
		}
		return [];
	};

	var nextLayer = function(layer) {
		if (Array.isArray(layer)) {
			layer = layer.reduce(function(a, n) {
				return a.concat(children(n));
			});
			return (layer.length > 0 ? layer : null);
		}
		//is node
		return children(layer);
	};

	//create heap
	var compute_offsets = function(root, offsets, nodes) {

		var tree_length = offsets.length;
		var max = new Array(tree_length);

		(function lengths_recurse(node, index) {

			max[index] = ndlen(node);
			nodes[index] = _toString(node);

			if (node && !node.isLeaf()) {

				var children = lengths_recurse(node.getLeft(), 2 * index + 1) + sibling_space + lengths_recurse(node.getRight(), 2 * index + 2);
				max[index] = Math.max(children, nodes[index].length);
			}

			return max[index];

		})(root, 0);

		(function check_lengths(index) {
			if (max[index] && (2 * index + 2) < tree_length) {
				if (!max[2 * index + 1]) return;

				var max_children = max[2 * index + 1] + max[2 * index + 2] + sibling_space;
				if (max[index] > max_children) {
					max[2 * index + 2] = max[index] - max[2 * index + 1] - sibling_space;
				}

				check_lengths(2 * index + 1);
				check_lengths(2 * index + 2);
			}
		})(0);

		(function lengths_to_offsets() {

			var layer = 0;
			var index = 0;
			while (index < tree_length) {

				var index_max = Math.pow(2, layer + 1) - 1;
				var offset = 0;
				while (index < tree_length && index < index_max) {
					if (max[index]) {
						offsets[index] = offset;

						offset = max[index] + sibling_space - nodes[index].length;
						index += 1;
					} else {
						if (index % 2 != 1) throw 'index ' + index + ' should be odd';
						if (index + 1 >= tree_length) throw 'index ' + index + ' should less than tree heap length ' + tree_length;
						//get sibling parent length
						var parent_index = Math.floor((index - 1) / 2);
						var next_forward = 2;
						while (parent_index >= 0 && !max[parent_index]) {
							parent_index = Math.floor((parent_index - 1) / 2);
							next_forward *= 2;
						}
						if (parent_index > -1) {
							offset += max[parent_index] + sibling_space;
							index += next_forward;
						}
					}
				}
				layer += 1;
			}

		})();
	};

	writable_stream = writable_stream || process.stdout;

	var print = function(str) {
		writable_stream.write(str);
	};

	var print_blanks = function(w) {
		print(' '.repeat(w));
	};

	if (!tree.getRoot()) {
		print("(empty)");
		return;
	}
	var offsets = new Array(Math.pow(2, treedepth(tree)) - 1);
	var nodes = new Array(offsets.length);
	var i = 0;
	var nb_max = 1;

	compute_offsets(tree.getRoot(), offsets, nodes);


	while (i < offsets.length) {

		if ( i >= nb_max )
		{
			print('\n');
			nb_max += nb_max+1;
		}

		if (offsets[i])
			print_blanks(offsets[i]);
		if (nodes[i])
			print(nodes[i]);

		i += 1;
	}

};