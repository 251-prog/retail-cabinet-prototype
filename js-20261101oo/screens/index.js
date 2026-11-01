import { statusBar } from '../components.js';

const PAGES = [
  { route: '#/home', name: '首页', desc: '柜机入口、服务宫格、附近服务点、底部 tab' },
  { route: '#/address', name: '选择地区', desc: '搜索地区、常用地址、附近地址' },
  { route: '#/shopping', name: '购物', desc: '搜索、分类筛选、附近柜商品' },
  { route: '#/merchant', name: '商家', desc: '经营工作台、经营指标、待处理订单' },
  { route: '#/mine', name: '我的', desc: '账户余额、订单入口、功能菜单' },
  { route: '#/scan', name: '扫码', desc: '扫码取货、扫码购物、开门码' },
  { route: '#/select', name: '选购页', desc: '分类切换、商品加购、购物车入口' },
  { route: '#/cart', name: '购物车', desc: '勾选、步进、清空、去结算（底部弹层）' },
  { route: '#/pay', name: '确认支付', desc: '订单明细、费用明细、支付方式' },
  { route: '#/pay-success', name: '支付成功', desc: '格口号、取货提示、立即取货' },
  { route: '#/pickup', name: '扫码取货', desc: '到柜扫码引导' },
  { route: '#/pickup/cabinet', name: '本柜取货', desc: '逐格开柜、进度、售后入口' },
  { route: '#/storage', name: '智能存物', desc: '选择格口规格、寄存时长、下单' },
  { route: '#/storage/confirm', name: '确认存物', desc: '柜格锁定、计时、立即/稍后开柜' },
  { route: '#/storage/active', name: '存放中', desc: '存放计时、费用明细、取物入口' },
  { route: '#/storage/pickup/cabinet', name: '寄存取物', desc: '扫码取物、本柜开柜' },
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
