"use client";

import { Button } from "./button";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "./use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { cn } from "@/lib/utils";

/**
 * Interface for structured export error handling
 * Provides detailed error information for the UI
 */
interface ExportError {
  code: string;
  details?: string[];
  logs?: string[];
}

/**
 * ExportButton Component
 * 
 * Provides UI controls for:
 * - Triggering static site exports for schema changes
 * - Displaying build logs and errors
 * - Showing real-time build status
 * 
 * Features:
 * - Real-time status updates
 * - Error handling with detailed logs
 * - Build progress indication
 * - Development mode only visibility
 */
export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ExportError | null>(null);
  const { toast } = useToast();

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  /**
   * Handles export and build operations
   * Manages API interactions and error handling
   */
  const handleExport = async () => {
    try {
      setIsExporting(true);
      setIsSuccess(false);
      setBuildLogs([]);
      setErrorDetails(null);

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch: 'cms',
          exportType: 'cms'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          code: data.code || 'UNKNOWN_ERROR',
          details: data.details || [data.error || 'Unknown error occurred'],
          logs: data.logs || []
        };
      }

      setIsSuccess(true);
      if (data.logs) {
        setBuildLogs(data.logs);
      }

      toast({
        title: "Export Successful",
        description: "Static build has been exported to CMS branch successfully",
        duration: 5000,
      });
    } catch (error) {
      console.error('Export error:', error);
      const err = error as ExportError;
      setErrorDetails({
        code: err.code || 'UNKNOWN_ERROR',
        details: err.details || [(error as Error).message || 'An unexpected error occurred'],
        logs: err.logs || []
      });

      toast({
        title: "Export Failed",
        description: err.details?.[0] || "Failed to export static site. Please check the logs for details.",
        variant: "destructive",
        duration: 7000,
      });

      setBuildLogs(err.logs || [`Error: ${err.details?.[0] || 'Unknown error'}`]);
      setShowLogs(true);
    } finally {
      setTimeout(() => setIsSuccess(false), 2000);
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button 
          onClick={() => handleExport()}
          disabled={isExporting}
          variant="outline"
          size="sm"
          className={cn(
            "relative",
            errorDetails && "border-red-500"
          )}
        >
          {isExporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSuccess && <Check className="mr-2 h-4 w-4 text-green-500" />}
          {errorDetails && <AlertCircle className="mr-2 h-4 w-4 text-red-500" />}
          Export Schema Changes
        </Button>
      </div>

      <Dialog open={showLogs} onOpenChange={setShowLogs}>
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {errorDetails && <AlertCircle className="h-5 w-5 text-red-500" />}
              {errorDetails ? 'Build Error' : 'Build Logs'}
            </DialogTitle>
            <DialogDescription>
              {errorDetails && (
                <div className="mt-2 mb-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-md">
                  <p className="font-semibold text-red-700 dark:text-red-300">
                    Error Code: {errorDetails.code}
                  </p>
                  {errorDetails.details && errorDetails.details.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600 dark:text-red-400">
                      {errorDetails.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <pre className="mt-4 max-h-[60vh] overflow-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm font-mono">
                {buildLogs.join('\n')}
              </pre>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowLogs(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}