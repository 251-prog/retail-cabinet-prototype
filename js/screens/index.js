import { statusBar } from '../components.js';

const PAGES = [
  { route: '#/select', name: '选购页', desc: '分类切换、商品加购、购物车入口' },
  { route: '#/cart', name: '购物车', desc: '勾选、步进、清空、去结算（底部弹层）' },
  { route: '#/pay', name: '确认支付', desc: '订单明细、费用明细、支付方式' },
  { route: '#/pay-success', name: '支付成功', desc: '格口号、取货提示、立即取货' },
  { route: '#/pickup', name: '扫码取货', desc: '到柜扫码引导' },
  { route: '#/pickup/cabinet', name: '本柜取货', desc: '逐格开柜、进度、售后入口' },
];

export function renderIndex() {
  return `
    <div class="screen index-screen">
      <header class="app-header index-header">
        ${statusBar()}
        <div class="index-titlebar">
          <h1>原型页面目录</h1>
          <p>直接购买流程 · 共 ${PAGES.length} 个页面</p>
        </div>
      </header>
      <main class="index-main">
        <button type="button" class="index-cta" data-action="go" data-to="#/select">从选购页开始走完整流程 →</button>
        <div class="index-list">
          ${PAGES.map((p, i) => `
            <button type="button" class="index-item" data-action="go" data-to="${p.route}">
              <span class="index-no">${String(i + 1).padStart(2, '0')}</span>
              <span class="index-info">
                <span class="index-name">${p.name}</span>
                <span class="index-desc">${p.desc}</span>
              </span>
              <span class="index-arrow">›</span>
            </button>`).join('')}
        </div>
        <p class="index-tip">手机打开会自动铺满全屏；桌面打开为手机壳预览。链接后加 <code>#/页面</code> 可直接跳转。</p>
      </main>
    </div>`;
}
