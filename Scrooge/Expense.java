import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Represents a single expense entry with details about amount, category, and date.
 * @author NalNar
 */
public class Expense {
    private static int idCounter = 1;
    private int id;
    private String description;
    private double amount;
    private String category;
    private LocalDate date;

    /**
     * Constructor for creating an expense
     * @param description brief description of the expense
     * @param amount the amount spent
     * @param category category of the expense (e.g., "Food", "Transport", "Entertainment")
     */
    public Expense(String description, double amount, String category) {
        this.id = idCounter++;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = LocalDate.now();
    }

    /**
     * Constructor with custom date
     */
    public Expense(String description, double amount, String category, LocalDate date) {
        this.id = idCounter++;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getDate() {
        return date;
    }

    // Setters
    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return String.format("[ID: %d] %s - $%.2f (%s) on %s", 
                id, description, amount, category, date.format(formatter));
    }
}
