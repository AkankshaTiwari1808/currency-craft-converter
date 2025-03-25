
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TransitionLayoutProps {
  children: ReactNode;
  className?: string;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div 
      className={cn(
        "w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 animated-bg",
        className
      )}
    >
      <div className="w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
};

export default TransitionLayout;
