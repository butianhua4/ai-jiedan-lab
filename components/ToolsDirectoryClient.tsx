"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { tools } from "@/data/tools";

const allCategory = "全部";

export function ToolsDirectoryClient() {
  const categories = useMemo(() => [allCategory, ...Array.from(new Set(tools.map((tool) => tool.category)))], []);
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const filteredTools = selectedCategory === allCategory ? tools : tools.filter((tool) => tool.category === selectedCategory);

  return (
    <section className="mt-8 min-w-0">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 rounded-md border px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "border-brand bg-brand text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-brand/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {filteredTools.map((tool) => (
          <Card key={tool.slug} title={tool.name} description={`${tool.description} 适合：${tool.bestFor}`} href={`/tools/${tool.slug}`} />
        ))}
      </div>
    </section>
  );
}
