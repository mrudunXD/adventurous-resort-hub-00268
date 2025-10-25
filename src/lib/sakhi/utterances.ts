export type SakhiUtteranceCategory =
  | "onboarding"
  | "fieldManagement"
  | "yieldForecasts"
  | "agronomy"
  | "pestDisease"
  | "weatherAlerts"
  | "irrigation"
  | "fertilizerSoil"
  | "seedsInputs"
  | "marketPrices"
  | "hedgingFinance"
  | "verification"
  | "reminders"
  | "support"
  | "payments"
  | "learning"
  | "troubleshooting";

export interface SakhiUtteranceGroup {
  id: SakhiUtteranceCategory;
  title: string;
  description: string;
  utterances: string[];
}

export const sakhiUtteranceCatalog: SakhiUtteranceGroup[] = [
  {
    id: "onboarding",
    title: "Onboarding & Account",
    description:
      "Account creation, login, profile, language, permissions, and related onboarding flows.",
    utterances: [
      "Hi",
      "Hello",
      "Create my account",
      "Sign me up",
      "Login",
      "I forgot my password",
      "Update my profile",
      "Change my language to Hindi",
      "Change my name",
      "Add my phone number",
      "Link my FPO",
      "How do I change my phone number?",
      "How do I delete my account?",
      "What permissions do you need?"
    ]
  },
  {
    id: "fieldManagement",
    title: "Field management",
    description:
      "Field registration, editing details, boundary updates, and agronomic metadata management.",
    utterances: [
      "Add a new field",
      "Register my field",
      "Draw my field on the map",
      "Upload field boundary",
      "Update field area to 2 acres",
      "Rename Field A to Field1",
      "Delete Field B",
      "Show my fields",
      "Which fields do I have?",
      "Show details for Field 2",
      "When did I sow Field C?",
      "Set crop for Field 3 to mustard",
      "Change sowing date for Field A",
      "Mark Field D as harvested",
      "Merge these two fields",
      "Split this field into two",
      "Add soil test result to Field A",
      "What is the size of Field X?"
    ]
  },
  {
    id: "yieldForecasts",
    title: "Yield & Forecasts",
    description:
      "Yield predictions, historical comparisons, scenario simulations, and confidence/risk queries.",
    utterances: [
      "Predict yield for Field A",
      "What will my yield be this season?",
      "How much can I harvest from Field 2?",
      "Show yield forecast for next month",
      "What is the expected yield per hectare?",
      "What is the confidence level of the prediction?",
      "Why did you predict this yield?",
      "Show me the yield history for my fields",
      "Compare this year’s yield to last year",
      "If I apply extra fertilizer, how will yield change?",
      "Simulate yield if it rains 20 mm more this month",
      "What is the downside risk for my yield?",
      "How accurate is your prediction for Field A?"
    ]
  },
  {
    id: "agronomy",
    title: "Agronomy / Recommendations",
    description:
      "Weekly tasks, fertilizer, irrigation, planting schedules, and labour/resource needs.",
    utterances: [
      "What should I do this week?",
      "What fertilizer do I need?",
      "How much urea should I apply?",
      "When should I irrigate next?",
      "Which seed variety should I plant?",
      "Which seed variety is best for my soil?",
      "Tell me a planting schedule",
      "How many days after sowing should I apply fertilizer?",
      "Do I need pesticide now?",
      "Give me a step-by-step plan for Field A",
      "How to improve soil health?",
      "Should I change sowing date because of rain?",
      "What is the recommended spacing between rows?",
      "How much labour will I need per acre?",
      "What is the cheapest source of quality seed near me?"
    ]
  },
  {
    id: "pestDisease",
    title: "Pest & Disease",
    description:
      "Crop health diagnosis, pest identification, treatments, and disease risk monitoring.",
    utterances: [
      "Scan this leaf",
      "What is wrong with my crop?",
      "Is this disease or insect damage?",
      "Identify this pest",
      "What treatment do I need for this disease?",
      "What pesticide to use against aphids?",
      "How soon should I spray?",
      "What dose should I use?",
      "Will this treatment affect my yield?",
      "Is it safe to spray before harvest?",
      "Does this disease spread to other fields?",
      "How to prevent this disease?",
      "Show nearby pest outbreaks",
      "Is my field at risk of rust/blight?",
      "I think my crop has fungus — what do I do?"
    ]
  },
  {
    id: "weatherAlerts",
    title: "Weather & Alerts",
    description:
      "Short- and medium-term weather forecasts, alerts, and impact analysis on crops.",
    utterances: [
      "What is the forecast for my village?",
      "Will it rain tomorrow?",
      "Show 7-day weather for Field A",
      "Is a heatwave coming?",
      "Notify me when it will rain",
      "Alert me if frost is forecast",
      "Should I delay irrigation because of rain?",
      "How will the weather affect my crop this month?",
      "Is there drought warning for my area?",
      "When is the best time to spray (no rain expected)?"
    ]
  },
  {
    id: "irrigation",
    title: "Irrigation & Water Management",
    description:
      "Water scheduling, reminders, method selection, soil moisture, and efficiency guidance.",
    utterances: [
      "When should I irrigate Field A?",
      "How much water does Field A need?",
      "Will irrigation increase yield?",
      "What irrigation method is best?",
      "Schedule irrigation for tomorrow 6 am",
      "Remind me to irrigate every 7 days",
      "How to save water while irrigating?",
      "Is soil moisture low in my field?",
      "Do I need to postpone irrigation due to rain?"
    ]
  },
  {
    id: "fertilizerSoil",
    title: "Fertilizer & Soil",
    description:
      "Soil testing, nutrient recommendations, input optimization, and organic options.",
    utterances: [
      "Test my soil",
      "What nutrients are missing?",
      "How much N/P/K to apply?",
      "Recommend fertilizer for groundnut",
      "Is urea enough or need DAP?",
      "How to interpret soil health card?",
      "Do I need micronutrients?",
      "How to reduce fertilizer cost?",
      "Suggest organic fertilizer options",
      "How long to wait after fertilizer before irrigation?"
    ]
  },
  {
    id: "seedsInputs",
    title: "Seeds & Inputs",
    description: "Seed selection, sourcing, cost, quantity, and storage guidance.",
    utterances: [
      "Which seed variety gives highest oil content?",
      "Where can I buy certified seed near me?",
      "Is hybrid seed better for my field?",
      "Estimate seed quantity for 2 acres",
      "What is the cost of seed variety X?",
      "Are there subsidized seeds available?",
      "How to store seeds properly?"
    ]
  },
  {
    id: "marketPrices",
    title: "Market Prices & Selling",
    description:
      "Mandi information, price trends, selling opportunities, alerts, and risk mitigation.",
    utterances: [
      "What is today’s mustard price in my mandi?",
      "Show price trends for soybean last 30 days",
      "Where can I sell my harvest?",
      "Who is buying in my district?",
      "Compare prices at nearby mandis",
      "Show forecasted price for next 30 days",
      "Is it a good time to sell now?",
      "What is the highest price last week?",
      "Notify me when price > ₹X",
      "How to avoid distress sale?"
    ]
  },
  {
    id: "hedgingFinance",
    title: "Hedging, Contracts & Finance",
    description:
      "Risk management, contract lifecycle, financial simulations, and FPO participation.",
    utterances: [
      "What is hedging?",
      "How much should I hedge for Field A?",
      "Recommend hedge percentage",
      "Create forward contract for 1 ton at ₹X",
      "Cancel my contract with Agrotech Ltd",
      "Show my active contracts",
      "What is the settlement date for contract #123?",
      "How much will I get if the contract settles?",
      "What is the fee for hedging?",
      "Explain the risk of hedging",
      "Simulate profit/loss for hedging 40%",
      "How to join FPO for pooling?",
      "Show me my contract history",
      "Dispute a contract settlement"
    ]
  },
  {
    id: "verification",
    title: "Verification, Proofs & Incentives",
    description:
      "Document submission, verification status, incentive requirements, and officer coordination.",
    utterances: [
      "Upload photo for verification",
      "How to take a proof photo?",
      "Submit harvest evidence for contract #123",
      "What proofs do I need for incentive?",
      "Check verification status for my claim",
      "Why was my verification rejected?",
      "Resubmit evidence for verification",
      "Which extension officer will verify?"
    ]
  },
  {
    id: "reminders",
    title: "Reminders & Scheduling",
    description:
      "Task scheduling, recurring reminders, snoozing, and reminder management across fields.",
    utterances: [
      "Set reminder to spray Field A tomorrow 7am",
      "Remind me to check pests every 3 days",
      "Cancel reminder for irrigation",
      "Change reminder to 6 pm",
      "Show my upcoming reminders",
      "Turn off reminders for Field B",
      "Snooze reminder for 1 day"
    ]
  },
  {
    id: "support",
    title: "Admin / Support / Extension",
    description:
      "Extension officer coordination, support tickets, subsidies, and dispute resolution.",
    utterances: [
      "Contact my extension officer",
      "Call extension officer now",
      "Schedule field visit by extension officer",
      "How to join the pilot program?",
      "Report a problem with app",
      "How do I claim subsidy?",
      "Where is the nearest agri center?",
      "Who is my FPO contact?",
      "Request help for contract dispute",
      "How to appeal a verification decision?"
    ]
  },
  {
    id: "payments",
    title: "Payments, Wallet & Payouts",
    description:
      "Wallet management, payout tracking, bank linkage, invoicing, and settlement controls.",
    utterances: [
      "Show my wallet balance",
      "When will I receive payment for contract #123?",
      "Request payout to bank account",
      "Add bank account",
      "Show payout history",
      "Why was my payment delayed?",
      "Download invoice for payout",
      "Set auto-payout on settlement"
    ]
  },
  {
    id: "learning",
    title: "Learning & Education",
    description:
      "Knowledge resources, explainer content, best practices, and learning assets.",
    utterances: [
      "Teach me about hedging",
      "How to control aphids?",
      "Short video on fertilizer timing",
      "Show me best practices for oilseed",
      "Give me a checklist for sowing",
      "Where can I learn about soil tests?",
      "Simple explanation: confidence in prediction"
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting & App Help",
    description:
      "App support requests, error reporting, configuration, and update guidance.",
    utterances: [
      "App is not uploading photo",
      "I can’t login",
      "I don’t get notifications",
      "App crashed when I pressed submit",
      "How to change language?",
      "How to clear cache or refresh data?",
      "Why is prediction not loading?",
      "How to update the app?"
    ]
  }
];

export const sakhiUtteranceIndex = sakhiUtteranceCatalog.reduce(
  (acc, group) => {
    group.utterances.forEach((utterance) => {
      acc.set(utterance.toLowerCase(), group.id);
    });
    return acc;
  },
  new Map<string, SakhiUtteranceCategory>()
);

export function getSakhiUtterancesByCategory(category: SakhiUtteranceCategory) {
  return sakhiUtteranceCatalog.find((group) => group.id === category);
}

export function findSakhiCategoryForUtterance(utterance: string) {
  return sakhiUtteranceIndex.get(utterance.toLowerCase()) ?? null;
}
