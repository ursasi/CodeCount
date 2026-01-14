/** 语言图标映射 (使用 devicon CDN) */
const LANG_ICONS: Record<string, string> = {
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
}

/**
 * 获取语言图标 URL
 */
export function getIconUrl(language: string): string | null {
    const icon = LANG_ICONS[language]
    if (icon) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`
    }
    return null
}

/**
 * 创建图标 HTML
 */
export function createIconHtml(language: string): string {
    const url = getIconUrl(language)
    if (url) {
        return `<img src="${url}" alt="${language}" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;" onerror="this.style.display='none'">`
    }
    return '<span style="display:inline-block;width:16px;margin-right:6px;"></span>'
}
