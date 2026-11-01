import { statusBar } from '../components.js';

export function renderScan() {
  return `
    <div class="screen scan-screen">
      <header class="scan-header">
        ${statusBar()}
        <div class="navbar">
          <button type="button" class="nav-back scan-back" data-action="go" data-to="#/home" aria-label="返回"><img src="assets/svg/back.svg" alt=""></button>
          <span class="scan-title">扫码</span>
          <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
            <img class="nav-capsule" src="assets/svg/capsule.svg" alt="">
          </button>
        </div>
      </header>
      <div class="scan-body">
        <div class="scan-frame">
          <span class="scan-corner tl"></span>
          <span class="scan-corner tr"></span>
          <span class="scan-corner bl"></span>
          <span class="scan-corner br"></span>
          <span class="scan-line"></span>
        </div>
        <p class="scan-hint">对准柜机二维码，自动识别</p>
        <div class="scan-actions">
          <button type="button" class="scan-action" data-action="go" data-to="#/pickup">
            <span class="scan-action-icon"><img src="assets/svg/scan.svg" alt=""></span>
            <span>扫码取货</span>
          </button>
          <button type="button" class="scan-action" data-action="go" data-to="#/shopping">
            <span class="scan-action-icon"><img src="assets/svg/shop/cart.svg" alt=""></span>
            <span>扫码购物</span>
          </button>
          <button type="button" class="scan-action" data-action="soon" data-msg="开门码待接入">
            <span class="scan-action-icon"><img src="assets/svg/storage/local.svg" alt=""></span>
            <span>开门码</span>
          </button>
        </div>
      </div>
    </div>`;
}
