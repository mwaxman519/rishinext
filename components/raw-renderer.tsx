import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLayout } from "./layout/layout-context";

interface RawRendererProps {
  rawData: unknown;
  parentColor: string;
}

export const RawRenderer = ({ rawData, parentColor }: RawRendererProps) => {
  const { theme } = useLayout();
  const buttonColorClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-600",
  };
  const [isOpen, setIsOpen] = useState(false);

  const buttonColor = theme.color ? buttonColorClasses[theme.color] : buttonColorClasses.blue;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`z-10 relative flex items-center px-5 py-2 mx-3 my-2 font-semibold text-sm transition duration-150 ease-out rounded transform focus:shadow-outline focus:outline-none whitespace-nowrap opacity-80 hover:opacity-100 shadow-md ${buttonColor}`}
        >
          View Raw Data
          <span
            className={`absolute w-full h-full left-0 top-0 rounded -z-1 ${
              parentColor === "primary"
                ? `bg-white opacity-80`
                : `bg-current opacity-15`
            }`}
          ></span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="max-h-[80vh] overflow-auto">
          <pre className="p-4 bg-background rounded-lg">
            <code>{JSON.stringify(rawData, null, 2)}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};