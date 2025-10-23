import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { type ConsentRequest } from '@/lib/sakhi/messageProcessor';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  consentRequest: ConsentRequest;
  onConsent: (approved: boolean) => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  consentRequest,
  onConsent,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmation Required</DialogTitle>
          <DialogDescription>
            Please review and confirm this action
          </DialogDescription>
        </DialogHeader>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">
            {consentRequest.consentText}
          </AlertDescription>
        </Alert>

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="font-semibold text-sm">Contract Details:</h4>
          <div className="text-sm space-y-1">
            {Object.entries(consentRequest.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              onConsent(false);
              onClose();
            }}
          >
            NO - Cancel
          </Button>
          <Button
            onClick={() => {
              onConsent(true);
              onClose();
            }}
            className="bg-primary hover:bg-primary/90"
          >
            YES - Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
