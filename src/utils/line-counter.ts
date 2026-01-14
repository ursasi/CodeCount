import type { LanguageBytes, LanguageLines, CodeTabsLanguage } from '../types'

/** 不同语言的平均每行字节数 */
const BYTES_PER_LINE: Record<string, number> = {
    'Python': 30,
    'JavaScript': 35,
    'TypeScript': 38,
    'Java': 50,
    'Go': 35,
    'Rust': 45,
    'C': 40,
    'C++': 45,
    'C#': 45,
    'Ruby': 28,
    'PHP': 35,
    'Swift': 40,
    'Kotlin': 40,
    'Scala': 35,
    'HTML': 50,
    'CSS': 30,
    'SCSS': 30,
    'Shell': 35,
    'Dockerfile': 30,
}

const DEFAULT_BYTES_PER_LINE = 40

/**
 * 将字节数转换为估算行数（按语言调整）
 */
export function bytesToLines(bytes: number, language?: string): number {
    const avgBytes = language ? (BYTES_PER_LINE[language] || DEFAULT_BYTES_PER_LINE) : DEFAULT_BYTES_PER_LINE
    return Math.round(bytes / avgBytes)
}

/**
 * 转换 GitHub API 数据并按行数排序（估算）
 */
export function convertAndSort(data: LanguageBytes): LanguageLines[] {
    return Object.entries(data)
        .map(([language, bytes]) => ({
            language,
            bytes,
            lines: bytesToLines(bytes, language),
        }))
        .sort((a, b) => b.lines - a.lines)
}

/**
 * 计算估算总行数
 */
export function getTotalLines(stats: LanguageLines[]): number {
    return stats.reduce((sum, item) => sum + item.lines, 0)
}

/**
 * 处理 codetabs 数据（过滤掉 Total 行，按代码行数排序）
 */
export function processPreciseStats(data: CodeTabsLanguage[]): CodeTabsLanguage[] {
    return data
        .filter(item => item.language !== 'Total')
        .sort((a, b) => b.linesOfCode - a.linesOfCode)
}

/**
 * 获取 codetabs 数据的总计
 */
export function getPreciseTotal(data: CodeTabsLanguage[]): CodeTabsLanguage | undefined {
    return data.find(item => item.language === 'Total')
}

/**
 * 格式化数字（添加千位分隔符）
 */
export function formatNumber(num: number): string {
    return num.toLocaleString()
}
