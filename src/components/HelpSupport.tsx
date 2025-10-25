import { useNavigate } from "react-router-dom";
import { HelpCircle, Phone, MessageCircle, Video, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HelpSupport = () => {
  const navigate = useNavigate();

  const handleContactSupport = () => {
    navigate("/support/contact");
  };

  const handleFAQs = () => {
    navigate("/support/faqs");
  };

  const handleTutorials = () => {
    navigate("/support/tutorials");
  };

  const handleEmergencyHelpline = () => {
    window.open("tel:+918001234567");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-help-support"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleFAQs} data-testid="menu-item-faqs">
          <FileQuestion className="mr-2 h-4 w-4" />
          <span>FAQs</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleContactSupport} data-testid="menu-item-contact-support">
          <MessageCircle className="mr-2 h-4 w-4" />
          <span>Contact Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTutorials} data-testid="menu-item-tutorials">
          <Video className="mr-2 h-4 w-4" />
          <span>Video Tutorials</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleEmergencyHelpline}
          className="text-destructive focus:text-destructive"
          data-testid="menu-item-emergency-helpline"
        >
          <Phone className="mr-2 h-4 w-4" />
          <span>Emergency Helpline</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HelpSupport;
