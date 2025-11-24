import java.util.*;
/**
 * A method to find the max and min of an array
 */
public class MaxMin {
    /** @param array
     * @return array of length 2, with max and min from the input array 
     * 
    */
    public static int[] maxMin(int[] array){
        // start max and min at samevalue at array[0]
        int max = array[0];
        int min = array[0];

        for(int elem: array){
            if(elem<min){
                min = elem;

            }
            if (elem>max){
                max = elem;
            }
        }
        return new int[] {min, max};
    
    }

    public static void main(String[]args){
        int [] a= {1,2,3,4,5,22,1,12,3,4,2,4,44,444444};
        String b = Arrays.toString(maxMin(a));
        System.out.println(b);
    }
}
