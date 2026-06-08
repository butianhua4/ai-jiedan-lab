"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Tone = "business" | "minimal" | "story" | "tech" | "education";
type Goal = "pitch" | "report" | "course" | "proposal";

const toneOptions: Array<[Tone, string]> = [
  ["business", "商务稳重"],
  ["minimal", "极简高级"],
  ["story", "故事叙事"],
  ["tech", "科技产品"],
  ["education", "教学培训"],
];

const goalOptions: Array<[Goal, string]> = [
  ["pitch", "路演/融资"],
  ["report", "汇报/复盘"],
  ["course", "课程/培训"],
  ["proposal", "方案/提案"],
];

const toneMap: Record<Tone, { color: string; layout: string; visual: string }> = {
  business: {
    color: "深蓝、白色、浅灰，少量青色强调",
    layout: "左侧结论、右侧证据图表，保持页边距和数字层级",
    visual: "数据图、流程图、对比表，不使用花哨装饰",
  },
  minimal: {
    color: "白色、墨黑、浅灰，单一强调色",
    layout: "大标题配少量正文，单页只讲一个观点",
    visual: "留白、线性图标、简洁分割线和少量产品截图",
  },
  story: {
    color: "暖白、深灰、橙红或绿色点缀",
    layout: "问题、转折、解决方案连续推进，每页有一句主张",
    visual: "真实场景图、人物旅程、前后对比和时间线",
  },
  tech: {
    color: "深色背景、蓝紫或青绿色强调、白色文字",
    layout: "架构图、模块拆解、关键能力矩阵，信息密度略高",
    visual: "产品界面截图、系统架构图、能力雷达和 API 流程",
  },
  education: {
    color: "白色、浅蓝、浅绿，强调色控制在两种以内",
    layout: "概念解释、步骤拆解、练习任务，适合逐页讲解",
    visual: "步骤卡片、示例截图、检查清单和课堂练习块",
  },
};

const goalMap: Record<Goal, string[]> = {
  pitch: ["一句话机会", "痛点规模", "解决方案", "产品演示", "商业模式", "增长数据", "竞争优势", "团队与下一步"],
  report: ["核心结论", "背景与目标", "关键数据", "问题拆解", "原因分析", "改进方案", "资源需求", "下一步计划"],
  course: ["学习目标", "适用人群", "核心概念", "操作流程", "示例演练", "常见错误", "练习任务", "总结清单"],
  proposal: ["客户问题", "目标结果", "方案路径", "交付范围", "时间排期", "风险边界", "报价逻辑", "确认事项"],
};

