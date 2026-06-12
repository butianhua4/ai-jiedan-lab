export type PaymentOption = {
  name: string;
  stage: string;
  bestFor: string;
  setupWhen: string;
  notes: string;
  registrationNeed: string;
};

export const paymentOptions: PaymentOption[] = [
  {
    name: "平台内收款",
    stage: "接 Upwork / Fiverr 项目时优先",
    bestFor: "客户来自 Upwork、Fiverr 等自由职业平台的服务订单。",
    setupWhen: "只要开始在对应平台承接项目，就按平台规则绑定官方支持的收款方式。",
    notes: "不要引导平台客户站外付款。这样做可能违反平台规则，也会增加账号风险。",
    registrationNeed: "需要注册对应自由职业平台，并按平台要求完成身份和收款设置。",
  },
  {
    name: "Payoneer",
    stage: "平台收款和海外服务备用",
    bestFor: "Upwork、Fiverr 等平台提现，或少量海外服务款项。",
    setupWhen: "真正需要平台提现，或已有客户需要合规付款时再注册。",
    notes: "适合作为收款账户，不适合作为模板自动交付系统。早期不用急着接。",
    registrationNeed: "后期可能需要注册和实名验证，先不急。",
  },
  {
    name: "Wise",
    stage: "跨境转账备用",
    bestFor: "海外客户人工转账、多币种收款和低频服务款项。",
    setupWhen: "有自有网站客户，且双方确认服务范围和付款方式后再考虑。",
    notes: "更适合人工确认的服务收款，不适合一开始就当作自动支付系统。",
    registrationNeed: "后期可能需要注册和实名验证，按实际客户需求决定。",
  },
  {
    name: "PayPal",
    stage: "通用备用收款",
    bestFor: "部分海外客户的小额服务款或数字产品付款。",
    setupWhen: "客户明确只能使用 PayPal，或模板平台要求绑定时再配置。",
    notes: "注意手续费、争议处理和账户风控。不要把 PayPal 当成唯一收款方式。",
    registrationNeed: "后期可注册，但不是当前第一优先级。",
  },
  {
    name: "Gumroad",
    stage: "付费模板第一选择",
    bestFor: "数字模板、PDF、SOP、表格文件的自动交付。",
    setupWhen: "免费模板有人下载，且准备卖第一个模板包时再接。",
    notes: "少写代码，先验证是否有人愿意购买。网站只放介绍和购买跳转。",
    registrationNeed: "需要注册 Gumroad，并配置产品、价格、收款资料。",
  },
  {
    name: "Lemon Squeezy",
    stage: "数字产品第二选择",
    bestFor: "模板包、轻量数字产品、国际支付和自动交付。",
    setupWhen: "模板包开始有稳定需求，想要更完整的数字产品结账页时。",
    notes: "适合后期正规化，当前不必第一天就接。",
    registrationNeed: "需要注册并完成商户资料配置。",
  },
  {
    name: "Google AdSense",
    stage: "稳定搜索流量之后",
    bestFor: "SEO 文章和工具页的展示广告收益。",
    setupWhen: "网站有持续自然搜索访问、内容质量稳定、页面体验过关后。",
    notes: "早期流量少时收益很低，不要把广告当作第一收入来源。",
    registrationNeed: "后期需要申请 Google AdSense，并通过网站审核。",
  },
  {
    name: "联盟链接",
    stage: "工具导航有流量之后",
    bestFor: "推荐 Vercel、域名、自动化、设计、收款等工具时的佣金。",
    setupWhen: "工具详情页和对比文章有访问量，并且推荐内容足够客观后。",
    notes: "必须清楚披露联盟关系，不能把广告伪装成客观排名。",
    registrationNeed: "需要分别申请各工具的联盟计划，不用一次性全部注册。",
  },
];
