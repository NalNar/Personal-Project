import java.util.*;

public class ZerosEnd {
    
    public static int[] zerosEnd(int[] array){

        int left = 0;
        int right = array.length-1;
        
        /// array left at 0
        /// right at array last index   
        int temp = 0;
        // while(left<right){
        for(int i = 0 ; i<array.length; i++){
            if(a[i] == 0){
                temp = array[right];
                array[right] = a[i];
                a[i] = temp;
                right--;
            }
            left++;
        }

        // }

        return array;
    }
    public static void main(String[]args){

        int a [] = {1,2,0,0,3,3,5,5};
        System.out.println(Arrays.toString(zerosEnd(a)));
    }
}
