export const TIME = '10:36';

export function statusBar() {
  return `
    <div class="statusbar">
      <span class="statusbar-time">${TIME}</span>
      <img class="statusbar-cellular" src="assets-20261101jj/svg/cellular.svg" alt="">
      <img class="statusbar-wifi" src="assets-20261101jj/svg/wifi.svg" alt="">
      <span class="battery">
        <img class="battery-cap" src="assets-20261101jj/svg/battery-cap.svg" alt="">
      </span>
    </div>`;
}

export function navBar({ capsule = 'capsule', back = true, backTo = '' } = {}) {
  return `
    <div class="navbar">
      ${back
        ? `<button type="button" class="nav-back" data-action="back"${backTo ? ` data-to="${backTo}"` : ''} aria-label="返回"><img class="flip" src="assets-20261101jj/svg/back.svg" alt=""></button>`
        : `<span class="nav-back-placeholder"></span>`}
      <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
        <img class="nav-capsule" src="assets-20261101jj/svg/${capsule}.svg" alt="">
      </button>
    </div>`;
}

export function tags(items = []) {
  return items.map(t => `<span class="tag tag-${t.tone}">${t.text}</span>`).join('');
}

export function priceMarkup(price, unit = '') {
  return `<p class="price"><span class="cny">¥ </span><span class="num">${formatMoney(price)}</span>${unit ? `<span class="unit">${unit}</span>` : ''}</p>`;
}

export function formatMoney(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

/** 商品图：helmet / hygro / combo（按设计稿的裁切比例展示原图） */
export function productMedia(type, sizeClass = 'media-lg') {
  if (type === 'combo') {
    return `
      <div class="combo-art ${sizeClass}">
        <div class="combo-inner">
          <div class="combo-row combo-row-top">
            <span class="crop crop-helmet-sm"><img src="assets-20261101jj/product-helmet.png" alt=""></span>
            <span class="combo-badge">
              <img class="combo-badge-img" src="assets-20261101jj/thumb-155.png" alt="">
              <img class="combo-badge-union" src="assets-20261101jj/svg/union.svg" alt="">
            </span>
          </div>
          <div class="combo-row combo-row-bottom">
            <span class="crop crop-hygro-sm"><img src="assets-20261101jj/product-hygrometer.png" alt=""></span>
            <span class="crop crop-strip"><img src="assets-20261101jj/product-strip.png" alt=""></span>
          </div>
        </div>
      </div>`;
  }
  if (type === 'helmet') {
    return `<div class="media-art media-helmet ${sizeClass}"><span class="crop crop-helmet"><img src="assets-20261101jj/product-helmet.png" alt=""></span></div>`;
  }
  return `<div class="media-art media-hygro ${sizeClass}"><span class="crop crop-hygro"><img src="assets-20261101jj/product-hygrometer.png" alt=""></span></div>`;
}

let toastTimer = null;
export function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
}
