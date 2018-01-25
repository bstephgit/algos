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