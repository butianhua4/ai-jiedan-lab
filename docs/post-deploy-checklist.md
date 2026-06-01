# 上线后检查清单

每次 Vercel 生产部署完成后，先做低风险检查，再考虑内容发布或收录提交。

## 自动检查

```bash
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

检查内容：

- 首页、博客、工具、模板、路线图是否返回 200
- `/sitemap.xml` 是否使用正式域名
- `/robots.txt` 是否允许抓取并指向 sitemap
- draft/review 文章是否没有泄露进 sitemap
- 文章页 canonical 是否指向正式域名

## 手工检查

1. 打开首页，确认导航和三个核心工具入口可见。
2. 打开 Proposal 生成器，填入示例，确认能生成结果。
3. 打开报错解释器，填入示例，确认能生成步骤。
4. 打开报价助手，调整工时和难度，确认报价会变化。
5. 打开 `/blog`，确认只展示 published 文章。
6. 打开 `/sitemap.xml`，确认没有 draft 草稿 slug。

## 现在不需要注册的平台

第一阶段不需要注册广告平台、支付平台、邮件平台、AI API 平台。

可以稍后再接：

- Google Search Console：用于提交 sitemap 和看收录。
- Google Analytics 或 Vercel Web Analytics：用于看流量。
- Gumroad 或 Lemon Squeezy：用于付费模板。
- Payoneer、Wise、PayPal：用于手动服务或平台收款。
- OpenAI、Anthropic 或 Vercel AI Gateway：用于把规则工具升级为真实 AI 工具。

## 自动化边界

允许自动化：

- GitHub push 后由 Vercel 自动部署。
- 自动生成少量 draft。
- 自动检查内容质量。
- 自动检查线上 SEO 基础状态。

不允许自动化：

- 未审核直接发布文章。
- 自动批量发布 500 篇。
- 复制、洗稿或整篇翻译别人的内容。
- 自动投标、自动群发客户消息。
- 自动处理支付或客户隐私数据。
