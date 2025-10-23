export interface Message {
  id: string;
  sender: 'user' | 'sakhi';
  text: string;
  timestamp: Date;
  quickActions?: string[];
}

export interface ConsentRequest {
  action: string;
  consentText: string;
  details: Record<string, string>;
  confirmationMessage: string;
}

export interface ProcessedResponse {
  message: Message;
  requiresConsent: boolean;
  consentRequest?: ConsentRequest;
}

// NLU - Intent classification (simplified for demo)
function classifyIntent(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.match(/show|list|what.*field/i)) return 'ListFields';
  if (lowerText.match(/add|register|new.*field/i)) return 'AddField';
  if (lowerText.match(/predict|yield|harvest|how much/i)) return 'PredictYield';
  if (lowerText.match(/scan|photo|pest|disease|leaf/i)) return 'ScanPhoto';
  if (lowerText.match(/hedge|lock.*price|protect|forward/i)) return 'RecommendHedge';
  if (lowerText.match(/create.*contract|yes.*create|confirm/i)) return 'CreateContract';
  if (lowerText.match(/remind|reminder|schedule/i)) return 'SetReminder';
  if (lowerText.match(/verify|proof|harvest/i)) return 'VerifyHarvest';
  if (lowerText.match(/why|explain|reason/i)) return 'ExplainWhy';
  if (lowerText.match(/help|human|officer|call/i)) return 'EscalateToHuman';
  
  return 'Unknown';
}

// Extract slots from user message
function extractSlots(text: string, intent: string): Record<string, string> {
  const slots: Record<string, string> = {};
  
  // Extract field references
  const fieldMatch = text.match(/field\s+([A-Za-z0-9]+)/i);
  if (fieldMatch) slots.field_id = fieldMatch[1];
  
  // Extract quantities
  const quantityMatch = text.match(/(\d+(?:\.\d+)?)\s*(ton|kg|quintal)/i);
  if (quantityMatch) {
    slots.quantity = quantityMatch[1];
    slots.unit = quantityMatch[2];
  }
  
  // Extract prices
  const priceMatch = text.match(/₹?\s*(\d+(?:\.\d+)?)/i);
  if (priceMatch && intent === 'CreateContract') {
    slots.price = priceMatch[1];
  }
  
  return slots;
}

// Generate response based on intent
async function generateResponse(intent: string, slots: Record<string, string>, context: Message[]): Promise<ProcessedResponse> {
  const messageId = Date.now().toString();
  
  switch (intent) {
    case 'ListFields':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `You have 3 registered fields:

**Field A** - Groundnut, 2.5 acres, Sowing: Mar 15
**Field B** - Mustard, 1.8 acres, Sowing: Oct 10  
**Field C** - Soybean, 3.2 acres, Sowing: Jun 20

Which field would you like to know more about?`,
          timestamp: new Date(),
          quickActions: ['Predict yield for Field A', 'Check Field B health', 'Scan photo']
        },
        requiresConsent: false
      };

    case 'PredictYield':
      const field = slots.field_id || 'A';
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `**Yield Prediction for Field ${field}**

🌾 Expected yield: **1.2 tons** (12 quintals)
📊 Confidence: **High (85%)**

**Top 3 drivers:**
1. Soil moisture at optimal levels
2. Weather patterns favorable  
3. Growth stage on track

**Expected benefit:** ₹42,000 estimated revenue at current market price

Would you like me to recommend a hedging strategy?`,
          timestamp: new Date(),
          quickActions: ['Recommend hedge', 'Set harvest reminder', 'More details']
        },
        requiresConsent: false
      };

    case 'ScanPhoto':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `**Pest Detection Result**

🔍 Detected: **Leaf spot disease**
⚠️ Severity: **Medium**

**Recommended action:**
Apply copper-based fungicide within 3 days. Spray in early morning or late evening.

**Expected benefit:** Prevents 15-20% yield loss if treated now.
**Confidence:** High

Would you like me to set a spray reminder?`,
          timestamp: new Date(),
          quickActions: ['Set reminder for tomorrow 6am', 'Contact extension officer', 'More info']
        },
        requiresConsent: false
      };

    case 'RecommendHedge':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `**Hedge Recommendation**

📈 I suggest hedging **60%** (0.7 tons) of your expected harvest

**Reason:** Current price ₹4,200/quintal is 8% above 30-day average. Market forecast shows potential decline next month.

**Expected benefit:** Lock in ₹29,400 revenue, protect against 10-15% price drop

**Confidence:** Medium

Would you like me to create a forward contract?`,
          timestamp: new Date(),
          quickActions: ['Yes, create contract', 'Explain more', 'No thanks']
        },
        requiresConsent: false
      };

    case 'CreateContract':
      const quantity = slots.quantity || '0.7';
      const price = slots.price || '4200';
      const crop = 'groundnut';
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 90);
      
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I will create a forward contract with these terms. Please review and confirm:`,
          timestamp: new Date(),
        },
        requiresConsent: true,
        consentRequest: {
          action: 'CreateContract',
          consentText: `I will create a forward contract for ${quantity} tons of ${crop} at ₹${price}/quintal for delivery on ${deliveryDate.toLocaleDateString()}. This is a binding contract. Do you consent?`,
          details: {
            crop: 'Groundnut',
            quantity: `${quantity} tons`,
            price: `₹${price}/quintal`,
            total_value: `₹${(parseFloat(quantity) * 10 * parseFloat(price)).toLocaleString()}`,
            delivery_date: deliveryDate.toLocaleDateString(),
          },
          confirmationMessage: '✅ Contract created successfully!'
        }
      };

    case 'SetReminder':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `✅ Reminder set!