export function PptPlannerClient() {
  const [topic, setTopic] = useState("用 AI 自动整理销售线索并生成跟进计划");
  const [audience, setAudience] = useState("中小企业老板和销售主管");
  const [pageCount, setPageCount] = useState(8);
  const [tone, setTone] = useState<Tone>("business");
  const [goal, setGoal] = useState<Goal>("proposal");
  const [mustInclude, setMustInclude] = useState("现状问题、自动化流程、成本估算、上线风险、验收标准");

  const plan = useMemo(() => {
    const safeCount = Math.max(5, Math.min(14, pageCount));
    const sections = buildSections(goal, safeCount);
    const style = toneMap[tone];
    const slides = sections.map((section, index) => {
      const page = index + 1;
      return {
        page,
        title: `${page}. ${section}`,
        purpose: purposeFor(section, topic, audience),
        layout: layoutFor(page, section, style.layout),
        visual: visualFor(section, style.visual),
        note: noteFor(section, audience),
      };
    });

    return { slides, style };
  }, [audience, goal, pageCount, tone, topic]);

  const fullPrompt = useMemo(
    () =>
      [
        "请根据以下信息生成一份可编辑 PPT：",
        `主题：${topic}`,
        `受众：${audience}`,
        `页数：${plan.slides.length}`,
        `用途：${labelFor(goalOptions, goal)}`,
        `风格：${labelFor(toneOptions, tone)}`,
        `配色：${plan.style.color}`,
        `必须包含：${mustInclude || "无特别要求"}`,
        "",
        "页面结构：",
        ...plan.slides.map(
          (slide) =>
            `第 ${slide.page} 页：${slide.title.replace(/^\d+\.\s*/, "")}\n- 页面目的：${slide.purpose}\n- 版式：${slide.layout}\n- 视觉：${slide.visual}\n- 讲稿备注：${slide.note}`,
        ),
        "",
        "设计要求：每页只保留一个主观点，标题不超过 18 个字，正文每页不超过 5 行，避免大段文字；图表优先，装饰其次；请保持 PPTX 可编辑。",
      ].join("\n"),
    [audience, goal, mustInclude, plan.slides, plan.style.color, tone, topic],
  );

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4">
            <label className="text-sm font-medium text-gray-800">
              PPT 主题
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setTopic(event.target.value)}
                value={topic}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              目标受众
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setAudience(event.target.value)}
                value={audience}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              必须包含的内容
              <textarea
                className="mt-2 h-24 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setMustInclude(event.target.value)}
                value={mustInclude}
              />
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Select label="用途" onChange={(value) => setGoal(value as Goal)} options={goalOptions} value={goal} />
            <Select label="风格" onChange={(value) => setTone(value as Tone)} options={toneOptions} value={tone} />
            <label className="block text-sm font-medium text-gray-800">
              页数
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                max={14}
                min={5}
                onChange={(event) => setPageCount(Number(event.target.value))}
                type="number"
                value={pageCount}
              />
            </label>
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">策划结果</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">先复制提示词到 Gamma、Canva、PowerPoint Copilot 或常用 PPT 工具，再人工检查事实和版式。</p>
            </div>
            <CopyButton label="复制提示词" text={fullPrompt} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="推荐配色" value={plan.style.color} />
            <Info label="默认版式" value={plan.style.layout} />
            <Info label="视觉素材" value={plan.style.visual} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">可复制给 PPT 工具的完整提示词</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">它不会替你保证事实正确，但能把结构、版式和视觉方向一次讲清楚。</p>
          </div>
          <CopyButton label="复制全部" text={fullPrompt} />
        </div>
        <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{fullPrompt}</pre>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {plan.slides.map((slide) => (
          <article className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={slide.page}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand">Page {slide.page}</p>
                <h3 className="mt-1 break-words text-lg font-semibold text-ink">{slide.title.replace(/^\d+\.\s*/, "")}</h3>
              </div>
              <CopyButton
                label="复制本页"
                text={[slide.title, `目的：${slide.purpose}`, `版式：${slide.layout}`, `视觉：${slide.visual}`, `讲稿：${slide.note}`].join("\n")}
              />
            </div>
            <dl className="mt-4 grid gap-3 text-sm text-gray-700">
              <Info label="页面目的" value={slide.purpose} />
              <Info label="版式安排" value={slide.layout} />
              <Info label="视觉建议" value={slide.visual} />
              <Info label="讲稿备注" value={slide.note} />
            </dl>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">美观度检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "每页只讲一个结论，标题短，正文少，避免整页都是字。",
            "同一级标题、数字、图标和按钮保持同一尺寸与位置。",
            "所有截图先裁掉无关区域，再加统一圆角或边框。",
            "配色不要超过 3 个主色，强调色只用于关键数字和 CTA。",
            "图表先表达结论，再补数据；不要为了好看牺牲可读性。",
            "导出前用 16:9、投影模式和手机截图各检查一次。",
          ].map((item) => (
            <li className="rounded-md bg-gray-50 p-3" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function buildSections(goal: Goal, count: number) {
  const base = goalMap[goal];
  if (count <= base.length) return base.slice(0, count);
  const extra = ["案例演示", "实施路径", "预算与资源", "风险控制", "验收标准", "行动清单"];
  return [...base, ...extra].slice(0, count);
}

function purposeFor(section: string, topic: string, audience: string) {
  if (section.includes("问题") || section.includes("痛点")) return `让 ${audience} 立刻理解为什么现在需要关注「${topic}」。`;
  if (section.includes("方案") || section.includes("解决")) return "说明解决路径，并把抽象想法变成可执行动作。";
  if (section.includes("数据") || section.includes("规模")) return "用 2-3 个关键数字证明判断，不堆砌无关指标。";
  if (section.includes("风险")) return "提前讲清边界、依赖和失败条件，降低不现实预期。";
  if (section.includes("下一步") || section.includes("行动")) return "把听众从认可带到可执行的下一步。";
  return `围绕「${topic}」建立一个清晰、可讲、可落地的页面。`;
}

function layoutFor(page: number, section: string, fallback: string) {
  if (page === 1) return "封面页：左侧大标题和副标题，右侧放一张代表性场景图或产品截图。";
  if (section.includes("对比") || section.includes("竞争")) return "双栏对比：左边现状/旧方法，右边新方案/优势，底部放一句结论。";
  if (section.includes("流程") || section.includes("路径") || section.includes("步骤")) return "横向流程：3-5 个步骤，每步只放一个动词和一句说明。";
  if (section.includes("数据") || section.includes("成本") || section.includes("预算")) return "数字看板：顶部一句结论，下方 3 个关键数字或一张简单图表。";
  return fallback;
}

function visualFor(section: string, fallback: string) {
  if (section.includes("流程") || section.includes("路径")) return "使用流程箭头、节点和轻量图标，避免复杂泳道图。";
  if (section.includes("数据") || section.includes("成本")) return "使用柱状图、数字卡或价格分解表，重点数字用强调色。";
  if (section.includes("风险")) return "用风险矩阵或红黄绿状态表，明确哪些需要人工确认。";
  return fallback;
}

function noteFor(section: string, audience: string) {
  if (section.includes("封面") || section.includes("核心")) return `开场不要铺垫太久，先用一句话说明这份 PPT 对 ${audience} 的价值。`;
  if (section.includes("风险")) return "这一页要主动降低过度承诺，讲清楚哪些结果需要人工复核。";
  if (section.includes("下一步")) return "结尾只给 1-3 个动作，不要让听众自己猜下一步。";
  return "讲稿围绕页面标题展开，不要逐字念正文。";
}

function labelFor<T extends string>(options: Array<[T, string]>, value: T) {
  return options.find(([option]) => option === value)?.[1] || value;
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block text-sm font-medium text-gray-800">
      {label}
      <select
        className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([optionValue, text]) => (
          <option key={optionValue} value={optionValue}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-6 text-gray-900">{value}</dd>
    </div>
  );
}
