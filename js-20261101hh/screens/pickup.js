import { CABINET } from '../store.js';
import { orderPage } from './orderpage.js';
import { ensureOrder } from './pay.js';

export function renderPickup() {
  ensureOrder();
  return orderPage({ title: '确认订单', sheet: scanSheet() });
}

function scanSheet() {
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="go-select"></div>
      <section class="bottom-sheet scan-sheet" role="dialog" aria-label="到柜扫码取货">
        <span class="sheet-handle"></span>
        <button type="button" class="sheet-close success-close" data-action="go-select" aria-label="关闭"><img src="assets-20261101hh/svg/close-sm.svg" alt=""></button>
        <div class="scan-hero">
          <span class="scan-icon"><img src="assets-20261101hh/svg/scan.svg" alt=""></span>
          <p class="scan-title">到柜扫码取货</p>
          <p class="scan-sub">请到 <b>${CABINET.name}</b> 柜前扫码，<br>确认后即可开柜取货</p>
        </div>
        <div class="warn-box">
          <img src="assets-20261101hh/svg/attention.svg" alt="">
          <p>商品为您保留 15 分钟。扫码后在柜逐件取货。暂时不取可先关闭，稍后继续。</p>
        </div>
        <button type="button" class="btn-primary sheet-wide-btn" data-action="go-pickup-cabinet">扫码取货</button>
      </section>
    </div>`;
}
