import java.util.List;
import java.util.Scanner;

/**
 * Command-line interface for the Scrooge expense tracker application.
 * Handles user interactions and menu navigation.
 * @author NalNar
 */
public class CommandLineInterface {
    private ExpenseManager expenseManager;
    private Budget budget;
    private Scanner scanner;

    public CommandLineInterface(ExpenseManager expenseManager, Budget budget) {
        this.expenseManager = expenseManager;
        this.budget = budget;
        this.scanner = new Scanner(System.in);
    }

    /**
     * Start the CLI application
     */
    public void start() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║   Welcome to Scrooge Expense Tracker ║");
        System.out.println("║        Money Management Made Easy    ║");
        System.out.println("╚════════════════════════════════════╝\n");

        boolean running = true;
        while (running) {
            displayMenu();
            int choice = getUserChoice();
            running = handleUserChoice(choice);
        }

        System.out.println("\n✓ Thank you for using Scrooge! Goodbye!");
        scanner.close();
    }

    /**
     * Display the main menu
     */
    private void displayMenu() {
        System.out.println("\n--- Main Menu ---");
        System.out.println("1. Add Expense");
        System.out.println("2. View All Expenses");
        System.out.println("3. Update Expense");
        System.out.println("4. Delete Expense");
        System.out.println("5. View Expenses by Category");
        System.out.println("6. View Expenses by Month");
        System.out.println("7. Set Budget");
        System.out.println("8. View Budget Status");
        System.out.println("9. Add Income");
        System.out.println("10. View Summary");
        System.out.println("0. Exit");
        System.out.print("Enter your choice: ");
    }

    /**
     * Get user's menu choice
     */
    private int getUserChoice() {
        try {
            return Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("✗ Invalid input. Please enter a number.");
            return -1;
        }
    }

    /**
     * Handle user menu choice
     */
    private boolean handleUserChoice(int choice) {
        switch (choice) {
            case 1:
                addExpense();
                break;
            case 2:
                expenseManager.viewAllExpenses();
                break;
            case 3:
                updateExpense();
                break;
            case 4:
                deleteExpense();
                break;
            case 5:
                viewByCategory();
                break;
            case 6:
                viewByMonth();
                break;
            case 7:
                setBudget();
                break;
            case 8:
                budget.printBudgetStatus(expenseManager.getTotalSpending());
                break;
            case 9:
                addIncome();
                break;
            case 10:
                expenseManager.printSummary();
                budget.printBudgetStatus(expenseManager.getTotalSpending());
                break;
            case 0:
                return false;
            default:
                System.out.println("✗ Invalid choice. Please try again.");
        }
        return true;
    }

    /**
     * Add a new expense
     */
    private void addExpense() {
        System.out.print("Enter description: ");
        String description = scanner.nextLine().trim();

        System.out.print("Enter amount: $");
        double amount = getDoubleInput();

        System.out.print("Enter category (e.g., Food, Transport, Entertainment): ");
        String category = scanner.nextLine().trim();

        Expense expense = new Expense(description, amount, category);
        
        // Check budget
        if (budget.willExceedBudget(amount, expenseManager.getTotalSpending())) {
            System.out.println("⚠ WARNING: This expense will exceed your monthly budget!");
            System.out.print("Do you want to proceed? (yes/no): ");
            if (!scanner.nextLine().trim().equalsIgnoreCase("yes")) {
                return;
            }
        }

        expenseManager.addExpense(expense);
        budget.deductExpense(amount);
    }

    /**
     * Update an existing expense
     */
    private void updateExpense() {
        System.out.print("Enter expense ID to update: ");
        int id = getIntInput();

        System.out.print("Enter new description: ");
        String description = scanner.nextLine().trim();

        System.out.print("Enter new amount: $");
        double amount = getDoubleInput();

        System.out.print("Enter new category: ");
        String category = scanner.nextLine().trim();

        expenseManager.updateExpense(id, description, amount, category);
    }

    /**
     * Delete an expense
     */
    private void deleteExpense() {
        System.out.print("Enter expense ID to delete: ");
        int id = getIntInput();
        expenseManager.deleteExpense(id);
    }

    /**
     * View expenses by category
     */
    private void viewByCategory() {
        System.out.print("Enter category name: ");
        String category = scanner.nextLine().trim();

        List<Expense> expenses = expenseManager.getExpensesByCategory(category);
        if (expenses.isEmpty()) {
            System.out.println("No expenses found in category: " + category);
        } else {
            System.out.println("\n--- Expenses in " + category + " ---");
            for (Expense expense : expenses) {
                System.out.println(expense);
            }
            double total = expenseManager.getTotalByCategory(category);
            System.out.println("Total: $" + String.format("%.2f", total));
        }
    }

    /**
     * View expenses by month (format: yyyy-MM)
     */
    private void viewByMonth() {
        System.out.print("Enter month (yyyy-MM format): ");
        String yearMonth = scanner.nextLine().trim();

        List<Expense> expenses = expenseManager.getExpensesByMonth(yearMonth);
        if (expenses.isEmpty()) {
            System.out.println("No expenses found for month: " + yearMonth);
        } else {
            System.out.println("\n--- Expenses for " + yearMonth + " ---");
            for (Expense expense : expenses) {
                System.out.println(expense);
            }
            double total = expenseManager.getTotalByMonth(yearMonth);
            System.out.println("Total: $" + String.format("%.2f", total));
        }
    }

    /**
     * Set monthly budget
     */
    private void setBudget() {
        System.out.print("Enter monthly budget: $");
        double budgetAmount = getDoubleInput();
        budget.setMonthlyBudget(budgetAmount);
    }

    /**
     * Add income
     */
    private void addIncome() {
        System.out.print("Enter income amount: $");
        double income = getDoubleInput();
        budget.addIncome(income);
    }

    /**
     * Helper method to get double input
     */
    private double getDoubleInput() {
        try {
            return Double.parseDouble(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("✗ Invalid amount. Please enter a valid number.");
            return 0;
        }
    }

    /**
     * Helper method to get integer input
     */
    private int getIntInput() {
        try {
            return Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("✗ Invalid ID. Please enter a valid number.");
            return -1;
        }
    }
}
