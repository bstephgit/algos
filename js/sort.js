var utils = require('./utils');

//================================================================================
                                    // INSERT
//================================================================================
module.exports.insert = function (a) {
    if(a.length<2) return;
    _insert(a,0,a.length-1);
}
function _insert(a,left,right) {
    for (var i = left+1; i <= right; ++i) {
        var j = i - 1;
        var val = a[i];
        while (j >= 0 && a[j] > val) {
            a[j + 1] = a[j];
            j -= 1;
        }
        a[j + 1] = val;
    }
}
//================================================================================
                                    // MEDIAN
//================================================================================
module.exports.median = function (a) {

    function _selectKth(k, left, right) {
        
        //console.log('_selectKth',k,'(',left,right,')','pivot',pivot_index);
        var pivot_index = utils.random_value(left,right);
        pivot_index=utils.partition(a,left,right,pivot_index);

        if (left + k - 1 === pivot_index) {
            return pivot_index;
        }
        /* continue the loop, narrowing the range as appropriate. If we are within
        * the left-hand side of the pivot then k can stay the same. */
        if (left + k - 1 < pivot_index) {
            return _selectKth(k, left, pivot_index-1);
        }

        return _selectKth(k-(pivot_index-left+1), pivot_index+1, right);
    }

    function _median(left, right) {
        //console.log('_median',left,right);
        if (right <= left) {
            return;
        }
        var mid = Math.floor((right - left + 1) / 2);
        var me = _selectKth(mid + 1,left,right);
        _median(left, me - 1);
        _median(me + 1, right);
    }

    _median(0,a.length-1);
}

//================================================================================
                                    // QUICK SORT
//================================================================================
module.exports.qsort = function (a) {
    var minSize = 10;
    function _qsort(left,right)
    {
        if(right<=left)
        {
            return;
        }

        var pivot_index = utils.random_value(left,right);
        pivot_index=utils.partition(a,left,right,pivot_index);

        if (pivot_index - 1 - left <= minSize) {
            _insert(a,left, pivot_index - 1);
        } else {
            _qsort(left, pivot_index - 1);
        }
        if (right - pivot_index - 1 <= minSize) {
            _insert(a, pivot_index + 1, right);
        } else {
            _qsort(pivot_index + 1, right);
        }
    }
    _qsort(0,a.length-1);
}

//================================================================================
                                    // HEAP SORT
//================================================================================
module.exports.heap_sort = function (a) {
    function _swap(i,j)
    {
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    function _heapify(idx,max)
    {
        var left = (2 * idx) + 1;
        var right = (2 * idx) + 2;
        var largest;
        if(left < max && a[left]>a[idx])
        {
            largest = left;
        }
        else
        {
            largest = idx;
        }
        if(right < max && a[right] > a[largest])
        {
            largest = right;
        }
        if(largest!=idx)
        {
            _swap(idx,largest);
            _heapify(largest,max);
        }
    }
    function _buildHeap()
    {
        //start from middle of array
        for(var i=(n >> 1)-1;i>=0;--i)
        {
            _heapify(i,n);
        }
    }
    var n = a.length;
    _buildHeap();
    for(var i=n-1;i>0;--i)
    {
        _swap(0,i);
        _heapify(0,i);
    }
}

//================================================================================
                                    // BUCKET SORT
//================================================================================
module.exports.bucket_sort = function (a, n ,hash) {
    var buckets = new Array(n);

    for(var i=0; i<a.length; ++i)
    {
        var hash_val = hash(a[i]);
        if (buckets[hash_val]===undefined)
        {
            buckets[hash_val]=new Array();
        }
        buckets[hash_val].push(a[i]);
    }

    var idx = 0;
    for(var i=0;i<n;i++)
    {
        if(buckets[i]!==undefined)
        {
            var low = idx;
            a[idx++] = buckets[i][0];

            for (var j = 1; j < buckets[i].length; ++j) {
                var val = buckets[i][j];
                var k = idx-1;
                while (k >= low && val < a[k]) {
                    a[k + 1] = a[k];
                    k--;
                }
                a[k + 1] = val;
                idx++;
            }
        }
    }
}