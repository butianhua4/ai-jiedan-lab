# 平台注册路线图

这个项目不需要一开始注册一堆平台。先让网站、工具、内容审核流程跑起来，再按真实需求逐步接平台。

## 现在已经具备

- GitHub：保存代码、内容草稿和提交记录。
- Vercel：自动部署网站。
- 本地脚本：生成草稿、检查质量、检查 SEO、检查线上页面。

当前不需要注册新的平台，也不需要购买域名。

## 第一阶段：收录和流量观察

触发条件：

- 网站正式可访问。
- sitemap 和 robots 正常。
- 已有 5 篇以上人工审核后的公开文章。

需要注册：

- Google Search Console

用途：

- 提交 `https://ai.aporet.com/sitemap.xml`
- 查看哪些页面被收录。
- 查看哪些搜索词带来曝光。

暂时不必注册：

- Google AdSense
- 付费模板平台
- AI API 平台
- 支付平台

## 第二阶段：流量统计

触发条件：

- Search Console 开始有曝光。
- 你想知道哪些页面有人点、哪些工具有人用。

可选注册或开启：

- Vercel Web Analytics
- Google Analytics

建议先用 Vercel Web Analytics，因为开启简单，不需要改很多代码。

## 第三阶段：免费模板和邮箱

触发条件：

- 模板页有访问。
- 有用户想下载模板或联系你。

可选注册：

- Formspree：最简单的表单收集。
- Resend：以后做邮件通知或模板发送。
- Supabase：以后需要数据库时再用。

第一版可以先只用联系邮箱，不急着接数据库。

## 第四阶段：付费模板

触发条件：

- 免费模板有人下载。
- 有用户反馈想要完整 SOP、报价表、作品集文案包。

可选注册：

- Gumroad
- Lemon Squeezy

建议优先 Gumroad 或 Lemon Squeezy，因为它们可以处理付款和文件交付。网站只负责 SEO 页面和购买入口。

暂时不建议：

- 自己接 Stripe Checkout
- 自己写会员系统
- 自己保存用户支付信息

## 第五阶段：收款工具

触发条件：

- 有真实人工服务咨询。
- 有客户明确要你帮忙配置 Codex、GitHub、Vercel 或排查问题。

可选注册：

- Payoneer
- Wise
- PayPal

规则：

- Upwork / Fiverr 客户优先走平台内收款。
- 自有网站来的服务要写清范围、价格、交付物和退款边界。
- 不承诺保证接单，不承诺收入结果。

## 第六阶段：真实 AI API

触发条件：

- 工具有稳定使用。
- 规则模板明显不够用。
- 你愿意承担 API 成本。

可选注册：

- OpenAI API
- Anthropic API
- Vercel AI Gateway

接入后仍然要保留：

- 免费次数限制
- 人工审核内容流程
- 不自动投标
- 不自动发布未审核文章

## 当前建议

当前只需要继续做三件事：

1. 打磨 Proposal 生成器、报错解释器和报价助手。
2. 继续生成 draft，但不自动发布。
3. 人工审核少量文章后，再接 Google Search Console。

等需要注册新平台时，优先注册 Google Search Console。其他平台都可以再等等。
