import { Button } from "./button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  onClick?: () => void;
  className?: string;
}

export function ExportButton({ onClick, className }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={className}
    >
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
}
