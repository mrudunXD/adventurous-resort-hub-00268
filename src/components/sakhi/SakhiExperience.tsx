import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send, User, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConsentModal from "@/components/sakhi/ConsentModal";
import QuickActions from "@/components/sakhi/QuickActions";
import {
  processUserMessage,
  type Message,
  type ConsentRequest,
} from "@/lib/sakhi/messageProcessor";

interface SakhiExperienceProps {
  embedded?: boolean;
}

const SakhiExperience: React.FC<SakhiExperienceProps> = ({ embedded = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "sakhi",
      text: "Namaste — I'm Sakhi. I can check your field, scan leaves, predict yield, and help lock a good price. What would you like to do?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [consentRequest, setConsentRequest] = useState<ConsentRequest | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    try {
      const response = await processUserMessage(text.trim(), messages);
      setMessages((prev) => [...prev, response.message]);

      if (response.requiresConsent) {
        setConsentRequest(response.consentRequest || null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "I'm having trouble processing that. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop?.();
        } catch (error) {
          console.error("Failed to stop speech recognition on unmount", error);
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleVoiceInput = async () => {
    if (isListening || isProcessing) {
      return;
    }

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice input. Please type instead.",
        variant: "destructive",
      });
      return;
    }

    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        toast({
          title: "Microphone blocked",
          description: "Please allow microphone access in your browser settings and try again.",
          variant: "destructive",
        });
        return;
      }
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = navigator.language || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      setIsListening(false);
      const results = event.results;
      if (!results?.length) {
        return;
      }
      const transcript = results[results.length - 1][0]?.transcript?.trim();
      if (transcript) {
        handleSendMessage(transcript);
      }
      recognition.stop();
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      recognition.stop();
      const errorType = event?.error;

      const description =
        errorType === "not-allowed"
          ? "Microphone permission denied. Please allow access and try again."
          : "Please try typing instead.";

      toast({
        title: "Voice input failed",
        description,
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Voice input failed",
        description: "Unable to start voice input. Please refresh and try again.",
        variant: "destructive",
      });
    }
  };

  const handleConsent = async (approved: boolean) => {
    if (!consentRequest) return;

    if (approved) {
      const consentLog = {
        timestamp: new Date().toISOString(),
        action: consentRequest.action,
        details: consentRequest.details,
        userId: "demo-user",
      };
      console.log("Consent granted:", consentLog);

      const confirmationMessage: Message = {
        id: Date.now().toString(),
        sender: "sakhi",
        text: `${consentRequest.confirmationMessage} Contract ID: ${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirmationMessage]);

      toast({
        title: "Contract Created",
        description: "Your forward contract has been created successfully.",
      });
    } else {
      const cancelMessage: Message = {
        id: Date.now().toString(),
        sender: "sakhi",
        text: "No problem. The contract was not created. Let me know if you need anything else.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cancelMessage]);
    }

    setConsentRequest(null);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const containerClass = embedded
    ? "flex flex-1 min-h-0 flex-col bg-background"
    : "h-screen flex flex-col bg-gradient-to-br from-primary/5 to-background";

  return (
    <div className={containerClass}>
      <div className="bg-white dark:bg-gray-900 border-b px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3 animate-slide-down">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-scale-in">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary animate-fade-in">Sakhi</h1>
            <p className="text-xs text-muted-foreground animate-fade-in">Your farm assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fade-in ${message.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "user" ? "bg-blue-500" : "bg-primary"
              }`}
            >
              {message.sender === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`flex flex-col max-w-[70%] ${
                message.sender === "user" ? "items-end" : ""
              }`}
            >
              <Card
                className={`${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <CardContent className="p-3 animate-fade-in">
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </CardContent>
              </Card>
              {message.quickActions && message.quickActions.length > 0 && (
                <QuickActions actions={message.quickActions} onAction={handleQuickAction} />
              )}
              <p className="text-xs text-muted-foreground mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Sakhi is thinking...</p>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-gray-900 border-t px-4 py-4">
        <div className="flex gap-2 animate-slide-up">
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            disabled={isListening || isProcessing}
            className={isListening ? "bg-red-100 border-red-300" : ""}
          >
            <Mic className={`w-5 h-5 ${isListening ? "text-red-500" : ""}`} />
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
            placeholder="Type your message..."
            disabled={isProcessing}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage(inputText)}
            disabled={isProcessing || !inputText.trim()}
            size="icon"
            className="transition-transform duration-200 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {consentRequest && (
        <ConsentModal
          isOpen={!!consentRequest}
          onClose={() => setConsentRequest(null)}
          consentRequest={consentRequest}
          onConsent={handleConsent}
        />
      )}
    </div>
  );
};

export default SakhiExperience;
