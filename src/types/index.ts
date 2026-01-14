/** GitHub API 返回的语言统计数据（字节数） */
export interface LanguageBytes {
    [language: string]: number
}

/** 估算的语言行数统计 */
export interface LanguageLines {
    language: string
    bytes: number
    lines: number
}

/** codetabs API 返回的精确统计 */
export interface CodeTabsLanguage {
    language: string
    files: number
    lines: number
    blanks: number
    comments: number
    linesOfCode: number
}

/** 仓库信息 */
export interface RepoInfo {
    owner: string
    repo: string
}

/** 统计数据状态 */
export type StatsState =
    | { type: 'estimated'; data: LanguageLines[] }
    | { type: 'precise'; data: CodeTabsLanguage[] }
    | { type: 'error'; message: string }
