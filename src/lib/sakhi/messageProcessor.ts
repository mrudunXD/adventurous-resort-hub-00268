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

  if (/(^|\b)(hi|hello|hey|namaste)\b/.test(lowerText)) return 'Greeting';

  if (/create\b.*contract|forward contract|confirm.*contract|lock price.*contract/.test(lowerText)) return 'CreateContract';
  if (/(set|schedule)\b.*reminder|remind me\b/.test(lowerText)) return 'SetReminder';
  if (/show\b.*reminder|upcoming reminders|turn off reminders|cancel.*reminder|change.*reminder|snooze.*reminder/.test(lowerText)) return 'ReminderManagement';

  if (/(show|list)\b.*field|which fields|my fields\b/.test(lowerText)) return 'ListFields';

  if (/add.*field|register.*field|draw.*field|upload.*boundary|update.*field|rename.*field|delete.*field|merge.*field|split.*field|soil test.*field|sowing date|set crop/.test(lowerText)) {
    return 'FieldManagement';
  }

  if (/(predict|expected yield|how much.*harvest|harvest from|yield per hectare)/.test(lowerText)) return 'PredictYield';
  if (/yield forecast|yield history|compare.*yield|confidence level|downside risk|simulate yield|why did you predict/.test(lowerText)) return 'YieldInsights';

  if (/scan.*leaf|upload.*photo|identify.*pest|disease photo/.test(lowerText)) return 'ScanPhoto';
  if (/pest|disease|aphids|fungus|spray|treatment|dose|outbreak|blight/.test(lowerText)) return 'PestDiseaseSupport';

  if (/hedge|lock.*price|protect income|forward hedge/.test(lowerText)) return 'RecommendHedge';
  if (/what is hedging|hedge percentage|settlement date|contract history|contract dispute|join fpo|fee for hedging|profit\/loss/.test(lowerText)) return 'HedgingFinance';

  if (/verify|verification|proof|evidence|claim|incentive/.test(lowerText)) return 'VerificationSupport';

  if (/weather|forecast|rain|heatwave|frost|drought|monsoon/.test(lowerText)) return 'WeatherAlerts';

  if (/irrigat|soil moisture|water does field|postpone irrigation/.test(lowerText)) return 'IrrigationSupport';

  if (/fertilizer|urea|dap|n\/p\/k|micronutrient|organic fertilizer|fertilizer cost|soil health card/.test(lowerText)) return 'FertilizerSoil';

  if (/seed variety|buy seed|certified seed|hybrid seed|seed quantity|seed cost|subsidized seeds|store seeds/.test(lowerText)) return 'SeedsInputs';

  if (/what should i do this week|step-by-step plan|planting schedule|spacing between rows|labour will i need|cheapest source of quality seed/.test(lowerText)) return 'AgronomyAdvice';

  if (/price|sell my harvest|mandi|buyer|price trends|highest price|distress sale|notify me when price/.test(lowerText)) return 'MarketPrices';

  if (/wallet balance|payment|payout|bank account|invoice|auto-payout/.test(lowerText)) return 'PaymentSupport';

  if (/extension officer|pilot program|report a problem|claim subsidy|agri center|fpo contact|contract dispute|appeal/.test(lowerText)) return 'AdminSupport';

  if (/teach me|learn about|short video|best practices|checklist|simple explanation/.test(lowerText)) return 'LearningResources';

  if (/app|crash|notifications|clear cache|update the app|can't login|can't log in|can't sign in/.test(lowerText)) return 'Troubleshooting';

  if (/help|human|officer|call/.test(lowerText)) return 'EscalateToHuman';

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
    case 'Greeting':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Namaste! I'm Sakhi, your farm assistant. I can help you manage fields, predict yield, track prices, and much more.

Here are a few things you can ask:
• "Show my fields"
• "Predict yield for Field A"
• "What is today's mustard price?"
• "Set reminder to irrigate Field B"`,
          timestamp: new Date(),
          quickActions: ['Show my fields', 'Predict yield for Field A', 'Market prices', 'Set reminder']
        },
        requiresConsent: false
      };

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

    case 'FieldManagement':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I can help you manage field records. Tell me which field and the task you need.

Common actions:
1. Register or draw a new field boundary
2. Update crop, sowing date, or acreage
3. Merge, split, or delete a field
4. Attach soil tests or harvest status`,
          timestamp: new Date(),
          quickActions: ['Add a new field', 'Update field area', 'Change sowing date', 'Add soil test']
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

    case 'YieldInsights':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Here is how I analyse yield trends:

• Historical comparison: Year-over-year yield, weather, and input usage
• Risk scenarios: downside risk bands and confidence intervals
• What-if tools: simulate rainfall, fertilizer, or sowing date changes

Would you like a detailed report for a specific field?`,
          timestamp: new Date(),
          quickActions: ['Show yield history', 'Explain prediction confidence', 'Simulate rainfall impact']
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

    case 'PestDiseaseSupport':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `To control pests and diseases I need to know:

• Crop and growth stage
• Symptoms or photos
• Recent sprays and weather conditions

I can recommend scouting steps, treatment doses, and safe spray timings.`,
          timestamp: new Date(),
          quickActions: ['Scan this leaf', 'Recommended pesticide', 'Set spray reminder']
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

    case 'HedgingFinance':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I can guide you on hedging and contracts:

• Explain hedging concepts and risks
• Show active or past forward contracts
• Simulate profit/loss for different hedge percentages
• Connect you with FPO pooling options`,
          timestamp: new Date(),
          quickActions: ['What is hedging?', 'Show my active contracts', 'Simulate profit/loss', 'Join FPO pooling']
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

    case 'ReminderManagement':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Here are your reminder options:

• View upcoming reminders for sprays, irrigation, or harvest
• Edit time, snooze, or cancel a reminder
• Turn reminders off for a specific field`,
          timestamp: new Date(),
          quickActions: ['Show my upcoming reminders', 'Change reminder time', 'Cancel reminder']
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

    case 'VerificationSupport':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Verification support includes:

1. Uploading photo or satellite proof
2. Tracking claim / incentive status
3. Resubmitting evidence after rejection
4. Coordinating extension officer visits`,
          timestamp: new Date(),
          quickActions: ['Upload verification photo', 'Check claim status', 'Resubmit evidence', 'Contact extension officer']
        },
        requiresConsent: false
      };

    case 'WeatherAlerts':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Weather dashboard highlights:

