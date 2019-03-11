/*
    ex 1) a=10 b=15
    ---------------
    GCD(10,15)
    15 % 10 => a = 5; b = 10

    GCD(5,10)
    10 % 5 => a = 0; b = 5

    GCD(0,5)
    a==0 ==> GDC = b (5)

    ex 2) a=15 b=10
    ---------------
    GCD(15,10)
    10 % 15 => a = 10; b = 15

    GCD(10,15) ==> see ex 1)

*/
function GCD(a,b)
{
    if(a==0)
    {
        return b;
    }
    return GCD(b%a,a);
}

function prime(){

    var num = 600851475143 ;
    var primes = [];
    var largest_prime=0;
    for(i=2;i<=num;++i)
    {
        var isPrime = true;
        for(var j=0;j<primes.length;++j)
        {
            if(i%primes[j]==0)
            {
                isPrime=false;
            }
        }
        if(isPrime)
        {
            primes.push(i);
            if(num%i==0)
            {
                largest_prime = i;
                num = num / i;
                console.log(largest_prime,num);
            }
        }
    }
    console.log("result=",largest_prime);

}

var a = 17, b = 189;
console.log('GCD(',a,',', b, ') =', GCD(a,b));