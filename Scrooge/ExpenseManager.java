import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Manages all expenses with CRUD operations and filtering capabilities.
 * @author NalNar
 */
public class ExpenseManager {
    private List<Expense> expenses;

    public ExpenseManager() {
        this.expenses = new ArrayList<>();
    }

    /**
     * Add a new expense
     */
    public void addExpense(Expense expense) {
        expenses.add(expense);
        System.out.println("✓ Expense added successfully!");
    }

    /**
     * Update an existing expense by ID
     */
    public boolean updateExpense(int id, String description, double amount, String category) {
        for (Expense expense : expenses) {
            if (expense.getId() == id) {
                expense.setDescription(description);
                expense.setAmount(amount);
                expense.setCategory(category);
                System.out.println("✓ Expense updated successfully!");
                return true;
            }
        }
        System.out.println("✗ Expense with ID " + id + " not found!");
        return false;
    }

    /**
     * Delete an expense by ID
     */
    public boolean deleteExpense(int id) {
        boolean removed = expenses.removeIf(expense -> expense.getId() == id);
        if (removed) {
            System.out.println("✓ Expense deleted successfully!");
        } else {
            System.out.println("✗ Expense with ID " + id + " not found!");
        }
        return removed;
    }

    /**
     * Get all expenses
     */
    public List<Expense> getAllExpenses() {
        return new ArrayList<>(expenses);
    }

    /**
     * View all expenses with formatted output
     */
    public void viewAllExpenses() {
        if (expenses.isEmpty()) {
            System.out.println("No expenses recorded yet.");
            return;
        }
        System.out.println("\n--- All Expenses ---");
        for (Expense expense : expenses) {
            System.out.println(expense);
        }
    }

    /**
     * Get expenses for a specific category
     */
    public List<Expense> getExpensesByCategory(String category) {
        return expenses.stream()
                .filter(exp -> exp.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    /**
     * Get expenses for a specific month (e.g., "2024-12")
     */
    public List<Expense> getExpensesByMonth(String yearMonth) {
        YearMonth target = YearMonth.parse(yearMonth);
        return expenses.stream()
                .filter(exp -> YearMonth.from(exp.getDate()).equals(target))
                .collect(Collectors.toList());
    }

    /**
     * Get total spending across all expenses
     */
    public double getTotalSpending() {
        return expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    /**
     * Get total spending for a specific category
     */
    public double getTotalByCategory(String category) {
        return expenses.stream()
                .filter(exp -> exp.getCategory().equalsIgnoreCase(category))
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    /**
     * Get total spending for a specific month
     */
    public double getTotalByMonth(String yearMonth) {
        return getExpensesByMonth(yearMonth).stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    /**
     * Get all unique categories
     */
    public Set<String> getAllCategories() {
        return expenses.stream()
                .map(Expense::getCategory)
                .collect(Collectors.toSet());
    }

    /**
     * Generate summary of all expenses
     */
    public void printSummary() {
        if (expenses.isEmpty()) {
            System.out.println("No expenses to summarize.");
            return;
        }

        System.out.println("\n=== EXPENSE SUMMARY ===");
        System.out.println("Total Expenses: $" + String.format("%.2f", getTotalSpending()));
        System.out.println("Number of Transactions: " + expenses.size());

        if (!getAllCategories().isEmpty()) {
            System.out.println("\nBreakdown by Category:");
            for (String category : getAllCategories()) {
                double total = getTotalByCategory(category);
                System.out.println("  " + category + ": $" + String.format("%.2f", total));
            }
        }
    }
}
