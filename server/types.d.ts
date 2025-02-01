declare module './vite' {
  import { Express } from 'express';
  import { Server } from 'http';

  export function setupVite(app: Express, server: Server): Promise<void>;
  export function serveStatic(app: Express): void;
  export function log(message: string, source?: string): void;
}
