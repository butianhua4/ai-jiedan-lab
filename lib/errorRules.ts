export type ErrorInput = {
  errorText: string;
  environment: string;
  action: string;
};

const rules = [
  {
    match: ["npm command not found", "npm is not recognized"],
    meaning: "系统找不到 npm，通常是 Node.js 没安装好，或 PATH 环境变量没有生效。",
    causes: ["Node.js 未安装", "安装后没有重启终端", "系统 PATH 没有包含 Node.js"],
    commands: ["node -v", "npm -v"],
  },
  {
    match: ["module not found", "cannot find module"],
    meaning: "项目找不到某个依赖或导入路径。",
    causes: ["依赖没有安装", "文件路径写错", "包版本不兼容"],
    commands: ["npm install", "npm run build"],
  },
  {
    match: ["permission denied", "eacces", "eperm"],
    meaning: "当前用户没有权限执行命令或写入文件。",
    causes: ["目录权限不足", "文件被占用", "命令需要管理员权限"],
    commands: ["pwd", "ls"],
  },
  {
    match: ["authentication failed", "permission denied (publickey)"],
    meaning: "Git 或 GitHub 身份验证失败。",
    causes: ["没有登录 GitHub", "token 失效", "SSH key 没配置"],
    commands: ["git status", "git remote -v"],
  },
  {
    match: ["failed to push some refs"],
    meaning: "远程分支比本地更新，或者本地提交历史和远程不一致。",
    causes: ["远程已有新提交", "分支冲突", "推送目标分支不对"],
    commands: ["git status", "git pull --rebase", "git push"],
  },
  {
    match: ["port already in use", "eaddrinuse"],
    meaning: "端口已经被其他进程占用。",
    causes: ["开发服务器已经在运行", "另一个应用占用了同一端口"],
    commands: ["npm run dev -- --port 3001"],
  },
  {
    match: ["environment variable", "env var", "missing api key"],
    meaning: "缺少环境变量，例如 API Key、数据库地址或站点 URL。",
    causes: [".env 文件缺失", "Vercel 环境变量没配置", "变量名拼写不一致"],
    commands: ["copy .env.example .env.local", "npm run build"],
  },
  {
    match: ["typescript", "type error", "ts2322", "ts2307"],
    meaning: "TypeScript 类型检查失败。",
    causes: ["类型定义不匹配", "导入路径错误", "对象字段缺失"],
    commands: ["npm run build"],
  },
  {
    match: ["eslint"],
    meaning: "ESLint 发现代码风格或潜在质量问题。",
    causes: ["未使用变量", "React Hook 使用不规范", "代码格式或规则不符合项目配置"],
    commands: ["npm run lint"],
  },
  {
    match: ["vercel", "build failed"],
    meaning: "Vercel 构建失败，通常需要看完整 build log 才能定位。",
    causes: ["本地 build 未通过", "环境变量缺失", "Node 版本或依赖不一致"],
    commands: ["npm install", "npm run build"],
  },
  {
    match: ["tailwind", "postcss", "unknown utility"],
    meaning: "Tailwind 或 PostCSS 配置、类名或版本不匹配。",
    causes: ["Tailwind 配置未加载", "类名拼写错误", "PostCSS 配置缺失", "版本升级后写法变化"],
    commands: ["npm install", "npm run build"],
  },
  {
    match: ["hydration", "hydration failed"],
    meaning: "Next.js 服务端渲染出的 HTML 和浏览器端渲染结果不一致。",
    causes: ["组件里直接读取浏览器对象", "时间或随机数导致首屏不一致", "客户端状态和服务端状态不同"],
    commands: ["npm run build", "npm run dev"],
  },
  {
    match: ["invalid api key", "unauthorized", "401"],
    meaning: "API Key 无效、缺失或没有权限。",
    causes: ["环境变量没配置", "Key 复制错误", "服务商权限或额度不足", "Vercel 没同步环境变量"],
    commands: ["copy .env.example .env.local", "npm run build"],
  },
  {
    match: ["rate limit", "429", "too many requests"],
    meaning: "请求频率过高或服务商限流。",
    causes: ["短时间请求太多", "免费额度用完", "没有做重试和降级"],
    commands: ["npm run build"],
  },
];

export function explainError(input: string | ErrorInput) {
  const data = typeof input === "string" ? { errorText: input, environment: "Node.js", action: "npm run build" } : input;
  const text = data.errorText.toLowerCase();
  const matched = rules.find((rule) => rule.match.some((keyword) => text.includes(keyword)));
  const rule = matched || {
    meaning: "这是一个需要结合上下文判断的开发报错，目前没有命中具体规则。",
    causes: ["命令目录不对", "依赖或版本不一致", "配置缺失", "日志不完整"],
    commands: ["node -v", "npm -v", "npm run build"],
  };

  return {
    meaning: rule.meaning,
    causes: rule.causes,
    steps: [
      "先复制完整报错，不要只截最后一行。",
      `确认当前环境是：${data.environment}，当前操作是：${data.action}。`,
      "确认命令是否在项目根目录执行。",
      "按建议命令收集版本、依赖和构建信息。",
      "如果涉及生产数据库、支付、安全权限，不要盲目修改，先找有经验的人复核。",
    ],
    commands: rule.commands,
    beginnerFit: matched ? "适合新手先按步骤排查，但修改前要保留原始日志。" : "可以先整理日志，但不建议在真实客户项目里盲改。",
    whenToAskHelp: "如果连续两次按步骤操作仍然失败，或报错涉及权限、支付、数据库、安全配置，建议找人协助。",
  };
}
