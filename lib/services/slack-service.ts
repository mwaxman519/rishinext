export class SlackService {
  static initialize() {
    console.warn("Slack service has been deprecated");
  }

  static async sendNotification(message: string) {
    console.warn("Notification:", message);
  }

  static async sendExportNotification(success: boolean, details: string) {
    const status = success ? "succeeded" : "failed";
    console.warn(`Export ${status}: ${details}`);
  }
}