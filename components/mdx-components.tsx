import React from 'react';
import { Alert, AlertDescription } from "./ui/alert";

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'error';
  text: string;
}

const Callout = ({ type, text }: CalloutProps) => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <Alert className={`my-4 ${variants[type]}`}>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export const components = {
  callout: Callout
};