I'll notify you tomorrow at 7:00 AM to spray fungicide on Field A.

You'll receive:
- SMS alert
- App notification
- Weather check before spraying

Is there anything else I can help with?`,
          timestamp: new Date(),
          quickActions: ['Check other fields', 'Predict yield', 'View all reminders']
        },
        requiresConsent: false
      };

    case 'VerifyHarvest':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `**Harvest Verification Process**

To settle your contract, I need:
1. ✅ Photo of harvested crop (upload below)
2. ⏳ Satellite snapshot (auto-captured)
3. ⏳ Extension officer signoff

Please upload a photo of your harvest to begin verification.`,
          timestamp: new Date(),
          quickActions: ['Upload photo', 'Request extension visit', 'View contract']
        },
        requiresConsent: false
      };

    case 'ExplainWhy':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Let me explain my recommendation:

**Market Analysis:**
- Current groundnut price: ₹4,200/quintal
- 30-day average: ₹3,890/quintal  
- You're at +8% premium

**Risk Factors:**
- Forecasted supply increase next month
- Historical price decline pattern in similar conditions
- Your harvest timing aligns with peak market supply

**Why 60% hedge:**
- Locks good current price for majority
- Keeps 40% flexible for potential upside
- Balanced risk/reward approach

Confidence: Medium (historical pattern match 68%)`,
          timestamp: new Date(),
          quickActions: ['Create contract', 'Ask more questions', 'No thanks']
        },
        requiresConsent: false
      };

    case 'EscalateToHuman':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I understand you'd like to speak with an extension officer.

📞 **Officer Contact:**
Name: Rajesh Kumar
Phone: +91-98765-43210
Available: Mon-Sat, 9 AM - 5 PM

I've created a callback request. You should receive a call within 2 hours.

Would you like me to schedule an in-person visit instead?`,
          timestamp: new Date(),
          quickActions: ['Schedule visit', 'Send SMS to officer', 'Continue with Sakhi']
        },
        requiresConsent: false
      };

    default:
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I'm not fully sure what you need. Here's what I can help with:

🌾 **Check fields** - View field status and predictions
🔍 **Scan photos** - Detect pests and diseases  
📊 **Predict yield** - Get harvest estimates
🔒 **Lock prices** - Create forward contracts
⏰ **Set reminders** - Schedule farm tasks

What would you like to try?`,
          timestamp: new Date(),
          quickActions: ['Show my fields', 'Scan photo', 'Predict yield', 'Recommend hedge']
        },
        requiresConsent: false
      };
  }
}

// Main processor
export async function processUserMessage(text: string, context: Message[]): Promise<ProcessedResponse> {
  // Classify intent
  const intent = classifyIntent(text);
  
  // Extract slots
  const slots = extractSlots(text, intent);
  
  // Generate response
  const response = await generateResponse(intent, slots, context);
  
  return response;
}
