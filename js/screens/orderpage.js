import { CABINET, getState } from '../store.js';
import { statusBar, productMedia, formatMoney } from '../components.js';

export function cabinetCard() {
  return `
    <section class="pay-card pay-cabinet">
      <div class="pay-card-head">
        <span class="pay-card-title">取放柜机</span>
        <span class="pay-card-side">自提</span>
      </div>
      <div class="cabinet-row">
        <div class="cabinet-thumb"><img src="assets/cabinet.png" alt=""></div>
        <div class="cabinet-info">
          <div class="cabinet-title-row">
            <span class="cabinet-name">${CABINET.name}</span>
            <span class="tag tag-outline-green">${CABINET.status}</span>
          </div>
          <p class="cabinet-meta">距您 ${CABINET.distance} · 编号 ${CABINET.code}</p>
          <div class="cabinet-tags">
            <span class="tag tag-orange">12 格可用</span>
            <span class="tag tag-orange">24h 服务</span>
          </div>
        </div>
      </div>
    </section>`;
}

export function orderPage({ title = '确认订单', sheet = '' } = {}) {
  const order = getState().order;
  if (!order) return '';
  return `
    <div class="screen screen-pay">
      <header class="pay-header">
        ${statusBar()}
        <div class="navbar navbar-title">
          <button type="button" class="nav-back" data-action="back" data-to="#/cart" aria-label="返回"><img src="assets/svg/back-pay.svg" alt=""></button>
          <h1 class="nav-title">${title}</h1>
          <img class="nav-capsule" src="assets/svg/capsule-pay.svg" alt="">
        </div>
      </header>
      <main class="pay-main">
        ${cabinetCard()}
        ${orderCard(order)}
        ${feeCard(order)}
        <p class="pay-note">买家仅支付商品货款，柜格费由商户上架时承担。</p>
      </main>
      <footer class="pay-bar">
        <div class="payable">
          <span class="payable-label">实付</span>
          <span class="payable-amount"><span class="cny">¥</span><span class="num">${order.total.toFixed(2)}</span></span>
        </div>
        <button type="button" class="btn-primary pay-confirm" data-action="open-pay-sheet">确认支付</button>
      </footer>
      ${sheet}
    </div>`;
}

function orderCard(order) {
  return `
    <section class="pay-card">
      <div class="pay-card-head pay-card-headline">
        <span class="pay-card-title">订单明细</span>
        <span class="order-count">共${order.count}件</span>
      </div>
      <div class="pay-items">
        ${order.items.map(item => `
          <div class="pay-item">
            <div class="cart-media">${productMedia(item.media, 'media-sm')}</div>
            <div class="pay-item-body">
              <div class="pay-item-info">
                <p class="cart-name">${item.name}</p>
                <p class="cart-desc">${item.desc}</p>
              </div>
              <div class="cart-bottom">
                <span class="price"><span class="cny">¥ </span><span class="num">${formatMoney(item.price)}</span></span>
                <div class="stepper">
                  <button type="button" class="step-btn" data-action="pay-dec" data-id="${item.id}" aria-label="减少"><img src="assets/svg/minus-sm.svg" alt=""></button>
                  <span class="step-qty">${item.qty}</span>
                  <button type="button" class="step-btn" data-action="pay-inc" data-id="${item.id}" aria-label="增加"><img src="assets/svg/plus.svg" alt=""></button>
                </div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </section>`;
}

function feeCard(order) {
  return `
    <section class="pay-card">
      <div class="pay-card-head pay-card-headline"><span class="pay-card-title">费用明细</span></div>
      <div class="fee-body">
        <div class="fee-row">
          <p class="fee-label">商品总价<span class="fee-sub">　共${order.count}件</span></p>
          <p class="fee-value"><span class="fee-cny">¥</span>${order.total.toFixed(2)}</p>
        </div>
        <div class="fee-row">
          <p class="fee-label">规格费</p>
          <p class="fee-muted">商家承担 ¥0.00</p>
        </div>
        <div class="fee-row fee-total">
          <p class="fee-label">实付</p>
          <p class="fee-total-value"><span class="fee-cny">¥</span>${order.total.toFixed(2)}</p>
        </div>
      </div>
    </section>`;
}
