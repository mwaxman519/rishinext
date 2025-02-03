import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error';
  text: string;
}

const Callout = ({ type, text }: CalloutProps) => {
  return (
    <Alert variant={type}>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export const components = {
  Callout,
  // Add other MDX components here
};