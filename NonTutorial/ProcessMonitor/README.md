# Process Monitor (Java)

A lightweight CLI-based system monitoring tool that displays running processes along with their CPU and memory usage on macOS.

This project focuses on **OS-level process inspection** and **backend/system interaction**, not frontend UI.

---

## What This Does

* Lists active system processes
* Displays:

  * Process ID (PID)
  * CPU usage (%)
  * Memory usage (%)
  * Command name
* Sorts processes by CPU usage
* Runs directly in the terminal

---

## How It Works

* Uses Java `ProcessBuilder` to execute the native `ps` command
* Reads process information from standard output
* Parses and displays real-time system data in a structured format

This approach mirrors how many backend and system tools interact with the operating system in production environments.

---

## Platform Notes

* Built and tested on **macOS**
* macOS does **not** expose `/proc` like Linux
* Process data is accessed via POSIX-compatible tools (`ps`)
* The same concept can be extended to Linux using `/proc` or `top`

---

## How to Run

### Compile

```bash
javac ProcessMonitor.java
```

### Run

```bash
java ProcessMonitor
```

The output will display the top CPU-consuming processes at runtime.

---

## Example Output

```
PID     CPU%    MEM%    COMMAND
------------------------------------
1234    45.2    1.3     java
5678    22.8    0.9     chrome
...
```

---

## What I Learned

* How operating systems expose process-level metrics
* Differences between Linux and macOS process introspection
* Using Java to interface with system commands
* Why process metrics change dynamically at runtime

---

## Possible Improvements

* Periodic auto-refresh (top-like behavior)
* Linux `/proc` support
* Filtering by user or process name
* Exporting metrics to a log file

---

## Why This Project Exists

This project was built to strengthen understanding of:

* Operating system fundamentals
* Process management
* Backend/system-level programming

It intentionally avoids frontend frameworks and focuses on **core system behavior**.


