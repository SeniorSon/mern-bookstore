import React from "react";
import { cn } from "../../lib/Utils";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "default", 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
       "px-4 py-2 text-white rounded-md transition appearance-none border-none",
        variant === "destructive" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
