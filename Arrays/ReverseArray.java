import java.util.Arrays;

public class ReverseArray{

    public static int [] reverseArray(int[]a){
        int t = 0;
        int l = a.length-1;
        for(int i=0; i<a.length;i++){
            if(i>=l){break;}
            t = a[l];
            a[l] = a[i];
            a[i] = t;
            l--;
        }
        return a;
    }


    public static void main(String[]args){
        int a[] = {1,2,3};
        
        System.out.println(Arrays.toString(reverseArray(a)));
        
    }
}