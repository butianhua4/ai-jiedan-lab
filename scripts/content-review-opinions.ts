import fs from "fs";
import path from "path";
import { contentPlan500 } from "../content/content-plan-500";
import { articleFiles, parseArgs, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type Opinion = {
  action: "revise-before-review" | "ready-for-human-review" | "hold";
  batch: number;
  category: string;
  file: string;
  issues: string[];
  positives: string[];
  qualityScore: number;
  reviewFocus: string[];
  slug: string;
  title: string;
};

async function main() {
  const args = parseArgs();
  const limit = Math.min(Number(args.limit || 5), 10);
  const planBySlug = new Map<string, (typeof contentPlan500)[number]>(contentPlan500.map((item) => [item.slug, item]));
  const files = await articleFiles();
  const opinions: Opinion[] = [];

  for (const file of files) {
    const article = readArticle(file);
    const slug = String(article.data.slug || "");
    const plan = planBySlug.get(slug);
    if (!plan) continue;
    if (article.data.status !== "draft") continue;
    if (args.batch && plan.batch !== Number(args.batch)) continue;
    if (args.category && plan.category !== String(args.category)) continue;
    if (args.priority && plan.priority !== Number(args.priority)) continue;

    const result = checkFile(file);
    opinions.push(buildOpinion({
      content: article.content,
      data: article.data,
      file: rel(file),
      plan,
      qualityScore: result.qualityScore,
      qualityWarnings: result.warnings,
      slug,
    }));
  }

  opinions.sort((a, b) => {
    const actionRank = rankAction(a.action) - rankAction(b.action);
    if (actionRank !== 0) return actionRank;
    if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
    if (a.batch !== b.batch) return a.batch - b.batch;
    return a.slug.localeCompare(b.slug);
  });

  const selected = opinions.slice(0, limit);
  const target = path.join(process.cwd(), String(args.write || "docs/review-opinions.md"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${toMarkdown(selected, opinions.length).trim()}\n`, "utf8");
  console.log(`wrote ${path.relative(process.cwd(), target).replace(/\\/g, "/")}`);
}

function buildOpinion(input: {
  content: string;
  data: Record<string, unknown>;
  file: string;
  plan: (typeof contentPlan500)[number];
  qualityScore: number;
  qualityWarnings: string[];
  slug: string;
}): Opinion {
  const issues: string[] = [];
  const positives: string[] = [];
  const reviewFocus = [
    "核对是否有真实操作经验或可验证例子",
    "核对是否没有平台违规建议",
    "核对是否没有收入保证或夸大承诺",
  ];

  if (input.qualityScore >= 90) positives.push("格式、字数、必要章节和基础合规检查通过");
  if (input.content.includes("## 具体步骤")) positives.push("包含可执行步骤章节");
  if (input.content.includes("## 风险提醒")) positives.push("包含风险提醒章节");
  if (/\]\(\/tools|\]\(\/templates|\]\(\/blog/.test(input.content)) positives.push("包含站内内链和转化入口");

  const sourceNotes = String(input.data.sourceNotes || "");
  if (!sourceNotes || sourceNotes.includes("脚本生成的原创草稿")) {
    issues.push("sourceNotes 仍是通用脚本备注，发布前需要补真实来源、操作记录或平台规则依据");
    reviewFocus.push("补充 sourceNotes：写明参考的平台规则、实际测试过程或人工经验来源");
  }

  if (input.content.includes("发布前必须补齐")) {
    issues.push("正文包含“发布前必须补齐”的草稿提示，正式发布前需要按清单补完或删除该草稿段落");
    reviewFocus.push("处理“发布前必须补齐的部分”，不要把内部审核提示发布给读者");
  }

  if (input.qualityWarnings.length) {
    issues.push(...input.qualityWarnings.map((warning) => `需要人工判断上下文：${warning}`));
  }

  if (!/截图|命令输出|实际案例|本地测试|演示项目/.test(input.content)) {
    issues.push("缺少明显的真实验证痕迹，建议补截图、命令输出、演示项目或具体案例");
    reviewFocus.push("补一个真实例子：输入、操作、输出、判断结论");
  }

  if (/Upwork|Fiverr|客户|报价|Proposal/.test(input.content)) {
    reviewFocus.push("复核平台规则和客户沟通边界，避免站外付款、自动群发或夸大能力");
  }

  let action: Opinion["action"] = "ready-for-human-review";
  if (issues.length >= 3) action = "revise-before-review";
  if (input.qualityScore < 80) action = "hold";

  return {
    action,
    batch: input.plan.batch,
    category: input.plan.category,
    file: input.file,
    issues,
    positives,
    qualityScore: input.qualityScore,
    reviewFocus: unique(reviewFocus).slice(0, 8),
    slug: input.slug,
    title: String(input.data.title || input.plan.title),
  };
}

function rankAction(action: Opinion["action"]) {
  if (action === "revise-before-review") return 0;
  if (action === "ready-for-human-review") return 1;
  return 2;
}

function unique(items: string[]) {
  return [...new Set(items)];
}

function toMarkdown(items: Opinion[], totalMatches: number) {
  const lines = [
    "# 草稿审核意见",
    "",
    `生成时间：${new Date().toISOString()}`,
    "",
    "这份意见只用于人工审核，不会修改文章状态，不会发布文章。优先处理 revise-before-review 的问题，再决定是否进入 review。",
    "",
    `候选总数：${totalMatches}`,
    `本次列出：${items.length}`,
    "",
  ];

  for (const item of items) {
    lines.push(
      `## ${item.title}`,
      "",
      `- 文件：${item.file}`,
      `- Slug：${item.slug}`,
      `- Batch：${item.batch}`,
      `- 分类：${item.category}`,
      `- 质量分：${item.qualityScore}`,
      `- 建议动作：${item.action}`,
      "",
      "### 做得好的地方",
      "",
      ...(item.positives.length ? item.positives.map((positive) => `- ${positive}`) : ["- 暂无明显亮点，需要人工细看。"]),
      "",
      "### 发布前需要处理",
      "",
      ...(item.issues.length ? item.issues.map((issue) => `- ${issue}`) : ["- 暂无脚本发现的问题，但仍需人工复核事实和规则。"]),
      "",
      "### 人工重点复核",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
    );
  }

  return lines.join("\n");
}

void main();
