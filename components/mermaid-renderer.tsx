import { useRef, useEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidElementProps {
  value: string;  // The mermaid diagram markup
}

export default function MermaidElement({ value }: MermaidElementProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      });

      try {
        // Use the proper async render method
        mermaid.contentLoaded();
      } catch (error) {
        console.error('Error rendering mermaid diagram:', error);
      }
    }
  }, [value]); // Re-run when value changes

  return (
    <div contentEditable={false}>
      <div ref={mermaidRef}>
        <pre className="mermaid" suppressHydrationWarning>{value}</pre>
      </div>
    </div>
  );
}