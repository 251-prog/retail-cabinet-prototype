import { getState } from '../store.js';
import { statusBar, productMedia } from '../components.js';
import { cabinetCard } from './orderpage.js';
import { ensureOrder } from './pay.js';

let rows = null;
let openKey = null;

export function resetPickupState() {
  rows = null;
  openKey = null;
}

function ensureRows(order) {
  if (!rows || rows.orderNo !== order.no) {
    rows = {
      orderNo: order.no,
      items: order.items.map((item, index) => ({
        key: item.id + '-' + index,
        id: item.id,
        name: item.name,
        media: item.media,
        qty: item.qty,
        locker: index === 0 ? 'B01' : 'B02',
        status: 'pending',
      })),
    };
  }
  return rows;
}

export function openLocker(key) { openKey = key; }
export function closeLocker() { openKey = null; }

export function openNextLocker() {
  const order = ensureOrder();
  const data = ensureRows(order);
  const next = data.items.find(i => i.status === 'pending');
  openKey = next ? next.key : null;
}

export function completeLocker() {
  if (!rows || !openKey) return false;
  const row = rows.items.find(i => i.key === openKey);
  if (row) row.status = 'done';
  openKey = null;
  return rows.items.every(i => i.status === 'done');
}

export function renderCabinet() {
  const order = ensureOrder();
  const data = ensureRows(order);
  const done = data.items.filter(i => i.status === 'done').length;
  const total = data.items.length;
  const current = openKey ? data.items.find(i => i.key === openKey) : null;
  return `
    <div class="screen screen-pay pickup-screen">
      <header class="pay-header">
        ${statusBar()}
        <div class="navbar navbar-title">
          <button type="button" class="nav-back" data-action="back" data-to="#/pickup" aria-label="返回"><img src="assets-20261101hh/svg/back-pay.svg" alt=""></button>
          <h1 class="nav-title">本柜取货</h1>
          <img class="nav-capsule" src="assets-20261101hh/svg/capsule-pay.svg" alt="">
        </div>
      </header>
      <main class="pay-main pickup-main">
        ${cabinetCard()}
        <section class="pickup-card">
          <div class="pickup-head">
            <span class="pickup-head-text">逐个开柜，关门校验后完成</span>
            <span class="pickup-count"><b>${done}</b><i>/${total}</i></span>
          </div>
          <div class="progress"><span style="width:${total ? (done / total) * 100 : 0}%"></span></div>
          <div class="pickup-list">
            ${data.items.map((item, i) => pickupRow(item, i < data.items.length - 1)).join('')}
          </div>
        </section>
      </main>
      <footer class="pickup-bar">
        <button type="button" class="btn-primary pickup-btn" data-action="open-next-locker" ${done === total ? 'disabled' : ''}>
          ${done === total ? '已完成' : '开柜'}
        </button>
      </footer>
      ${current ? openSheet(current) : ''}
    </div>`;
}

function pickupRow(item, divider) {
  return `
    <div class="pickup-row ${divider ? 'has-divider' : ''}">
      <div class="pickup-item">
        <div class="pickup-thumb">${productMedia(item.media, 'media-xs')}</div>
        <div class="pickup-info">
          <div class="pickup-name-row">
            <span class="tag tag-blue">购买</span>
            <span class="pickup-name">${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}</span>
          </div>
          <p class="pickup-sub">#CG20260707-091 · ${item.locker}格</p>
        </div>
      </div>
      ${item.status === 'done'
        ? `<span class="pill pill-done">已完成</span>`
        : `<button type="button" class="pill pill-open" data-action="open-locker" data-key="${item.key}">开柜</button>`}
    </div>`;
}

function openSheet(item) {
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="close-locker"></div>
      <section class="bottom-sheet open-sheet" role="dialog" aria-label="${item.locker}格已开">
        <span class="sheet-handle"></span>
        <button type="button" class="sheet-close success-close" data-action="close-locker" aria-label="关闭"><img src="assets-20261101hh/svg/close-sm.svg" alt=""></button>
        <div class="open-hero">
          <span class="locker-icon"><img src="assets-20261101hh/svg/locker-open.svg" alt=""></span>
          <p class="open-title">${item.locker}格已开</p>
          <p class="open-sub">${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}<br>请取出商品并关好柜门</p>
        </div>
        <div class="warn-box">
          <img src="assets-20261101hh/svg/attention.svg" alt="">
          <p>开柜即交易成功，24h 内可售后。柜门未关好将提醒您。</p>
        </div>
        <button type="button" class="protect-row" data-action="after-sale">
          <img class="protect-icon" src="assets-20261101hh/svg/protect.svg" alt="">
          <span>商品缺失/损坏？点此售后（针对本商品）</span>
          <img class="chevron" src="assets-20261101hh/svg/chevron.svg" alt="">
        </button>
        <button type="button" class="btn-primary sheet-wide-btn" data-action="locker-done">我已关门</button>
      </section>
    </div>`;
}
