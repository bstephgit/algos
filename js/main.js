var utils = require('./utils');
var sort = require('./sort');


console.log("Hello");
test_sort();
console.log('bye');

function display_sample(ar,start,nb)
{
    console.log(ar.slice(start,start+nb));
}

function test_sort()
{
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
    sort.bucket_sort(a_copy, 128000, function(a){ return a-1; });
    console.timeEnd('bucket sort');
    
    //display sample to verify sort corretness
    //var nb = 20;
    //display_sample(a_copy,45678,nb);
    // var start = 5000;
    // display_sample(a_copy5000,20);
}

