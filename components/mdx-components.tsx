import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "@/components/ui/code";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: 'default' | 'destructive' | 'info' | 'warning' | 'success';
  text: string;
}

const Callout = ({ type = 'default', text }: CalloutProps) => {
  return (
    <Alert variant={type}>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

const Pre = ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <pre className={cn(
      "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
      className
    )} {...props} />
  );
};

const Code = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  );
};

export const components = {
  Callout,
  pre: Pre,
  code: Code,
  // Add other MDX components here as needed
};