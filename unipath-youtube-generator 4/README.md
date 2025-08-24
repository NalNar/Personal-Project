# UniPath for YouTube — Chrome Extension (MV3)

Turn **YouTube** into a university-style learning platform. Curate courses, group lectures into modules, attach learning objectives, and export a clean syllabus.

> **New in v0.5.0** — **Majors pick-list** (Africana Studies → Urban Design & Architecture), **combined majors** (e.g. *Economics + Math*), better playlist picking (avoids Watch Later / Liked / Mix).

---

## ✨ Features
- **Majors pick-list**: choose a major and generate a full undergrad-style path.
- **Combined majors**: templates merge intelligently (e.g., *French + Linguistics*).
- **“Add to UniPath”** button on YouTube watch pages + right-click context menu.
- **Modules & lessons** with editable **learning objectives** and chapters preview.
- **Export** your course as **Markdown** or **JSON**.
- **Optional YouTube Data API key** to expand full playlists reliably.
- **Privacy-friendly**: all data lives in `chrome.storage.local` (no servers).

---

## 🖼️ Screenshots (placeholders)
Add your own in a `docs/` folder and reference them here.
- Popup: `docs/popup.png`
- Options / Course Manager: `docs/options.png`
- Majors pick-list: `docs/majors.png`

---

## 🚀 Quickstart (Load Unpacked)
1. **Download** this repo or clone it.
2. Open `chrome://extensions` → toggle **Developer mode** (top-right).
3. Click **Load unpacked** → select the project folder (the one containing `manifest.json`).
4. Visit any **YouTube** watch page and use **➕ Add to UniPath** or the extension popup.
5. Open **Options** → pick a **Major** → **Generate Course** → reorder/edit → **Export**.

> To make a release ZIP later: right-click the repo → **Download ZIP** or see packaging below.

---

## 🧠 Using the Majors Pick-List
- Open **Options** → **Generate by Major**.
- Pick a major (e.g., *Mathematics B.A., B.S.*) and click **Generate Course**.
- For **combined majors** (e.g., *Economics and Mathematics*), the generator merges templates into one curriculum.

<details>
<summary><strong>Included majors (sample; more in the picker)</strong></summary>

Africana Studies, American Studies, Anthropology, <strong>Anthropology + Classical Civilization</strong>, <strong>Anthropology + Linguistics</strong>, Art History, Biochemistry, Biology, Chemistry, Cinema Studies, Classical Civilization, <strong>Classics + Art History</strong>, Comparative Literature, <strong>Computer Science (B.A., B.S.)</strong>, <strong>Computer + Data Science</strong>, Data Science, <strong>Data Science + Mathematics</strong>, Dramatic Literature/Theatre/Cinema, East Asian Studies, Economics, <strong>Economics + Computer Science</strong>, <strong>Economics + Mathematics</strong>, <strong>Engineering (B.S.)</strong>, English, Environmental Studies, European & Mediterranean Studies, <strong>French (+ Linguistics)</strong>, Gender & Sexuality Studies, <strong>German (+ Linguistics)</strong>, Global Public Health, Hebrew & Judaic Studies, Hellenic Studies, History, <strong>International Relations</strong>, <strong>Italian (+ Linguistics)</strong>, Journalism, <strong>Language & Mind</strong>, Latin American & Caribbean Studies, Latino Studies, <strong>Linguistics</strong>, <strong>Mathematics (B.A., B.S.)</strong>, <strong>Mathematics + Computer Science</strong>, Medieval & Renaissance Studies, Metropolitan Studies, Middle Eastern Studies, Music, <strong>Neural Science (B.S.)</strong>, Philosophy, <strong>Physics (B.A., B.S.)</strong>, Politics, Psychology, Public Policy, Religious Studies, Romance Languages, Russian & Slavic Studies, Social & Cultural Analysis, <strong>Sociology</strong>, <strong>Spanish (+ Portuguese / Linguistics)</strong>, <strong>Urban Design & Architecture Studies</strong>.
</details>

---

## 🔑 (Optional) Add a YouTube Data API Key
The extension works without a key (HTML fallback), but a key helps expand large playlists and improves reliability.

1. In **Google Cloud Console**, create/choose a project and enable **YouTube Data API v3**.
2. Create an **API key**.
3. Open the extension **Options** page → paste the key → **Save API Key**.

> Network usage: searches YouTube pages (`youtube.com/results`) and, if the key is provided, calls `www.googleapis.com/youtube/v3/*`.

---

## 🗂️ File Tree
unipath-youtube/
├── manifest.json
├── background.js # MV3 service worker: context menu, recent video relay
├── content.js # Injects “Add to UniPath”, extracts metadata from watch pages
├── popup.html / popup.js # Add current video to a course
├── options.html / options.js
│ └─ Course Manager: majors pick-list, generator, export
├── generator.js # Majors templates, YouTube search/API, HTML fallback
├── utils.js # helpers (slugify, duration, sorting, download)
├── styles.css
└── icons/
├── icon16.png
├── icon48.png
└── icon128.png

---

## 🔒 Permissions & Privacy
**Permissions**: `storage`, `scripting`, `activeTab`, `contextMenus`; host permissions for:
- `https://www.youtube.com/*`
- `https://www.googleapis.com/*` *(only used if you set an API key)*

**Data**: Courses are stored in `chrome.storage.local`. No analytics, tracking scripts, or external databases. YouTube API calls happen **client-side**.

---

## 🛠️ Development
- Keep script paths exactly as in `manifest.json` (MV3 service worker + content script).
- Content scripts aren’t ES modules in MV3—expose helpers via globals or bundle.
- After edits, reload from `chrome://extensions`.

### Packaging a ZIP for Store Upload
Zip the **contents** of the project folder (not the folder itself):
```bash
cd unipath-youtube
zip -r ../unipath-youtube-v0.5.0.zip .

Ideation & curriculum design: Authored by me.

Implementation: Code and scaffolding were generated with assistance from ChatGPT (GPT-5 Thinking); large portions are AI-generated. Review and test before production use.

Credit: If you reuse this repo, please retain this attribution.
