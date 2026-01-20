import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcessMonitor {

    public static void main(String[] args) {
        while (true) {
            try {
                // Clear terminal
                System.out.print("\033[H\033[2J");
                System.out.flush();

                Process process = new ProcessBuilder(
                        "ps", "-axo", "pid,pcpu,pmem,comm", "-r"
                ).start();

                BufferedReader reader =
                        new BufferedReader(new InputStreamReader(process.getInputStream()));

                String line;
                int count = 0;

                System.out.println("PID\tCPU%\tMEM%\tCOMMAND");
                System.out.println("------------------------------------");

                while ((line = reader.readLine()) != null && count < 11) {
                    System.out.println(line);
                    count++;
                }

                // Wait 2 seconds
                Thread.sleep(2000);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

