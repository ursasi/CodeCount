// ==UserScript==
// @name         CodeCount - GitHub 代码行数统计
// @namespace    https://github.com/ursasi/CodeCount
// @version      1.1.0
// @description  在 GitHub 仓库页面显示代码行数统计，支持估算和精确统计，带语言图标
// @author       ursasi
// @match        https://github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        GM_xmlhttpRequest
// @connect      api.github.com
// @connect      api.codetabs.com
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const CONTAINER_ID = 'github-code-counter';

    // 语言图标映射 (使用 devicon CDN)
    const LANG_ICONS = {
        'JavaScript': 'javascript',
        'TypeScript': 'typescript',
        'Python': 'python',
        'Java': 'java',
        'Go': 'go',
        'Rust': 'rust',
        'C': 'c',
        'C++': 'cplusplus',
        'C#': 'csharp',
        'Ruby': 'ruby',
        'PHP': 'php',
        'Swift': 'swift',
        'Kotlin': 'kotlin',
        'Scala': 'scala',
        'Dart': 'dart',
        'R': 'r',
        'Lua': 'lua',
        'Perl': 'perl',
        'Haskell': 'haskell',
        'Elixir': 'elixir',
        'Clojure': 'clojure',
        'Erlang': 'erlang',
        'Julia': 'julia',
        'HTML': 'html5',
        'CSS': 'css3',
        'SCSS': 'sass',
        'Sass': 'sass',
        'Less': 'less',
        'Vue': 'vuejs',
        'React': 'react',
        'Svelte': 'svelte',
        'Shell': 'bash',
        'Bash': 'bash',
        'PowerShell': 'powershell',
        'Dockerfile': 'docker',
        'Markdown': 'markdown',
        'JSON': 'json',
        'YAML': 'yaml',
        'XML': 'xml',
        'SQL': 'mysql',
        'GraphQL': 'graphql',
        'Vim Script': 'vim',
        'Vim script': 'vim',
        'Makefile': 'cmake',
        'CMake': 'cmake',
        'Gradle': 'gradle',
        'Groovy': 'groovy',
        'Objective-C': 'objectivec',
        'Assembly': 'wasm',
        'WebAssembly': 'wasm',
        'TOML': 'tomcat',
        'Nginx': 'nginx',
        'Redis': 'redis',
    };

    // 获取语言图标 URL
    function getIconUrl(language) {
        const icon = LANG_ICONS[language];
        if (icon) {
            return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;
        }
        return null;
    }

    // 创建图标元素
    function createIcon(language) {
        const url = getIconUrl(language);
        if (url) {
            return `<img src="${url}" alt="${language}" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;" onerror="this.style.display='none'">`;
        }
        return '<span style="display:inline-block;width:16px;margin-right:6px;"></span>';
    }

    // 不同语言的平均每行字节数
    const BYTES_PER_LINE = {
        'Python': 30, 'JavaScript': 35, 'TypeScript': 38, 'Java': 50,
        'Go': 35, 'Rust': 45, 'C': 40, 'C++': 45, 'C#': 45, 'Ruby': 28,
        'PHP': 35, 'Swift': 40, 'Kotlin': 40, 'HTML': 50, 'CSS': 30
    };

    // 从 URL 解析仓库信息
    function parseRepoFromUrl(url) {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;
        return { owner: match[1], repo: match[2].split(/[?#]/)[0] };
    }

    // 字节转行数
    function bytesToLines(bytes, language) {
        const avg = BYTES_PER_LINE[language] || 40;
        return Math.round(bytes / avg);
    }

    // 格式化数字
    function formatNumber(num) {
        return num.toLocaleString();
    }

    // 获取 GitHub 语言统计
    function fetchGitHubStats(repo) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.github.com/repos/${repo.owner}/${repo.repo}/languages`,
                onload: (res) => {
                    if (res.status === 200) {
                        resolve(JSON.parse(res.responseText));
                    } else {
                        reject(new Error(`GitHub API: ${res.status}`));
                    }
                },
                onerror: reject
            });
        });
    }

    // 获取精确统计
    function fetchPreciseStats(repo) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://api.codetabs.com/v1/loc?github=${repo.owner}/${repo.repo}`,
                onload: (res) => {
                    if (res.status === 200) {
                        resolve(JSON.parse(res.responseText));
                    } else {
                        reject(new Error(`CodeTabs API: ${res.status}`));
                    }
                },
                onerror: reject
            });
        });
    }

    // 添加样式
    function addStyles() {
        if (document.getElementById('gcc-styles')) return;
        const style = document.createElement('style');
        style.id = 'gcc-styles';
        style.textContent = `
            #${CONTAINER_ID} {
                margin: 0 0 16px 0;
                padding: 16px;
                border: 1px solid var(--borderColor-default, #d0d7de);
                border-radius: 6px;
                font-size: 14px;
                background: var(--bgColor-default, #fff);
            }
            .gcc-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
            .gcc-title { font-weight: 600; }
            .gcc-badge { font-size: 11px; padding: 2px 6px; border-radius: 10px; }
            .gcc-loading { background: #ddf4ff; color: #0969da; }
            .gcc-estimated { background: #fff8c5; color: #9a6700; }
            .gcc-precise { background: #dafbe1; color: #1a7f37; }
            .gcc-total { font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #656d76; }
            .gcc-total-main { font-size: 18px; font-weight: 600; }
            .gcc-total-meta { font-size: 12px; color: #656d76; margin-top: 2px; }
            .gcc-list { display: flex; flex-direction: column; gap: 8px; }
            .gcc-lang-row { display: flex; justify-content: space-between; align-items: center; }
            .gcc-lang-name { display: flex; align-items: center; }
            .gcc-lang-stats { text-align: right; }
            .gcc-meta { display: block; font-size: 11px; color: #656d76; }
        `;
        document.head.appendChild(style);
    }

    // 创建估算 UI
    function createEstimatedUI(data) {
        const stats = Object.entries(data)
            .map(([lang, bytes]) => ({ lang, bytes, lines: bytesToLines(bytes, lang) }))
            .sort((a, b) => b.lines - a.lines);

        const total = stats.reduce((sum, s) => sum + s.lines, 0);
        const container = document.createElement('div');
        container.id = CONTAINER_ID;

        const langItems = stats.slice(0, 8).map(s => `
            <div class="gcc-lang-row">
                <span class="gcc-lang-name">${createIcon(s.lang)}${s.lang}</span>
                <span style="color:#656d76">~${formatNumber(s.lines)}</span>
            </div>
        `).join('');

        const more = stats.length > 8 ? `<div style="color:#656d76;font-size:12px;margin-top:4px">...还有 ${stats.length - 8} 种语言</div>` : '';

        container.innerHTML = `
            <div class="gcc-header">
                <span class="gcc-title">📊 代码统计</span>
                <span class="gcc-badge gcc-loading">估算中...</span>
            </div>
            <div class="gcc-total">约 ${formatNumber(total)} 行</div>
            <div class="gcc-list">${langItems}${more}</div>
        `;
        return container;
    }

    // 更新为精确统计
    function updateToPrecise(data) {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) return;

        const total = data.find(d => d.language === 'Total');
        const stats = data.filter(d => d.language !== 'Total').sort((a, b) => b.linesOfCode - a.linesOfCode);

        const langItems = stats.slice(0, 8).map(s => `
            <div class="gcc-lang-row">
                <span class="gcc-lang-name">${createIcon(s.language)}${s.language}</span>
                <div class="gcc-lang-stats">
                    <span style="font-weight:500">${formatNumber(s.linesOfCode)}</span>
                    <span class="gcc-meta">${formatNumber(s.comments)} 注释 · ${formatNumber(s.blanks)} 空行</span>
                </div>
            </div>
        `).join('');

        const more = stats.length > 8 ? `<div style="color:#656d76;font-size:12px;margin-top:4px">...还有 ${stats.length - 8} 种语言</div>` : '';

        container.innerHTML = `
            <div class="gcc-header">
                <span class="gcc-title">📊 代码统计</span>
                <span class="gcc-badge gcc-precise">精确</span>
            </div>
            ${total ? `
                <div style="margin-bottom:12px">
                    <div class="gcc-total-main">${formatNumber(total.linesOfCode)} 行代码</div>
                    <div class="gcc-total-meta">${formatNumber(total.comments)} 注释 · ${formatNumber(total.blanks)} 空行 · ${formatNumber(total.files)} 文件</div>
                </div>
            ` : ''}
            <div class="gcc-list">${langItems}${more}</div>
        `;
    }

    // 显示估算标签
    function showEstimated() {
        const badge = document.querySelector('.gcc-badge');
        if (badge) {
            badge.textContent = '估算';
            badge.className = 'gcc-badge gcc-estimated';
        }
    }

    // 注入 UI
    function injectUI(element) {
        const sidebar = document.querySelector('.Layout-sidebar .BorderGrid')
            || document.querySelector('.Layout-sidebar');
        if (sidebar) {
            sidebar.insertBefore(element, sidebar.firstChild);
            return true;
        }
        return false;
    }

    // 主函数
    async function main() {
        const repo = parseRepoFromUrl(window.location.href);
        if (!repo) return;

        // 排除特殊页面
        const path = window.location.pathname;
        if (['/issues', '/pull', '/actions', '/settings', '/wiki'].some(p => path.includes(p))) return;

        // 移除已有 UI
        document.getElementById(CONTAINER_ID)?.remove();
        addStyles();

        try {
            // 快速显示估算
            const githubData = await fetchGitHubStats(repo);
            if (Object.keys(githubData).length === 0) return;

            const ui = createEstimatedUI(githubData);
            injectUI(ui);

            // 异步加载精确统计
            try {
                const preciseData = await fetchPreciseStats(repo);
                updateToPrecise(preciseData);
            } catch (e) {
                console.warn('[CodeCount] 精确统计失败', e);
                showEstimated();
            }
        } catch (e) {
            console.error('[CodeCount]', e);
        }
    }

    // 页面加载后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

    // 监听 GitHub SPA 导航
    document.addEventListener('pjax:end', main);
    document.addEventListener('turbo:render', main);
})();
