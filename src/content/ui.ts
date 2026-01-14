import type { LanguageLines, CodeTabsLanguage } from '../types'
import { formatNumber, getTotalLines, getPreciseTotal } from '../utils/line-counter'

const CONTAINER_ID = 'github-code-counter'

/**
 * 创建估算统计 UI（快速显示）
 */
export function createEstimatedUI(stats: LanguageLines[]): HTMLElement {
  const container = createContainer()
  const total = getTotalLines(stats)

  const langItems = stats.slice(0, 8).map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span>${item.language}</span>
      <span style="color: #656d76;">~${formatNumber(item.lines)}</span>
    </div>
  `).join('')

  const moreText = stats.length > 8
    ? `<div style="color: #656d76; font-size: 12px;">...还有 ${stats.length - 8} 种语言</div>`
    : ''

  container.innerHTML = `
    <div class="gcc-header">
      <span class="gcc-title">📊 代码统计</span>
      <span class="gcc-badge gcc-loading">估算中...</span>
    </div>
    <div class="gcc-total">约 ${formatNumber(total)} 行</div>
    <div class="gcc-list">${langItems}${moreText}</div>
  `

  addStyles()
  return container
}

/**
 * 更新为精确统计 UI
 */
export function updateToPreciseUI(stats: CodeTabsLanguage[]): void {
  const container = document.getElementById(CONTAINER_ID)
  if (!container) return

  const total = getPreciseTotal(stats)
  const filtered = stats.filter(item => item.language !== 'Total')

  const langItems = filtered.slice(0, 8).map(item => `
    <div class="gcc-lang-row">
      <span>${item.language}</span>
      <div class="gcc-lang-details">
        <span class="gcc-code">${formatNumber(item.linesOfCode)}</span>
        <span class="gcc-meta">${formatNumber(item.comments)} 注释 · ${formatNumber(item.blanks)} 空行</span>
      </div>
    </div>
  `).join('')

  const moreText = filtered.length > 8
    ? `<div style="color: #656d76; font-size: 12px;">...还有 ${filtered.length - 8} 种语言</div>`
    : ''

  container.innerHTML = `
    <div class="gcc-header">
      <span class="gcc-title">📊 代码统计</span>
      <span class="gcc-badge gcc-precise">精确</span>
    </div>
    ${total ? `
      <div class="gcc-total-precise">
        <div class="gcc-total-main">${formatNumber(total.linesOfCode)} 行代码</div>
        <div class="gcc-total-meta">${formatNumber(total.comments)} 注释 · ${formatNumber(total.blanks)} 空行 · ${formatNumber(total.files)} 文件</div>
      </div>
    ` : ''}
    <div class="gcc-list">${langItems}${moreText}</div>
  `
}


/**
 * 显示精确统计加载失败（保持估算值）
 */
export function showPreciseError(): void {
  const badge = document.querySelector('.gcc-badge')
  if (badge) {
    badge.textContent = '估算'
    badge.classList.remove('gcc-loading')
    badge.classList.add('gcc-estimated')
  }
}

/**
 * 创建错误提示 UI
 */
export function createErrorUI(message: string): HTMLElement {
  const container = createContainer()
  container.innerHTML = `
    <div class="gcc-header">
      <span class="gcc-title">📊 代码统计</span>
    </div>
    <div style="color: #656d76;">${message}</div>
  `
  addStyles()
  return container
}

/**
 * 创建容器
 */
function createContainer(): HTMLElement {
  const container = document.createElement('div')
  container.id = CONTAINER_ID
  return container
}

/**
 * 移除已存在的统计 UI
 */
export function removeExistingUI(): void {
  document.getElementById(CONTAINER_ID)?.remove()
}

/**
 * 将 UI 注入到页面
 */
export function injectUI(element: HTMLElement): boolean {
  const sidebar = document.querySelector('.Layout-sidebar .BorderGrid')
    || document.querySelector('.repository-content .BorderGrid')
    || document.querySelector('.Layout-sidebar')

  if (sidebar) {
    sidebar.insertBefore(element, sidebar.firstChild)
    return true
  }
  return false
}

/**
 * 添加样式
 */
function addStyles(): void {
  if (document.getElementById('gcc-styles')) return

  const style = document.createElement('style')
  style.id = 'gcc-styles'
  style.textContent = `
    #${CONTAINER_ID} {
      margin: 0 0 16px 0;
      padding: 16px;
      border: 1px solid var(--borderColor-default, #d0d7de);
      border-radius: 6px;
      font-size: 14px;
      background: var(--bgColor-default, #fff);
    }
    .gcc-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .gcc-title {
      font-weight: 600;
    }
    .gcc-badge {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 10px;
    }
    .gcc-loading {
      background: #ddf4ff;
      color: #0969da;
    }
    .gcc-estimated {
      background: #fff8c5;
      color: #9a6700;
    }
    .gcc-precise {
      background: #dafbe1;
      color: #1a7f37;
    }
    .gcc-total {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #656d76;
    }
    .gcc-total-precise {
      margin-bottom: 12px;
    }
    .gcc-total-main {
      font-size: 18px;
      font-weight: 600;
    }
    .gcc-total-meta {
      font-size: 12px;
      color: #656d76;
      margin-top: 2px;
    }
    .gcc-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .gcc-lang-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .gcc-lang-details {
      text-align: right;
    }
    .gcc-code {
      font-weight: 500;
    }
    .gcc-meta {
      display: block;
      font-size: 11px;
      color: #656d76;
    }
  `
  document.head.appendChild(style)
}
