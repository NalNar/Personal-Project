public class Scrooge {
    /** Build a simple expense tracker application to manage your finances. 
     * The application should allow users to add, delete, and view their expenses. 
     * The application should also provide a summary of the expenses Requirements
     * Application should run from the command line and should have the following features:
     * Users can add an expense with a description and amount.
     * Users can update an expense.
     * Users can delete an expense.
     * Users can view all expenses.
     * Gives an view a summary of all expenses.
     * Users can view a summary of expenses for a specific month (of current year).
     * Here are some additional features that you can add to the application:
     * Add expense categories and allow users to filter expenses by category.
     * Allows to set a budget for each month and show a warning when the user exceeds the budget.
     * Allow users to export expenses to a CSV file.
     * @NalNar
 */

    /** V1.0 would have basic crud functionalities with CLI
    * @param inflow of money, current money in the bank 
    * @return calculation of the spending 
    */

    private int currentMoneyAvail = 0 ; // Money at the staring is 0 
    private int inFlow; // User given data
    private int outFlow; // Need to compute based on the spending 
    private int spending;

    // no agrs constructor
    public Scrooge (){
        System.out.println("Welcome to Realm of Scroogie");
    }

    
    public int getCurrentMoney (){
        return this.currentMoneyAvail;
    }   

    public void setCurrentMoney(int money ){
        this.currentMoneyAvail = money;
    }
}