• 7-day forecast for each field
• Rain, heatwave, frost, and drought alerts
• Spray suitability windows and irrigation guidance

Would you like me to send alerts when rain is expected?`,
          timestamp: new Date(),
          quickActions: ['Show 7-day weather', 'Notify me about rain', 'Best spray window']
        },
        requiresConsent: false
      };

    case 'IrrigationSupport':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I monitor soil moisture, crop stage, and forecast to advise irrigation.

Ask me to:
• Calculate water requirement per field
• Schedule and remind irrigation events
• Delay irrigation if rainfall is expected`,
          timestamp: new Date(),
          quickActions: ['Water requirement for Field A', 'Schedule irrigation', 'Delay due to rain']
        },
        requiresConsent: false
      };

    case 'FertilizerSoil':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Fertilizer planner covers:

• Soil test interpretation and missing nutrients
• N/P/K dose, micronutrients, and organic options
• Cost-saving tips and irrigation timing after application`,
          timestamp: new Date(),
          quickActions: ['Recommend fertilizer for groundnut', 'Explain soil health card', 'Suggest organic options']
        },
        requiresConsent: false
      };

    case 'SeedsInputs':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Seed advisory can help you:

• Compare varieties for oil content and climate
• Estimate seed quantity and cost by acreage
• Locate certified or subsidised suppliers
• Learn safe storage practices`,
          timestamp: new Date(),
          quickActions: ['Best seed for my soil', 'Estimate seed quantity', 'Find certified seed', 'Seed storage tips']
        },
        requiresConsent: false
      };

    case 'AgronomyAdvice':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Here's how I build weekly agronomy plans:

• Crop stage-wise tasks (fertilizer, irrigation, protection)
• Labour estimates and scheduling
• Weather-adjusted recommendations and step-by-step guides`,
          timestamp: new Date(),
          quickActions: ['This week’s tasks', 'Step-by-step plan for Field A', 'Adjust sowing date']
        },
        requiresConsent: false
      };

    case 'MarketPrices':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Market intelligence provides:

• Live mandi prices and buyer contacts
• 30 & 90-day price forecasts
• Price alerts to avoid distress sales
• Best time-to-sell guidance`,
          timestamp: new Date(),
          quickActions: ['Today’s mandi price', '30-day price forecast', 'Set price alert', 'Nearby buyers']
        },
        requiresConsent: false
      };

    case 'PaymentSupport':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Wallet & payouts support includes:

• Viewing balances and settlement timelines
• Requesting payouts to bank account or UPI
• Downloading invoices and payment history
• Enabling auto-payout on settlement`,
          timestamp: new Date(),
          quickActions: ['Show wallet balance', 'Request payout', 'Payout history', 'Enable auto-payout']
        },
        requiresConsent: false
      };

    case 'AdminSupport':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `I can connect you with support teams:

• Extension officer calls or field visits
• Pilot programs, subsidies, and grievance redressal
• Reporting app issues or contract disputes`,
          timestamp: new Date(),
          quickActions: ['Contact extension officer', 'Report a problem', 'Request field visit', 'Claim subsidy help']
        },
        requiresConsent: false
      };

    case 'LearningResources':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Learning library offers:

• Bite-sized explainers on hedging, pests, soil, and more
• Videos, checklists, and best-practice guides
• Region-specific recommendations and FAQs`,
          timestamp: new Date(),
          quickActions: ['Teach me about hedging', 'Fertilizer timing video', 'Sowing checklist', 'Soil test guide']
        },
        requiresConsent: false
      };

    case 'Troubleshooting':
      return {
        message: {
          id: messageId,
          sender: 'sakhi',
          text: `Let’s fix app issues together:

• Login problems, crashes, or missing notifications
• Language change, cache refresh, or updates
• Upload and prediction troubleshooting`,
          timestamp: new Date(),
          quickActions: ['App not uploading photo', 'Change language', 'Refresh app data', 'Update the app']
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

export async function processUserMessage(text: string, context: Message[]): Promise<ProcessedResponse> {
  const intent = classifyIntent(text);
  const slots = extractSlots(text, intent);
  const response = await generateResponse(intent, slots, context);
  return response;
}
