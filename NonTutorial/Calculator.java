import java.util.Scanner;
/* Creating a terminal operated calculator */

public class Calculator{
    public static void main(String[]args){
        // need a scanner object
        Scanner scan = new Scanner(System.in);

        /*  Making sure user can enter like 2x3 and output should be 6
            need to take in input as a string
            string needs to be split at "operator" and also at number
        */
        
        int total = 0;

        while (true) {
            // continuing untill while is false
            System.out.print("Enter arithmetic (or type 'exit' to quit): ");
            String userInput = scan.nextLine().trim();
            
            
            if (userInput.equalsIgnoreCase("exit")) {
                System.out.println("Exiting calculator. Goodbye!");
                break;
            }
            
            // split would create array of string, str[0] = first num, str[1] = second num
            if (userInput.contains("+")){
                String[] parts = userInput.split("\\+");
                int num1 = Integer.parseInt(parts[0].trim()); // this would convert string to integer type
                int num2 = Integer.parseInt(parts[1].trim()); 
                total = num1+num2;
                System.out.println(total);
            }
            else if(userInput.contains("-")){
                String[] parts = userInput.split("-");
                int num1 = Integer.parseInt(parts[0].trim());
                int num2 = Integer.parseInt(parts[1].trim());
                total = (num1-num2);
            }
            else if(userInput.contains("*")){
                String[] parts = userInput.split("[x*]"); // [x*] would enable to split at both * or x
                int num1 = Integer.parseInt(parts[0]);
                int num2 = Integer.parseInt(parts[0]);
                total = num1*num2;
            }
            else if(userInput.contains("/")){
                String[] parts = userInput.split("/");
                int num1 = Integer.parseInt(parts[0]);
                int num2 = Integer.parseInt(parts[1]);
                if (num2 == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                total = num1 / num2;
            
            }


            System.out.println("Total is " + total);
        }







        scan.close();
    }

}