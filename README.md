<p align="center">
  <img src="public/icons/icon128.png" alt="CodeCount" width="128">
</p>

<h1 align="center">CodeCount</h1>

<p align="center">🔢 Display code line statistics on GitHub repository pages.</p>

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Ready-green?logo=tampermonkey)](https://www.tampermonkey.net/)
[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-Install-red)](https://greasyfork.org/zh-CN/scripts/562596-codecount-github-%E4%BB%A3%E7%A0%81%E8%A1%8C%E6%95%B0%E7%BB%9F%E8%AE%A1)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

[English](#features) | [中文](#功能特性)

---

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

### Userscript (Recommended)

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. [Install CodeCount from Greasy Fork](https://greasyfork.org/zh-CN/scripts/562596-codecount-github-%E4%BB%A3%E7%A0%81%E8%A1%8C%E6%95%B0%E7%BB%9F%E8%AE%A1)
3. Visit any GitHub repository and enjoy! ✨

### Chrome Extension (From Source)

1. Clone and build
   ```bash
   git clone https://github.com/ursasi/CodeCount.git
   cd CodeCount
   npm install && npm run build
   ```

2. Load in Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" → Select `dist` folder

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Type-safe development |
| Vite + CRXJS | Fast builds & hot reload |
| GitHub API | Language byte statistics |
| CodeTabs API | Precise line counting |

## 📊 How It Works

1. **Fast Path**: Fetches language bytes from GitHub API → estimates lines (instant)
2. **Precise Path**: Calls CodeTabs API → gets exact line/comment/blank counts (async)

## 🤝 Contributing

Contributions welcome! Feel free to report bugs, suggest features, or submit PRs.

## 📄 License

MIT © [ursasi](https://github.com/ursasi)

---

# 中文说明

## ✨ 功能特性

- 📊 **即时估算** - 使用 GitHub API 立即显示估算行数
- 🎯 **精确统计** - 异步加载精确的代码行、注释行、空行数量
- 🌐 **多语言支持** - 按编程语言分类统计
- 🎨 **原生风格** - 与 GitHub 界面无缝融合

## 📸 效果预览

访问任意 GitHub 仓库时，CodeCount 会显示：

```
📊 代码统计                    [精确]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15,415 行代码
769 注释 · 2,353 空行 · 150 文件

Python          11,123
Markdown         1,261
Plain Text       1,481
...
```

## 🚀 安装方式

### 油猴脚本（推荐）

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. [从 Greasy Fork 安装 CodeCount](https://greasyfork.org/zh-CN/scripts/562596-codecount-github-%E4%BB%A3%E7%A0%81%E8%A1%8C%E6%95%B0%E7%BB%9F%E8%AE%A1)
3. 访问任意 GitHub 仓库即可使用 ✨

### Chrome 扩展（从源码构建）

1. 克隆并构建
   ```bash
   git clone https://github.com/ursasi/CodeCount.git
   cd CodeCount
   npm install && npm run build
   ```

2. 加载到 Chrome
   - 打开 `chrome://extensions/`
   - 开启「开发者模式」
   - 点击「加载已解压的扩展程序」→ 选择 `dist` 文件夹

## 📊 工作原理

1. **快速路径**：调用 GitHub API 获取语言字节数 → 估算行数（毫秒级）
2. **精确路径**：调用 CodeTabs API → 获取精确的代码/注释/空行数（异步）

## 🤝 参与贡献

欢迎提交 Bug 报告、功能建议或 Pull Request！

---

<p align="center">
  Made with ❤️ for developers who love metrics
</p>
