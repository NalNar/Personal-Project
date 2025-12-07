/**
 * Main entry point for the Scrooge Expense Tracker application.
 * 
 * Build a simple expense tracker application to manage your finances.
 * The application allows users to:
 * - Add, update, delete, and view expenses
 * - Categorize expenses
 * - View expenses by category or month
 * - Set and monitor a monthly budget
 * - Receive budget warnings
 * - View comprehensive expense summaries
 * 
 * Features Implemented:
 * ✓ Basic CRUD operations for expenses
 * ✓ Expense categorization
 * ✓ Monthly expense tracking
 * ✓ Budget management with warnings
 * ✓ Multi-class OOP design
 * 
 * @author NalNar
 * @version 2.0 - Multi-class OOP Implementation
 */
public class Scrooge {

    public static void main(String[] args) {
        // Initialize the application components
        ExpenseManager expenseManager = new ExpenseManager();
        Budget budget = new Budget(0, 1000); // Start with $0 and $1000 budget
        CommandLineInterface cli = new CommandLineInterface(expenseManager, budget);

        // Start the application
        cli.start();
    }
}
