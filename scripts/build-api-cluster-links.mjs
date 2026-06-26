// 建"AI API 接入"集群内链:4篇互链 + key安全页交叉链到.env报错页
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BLOG = "content/blog";

const P = {
  "openai-api-nextjs-route-handler-guide": "OpenAI API 接入 Next.js 怎么做",
  "gemini-api-nextjs-guide": "Gemini API 怎么接 Next.js",
  "claude-api-beginner-guide": "Claude API 怎么接入 Next.js",
  "ai-api-key-security-rotation-guide": "AI API Key 怎么安全管理",
  "env-variable-missing-fix": ".env 环境变量不生效怎么解决", // 跨集群目标(已存在)
};
const REL = {
  "openai-api-nextjs-route-handler-guide": ["claude-api-beginner-guide", "gemini-api-nextjs-guide", "ai-api-key-security-rotation-guide"],
  "gemini-api-nextjs-guide": ["openai-api-nextjs-route-handler-guide", "claude-api-beginner-guide", "ai-api-key-security-rotation-guide"],
  "claude-api-beginner-guide": ["openai-api-nextjs-route-handler-guide", "gemini-api-nextjs-guide", "ai-api-key-security-rotation-guide"],
  "ai-api-key-security-rotation-guide": ["openai-api-nextjs-route-handler-guide", "claude-api-beginner-guide", "env-variable-missing-fix"],
};

let n = 0;
for (const slug of Object.keys(REL)) {
  const path = join(BLOG, slug + ".mdx");
  let raw = readFileSync(path, "utf8");
  const links = REL[slug].map((s) => `- [${P[s]}](/blog/${s})`).join("\n");
  const block = `## 相关 AI 接入\n\n接其他模型 / 管好 key 一起看：\n\n${links}\n\n`;
  if (raw.includes("## 相关 AI 接入")) raw = raw.replace(/## 相关 AI 接入[\s\S]*?(?=\n## )/, block);
  else raw = raw.replace(/\n## 免责声明/, `\n${block}## 免责声明`);
  writeFileSync(path, raw);
  n++;
}
console.log(`已处理 ${n} 篇 AI 接入页:插入互链块`);
