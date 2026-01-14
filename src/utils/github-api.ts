import type { LanguageBytes, RepoInfo, CodeTabsLanguage } from '../types'

/**
 * 从当前 URL 解析仓库信息
 */
export function parseRepoFromUrl(url: string): RepoInfo | null {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!match) return null
    return { owner: match[1], repo: match[2].split(/[?#]/)[0] }
}

/**
 * 获取仓库的语言统计数据（GitHub API，快速但只有字节数）
 */
export async function fetchLanguageStats(repo: RepoInfo): Promise<LanguageBytes> {
    const response = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.repo}/languages`
    )
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
    }
    return response.json()
}

/**
 * 获取精确的代码行数统计（codetabs API，慢但精确）
 */
export async function fetchPreciseStats(repo: RepoInfo): Promise<CodeTabsLanguage[]> {
    const response = await fetch(
        `https://api.codetabs.com/v1/loc?github=${repo.owner}/${repo.repo}`
    )
    if (!response.ok) {
        throw new Error(`CodeTabs API error: ${response.status}`)
    }
    return response.json()
}
