export type ExperienceLevel = "newbie" | "some" | "skilled";
export type ProjectType = "website" | "bugfix" | "automation" | "data" | "ai-setup" | "other";
export type PricingStrategy = "starter" | "normal" | "premium";
export type DeliveryTime = "24h" | "2-3d" | "1w" | "unknown";

export type ProposalInput = {
  job: string;
  level: ExperienceLevel;
  projectType: ProjectType;
  pricingStrategy: PricingStrategy;
  deliveryTime: DeliveryTime;
};

const riskKeywords = [
  "payment outside platform",
  "outside upwork",
  "telegram",
  "whatsapp",
  "crypto",
  "free test",
  "urgent but low budget",
  "no payment",
];

const beginnerFriendlyKeywords = ["wordpress", "landing page", "bug fix", "css", "html", "simple script", "small website"];
const complexKeywords = ["enterprise", "complex backend", "blockchain", "production database", "security", "large scale", "payment system"];

export function generateProposal(input: string | ProposalInput) {
  const data: ProposalInput = typeof input === "string"
    ? { job: input, level: "newbie", projectType: "website", pricingStrategy: "starter", deliveryTime: "2-3d" }
    : input;
  const job = data.job.trim();
  const lower = job.toLowerCase();
  const matchedRisks = riskKeywords.filter((keyword) => lower.includes(keyword));
  const friendlySignals = beginnerFriendlyKeywords.filter((keyword) => lower.includes(keyword));
  const complexSignals = complexKeywords.filter((keyword) => lower.includes(keyword));
  const tooShort = job.length < 80;
  const difficulty = complexSignals.length ? "复杂" : friendlySignals.length >= 2 ? "简单" : "中等";
  const feasible = !tooShort && !complexSignals.length && matchedRisks.length === 0;
  const beginnerRecommended = feasible && (friendlySignals.length > 0 || data.level !== "newbie");
  const hours = difficulty === "简单" ? "2-6 小时" : difficulty === "中等" ? "6-16 小时" : "16 小时以上，建议拆分评估";
  const price = getPriceAdvice(data.pricingStrategy, difficulty);
  const questions = [
    "Can you share the current website, repository, or screenshot of the issue?",
    "What result should be considered done for this task?",
    "Do you already have hosting, domain, and access credentials ready?",
    "Is there any deadline I should know before confirming the scope?",
  ];
  const risks = [
    tooShort ? "Job Posting 信息太短，建议先让客户补充技术栈、现状和验收标准。" : "",
    ...matchedRisks.map((keyword) => `出现高风险关键词：${keyword}。不要站外付款、站外沟通或接受不合理免费测试。`),
    ...complexSignals.map((keyword) => `复杂信号：${keyword}。新手不建议直接承诺完整交付。`),
  ].filter(Boolean);
  const baseProposal = `Hi, I read your job post and I can help you review the current issue first, clarify the scope, and suggest a careful fix.\n\nBefore promising a final delivery time, I would like to confirm the current setup, the expected result, and any screenshots or access details you can share. If the task is within the agreed scope, I can make the change, test it, and summarize what was done.\n\nI prefer to keep the process transparent and avoid over-promising.`;

  return {
    feasible,
    difficulty,
    beginnerAdvice: beginnerRecommended ? "可以谨慎投标，但要先问清楚范围。" : "不建议新手直接投标，建议先补充信息或放弃。",
    hours,
    price,
    risks: risks.length ? risks : ["暂未发现明显高风险词，但仍需人工审核客户需求。"],
    questions,
    proposal: baseProposal,
    shortProposal: "Hi, I can review the issue, confirm the scope, and help with a careful fix after checking the current setup.",
    safeProposal: `${baseProposal}\n\nTo keep this safe, I would start with a short inspection and only proceed after the scope is clear.`,
    notRecommendedReason: beginnerRecommended ? "" : "需求不清晰、风险偏高或复杂度超过新手阶段，直接投标容易造成交付压力。",
  };
}

function getPriceAdvice(strategy: PricingStrategy, difficulty: string) {
  if (difficulty === "复杂") return "建议不要直接报固定低价，先做 paid discovery 或请客户拆小范围。";
  if (strategy === "starter") return "新手低价起步可以，但不要低于沟通、测试和平台成本。";
  if (strategy === "premium") return "高价值报价需要清晰案例、交付边界和较强沟通能力。";
  return "按正常报价处理，说明包含检查、修改、测试和交付说明。";
}
