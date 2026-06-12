import { spawn } from "child_process";

const checks = [
  ["/", "AI 工具指南"],
  ["/tools/proposal-generator", "Upwork Proposal 生成器"],
  ["/tools/error-explainer", "Codex 报错解释器"],
  ["/tools/pricing-calculator", "项目报价助手"],
  ["/templates", "模板下载"],
  ["/monetization", "变现路线"],
  ["/blog", "新手教程"],
  ["/sitemap.xml", "<urlset"],
  ["/robots.txt", "Sitemap"],
] as const;

async function main() {
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    cwd: process.cwd(),
    stdio: "ignore",
  });
  try {
    await waitForServer();
    const results = [];
    for (const [path, expected] of checks) {
      const response = await fetch(`http://127.0.0.1:3000${path}`);
      const text = await response.text();
      const ok = response.ok && text.includes(expected);
      results.push({ path, status: response.status, expected, ok });
    }
    console.log(JSON.stringify(results, null, 2));
    if (results.some((result) => !result.ok)) process.exitCode = 1;
  } finally {
    server.kill("SIGTERM");
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:3000/");
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
  throw new Error("Next.js server did not become ready in time.");
}

void main();
