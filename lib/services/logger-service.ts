/**
 * Structure for individual log entries
 * Provides consistent format for all application logs
 */
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
}

/**
 * LoggerService provides centralized logging functionality
 * Features:
 * - Multiple log levels (info, warn, error)
 * - Structured log storage
 * - Context-aware logging
 * - Development mode console output
 * - Various log retrieval methods
 */
export class LoggerService {
  /** In-memory storage for log entries */
  private static logs: LogEntry[] = [];

  /**
   * Adds a new log entry with optional context
   * Outputs to console in development mode
   * 
   * @param level - Log level (info, warn, error)
   * @param message - Log message
   * @param context - Optional contextual data
   */
  static log(level: 'info' | 'warn' | 'error', message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context
    };

    this.logs.push(entry);

    // Development mode console output
    if (process.env.NODE_ENV === 'development') {
      const contextStr = context ? ` ${JSON.stringify(context)}` : '';
      console.log(`[${entry.timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`);
    }
  }

  /**
   * Retrieves all stored logs
   * @returns Array of all log entries
   */
  static getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Retrieves logs filtered by level
   * @param level - Log level to filter by
   * @returns Array of filtered log entries
   */
  static getLogsByLevel(level: 'info' | 'warn' | 'error'): LogEntry[] {
    return this.logs.filter(entry => entry.level === level);
  }

  /**
   * Clears all stored logs
   * Useful for cleanup after log processing
   */
  static clearLogs() {
    this.logs = [];
  }

  /**
   * Returns logs in a formatted string representation
   * Useful for display or file output
   * @returns Formatted log string
   */
  static getFormattedLogs(): string {
    return this.logs
      .map(entry => {
        const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
        return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}`;
      })
      .join('\n');
  }

  /**
   * Exports logs in JSON format
   * Useful for external processing or storage
   * @returns JSON string of all logs
   */
  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}