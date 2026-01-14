# CodeCount

> 🔢 A Chrome extension that displays code line statistics on GitHub repository pages.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)](https://github.com/ursasi/CodeCount)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)](https://developer.chrome.com/docs/extensions/mv3/)

## ✨ Features

- 📊 **Instant Estimates** - Shows estimated line counts immediately using GitHub's language API
- 🎯 **Precise Statistics** - Asynchronously loads exact line counts (code, comments, blanks)
- 🌐 **Multi-language Support** - Breaks down statistics by programming language
- 🎨 **Native GitHub Style** - Seamlessly integrates with GitHub's UI

## 📸 Preview

When you visit any GitHub repository, CodeCount displays:

```
📊 Code Statistics          [Precise]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15,415 lines of code
769 comments · 2,353 blanks · 150 files

Python          11,123
Markdown         1,261
Plain Text       1,481
...
```

## 🚀 Installation

### From Source

1. Clone this repository
   ```bash
   git clone https://github.com/ursasi/CodeCount.git
   cd CodeCount
   ```

2. Install dependencies and build
   ```bash
   npm install
   npm run build
   ```

3. Load in Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

4. Visit any GitHub repository and see the magic! ✨

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe development |
| Vite + CRXJS | Fast builds & hot reload |
| Manifest V3 | Modern Chrome extension standard |
| GitHub API | Language byte statistics |
| CodeTabs API | Precise line counting |

## 📁 Project Structure

```
src/
├── content/          # Content scripts (injected into GitHub)
│   ├── index.ts      # Main entry point
│   └── ui.ts         # UI components
├── utils/            # Utility functions
│   ├── github-api.ts # API calls
│   └── line-counter.ts # Statistics processing
└── types/            # TypeScript definitions
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Development with hot reload
npm run dev

# Production build
npm run build
```

## 📊 How It Works

1. **Fast Path**: Fetches language bytes from GitHub API → estimates lines (instant)
2. **Precise Path**: Calls CodeTabs API → gets exact line/comment/blank counts (async)

The extension shows estimated values first, then seamlessly updates to precise statistics when available.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📄 License

MIT © [ursasi](https://github.com/ursasi)

---

<p align="center">
  Made with ❤️ for developers who love metrics
</p>
