// Renders partials/footer.html into the <footer> of every page. Run after editing
// the partial or the strings below:  node tools/sync-footer.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const STRINGS = {
  trad: {
    s: "trad",
    font: "'Noto Sans TC'",
    brand: "星星之火基金會",
    h_about: "關於我們", h_senior: "養心院", h_links: "相關連結",
    l_origin: "緣起故事", l_team: "工作團隊", l_progress: "籌建進度",
    l_words: "法師的話", l_funds: "捐款用途", l_join: "加入我們",
    l_temple: "靈山美佛寺", l_youtube: "油管頻道",
    disclaimer: '星星之火基金會（<span lang="en">Beacon Star Foundation</span>）為獨立之 <span lang="en">501(c)(3)</span> 公益組織，<span lang="en">EIN 37-1483029</span>。本會由靈山美佛寺（<span lang="en">American Buddhist Fellowship</span>）發起護持，兩者各為獨立之法律主體。養心院尚在籌備階段，將依加州法規申請牌照，並獨立經營、獨立管理。',
    copyright: '<span lang="en">Beacon Star Foundation</span>',
  },
  simp: {
    s: "simp",
    font: "'Noto Sans SC'",
    brand: "星星之火基金会",
    h_about: "关于我们", h_senior: "养心院", h_links: "相关链接",
    l_origin: "缘起故事", l_team: "工作团队", l_progress: "筹建进度",
    l_words: "法师的话", l_funds: "捐款用途", l_join: "加入我们",
    l_temple: "灵山美佛寺", l_youtube: "油管频道",
    disclaimer: '星星之火基金会（<span lang="en">Beacon Star Foundation</span>）为独立之 <span lang="en">501(c)(3)</span> 公益组织，<span lang="en">EIN 37-1483029</span>。本会由灵山美佛寺（<span lang="en">American Buddhist Fellowship</span>）发起护持，两者各为独立之法律主体。养心院尚在筹备阶段，将依加州法规申请牌照，并独立经营、独立管理。',
    copyright: '<span lang="en">Beacon Star Foundation</span>',
  },
  en: {
    s: "en",
    font: "'Alegreya Sans'",
    brand: "Beacon Star Foundation",
    h_about: "About us", h_senior: "Senior Living", h_links: "Links",
    l_origin: "Our Origin", l_team: "Our Team", l_progress: "Progress",
    l_words: "In His Words", l_funds: "Use of Gifts", l_join: "Join Us",
    l_temple: "Meifo Temple", l_youtube: "YouTube Channel",
    disclaimer: "Beacon Star Foundation is an independent 501(c)(3) nonprofit organization, EIN 37-1483029. The Foundation was initiated and is supported by Meifo Temple (American Buddhist Fellowship); the two remain separate legal entities. Beacon Star Senior Living is still in planning and will apply for licensure under California regulations, and will be independently operated and managed.",
    copyright: "Beacon Star Foundation",
  },
};

const partial = readFileSync(new URL("../partials/footer.html", import.meta.url), "utf8");
const css = {
  desktop: partial.match(/<!--css-desktop:\s*([\s\S]*?)-->/)[1].trim(),
  mobile: partial.match(/<!--css-mobile:\s*([\s\S]*?)-->/)[1].trim(),
};
const template = partial.slice(partial.indexOf("<footer")).trimEnd();

const root = new URL("..", import.meta.url);
for (const file of readdirSync(root).filter((f) => f.endsWith(".html"))) {
  const lang = /-en\.html$/.test(file) ? "en" : /-simp\.html$/.test(file) ? "simp" : "trad";
  const footer = template.replace(/%%(\w+)%%/g, (_, k) => {
    const v = STRINGS[lang][k];
    if (v === undefined) throw new Error(`unknown token %%${k}%% in partials/footer.html`);
    return v;
  });

  const path = new URL(file, root);
  let html = readFileSync(path, "utf8");
  if (!/<footer[\s\S]*?<\/footer>/.test(html)) throw new Error(`no <footer> in ${file}`);
  html = html.replace(/<footer[\s\S]*?<\/footer>/, () => footer);

  // The two `footer [data-flinks]{...}` rules in <style> appear desktop-first, then mobile.
  let n = 0;
  html = html.replace(/footer \[data-flinks\]\{[^}]*\}/g, () => (n++ === 0 ? css.desktop : css.mobile));
  if (n !== 2) throw new Error(`expected 2 [data-flinks] rules in ${file}, found ${n}`);

  writeFileSync(path, html);
  console.log(`${file} (${lang})`);
}
