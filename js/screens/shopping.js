import { statusBar } from '../components.js';
import { getRegion } from '../store.js';
import { cabinetCard } from './home.js';

const FILTERS = ['全部', '零售', '寄存', '租赁', '充电', '预购'];

export function renderShopping() {
  return `
    <div class="screen shop-screen">
      <header class="home-header">
        ${statusBar()}
        <div class="home-nav">
          <button type="button" class="home-loc" data-action="go" data-to="#/address">
            <span class="home-loc-slot"><img class="home-loc-pin" src="assets/svg/home/pin.svg" alt=""></span>
            <span class="home-loc-text">${getRegion()}</span>
            <img class="home-loc-arrow" src="assets/svg/home/chevron-down.svg" alt="">
          </button>
          <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
            <img class="nav-capsule" src="assets/svg/capsule.svg" alt="">
          </button>
        </div>
      </header>
      <main class="shop-main">
        <label class="shop-search">
          <img src="assets/svg/shop/search-zoom.svg" alt="">
          <input class="shop-search-input" type="text" placeholder="搜索商品、服务、柜" aria-label="搜索商品、服务、柜">
          <button type="button" class="shop-search-btn" data-action="soon" data-msg="搜索功能待接入">搜索</button>
        </label>
        <div class="shop-filters">
          <div class="shop-chips">
            ${FILTERS.map((f, i) => `
              <button type="button" class="shop-chip ${i === 0 ? 'is-active' : ''}" data-action="shop-filter" data-filter="${f}">${f}</button>`).join('')}
          </div>
          <button type="button" class="shop-sort" data-action="soon" data-msg="排序待接入">排序<img src="assets/svg/shop/sort.svg" alt=""></button>
        </div>
        <div class="shop-list">
          ${[0, 1, 2].map(i => cabinetCard(i)).join('')}
        </div>
      </main>
      <button type="button" class="shop-cart" data-action="open-cart" aria-label="购物车">
        <img src="assets/svg/shop/cart.svg" alt="">
      </button>
      <nav class="home-tabbar">
        <button type="button" class="tab-item" data-action="go" data-to="#/home">
          <img src="assets/svg/shop/home-grey.svg" alt=""><span>首页</span>
        </button>
        <button type="button" class="tab-item is-active" data-action="go" data-to="#/shopping">
          <img src="assets/svg/shop/bag-green.svg" alt=""><span>购物</span>
        </button>
        <button type="button" class="tab-scan" data-action="go" data-to="#/scan">
          <span class="tab-scan-circle"><img src="assets/svg/home/scan.svg" alt="扫码"></span>
        </button>
        <button type="button" class="tab-item" data-action="go" data-to="#/merchant">
          <img src="assets/svg/home/app.svg" alt=""><span>商家</span>
        </button>
        <button type="button" class="tab-item" data-action="go" data-to="#/mine">
          <img src="assets/svg/home/user.svg" alt=""><span>我的</span>
        </button>
      </nav>
    </div>`;
}
