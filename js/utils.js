
function random_value(minval,maxval)
{
    if(maxval<minval)
    {
        var tmp = maxval;
        maxval = minval;
        minval = tmp;
    }
    var delta = (maxval-minval);
    return (minval + Math.floor(Math.random() * delta));
}


module.exports.random_array= function (nb_elem,minval,maxval)
{
    var array = [];
    
    for(var i=0;i<nb_elem;++i)
    {
        var val = random_value(minval,maxval);
        array.push( val );
    }
    return array;
}

module.exports.random_value = random_value;

/*
a:array, left: left index, right: right index
*/
module.exports.partition = function (a,left,right,pivot_index)
{
        var pivot_val = a[pivot_index];

        //move pivot to end of array
        var tmp = a[pivot_index];
        a[pivot_index] = a[right];
        a[right] = tmp;

        /* all values <= pivot are moved to front of array and pivot inserted
        * just after them. */
        var pivot_index = left;
        for(var idx = left;idx<right;++idx)
        {
            if(a[idx]<pivot_val)
            {
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
