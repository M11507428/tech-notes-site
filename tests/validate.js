// 可選的資料檢查工具：node tests/validate.js
// 不需安裝 npm 套件，也不影響網站在 GitHub Pages 運作。
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data/articles.js"), "utf8"), context);
const articles = context.window.ARTICLES;
const categorySet = new Set(["網路", "設備", "資安"]);
const slugSet = new Set();
const errors = [];
const required = ["slug", "title", "description", "category", "icon", "accent", "iconColor", "readTime", "tags", "highlights", "sections"];
if (!Array.isArray(articles)) errors.push("ARTICLES 必須是陣列");
else articles.forEach((a, i) => {
  const prefix = `article[${i}]`;
  for (const field of required) if (a[field] === undefined || a[field] === null) errors.push(`${prefix} 缺少 ${field}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug || "")) errors.push(`${prefix} slug 格式不正確`);
  if (slugSet.has(a.slug)) errors.push(`${prefix} slug 重複：${a.slug}`);
  slugSet.add(a.slug);
  if (!categorySet.has(a.category)) errors.push(`${prefix} category 不存在：${a.category}`);
  if (!Number.isInteger(a.readTime) || a.readTime < 1) errors.push(`${prefix} readTime 必須是正整數`);
  for (const field of ["accent", "iconColor"]) if (!/^#[0-9a-fA-F]{6}$/.test(a[field] || "")) errors.push(`${prefix} ${field} 必須是 HEX 色碼`);
  if (!Array.isArray(a.tags) || !a.tags.length) errors.push(`${prefix} tags 不可為空`);
  if (!Array.isArray(a.highlights) || a.highlights.length !== 3) errors.push(`${prefix} highlights 必須剛好三項`);
  if (!Array.isArray(a.sections) || a.sections.length < 3) errors.push(`${prefix} sections 至少三節`);
  else a.sections.forEach((s, j) => {
    if (typeof s.heading !== "string" || !s.heading.trim()) errors.push(`${prefix} section[${j}] 缺少 heading`);
    if (!Array.isArray(s.paragraphs) || !s.paragraphs.length) errors.push(`${prefix} section[${j}] 缺少 paragraphs`);
  });
});
if (errors.length) {
  console.error("✗ 文章格式驗證失敗：\n" + errors.join("\n"));
  process.exitCode = 1;
} else console.log(`✓ 全部 ${articles.length} 篇文章通過 AGENTS.md 格式檢查`);
