# 人工审核清单

文章从 `review` 进入 `published` 前，必须人工检查。脚本只能检查格式和明显风险，不能替代事实判断。

## 必查项目

1. 标题是否解决一个具体问题。
2. 开头是否直接回答问题，没有夸大收益。
3. 是否写清“适合谁 / 不适合谁”。
4. 是否有新手可以执行的具体步骤。
5. 是否有风险提醒。
6. 是否没有“保证赚钱”“稳赚”“无风险”“自动躺赚”等承诺。
7. 是否没有鼓励绕过 Upwork、Fiverr、GitHub、Vercel、Google 等平台规则。
8. 是否没有复制、洗稿或整篇翻译他人内容。
9. 是否有内链到工具页、模板页或相关文章。
10. 是否有明确但克制的 CTA。

## 发布前命令

先 dry run：

```bash
npm run publish:articles -- --batch=1 --limit=1
```

确认候选文章无问题后再发布：

```bash
npm run publish:articles -- --batch=1 --limit=1 --confirm
```

发布后检查：

```bash
npm run seo:check
npm run build
npm run live:check -- --url=https://ai-jiedan-lab.vercel.app
```

## 发布节奏

- 每次最多 1-3 篇。
- 不一次性发布整批文章。
- 不发布 sourceNotes 明显缺失或事实不稳的文章。
- 不为了凑数量发布重复、空泛或没有真实步骤的文章。
