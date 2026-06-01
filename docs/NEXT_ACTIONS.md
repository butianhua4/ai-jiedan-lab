# 下一步执行顺序

当前策略：先工具，再文章，再模板/联盟/广告。

## 1. 工具继续打磨

- Proposal 生成器：增加更多示例场景、风险解释和模板下载入口。
- 报错解释器：补充 Vercel、GitHub、TypeScript、环境变量规则。
- 报价助手：增加不同项目类型的默认工时建议。

## 2. 模板转化

- 先保持免费模板下载。
- 有使用反馈后，把作品集文案模板和完整 SOP 包作为付费模板。
- 付费模板优先 Gumroad 或 Lemon Squeezy，不先自建支付系统。

## 3. 内容发布

- 每次从 batch 1 中人工审核 1-3 篇。
- 只发布 `status=review` 且 `qualityScore>=80` 的文章。
- 不一次性发布 500 篇。
- 发布前按 `docs/manual-review-checklist.md` 做人工审核。

## 4. 收款和流量收益

- Upwork / Fiverr 客户必须平台内收款。
- 自有网站少量人工协助可后期用 PayPal、Wise、Payoneer。
- 数字模板优先 Gumroad 或 Lemon Squeezy。
- 稳定流量后再接联盟链接和广告。

## 5. 状态检查命令

```bash
npm run project:status
npm run seo:check
npm run smoke:web
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 6. 平台注册顺序

当前不需要继续注册新平台。已经有 GitHub 和 Vercel 就够推进。

后续触发条件：

- 有 5 篇以上人工审核公开文章：注册 Google Search Console。
- 有稳定访问：开启 Vercel Web Analytics 或 Google Analytics。
- 有模板下载反馈：注册 Gumroad 或 Lemon Squeezy。
- 有人工服务咨询：再考虑 Payoneer、Wise、PayPal。
- 工具规则模板不够用：再考虑 OpenAI、Anthropic 或 Vercel AI Gateway。

详细说明见 `docs/platform-registration-roadmap.md`。
