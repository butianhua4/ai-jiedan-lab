// 合并近重复薄页:按 base-stem 分组,每组留最厚一篇 + 保护GSC已得点击/曝光页,其余 noindex:true
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BLOG = "content/blog";
const APPLY = process.argv.includes("--apply"); // 不带 --apply 只预演
const SUF = /-(checklist|mistakes|freelance-scope|guide|beginner|template|tips)$/;

// GSC 实测有点击/明显曝光的页(两域名),永不 noindex
const PROTECT = new Set([
  "codex-edit-existing-ui","codex-edit-existing-ui-mistakes","codex-codex-4-38",
  "codex-automation-steps-not-skip","codex-bugfix-rollback-record","codex-bugfix-rollback-record-checklist",
  "claude-code-beginner-mistakes","claude-code-beginner-mistakes-mistakes","paddle-vs-stripe-beginner",
  "paddle-vs-stripe-beginner-checklist","marketing-ai-prompts-guide","ai-content-human-review-template",
  "codex-github-workflow","codex-github-workflow-checklist","codex-code-review-delivery-checklist",
  "langgraph-agent-beginner-guide","dify-workflow-vs-agent-guide","chatgpt-codex-claude-workflow-checklist",
]);

const wc = (t) => (t.replace(/[#>*`\-\[\]()_!|]/g," ").match(/[\p{L}\p{N}]+/gu) || []).length;
const files = readdirSync(BLOG).filter((f) => f.endsWith(".mdx"));

const info = {};
for (const f of files) {
  const slug = f.replace(/\.mdx$/, "");
  const raw = readFileSync(join(BLOG, f), "utf8");
  const fm = raw.match(/^---([\s\S]*?)---/)?.[1] || "";
  const cur = /^\s*noindex:\s*true\s*$/m.test(fm);
  info[slug] = { f, words: wc(raw.replace(/^---[\s\S]*?---/, "")), already: cur };
}

// 按 base-stem 分组
const groups = {};
for (const slug of Object.keys(info)) (groups[slug.replace(SUF, "")] ??= []).push(slug);

let toNoindex = [], kept = [];
for (const [base, variants] of Object.entries(groups)) {
  if (variants.length < 2) { kept.push(variants[0]); continue; }
  // keeper = 最厚的一篇
  const keeper = variants.slice().sort((a, b) => info[b].words - info[a].words)[0];
  for (const s of variants) {
    if (s === keeper || PROTECT.has(s)) { kept.push(s); continue; }
    toNoindex.push(s);
  }
}

console.log(`总blog: ${files.length}`);
console.log(`重复组(2+变体): ${Object.values(groups).filter(v=>v.length>=2).length}`);
console.log(`将 noindex: ${toNoindex.length}  | 保留可索引: ${files.length - toNoindex.length}`);
console.log(`其中受保护(GSC有点击/曝光,强制保留): ${[...PROTECT].filter(s=>info[s]).length}`);

if (!APPLY) {
  console.log("\n[预演] 未写文件。加 --apply 执行。前10个将被noindex:");
  toNoindex.slice(0,10).forEach(s=>console.log("  -", s, `(${info[s].words}词)`));
} else {
  let done = 0;
  for (const slug of toNoindex) {
    if (info[slug].already) continue;
    const p = join(BLOG, info[slug].f);
    let raw = readFileSync(p, "utf8");
    if (/^\s*noindex:\s*false\s*$/m.test(raw)) raw = raw.replace(/^(\s*noindex:\s*)false\s*$/m, "$1true");
    else raw = raw.replace(/^---\n/, "---\nnoindex: true\n"); // 无字段则插入
    writeFileSync(p, raw);
    done++;
  }
  console.log(`\n[已执行] 实际改写 ${done} 个文件 noindex:true`);
}
