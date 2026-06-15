import { site } from "../data/site";

const base = normalizeBase(readArg("url") || readArg("base") || site.url);
const expectedToken = readArg("token") || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";

type Check = {
  name: string;
  ok: boolean;
  detail?: string;
};

async function main() {
  const checks: Check[] = [
    {
      name: "site url is production vercel url",
      ok: base === "https://ai-jiedan-lab.vercel.app" || base.startsWith("https://"),
      detail: base,
    },
    {
      name: "google verification token is configured locally",
      ok: expectedToken.length > 0,
      detail: expectedToken ? maskToken(expectedToken) : "missing NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION",
    },
  ];

  if (readArg("url") || readArg("base")) {
    const [home, robots, sitemap, blogSitemap, qSitemap, clusterSitemap] = await Promise.all([
      fetchPage("/"),
      fetchPage("/robots.txt"),
      fetchPage("/sitemap.xml"),
      fetchPage("/sitemap-blog.xml"),
      fetchPage("/sitemap-q.xml"),
      fetchPage("/sitemap-cluster.xml"),
    ]);
    checks.push({ name: "homepage returns 200", ok: home.status === 200, detail: `${home.status}` });
    checks.push({ name: "robots returns 200", ok: robots.status === 200, detail: `${robots.status}` });
    checks.push({ name: "sitemap index returns 200", ok: sitemap.status === 200, detail: `${sitemap.status}` });
    checks.push({ name: "blog sitemap returns 200", ok: blogSitemap.status === 200, detail: `${blogSitemap.status}` });
    checks.push({ name: "q sitemap returns 200", ok: qSitemap.status === 200, detail: `${qSitemap.status}` });
    checks.push({ name: "cluster sitemap returns 200", ok: clusterSitemap.status === 200, detail: `${clusterSitemap.status}` });
    checks.push({ name: "robots points to sitemap", ok: robots.text.includes(`${base}/sitemap.xml`) });
    checks.push({
      name: "sitemap index points to layered sitemaps",
      ok:
        sitemap.text.includes(`${base}/sitemap-blog.xml`) &&
        sitemap.text.includes(`${base}/sitemap-q.xml`) &&
        sitemap.text.includes(`${base}/sitemap-cluster.xml`),
    });
    checks.push({ name: "blog sitemap has public urls", ok: (blogSitemap.text.match(/<url>/g) || []).length > 100 });
    checks.push({ name: "q sitemap has public urls", ok: (qSitemap.text.match(/<url>/g) || []).length > 100 });
    checks.push({ name: "cluster sitemap has public urls", ok: (clusterSitemap.text.match(/<url>/g) || []).length >= 5 });

    if (expectedToken) {
      checks.push({
        name: "homepage includes google verification meta",
        ok: home.text.includes(`name="google-site-verification"`) && home.text.includes(expectedToken),
        detail: "requires Vercel env var and redeploy",
      });
    }
  }

  const failed = checks.filter((check) => !check.ok);
  const result = {
    base,
    readyForSearchConsoleVerification: failed.length === 0,
    checks,
    nextActions: buildNextActions(failed),
  };

  console.log(JSON.stringify(result, null, 2));
  if (failed.length) process.exitCode = 1;
}

async function fetchPage(path: string) {
  const response = await fetch(`${base}${path}`);
  return { status: response.status, text: await response.text() };
}

function buildNextActions(failed: Check[]) {
  if (!failed.length) {
    return [
      "Google Search Console 验证准备就绪：回到 Search Console 点击 Verify，然后提交 sitemap.xml。",
    ];
  }

  return failed.map((check) => {
    if (check.name.includes("verification token")) {
      return "在 Vercel 环境变量中添加 NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION，值为 Search Console HTML tag 的 content。";
    }
    if (check.name.includes("google verification meta")) {
      return "环境变量保存后需要重新部署 Vercel，再检查首页是否输出 google-site-verification meta。";
    }
    if (check.name.includes("sitemap")) {
      return "确认 https://ai-jiedan-lab.vercel.app/sitemap.xml 可以打开，再提交给 Search Console。";
    }
    return `Fix: ${check.name}${check.detail ? ` (${check.detail})` : ""}`;
  });
}

function maskToken(value: string) {
  if (value.length <= 8) return "configured";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function normalizeBase(value: string) {
  return value.replace(/\/+$/, "");
}

function readArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match?.slice(prefix.length);
}

void main();
