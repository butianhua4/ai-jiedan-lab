// 合并清单生成器:669篇blog → 按主题+子主题聚类,提出 pillar + 合并候选,输出可执行 markdown 报告
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BLOG = "content/blog";
const DATE = process.argv[2] || "2026-06-25"; // 传入日期(脚本内不能用 Date)
const files = readdirSync(BLOG).filter((f) => f.endsWith(".mdx"));
const STOP = new Set(["guide","beginner","checklist","template","the","for","and","to","a","of","with","vs","how","what","is","in","on","mistakes","review","tips","best","2025","2026"]);

function topicOf(s){
  if(/^codex/.test(s))return"codex";
  if(/(vs|compare)/.test(s))return"对比";
  if(/(error|mistake|fix|fail|troubleshoot|debug)/.test(s))return"报错排查";
  if(/(checklist|template)/.test(s))return"清单模板";
  if(/(deploy|vercel|docker|nvidia|gpu|install)/.test(s))return"部署环境";
  if(/(agent|rag|langgraph|dify|llm|prompt|claude|langchain)/.test(s))return"Agent-RAG-LLM";
  if(/(upwork|freelance|client|proposal|gumroad|stripe|paddle|income)/.test(s))return"接单变现";
  return"其他";
}
const wc=(t)=>(t.replace(/[#>*`\-\[\]()_!|]/g," ").match(/[\p{L}\p{N}]+/gu)||[]).length;
const tokens=(s)=>s.split(/-/).filter(t=>t.length>2&&!STOP.has(t));

const rows = files.map((f)=>{
  const slug=f.replace(/\.mdx$/,"");
  const body=readFileSync(join(BLOG,f),"utf8").replace(/^---[\s\S]*?---/,"");
  return {slug, topic:topicOf(slug), words:wc(body), toks:tokens(slug)};
});

const byTopic={};
for(const r of rows)(byTopic[r.topic]??=[]).push(r);

let md=[`# 内容合并清单(${DATE})`,``,`669 篇 blog 98% 为薄页(中位271词)→ 目标收缩到 ~100 精页。`,`下面每个主题按"高频子主题词"聚类,提出 pillar 与合并候选。**pillar=该簇里最厚的一篇做主页,其余 301 合并进去或 noindex。**`,``];

for(const [topic,list] of Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length)){
  // 统计子主题高频词
  const freq={};
  for(const r of list)for(const t of new Set(r.toks))freq[t]=(freq[t]||0)+1;
  const subThemes=Object.entries(freq).filter(([,n])=>n>=3).sort((a,b)=>b[1]-a[1]).slice(0,8);
  md.push(`## ${topic}(${list.length}篇,薄页${list.filter(r=>r.words<500).length})`,``);
  md.push(`高频子主题(出现≥3次):${subThemes.map(([t,n])=>`\`${t}\`×${n}`).join(" · ")||"(无明显聚类)"}`,``);
  // 对每个子主题:列出包含它的篇,挑最厚的当pillar
  const used=new Set();
  for(const [theme] of subThemes){
    const cluster=list.filter(r=>r.toks.includes(theme)&&!used.has(r.slug)).sort((a,b)=>b.words-a.words);
    if(cluster.length<2)continue;
    cluster.forEach(r=>used.add(r.slug));
    const pillar=cluster[0];
    md.push(`- **簇「${theme}」(${cluster.length}篇)** → pillar: \`${pillar.slug}\`(${pillar.words}词,做深到2000+)`);
    md.push(`  - 合并/noindex: ${cluster.slice(1).map(r=>`\`${r.slug}\`(${r.words})`).join(", ")}`);
  }
  const leftover=list.filter(r=>!used.has(r.slug));
  if(leftover.length)md.push(``,`  剩余未聚类 ${leftover.length} 篇(逐篇判:有GSC曝光的留,其余noindex)`);
  md.push(``);
}
mkdirSync("reports",{recursive:true});
const out=`reports/content-merge-plan-${DATE}.md`;
writeFileSync(out, md.join("\n"));
console.log("报告已写:",out);
console.log("\n===== 摘要 =====");
for(const [topic,list] of Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length))
  console.log(`${topic}: ${list.length}篇`);
