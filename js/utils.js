function random_value(minval, maxval) {
    "use strict";
    if (maxval < minval) {
        var tmp = maxval;
        maxval = minval;
        minval = tmp;
    }
    var delta = (maxval - minval);
    return (minval + Math.floor(Math.random() * delta));
}


module.exports.random_array = function(nb_elem, minval, maxval) {
    "use strict";
    var array = [];

    for (var i = 0; i < nb_elem; ++i) {
        var val = random_value(minval, maxval);
        array.push(val);
    }
    return array;
};

module.exports.random_value = random_value;

/*
a:array, left: left index, right: right index
*/
module.exports.partition = function(a, left, right, pivot_index) {
    "use strict";
    var pivot_val = a[pivot_index];

    //move pivot to end of array
    var tmp = a[pivot_index];
    a[pivot_index] = a[right];
    a[right] = tmp;

    /* all values <= pivot are moved to front of array and pivot inserted
     * just after them. */
    pivot_index = left;
    for (var idx = left; idx < right; ++idx) {
        if (a[idx] < pivot_val) {
            tmp = a[pivot_index];
            a[pivot_index] = a[idx];
            a[idx] = tmp;
            pivot_index++;
        }
    }
    tmp = a[pivot_index];
    a[pivot_index] = a[right];
    a[right] = tmp;

    return pivot_index;
};


/* -------------------------------------------------------------------------------
                                        Trees
   -------------------------------------------------------------------------------*/

function checkType(expected, type) {
    if (expected !== type)
        throw new Error("Wrong type " + type + ". Type " + expected + " expected.");
}

function checkTree(t1, t2) {
    if (t1 !== t2)
        throw 'Nodes have not same parent tree';
}

function Node(tree, val) {
    "use strict";
    if (!!tree) {
        var o = {};
        if (val === null || val === undefined) {
            o.val = val;
        } else {
            checkType(tree.type, typeof val);
            o.val = val;
        }
        o.left = null;
        o.right = null;
        o.tree = tree;

        var node = {
            getType: function() {
                return tree.type;
            },
            getVal: function() {
                return o.val;
            },
            getLeft: function() {
                return o.left;
            },
            getRight: function() {
                return o.right;
            },
            getTree: function() {
                return o.tree;
            },
            setVal: function(v) {
                checkType(tree.type, typeof v);
                o.val = v;
            },
            setLeft: function(n) {
                checkType(tree.type, n.getType());
                checkTree(tree, n.getTree());
                o.left = n;
                return node;
            },
            setRight: function(n) {
                checkType(tree.type, n.getType());
                checkTree(tree, n.getTree());
                o.right = n;
                return node;
            },
            removeLeft: function() {
                o.left = null;
            },
            removeRight: function() {
                o.right = null;
            },
            hasVal: function() {
                return !!o.val;
            },
            isLeaf: function() {
                return !o.right && !o.left;
            },
            toString: function() {
                if (o.val == null)
                    return 'null';
                return o.val.toString();
            }
        };
        return node;
    }
    throw new Error('Valid tree must be Node constructor parameter');
}

function Tree(type) {
    "use strict";

    if (type === 'undefined' || type === null || type === undefined)
        throw new Error('Tree type cannot be null or undefined');

    if (typeof type === 'string' && type !== 'string')
        type = 'string';
    if (typeof type !== 'string')
        type = typeof type;


    var t = {};
    t.root = null;
    t.type = type;
    var isSameTree = function(node) {
        return node.getTree() === t;
    };
    return {
        setRoot: function(node) {
            checkType(type, node.getType());
            if (!isSameTree(node))
                throw 'setRoot: Node has not same parent tree';
            t.root = node;
        },
        getRoot: function() {
            return t.root;
        },
        getType: function() {
            return t.type;
        },
        createNode: function(v) {
            return Node(t, v);
        }
    };
}

module.exports.Tree = Tree;

var iteratorBase = function() {
    var nodequeue = [];
    this.empty = function() {
        return nodequeue.length == 0;
    };
    this.end = function() {
        return this.empty();
    };
    this.get = function() {
        if (!this.empty()) {
            return nodequeue[nodequeue.length - 1];
        }
        return null;
    };
    this.front = function() {
        if (!this.empty()) {
            return nodequeue[0];
        }
        return null;
    };
    this.push = function(n) {
        nodequeue.push(n);
    };
    this.pop = function() {
        return nodequeue.pop();
    };
    this.pop_front = function() {
        return nodequeue.splice(0, 1)[0];
    };
    this.leftmost_node = function(n) {
        while (n && !n.isLeaf()) {
            nodequeue.push(n);
            n = n.getLeft();
        }
        if (n)
            nodequeue.push(n);
    };
    this.deepest_node = function(n) {
        while (n && !n.isLeaf()) {
            nodequeue.push(n);
            if (n.getLeft())
                n = n.getLeft();
            else
                n = n.getRight();
        }
        if (n)
            nodequeue.push(n);
    };
};

module.exports.PreOrderTraversalIterator = function(tree) {
    var base = new iteratorBase();
    return {
        begin: function() {
            if (tree.getRoot())
                base.push(tree.getRoot());
        },
        end: function() {
            return base.end();
        },
        get: function() {
            return base.get();
        },
        next: function() {
            if (!base.empty()) {
                var parent = base.pop();
                var n = parent.getRight();
                if (n) {
                    base.push(n);
                }
                n = parent.getLeft();
                if (n) {
                    base.push(n);
                }
            }
        }
    };
};

module.exports.InOrderTraversalIterator = function(tree) {
    var base = new iteratorBase();
    return {
        begin: function() {
            base.leftmost_node(tree.getRoot());
        },
        end: function() {
            return base.end();
        },
        get: function() {
            return base.get();
        },
        next: function() {
            if (!base.empty()) {
                var n = base.pop();
                if (!n.isLeaf() && n.getRight()) {
                    base.leftmost_node(n.getRight());
                }
            }
        }
    };
};

module.exports.PostOrderTraversalIterator = function(tree) {
    var base = new iteratorBase();
    return {
        begin: function() {
            base.deepest_node(tree.getRoot());
        },
        end: function() {
            return base.end();
        },
        get: function() {
            return base.get();
        },
        next: function() {
            if (!base.empty()) {
                var n = base.pop();
                var r = base.get() ? base.get().getRight() : null;
                if (r && n !== r) {
                    base.deepest_node(r);
                }
            }
        }
    };
};

module.exports.BreadthOrderTraversalIterator = function(tree) {
    var base = new iteratorBase();

    return {

        begin: function() {
            if (tree.getRoot()) {
                base.push(tree.getRoot());
            }
        },

        end: function() {
            return base.end();
        },

        get: function() {
            return base.front();
        },

        next: function() {

            if (!base.empty()) {

                var n = base.pop_front();
                if (n.getLeft()) {
                    base.push(n.getLeft());
                }
                if (n.getRight()) {
                    base.push(n.getRight());
                }
            }
        }

    };
};
