var utils = require('./utils');
var sort = require('./sort');


console.log("Hello");
test_sort();
console.log('bye');

function test_sort()
{
     //var ar = [15,9,8,1,4,11,7,12,13,6,5,3,16,2,10,14];
    
    // console.time('random_array');
    var ar = utils.random_array(64000, 1, 128000);
    // console.timeEnd('random_array');
    var ar2 = ar.slice();
    // var ar3 = ar.slice();
    // var ar4 = ar.slice();

    // console.time('insert');
    // sort.insert(ar);
    // console.timeEnd('insert');

    // console.time('median');
    // sort.median(ar2);
    // console.timeEnd('median');

    console.time('qsort');
    sort.qsort(ar2);
    console.timeEnd('qsort');

    console.time('bucket sort');    
    sort.bucket_sort(ar, 128000, function(a){ return a-1; });
    console.timeEnd('bucket sort');
    var start = 45678;
    var nb = 20;
    console.log(ar.slice(start,start+nb));
    console.log(ar2.slice(start,start+nb));
    // var start = 5000;
    // var end = start + 20;
    // console.log(ar3.slice(start,end));
    // console.log(ar2.slice(start,end));
}

