import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  content: string;
  variant?: 'default' | 'featured' | 'highlight';
  className?: string;
}

export const ContentBlock: FC<ContentBlockProps> = ({
  content,
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        'prose dark:prose-invert max-w-none',
        {
          'bg-muted p-6 rounded-lg': variant === 'featured',
          'border-l-4 border-primary pl-4': variant === 'highlight',
        },
        className
      )}
    >
      {content}
    </div>
  );
};

export const CalloutBlock: FC<{
  type: 'info' | 'warning' | 'error';
  content: string;
}> = ({ type, content }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  };

  return (
    <div className={cn('p-4 rounded-md border', styles[type])}>
      {content}
    </div>
  );
};

export const CodeBlock: FC<{
  language: string;
  code: string;
}> = ({ language, code }) => {
  return (
    <pre className="relative rounded-lg bg-muted p-4">
      <div className="absolute top-3 right-3 text-xs text-muted-foreground">
        {language}
      </div>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};
