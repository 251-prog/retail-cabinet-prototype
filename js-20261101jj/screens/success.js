import { CABINET } from '../store.js';
import { orderPage } from './orderpage.js';
import { formatMoney } from '../components.js';
import { ensureOrder } from './pay.js';

export function renderSuccess() {
  const order = ensureOrder();
  return orderPage({ title: '确认订单', sheet: successSheet(order) });
}

function successSheet(order) {
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="go-select"></div>
      <section class="bottom-sheet success-sheet" role="dialog" aria-label="支付成功">
        <span class="sheet-handle"></span>
        <button type="button" class="sheet-close success-close" data-action="go-select" aria-label="关闭"><img src="assets-20261101jj/svg/close-sm.svg" alt=""></button>
        <div class="success-hero">
          <span class="success-icon"><img src="assets-20261101jj/svg/check-small.svg" alt=""></span>
          <p class="success-title">支付成功，本单格号${order.locker}</p>
          <p class="success-sub">¥${formatMoney(order.total)} 已支付，格口已为您保留</p>
        </div>
        <div class="success-cabinet">
          <div class="cabinet-thumb"><img src="assets-20261101jj/cabinet.png" alt=""></div>
          <div class="cabinet-info">
            <div class="cabinet-title-row">
              <span class="cabinet-name">${CABINET.name}</span>
              <span class="tag tag-outline-green">到柜自提</span>
            </div>
            <p class="cabinet-meta">距您 ${CABINET.distance} · 编号 ${CABINET.code}</p>
            <div class="cabinet-tags">
              <span class="tag tag-orange">12 格可用</span>
              <span class="tag tag-orange">24h 服务</span>
            </div>
          </div>
        </div>
        <div class="warn-box">
          <img src="assets-20261101jj/svg/attention.svg" alt="">
          <p>商品为您保留 15 分钟，超时未取将自动退款。</p>
        </div>
        <button type="button" class="btn-primary sheet-wide-btn" data-action="go-pickup">立即取货</button>
      </section>
    </div>`;
}
