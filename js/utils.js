'use strict';

 function random_value(minval, maxval) {
     if (maxval < minval) {
         var tmp = maxval;
         maxval = minval;
         minval = tmp;
     }
     var delta = (maxval - minval);
     return (minval + Math.floor(Math.random() * delta));
 }


 module.exports.random_array = function(nb_elem, minval, maxval) {
     var array = [];

     for (var i = 0; i < nb_elem; ++i) {
         var val = random_value(minval, maxval);
         array.push(val);
     }
     return array;
 }

 module.exports.random_value = random_value;

 /*
 a:array, left: left index, right: right index
 */
 module.exports.partition = function(a, left, right, pivot_index) {
     var pivot_val = a[pivot_index];

     //move pivot to end of array
     var tmp = a[pivot_index];
     a[pivot_index] = a[right];
     a[right] = tmp;

     /* all values <= pivot are moved to front of array and pivot inserted
      * just after them. */
     var pivot_index = left;
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
 }


/* -------------------------------------------------------------------------------
                                        Trees
   -------------------------------------------------------------------------------*/

function checkType(expected, type) {
    if (expected !== type)
        throw new Error(`Wrong type ${type}. Type ${expected} expected.`);
 }

 function checkTree(t1, t2) {
    if (t1 !== t2)
        throw 'Nodes haave not same parent tree';
 }

 function Node(tree, val) {
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
            getType: () => tree.type,
            getVal: () => o.val,
            getLeft: () => o.left,
            getRight: () => o.right,
            getTree: () => o.tree,
            setVal: (v) => {
                checkType(tree.type, typeof v);
                o.val = v;
            },
            setLeft: (n) => {
                checkType(tree.type, n.getType());
                checkTree(tree, n.getTree());
                o.left = n;
                return node;
            },
            setRight: (n) => {
                checkType(tree.type, n.getType());
                checkTree(tree, n.getTree());
                o.right = n;
                return node;
            },
            hasVal: () => !!o.val,
            isLeaf: () => !o.right && !o.left,
        };
        return node;
    }
    throw new Error('Valid tree must be Node constructor parameter');
 }

 function Tree(type) {

    if (type === 'undefined' || type === null || type === undefined)
        throw new Error('Tree type cannot be null or undefined');

    if (typeof type === 'string' && type !== 'string')
        type = 'string';
    if (typeof type !== 'string')
        type = typeof type;


    var t = {};
    t.root = null;
    t.type = type;
    var isSameTree = (node) => node.getTree() === t;
    return {
        setRoot: function(node) {
            checkType(type, node.getType());
            if (!isSameTree(node))
                throw 'setRoot: Node has not same parent tree';
            t.root = node;
        },
        getRoot: () => t.root,
        getType: () => t.type,
        createNode: (v) => {
            return Node(t, v);
        }
    };
 }

 module.exports.Tree = Tree;
 
 module.exports.printTree = function(tree) {



 }