export const paymentOptions = [
  {
    name: "Gumroad",
    stage: "付费模板第一选择",
    bestFor: "数字模板、PDF、SOP、表格文件自动交付",
    setupWhen: "免费模板有人下载，且你准备卖第一个模板包时",
    notes: "少写代码，先验证是否有人愿意买。",
  },
  {
    name: "Lemon Squeezy",
    stage: "数字产品第二选择",
    bestFor: "模板包、轻量数字产品、国际支付",
    setupWhen: "模板包开始稳定销售，想要更完整的数字产品结账页时",
    notes: "适合后期正规化，不必第一天就接。",
  },
  {
    name: "Payoneer",
    stage: "人工服务或平台收款",
    bestFor: "海外平台收款、少量人工服务收款",
    setupWhen: "真的有客户要付服务费，或 Upwork/Fiverr 需要绑定收款时",
    notes: "不建议作为模板自动交付的主支付系统。",
  },
  {
    name: "Wise",
    stage: "人工服务收款备选",
    bestFor: "跨境转账、多币种收款",
    setupWhen: "有自有网站客户需要人工转账时",
    notes: "适合人工确认，不适合自动交付模板。",
  },
  {
    name: "Google AdSense",
    stage: "稳定流量后",
    bestFor: "SEO 流量广告收益",
    setupWhen: "有持续自然搜索访问后",
    notes: "早期流量少时收益低，不要优先做。",
  },
] as const;
