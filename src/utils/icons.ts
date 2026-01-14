/** 语言图标映射 (使用 devicon CDN) */
const LANG_ICONS: Record<string, string> = {
    // 编程语言
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
    'F#': 'fsharp',
    'OCaml': 'ocaml',
    'Zig': 'zig',
    'Nim': 'nim',
    'Crystal': 'crystal',
    'V': 'v',
    'Solidity': 'solidity',
    'Objective-C': 'objectivec',
    'Objective-C++': 'objectivec',

    // 前端
    'HTML': 'html5',
    'CSS': 'css3',
    'SCSS': 'sass',
    'Sass': 'sass',
    'Less': 'less',
    'Stylus': 'stylus',
    'Vue': 'vuejs',
    'Svelte': 'svelte',
    'Astro': 'astro',

    // 配置/数据
    'JSON': 'json',
    'YAML': 'yaml',
    'XML': 'xml',
    'TOML': 'tomcat',
    'INI': 'ini',

    // Shell/脚本
    'Shell': 'bash',
    'Bash': 'bash',
    'PowerShell': 'powershell',
    'Batchfile': 'windows8',

    // 数据库/查询
    'SQL': 'mysql',
    'PLpgSQL': 'postgresql',
    'PLSQL': 'oracle',
    'GraphQL': 'graphql',

    // DevOps/容器
    'Dockerfile': 'docker',
    'Makefile': 'cmake',
    'CMake': 'cmake',
    'Gradle': 'gradle',
    'Groovy': 'groovy',
    'Nix': 'nixos',

    // 文档
    'Markdown': 'markdown',
    'reStructuredText': 'readthedocs',
    'TeX': 'latex',
    'LaTeX': 'latex',

    // 编辑器
    'Vim Script': 'vim',
    'Vim script': 'vim',
    'Emacs Lisp': 'emacs',

    // 其他
    'WebAssembly': 'wasm',
    'Assembly': 'wasm',
}

/** 使用 Simple Icons 的语言（devicon 没有的） */
const SIMPLE_ICONS: Record<string, string> = {
    'SVG': 'svg',
    'Jupyter Notebook': 'jupyter',
    'Terraform': 'terraform',
    'Ansible': 'ansible',
    'Puppet': 'puppet',
    'Vagrant': 'vagrant',
    'Nginx': 'nginx',
    'Apache': 'apache',
    'Redis': 'redis',
    'MongoDB': 'mongodb',
    'Prisma': 'prisma',
    'Protocol Buffer': 'protobuf',
    'Protobuf': 'protobuf',
}

/**
 * 获取语言图标 URL
 * 使用 GitHub raw 地址，避免 jsdelivr 被 CSP 阻止
 */
export function getIconUrl(language: string): string | null {
    // 先检查 devicon
    const deviconName = LANG_ICONS[language]
    if (deviconName) {
        return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${deviconName}/${deviconName}-original.svg`
    }

    // 再检查 Simple Icons
    const simpleIconName = SIMPLE_ICONS[language]
    if (simpleIconName) {
        return `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${simpleIconName}.svg`
    }

    return null
}

/** 默认文件图标 (内联 SVG) */
const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;color:#656d76;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`

/** Fallback 图标 data URI */
const FALLBACK_ICON_URI = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23656d76" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>')

/**
 * 创建图标 HTML
 */
export function createIconHtml(language: string): string {
    const url = getIconUrl(language)
    if (url) {
        return `<img src="${url}" alt="${language}" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;" onerror="this.src='${FALLBACK_ICON_URI}'">`
    }
    return DEFAULT_ICON
}
