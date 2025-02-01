import { LoggerService } from './logger-service';

/**
 * Custom error class for webhook validation failures
 * Provides structured error information with status codes and error types
 */
export class WebhookValidationError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = 'INVALID_WEBHOOK', status = 401) {
    super(message);
    this.name = 'WebhookValidationError';
    this.code = code;
    this.status = status;
  }
}

/**
 * WebhookValidator service handles all webhook-related validation
 * Ensures security and integrity of incoming webhook requests
 * Differentiates between content and schema changes
 */
export class WebhookValidator {
  /**
   * Validates webhook signature and headers
   */
  static validateWebhook(signature: string | null, event: string | null, secret: string): void {
    LoggerService.log('info', 'Validating webhook request...');

    if (!signature) {
      throw new WebhookValidationError('Missing webhook signature');
    }

    if (!event) {
      throw new WebhookValidationError(
        'Missing GitHub event type',
        'MISSING_EVENT',
        400
      );
    }

    if (signature !== secret) {
      throw new WebhookValidationError('Invalid webhook signature');
    }

    if (!['push', 'repository'].includes(event)) {
      throw new WebhookValidationError(
        'Invalid webhook event type',
        'INVALID_EVENT',
        400
      );
    }

    LoggerService.log('info', 'Webhook validation successful');
  }

  /**
   * Validates webhook payload and determines if it's a schema change
   * 
   * @param payload - Webhook request payload
   * @returns boolean indicating if this is a schema change
   * @throws WebhookValidationError if payload is invalid
   */
  static validatePayload(payload: any): { isValid: boolean; isSchemaChange: boolean } {
    LoggerService.log('info', 'Validating webhook payload...');

    if (!payload) {
      throw new WebhookValidationError(
        'Missing webhook payload',
        'MISSING_PAYLOAD',
        400
      );
    }

    // Handle manual build payload
    if (payload.manual) {
      if (!payload.branch) {
        throw new WebhookValidationError(
          'Missing branch in manual build payload',
          'INVALID_PAYLOAD',
          400
        );
      }
      return { isValid: true, isSchemaChange: true }; // Manual builds are treated as schema changes
    }

    // Validate GitHub webhook payload structure
    if (!payload.ref && !payload.repository) {
      throw new WebhookValidationError(
        'Invalid webhook payload structure',
        'INVALID_PAYLOAD',
        400
      );
    }

    // Check for schema changes in the commit
    const isSchemaChange = payload.commits?.some((commit: any) => {
      const modifiedFiles = [
        ...(commit.added || []),
        ...(commit.modified || []),
        ...(commit.removed || [])
      ];

      return modifiedFiles.some(file => 
        file.startsWith('tina/') || // TinaCMS schema files
        file.includes('schema.') || // Any schema definition files
        file.includes('config.') || // Configuration files
        file.endsWith('.schema.json') || // JSON schema files
        file.endsWith('.graphql') // GraphQL schema files
      );
    }) || false;

    LoggerService.log('info', `Webhook payload validation successful. Schema change: ${isSchemaChange}`);
    return { isValid: true, isSchemaChange };
  }
}