import { getState, createOrder, markPaid, CABINET } from '../store.js';
import { orderPage } from './orderpage.js';

let method = 'wechat';
let paying = false;
let sheetOpen = true;

export function setMethod(next) { method = next; }
export function closeSheet() { sheetOpen = false; }
export function openSheet() { sheetOpen = true; }
export function startPaying() { paying = true; }
export function finishPaying() {
  paying = false;
  sheetOpen = false;
  markPaid();
  location.hash = '#/pay-success';
}
export function resetPayState() { paying = false; sheetOpen = true; method = 'wechat'; }

export function ensureOrder() {
  const state = getState();
  if (!state.order) createOrder();
  return state.order;
}

export function renderPay() {
  const order = ensureOrder();
  return orderPage({ title: '确认订单', sheet: sheetOpen ? paySheet(order) : '' });
}

function paySheet(order) {
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="close-pay-sheet"></div>
      <section class="pay-sheet" role="dialog" aria-label="确认支付">
        <span class="sheet-handle"></span>
        <div class="pay-sheet-head">
          <h2>确认支付</h2>
          <button type="button" class="sheet-close" data-action="close-pay-sheet" aria-label="关闭"><img src="assets-20261101nn/svg/close-lg.svg" alt=""></button>
        </div>
        <div class="pay-amount">
          <p class="pay-amount-value"><span class="cny">¥</span><span class="num">${order.total.toFixed(2)}</span></p>
          <p class="pay-amount-sub">共${order.count}件· ${CABINET.name}</p>
        </div>
        <div class="pay-methods">
          <button type="button" class="pay-method ${method === 'wechat' ? 'is-active' : ''}" data-action="choose-method" data-method="wechat">
            <span class="pay-method-icon pay-method-wechat"><img src="assets-20261101nn/svg/wechat.svg" alt=""></span>
            <span class="pay-method-label">微信支付</span>
            <span class="pay-method-radio">${method === 'wechat' ? `<img src="assets-20261101nn/svg/check-green.svg" alt="">` : `<img src="assets-20261101nn/svg/radio-off.svg" alt="">`}</span>
          </button>
          <button type="button" class="pay-method ${method === 'balance' ? 'is-active' : ''}" data-action="choose-method" data-method="balance">
            <span class="pay-method-icon pay-method-balance"><img src="assets-20261101nn/svg/balance.svg" alt=""></span>
            <span class="pay-method-label">账户余额　¥128.60</span>
            <span class="pay-method-radio">${method === 'balance' ? `<img src="assets-20261101nn/svg/check-green.svg" alt="">` : `<img src="assets-20261101nn/svg/radio-off.svg" alt="">`}</span>
          </button>
        </div>
        <button type="button" class="pay-submit" data-action="confirm-pay" ${paying ? 'disabled' : ''}>
          ${paying ? '支付中…' : `确认支付 ¥${order.total.toFixed(2)}`}
        </button>
      </section>
    </div>`;
}
