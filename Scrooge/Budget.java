/**
 * Manages monthly budget and tracks spending against budget limits.
 * @author NalNar
 */
public class Budget {
    private double monthlyBudget;
    private double currentMoneyAvailable;

    /**
     * Constructor for Budget management
     * @param initialMoney starting money available
     * @param monthlyBudget budget limit for the month
     */
    public Budget(double initialMoney, double monthlyBudget) {
        this.currentMoneyAvailable = initialMoney;
        this.monthlyBudget = monthlyBudget;
    }

    /**
     * Set or update the monthly budget
     */
    public void setMonthlyBudget(double budget) {
        this.monthlyBudget = budget;
        System.out.println("✓ Monthly budget set to: $" + String.format("%.2f", budget));
    }

    /**
     * Get the current monthly budget
     */
    public double getMonthlyBudget() {
        return monthlyBudget;
    }

    /**
     * Set current available money
     */
    public void setCurrentMoney(double money) {
        this.currentMoneyAvailable = money;
    }

    /**
     * Get current available money
     */
    public double getCurrentMoney() {
        return currentMoneyAvailable;
    }

    /**
     * Update money after an expense
     */
    public void deductExpense(double amount) {
        currentMoneyAvailable -= amount;
    }

    /**
     * Add money (income)
     */
    public void addIncome(double amount) {
        currentMoneyAvailable += amount;
        System.out.println("✓ Income added: $" + String.format("%.2f", amount));
    }

    /**
     * Check if expense will exceed budget
     */
    public boolean willExceedBudget(double expenseAmount, double currentSpending) {
        return (currentSpending + expenseAmount) > monthlyBudget;
    }

    /**
     * Get remaining budget
     */
    public double getRemainingBudget(double currentSpending) {
        return monthlyBudget - currentSpending;
    }

    /**
     * Print budget status
     */
    public void printBudgetStatus(double currentSpending) {
        double remaining = getRemainingBudget(currentSpending);
        System.out.println("\n=== BUDGET STATUS ===");
        System.out.println("Monthly Budget: $" + String.format("%.2f", monthlyBudget));
        System.out.println("Current Spending: $" + String.format("%.2f", currentSpending));
        System.out.println("Remaining: $" + String.format("%.2f", remaining));

        if (remaining < 0) {
            System.out.println("⚠ WARNING: Budget exceeded by $" + String.format("%.2f", -remaining));
        } else if (remaining < monthlyBudget * 0.2) {
            System.out.println("⚠ WARNING: Only 20% of budget remaining!");
        }
    }
}
