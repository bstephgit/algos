var utils = require('../utils');
var sort = require('../sort');
var expect = require('chai').expect;


describe('test sort', function() {
    'use strict';
    this.timeout(2000);
    
    //var ar = [15,9,8,1,4,11,7,12,13,6,5,3,16,2,10,14];
    var check_order = function(ar) {
        for (var i = 0; i < ar.length - 1; i += 1)
            expect(ar[i]).to.be.most(ar[i + 1]);
    };
    // console.time('random_array');
    var ar = utils.random_array(4000, 1, 128000);
    // console.timeEnd('random_array');

    it('sort: insert', function() {
        var a_copy = ar.slice();
        sort.insert(a_copy);
        check_order(a_copy);
    });


    it('sort: median', function() {
        var a_copy = ar.slice();
        sort.median(a_copy);
        check_order(a_copy);
    });

    it('sort: quick sort', function() {
        var a_copy = ar.slice();
        sort.qsort(a_copy);
        check_order(a_copy);
    });

    it('sort: heap sort', function() {
        var a_copy = ar.slice();
        sort.heap_sort(a_copy);
        check_order(a_copy);
    });

    it('sort: heap sort', function() {
        var a_copy = ar.slice();
        sort.bucket_sort(a_copy, 128000, function(a) {
            return a - 1;
        });
        check_order(a_copy);
    });

    //display sample to verify sort corretness
    //var nb = 20;
    //display_sample(a_copy,45678,nb);
    // var start = 5000;
    // display_sample(a_copy5000,20);
});