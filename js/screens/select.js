import {
  CATALOG, CATEGORIES, CABINET,
  getState, cartCount, cartTotal,
} from '../store.js';
import { statusBar, navBar, tags, priceMarkup, productMedia, formatMoney } from '../components.js';

let activeCat = '全部';

export function setCategory(cat) {
  activeCat = cat;
}

export function renderSelect() {
  const sheetOpen = location.hash === '#/cart';
  return `
    <div class="screen screen-select">
      <header class="app-header">
        ${statusBar()}
        ${navBar({ backTo: '#/index' })}
        ${cabinetCard()}
      </header>
      <main class="select-main">
        <aside class="cat-rail">
          ${CATEGORIES.map(cat => `
            <button type="button" class="cat-item ${cat === activeCat ? 'is-active' : ''}"
              data-action="category" data-cat="${cat}">${cat}</button>`).join('')}
        </aside>
        <section class="product-list">${renderProducts()}</section>
      </main>
      ${bottomBar()}
      ${sheetOpen ? cartSheet() : ''}
    </div>`;
}

function cabinetCard() {
  return `
    <section class="cabinet-card">
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
    </section>`;
}

function renderProducts() {
  const list = activeCat === '全部'
    ? CATALOG
    : CATALOG.filter(p => p.cats.includes(activeCat));
  if (!list.length) return `${promo()}<div class="empty-state">该分类暂无商品</div>`;
  return `${promo()}${list.map(productRow).join('')}`;
}

function productRow(p) {
  const line = getState().cart.find(i => i.id === p.id);
  const qty = line ? line.qty : 0;
  let control;
  if (p.soldOut) {
    control = `<span class="soldout">已售罄</span>`;
  } else if (qty > 0) {
    control = stepper(p.id, qty);
  } else {
    control = `<button type="button" class="icon-btn add-btn" data-action="add" data-id="${p.id}" aria-label="加入购物车"><img src="assets/svg/plus.svg" alt=""></button>`;
  }
  return `
    <article class="product">
      <div class="product-media">${productMedia(p.media, 'media-lg')}</div>
      <div class="product-body">
        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <div class="product-tags">${tags(p.tags)}</div>
          <p class="product-desc">${p.desc}</p>
        </div>
        <div class="product-bottom">
          ${priceMarkup(p.price, p.unit)}
          ${control}
        </div>
      </div>
    </article>`;
}

function stepper(id, qty) {
  return `
    <div class="stepper">
      <button type="button" class="step-btn" data-action="dec" data-id="${id}" aria-label="减少"><img src="assets/svg/plus-alt.svg" alt=""></button>
      <span class="step-qty">${qty}</span>
      <button type="button" class="step-btn" data-action="inc" data-id="${id}" aria-label="增加"><img src="assets/svg/plus.svg" alt=""></button>
    </div>`;
}

function promo() {
  return `
    <div class="promo">
      <div class="promo-left">
        <span class="promo-icon"><img src="assets/svg/help.svg" alt=""></span>
        <div class="promo-text">
          <p class="promo-title">此柜没有想要的？</p>
          <p class="promo-sub">默认选当前柜收货</p>
        </div>
      </div>
      <button type="button" class="promo-btn">去发布</button>
    </div>`;
}

function bottomBar() {
  return `
    <footer class="bottom-bar">
      <button type="button" class="cart-summary" data-action="open-cart">
        <span class="cart-icon">
          <img src="assets/cart-mascot.png" alt="">
          ${cartCount() ? `<span class="cart-badge">${cartCount()}</span>` : ''}
        </span>
        <span class="cart-amount"><span class="cny">¥</span><span class="num">${formatMoney(cartTotal())}</span></span>
      </button>
      <button type="button" class="btn-primary btn-checkout" data-action="open-cart">去结算</button>
    </footer>`;
}

function cartSheet() {
  const state = getState();
  const checkedCount = cartCount({ checkedOnly: true });
  const allChecked = state.cart.length > 0 && state.cart.every(i => i.checked);
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="close-cart"></div>
      <section class="cart-sheet" role="dialog" aria-label="购物车">
        <header class="sheet-header">
          <h2>购物车</h2>
          <button type="button" class="sheet-close" data-action="close-cart" aria-label="关闭"><img src="assets/svg/close.svg" alt=""></button>
        </header>
        <p class="sheet-banner">限同柜商品，跨柜购买请先清空购物车</p>
        <div class="sheet-tools">
          <div class="select-all" data-action="toggle-all" role="button" tabindex="0">
            ${checkbox(allChecked, 'toggle-all')}
            <span class="select-all-text">全选<span class="muted">（已选 ${checkedCount}）</span></span>
          </div>
          <button type="button" class="clear-btn" data-action="clear-cart">
            <img src="assets/svg/delete.svg" alt=""><span>清空</span>
          </button>
        </div>
        <div class="cart-items">
          ${state.cart.length ? state.cart.map(cartRow).join('') : `<div class="empty-state">购物车还是空的</div>`}
        </div>
        <footer class="sheet-footer">
          <div class="cart-summary">
            <span class="cart-icon">
              <img src="assets/cart-mascot.png" alt="">
              ${cartCount() ? `<span class="cart-badge">${cartCount()}</span>` : ''}
            </span>
            <span class="cart-amount"><span class="cny">¥</span><span class="num">${formatMoney(cartTotal({ checkedOnly: true }))}</span></span>
          </div>
          <button type="button" class="btn-primary btn-pay" data-action="go-pay" ${checkedCount ? '' : 'disabled'}>去结算</button>
        </footer>
      </section>
    </div>`;
}

function cartRow(item) {
  return `
    <div class="cart-item">
      ${checkbox(item.checked, 'toggle-item', item.id)}
      <div class="cart-media">${productMedia(item.media, 'media-sm')}</div>
      <div class="cart-body">
        <div class="cart-info">
          <p class="cart-name">${item.name}</p>
          <p class="cart-desc">${item.desc}</p>
          <div class="product-tags">${tags(item.tags)}</div>
        </div>
        <div class="cart-bottom">
          ${priceMarkup(item.price)}
          <div class="stepper">
            <button type="button" class="step-btn" data-action="dec" data-id="${item.id}" aria-label="减少"><img src="assets/svg/plus-alt.svg" alt=""></button>
            <span class="step-qty">${item.qty}</span>
            <button type="button" class="step-btn" data-action="inc" data-id="${item.id}" aria-label="增加"><img src="assets/svg/plus.svg" alt=""></button>
          </div>
        </div>
      </div>
    </div>`;
}

function checkbox(checked, action, id = '') {
  return `<button type="button" class="checkbox ${checked ? 'is-checked' : ''}" data-action="${action}"${id ? ` data-id="${id}"` : ''} aria-label="选择"><img src="assets/svg/check.svg" alt=""></button>`;
}
