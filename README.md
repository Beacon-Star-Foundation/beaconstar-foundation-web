# Beacon Star Foundation — website

Static site for the Beacon Star Foundation (星星之火基金會), a 501(c)(3)
nonprofit in Los Angeles. Plain HTML — no build step, no dependencies.

## Pages

Each page exists in English, Traditional Chinese, and Simplified Chinese:

| | English | 繁體 | 简体 |
|---|---|---|---|
| Home | `Beacon-Star-Foundation.dc.html` | `星星之火基金會-首頁-v4.dc.html` | `星星之火基金会-首页-v4.dc.html` |
| Origin | `Our-Origin.dc.html` | `緣起故事.dc.html` | `缘起故事.dc.html` |
| Senior Living | `Senior-Living.dc.html` | `養心院.dc.html` | `养心院.dc.html` |
| Team | `Our-Team.dc.html` | `工作團隊.dc.html` | `工作团队.dc.html` |

`index.html` redirects to the Traditional Chinese home page. `support.js` is the shared
runtime the pages load; every page needs it.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000/

## Deploy

GitHub Pages: Settings → Pages → deploy from the `main` branch, root folder.
`.nojekyll` keeps Pages from running the files through Jekyll.
