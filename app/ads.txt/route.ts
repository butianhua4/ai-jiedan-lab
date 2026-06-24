// 动态生成 ads.txt — AdSense 必需文件。
// 设环境变量 NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX 后自动生效。
export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  // ca-pub-1234567890123456 -> pub-1234567890123456
  const publisherId = client?.replace(/^ca-/, "");
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt placeholder — set NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-...) to enable Google AdSense\n";
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
