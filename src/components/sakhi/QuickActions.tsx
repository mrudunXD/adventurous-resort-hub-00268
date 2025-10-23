import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  actions: string[];
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onAction }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onAction(action)}
          className="text-xs"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
