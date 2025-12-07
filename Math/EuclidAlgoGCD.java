/** 
 * Implementing the greatest common divisor algorithm by euclid 
 * idea behind the algorithm is based on the fact that
 * gcd(x,y) = gcd(y, x mod y), came from discrete math book edward s. 
*/
public class EuclidAlgoGCD {
    
    // @ param two int x,y
    // @ return gcd(x,y)
    public static int greatestCommonDivisor(int number1, int number2){

        /// idea behind euclid's algo for finding gcd(x,y) is
        /// let z = x mod y 
        /// gcd(x,y) = gcd(y,z)
        /// gcd(x,y) = gcd(y,x mod y)
        /// 
        int z;
        while(true){
            z = number1%number2;
            if(z==0){
                // System.out.println("Hi there!");
                return number2;
            } else {
                // System.out.println("Hi there from else!");
                return greatestCommonDivisor(number2,z);
                
            }
        }

        // return 0;
    }
    

    public static void main(String[]args){
         var c = 689;
         var k = 234;
        System.out.println(greatestCommonDivisor(c, k));
    }
    
}
