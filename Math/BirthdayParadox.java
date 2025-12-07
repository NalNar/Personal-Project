import java.lang.annotation.Documented;

public class BirthdayParadox {
    
//*
// Birthday Paradox Monte-Carlo Simulation - Java
// Implemented a Monte-Carlo simulation to estimate collision probabilities using randomized trials.
// Built helper methods for randomization, collision detection, and variable sample sizes.
// Documented results and code clearly for academic demonstration and GitHub review. 
// */
    /**
     * Simulates the birthday paradox to estimate the probability of at least two people
     * sharing a birthday in a group of a given size.
     *
     * @param groupSize The number of people in the group.
     * @param trials    The number of simulation trials to run.
     * @return The estimated probability of a shared birthday.
     * @NalNar
     */
    public static double simulateBirthdayParadox(int groupSize, int trials) {
        int collisions = 0;

        for (int t = 0; t < trials; t++) {
            if (hasBirthdayCollision(groupSize)) {
                collisions++;
            }
        }

        return (double) collisions / trials;
    }

    /**
     * Checks if there is a birthday collision in a group of a given size.
     *
     * @param groupSize The number of people in the group.
     * @return True if there is at least one birthday collision, false otherwise.
     */
    private static boolean hasBirthdayCollision(int groupSize) {
        boolean[] birthdays = new boolean[365];

        for (int i = 0; i < groupSize; i++) {
            int birthday = (int) (Math.random() * 365);
            if (birthdays[birthday]) {
                return true; // Collision found
            }
            birthdays[birthday] = true;
        }

        return false; // No collision
    }

    public static void main(String[] args) {
        int groupSize = 23; // Typical group size for the birthday paradox
        int trials = 100000; // Number of simulation trials

        double probability = simulateBirthdayParadox(groupSize, trials);
        System.out.printf("Estimated probability of shared birthday in a group of %d: %.4f%n", groupSize, probability);
    }
}