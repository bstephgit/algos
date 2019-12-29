var utils = require('./utils');
var sort = require('./sort');
var Tree = require('./utils').Tree;

/*
console.log("Hello");
test_sort();
console.log('bye');
*/
test_print_tree();

function display_sample(ar, start, nb) {
    console.log(ar.slice(start, start + nb));
}

function test_sort() {
    //var ar = [15,9,8,1,4,11,7,12,13,6,5,3,16,2,10,14];

    // console.time('random_array');
    var ar = utils.random_array(64000, 1, 128000);
    // console.timeEnd('random_array');
    var a_copy;

    a_copy = ar.slice();
    console.time('insert');
    sort.insert(a_copy.slice());
    console.timeEnd('insert');

    a_copy = ar.slice();
    console.time('median');
    sort.median(a_copy.slice());
    console.timeEnd('median');

    a_copy = ar.slice();
    console.time('qsort');
    sort.qsort(a_copy);
    console.timeEnd('qsort');

    a_copy = ar.slice();
    console.time('heap sort');
    sort.heap_sort(a_copy);
    console.timeEnd('heap sort');

    a_copy = ar.slice();
    console.time('bucket sort');
    sort.bucket_sort(a_copy, 128000, function(a) {
        return a - 1;
    });
    console.timeEnd('bucket sort');

    //display sample to verify sort corretness
    //var nb = 20;
    //display_sample(a_copy,45678,nb);
    // var start = 5000;
    // display_sample(a_copy5000,20);
}

function test_print_tree() {

    /*
    ex:
    root__x__y__z__                                                            // root layer
    child1                              child2_2312312                         // layer + 1
    342356436556  234zdasdad            23                  23435456456        // layer + 2
    1234  43      asdwewqrqwr  3213123  23  23432499234234  123  93459345435   // layer + 3
          1  2    1  4                      123  456
    etc...

    */
    var tree = Tree('string');

    var node = tree.createNode('root__x__y__z__');

    tree.setRoot(node);

    node.setLeft(tree.createNode('child1')).setRight(tree.createNode('child2_2312312'));

    //node.getLeft().setLeft(tree.createNode('3556')).setRight(tree.createNode('234zdasdad'));
    node.getLeft().setLeft(tree.createNode('342356436556')).setRight(tree.createNode('234zdasdad'));
    node.getLeft().getLeft().setLeft(tree.createNode('1234')).setRight(tree.createNode('43'));
    node.getLeft().getRight().setLeft(tree.createNode('asdwewqrqwr')).setRight(tree.createNode('3213123'));
    node.getLeft().getLeft().getRight().setLeft(tree.createNode('1')).setRight(tree.createNode('2'));
    node.getLeft().getRight().getLeft().setLeft(tree.createNode('1')).setRight(tree.createNode('4'));
    node.getLeft().getRight().getRight().setRight(tree.createNode('xyz'));


    node.getRight().setLeft(tree.createNode('23')).setRight(tree.createNode('23435456456'));
    node.getRight().getLeft().setLeft(tree.createNode('23')).setRight(tree.createNode('23432499234234'));
    node.getRight().getLeft().getRight().setLeft(tree.createNode('123')).setRight(tree.createNode('456'));
    node.getRight().getRight().setLeft(tree.createNode('123')).setRight(tree.createNode('93459345435'));

    require('./trees').printTree(tree);
    console.log('\n');

}