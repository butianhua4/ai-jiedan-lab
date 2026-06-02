export type PricingInput = {
  projectType: string;
  hours: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  urgent: boolean;
  communicationHeavy: boolean;
  maintenance: boolean;
  platformFeeRate: number;
};

export function calculatePricing(
  inputOrHours: PricingInput | number,
  difficulty = "beginner",
  urgent = false,
  communication = false,
  maintenance = false,
  feeRate = 10,
) {
  const input: PricingInput =
    typeof inputOrHours === "number"
      ? {
          projectType: "网站开发",
          hours: inputOrHours,
          difficulty: difficulty as PricingInput["difficulty"],
          urgent,
          communicationHeavy: communication,
          maintenance,
          platformFeeRate: feeRate,
        }
      : inputOrHours;

  const safeHours = Math.max(1, Math.min(input.hours || 1, 200));
  const baseRate = input.difficulty === "advanced" ? 35 : input.difficulty === "intermediate" ? 22 : 12;
  const multiplier =
    1 + (input.urgent ? 0.25 : 0) + (input.communicationHeavy ? 0.15 : 0) + (input.maintenance ? 0.2 : 0);
  const fee = Math.min(Math.max(input.platformFeeRate, 0), 40) / 100;
  const normal = Math.ceil((safeHours * baseRate * multiplier) / (1 - fee));
  const minimum = Math.max(20, Math.ceil(normal * 0.7));
  const high = Math.ceil(normal * 1.5);
  const floor = Math.max(15, Math.ceil(normal * 0.55));

  return {
    minimum,
    normal,
    high,
    floor,
    beginnerReminder:
      "新手可以用相对谨慎的报价换取练习机会，但不能低到覆盖不了沟通、测试、修改和平台抽成成本。不要为了成交承诺自己无法完成的范围。",
    explanation: `${input.projectType} 按 ${safeHours} 小时、${difficultyLabel(input.difficulty)} 难度、平台抽成 ${input.platformFeeRate}% 粗略估算。结果只适合作为报价参考，不保证成交。`,
    note: "报价仅供参考，不构成收入承诺。真实报价要结合客户预算、需求清晰度、交付风险、验收标准和你的真实能力。",
  };
}

export function suggestedHours(projectType: string) {
  const map: Record<string, number> = {
    网站开发: 8,
    "Bug 修复": 3,
    自动化脚本: 6,
    数据整理: 4,
    "AI 工具配置": 5,
    其他: 5,
  };
  return map[projectType] || 5;
}

function difficultyLabel(difficulty: PricingInput["difficulty"]) {
  if (difficulty === "advanced") return "复杂";
  if (difficulty === "intermediate") return "中等";
  return "简单";
}
