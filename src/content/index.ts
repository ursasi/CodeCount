import { parseRepoFromUrl, fetchLanguageStats, fetchPreciseStats } from '../utils/github-api'
import { convertAndSort } from '../utils/line-counter'
import {
    createEstimatedUI,
    createErrorUI,
    updateToPreciseUI,
    showPreciseError,
    removeExistingUI,
    injectUI
} from './ui'

/**
 * 主函数：检测仓库页面并显示统计
 */
async function main() {
    const repo = parseRepoFromUrl(window.location.href)

    // 非仓库页面，不执行
    if (!repo) return

    // 排除特殊页面
    const path = window.location.pathname
    const specialPaths = ['/issues', '/pull', '/actions', '/settings', '/wiki', '/releases', '/packages']
    if (specialPaths.some(p => path.includes(p))) return

    // 移除已存在的 UI
    removeExistingUI()

    try {
        // 第一步：快速显示估算值
        const githubData = await fetchLanguageStats(repo)

        if (Object.keys(githubData).length === 0) {
            const ui = createErrorUI('暂无代码统计')
            injectUI(ui)
            return
        }

        const estimatedStats = convertAndSort(githubData)
        const ui = createEstimatedUI(estimatedStats)
        injectUI(ui)

        // 第二步：异步加载精确值
        try {
            const preciseData = await fetchPreciseStats(repo)
            updateToPreciseUI(preciseData)
        } catch (error) {
            console.warn('[GitHub Code Counter] 精确统计加载失败，保持估算值', error)
            showPreciseError()
        }

    } catch (error) {
        console.error('[GitHub Code Counter]', error)
        const ui = createErrorUI('获取统计失败')
        injectUI(ui)
    }
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
} else {
    main()
}

// 监听 GitHub SPA 导航
document.addEventListener('pjax:end', main)
document.addEventListener('turbo:render', main)
