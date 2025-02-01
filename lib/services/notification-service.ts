import { LoggerService } from './logger-service';

/**
 * Configuration interface for notification platforms
 * Defines webhook URL and platform type for each notification destination
 */
interface NotificationConfig {
  webhookUrl: string;
  platform: 'slack' | 'teams';
}

/**
 * Interface for build notification messages
 * Standardizes notification content across platforms
 */
interface BuildNotification {
  status: 'success' | 'failure' | 'warning';
  title: string;
  message: string;
  branch?: string;
  details?: string[];
  timestamp?: string;
}

/**
 * NotificationService handles sending build status notifications
 * to configured Slack and Microsoft Teams channels
 * 
 * Features:
 * - Multi-platform support (Slack & Teams)
 * - Build status notifications (success/failure/warning)
 * - Detailed error reporting
 * - Consistent message formatting across platforms
 * - Automatic timestamp handling
 */
export class NotificationService {
  private static configs: NotificationConfig[] = [];

  /**
   * Initialize notification service with webhook configurations
   * Reads webhook URLs from environment variables and sets up platform configs
   */
  static initialize() {
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      this.configs.push({
        webhookUrl: slackWebhook,
        platform: 'slack'
      });
      LoggerService.log('info', 'Slack notifications initialized');
    }

    const teamsWebhook = process.env.TEAMS_WEBHOOK_URL;
    if (teamsWebhook) {
      this.configs.push({
        webhookUrl: teamsWebhook,
        platform: 'teams'
      });
      LoggerService.log('info', 'Teams notifications initialized');
    }
  }

  /**
   * Send test notifications to verify configuration
   * Sends success, warning, and failure notifications
   */
  static async sendTestNotifications(): Promise<void> {
    const timestamp = new Date().toISOString();

    // Test success notification
    await this.sendBuildNotification({
      status: 'success',
      title: 'Test Notification - Success',
      message: 'This is a test success notification',
      branch: 'test-branch',
      timestamp,
      details: ['Build completed successfully', 'All tests passed']
    });

    // Test warning notification
    await this.sendBuildNotification({
      status: 'warning',
      title: 'Test Notification - Warning',
      message: 'This is a test warning notification',
      branch: 'test-branch',
      timestamp,
      details: ['Some tests were skipped', 'Performance metrics need review']
    });

    // Test failure notification
    await this.sendBuildNotification({
      status: 'failure',
      title: 'Test Notification - Failure',
      message: 'This is a test failure notification',
      branch: 'test-branch',
      timestamp,
      details: ['Build failed', 'Error in deployment process']
    });
  }

  /**
   * Send build notification to all configured platforms
   * Handles error cases and logging for each platform
   * 
   * @param notification Build notification details
   */
  static async sendBuildNotification(notification: BuildNotification): Promise<void> {
    for (const config of this.configs) {
      try {
        const payload = this.formatNotification(notification, config.platform);
        await fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        LoggerService.log('info', `Notification sent to ${config.platform}`);
      } catch (error) {
        LoggerService.log('error', `Failed to send ${config.platform} notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Format notification for specific platform
   * Adapts notification content to platform-specific message format
   * 
   * @param notification Build notification details
   * @param platform Target platform (slack/teams)
   * @returns Formatted notification payload
   */
  private static formatNotification(notification: BuildNotification, platform: 'slack' | 'teams') {
    const timestamp = notification.timestamp || new Date().toISOString();

    if (platform === 'slack') {
      return {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: notification.title
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: notification.message
            },
            fields: [
              {
                type: "mrkdwn",
                text: `*Status:*\n${notification.status.toUpperCase()}`
              },
              {
                type: "mrkdwn",
                text: `*Branch:*\n${notification.branch || 'N/A'}`
              },
              {
                type: "mrkdwn",
                text: `*Time:*\n${timestamp}`
              }
            ]
          },
          ...(notification.details ? [{
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Details:*\n" + notification.details.join("\n")
            }
          }] : [])
        ]
      };
    }

    // Microsoft Teams format
    return {
      type: "message",
      attachments: [{
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          type: "AdaptiveCard",
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          version: "1.2",
          body: [
            {
              type: "TextBlock",
              size: "Medium",
              weight: "Bolder",
              text: notification.title
            },
            {
              type: "TextBlock",
              text: notification.message,
              wrap: true
            },
            {
              type: "FactSet",
              facts: [
                {
                  title: "Status",
                  value: notification.status.toUpperCase()
                },
                {
                  title: "Branch",
                  value: notification.branch || 'N/A'
                },
                {
                  title: "Time",
                  value: timestamp
                }
              ]
            },
            ...(notification.details ? [{
              type: "TextBlock",
              text: "Details:",
              weight: "Bolder"
            },
            {
              type: "TextBlock",
              text: notification.details.join("\n"),
              wrap: true
            }] : [])
          ]
        }
      }]
    };
  }
}