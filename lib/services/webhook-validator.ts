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
   * Validates webhook payload
   * 
   * @param payload - Webhook request payload
   * @returns boolean indicating if payload is valid
   * @throws WebhookValidationError if payload is invalid
   */
  static validatePayload(payload: any): { isValid: boolean } {
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
      return { isValid: true };
    }

    // Validate GitHub webhook payload structure
    if (!payload.ref && !payload.repository) {
      throw new WebhookValidationError(
        'Invalid webhook payload structure',
        'INVALID_PAYLOAD',
        400
      );
    }

    LoggerService.log('info', 'Webhook payload validation successful');
    return { isValid: true };
  }
}