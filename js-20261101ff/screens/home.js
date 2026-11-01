import { statusBar, productMedia } from '../components.js';
import { getRegion } from '../store.js';

const SERVICES = [
  { key: 'storage', icon: 'icons/svc-storage.png', title: '寄存', sub: '安全寄存', route: '#/storage' },
  { key: 'shop', icon: 'icons/svc-shop.png', title: '购物', sub: '物品选购', route: '#/select' },
  { key: 'charge', icon: 'icons/svc-charge.png', title: '充电', sub: '设备充电', msg: '充电流程待搭建' },
  { key: 'rent', icon: 'icons/svc-rent.png', title: '租赁', sub: '设备租赁', msg: '租赁流程待搭建' },
  { key: 'preorder', icon: 'icons/svc-preorder.png', title: '预购', sub: '提前预约', msg: '预购流程待搭建' },
  { key: 'publish', icon: 'icons/svc-publish.png', title: '发布', sub: '闲置物品', msg: '发布流程待搭建' },
  { key: 'aftersale', icon: 'icons/svc-aftersale.png', title: '售后', sub: '服务保障', msg: '售后流程待搭建' },
  { key: 'order', icon: 'icons/svc-order.png', title: '接单', sub: '快速接单', msg: '接单流程待搭建' },
];

export const HOME_PRODUCTS = [
  { id: 'home-helmet', name: '智能安全帽 X 101', price: 50, unit: '/h', media: 'helmet', desc: '设备' },
  { id: 'home-water', name: '矿泉水 X 10', price: 50, unit: '/h', media: 'hygro', desc: '设备' },
  { id: 'home-combo', name: '自选组合套餐', price: 50, unit: '/h', media: 'combo', desc: '设备' },
  { id: 'home-water-2', name: '矿泉水 X 10', price: 50, unit: '/h', media: 'helmet', desc: '设备' },
];

export function renderHome() {
  return `
    <div class="screen home-screen">
      <main class="home-main">
      <div class="home-bg"><img src="assets/home-bg.png" alt=""></div>
      <header class="home-topbar">
        ${statusBar()}
        <div class="home-nav">
          <button type="button" class="home-loc" data-action="go" data-to="#/address">
            <img class="home-loc-pin" src="assets/svg/home/pin.svg" alt="">
            <span class="home-loc-text">${getRegion()}</span>
            <img class="home-loc-arrow" src="assets/svg/home/chevron-down.svg" alt="">
          </button>
          <div class="home-nav-right">
            <button type="button" class="home-bell" data-action="soon" data-msg="暂无新消息"><img src="assets/svg/home/bell.svg" alt=""></button>
            <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
              <img class="home-capsule" src="assets/svg/capsule.svg" alt="">
            </button>
          </div>
        </div>
      </header>
        <div class="home-content">
        <section class="home-hero">
          <p class="home-hello">您好，欢迎使用</p>
          <p class="home-title">智慧柜即时服务</p>
          <p class="home-sub">寄存·租赁·售卖·充电 即取即用</p>
          <span class="home-hero-art"><img src="assets/cabinet-hero.png" alt=""></span>
        </section>
        <button type="button" class="nearest-card" data-action="go" data-to="#/select">
          <span class="nearest-left">
            <span class="nearest-title"><img src="assets/svg/home/right-one.svg" alt="">最近可用柜</span>
            <span class="nearest-dist"><img src="assets/svg/location.svg" alt="">0.3km</span>
          </span>
          <span class="nearest-stats">
            <span class="nearest-stat"><img src="assets/svg/home/all-app.svg" alt=""><span><b>10 <i>格</i></b><em>可用</em></span></span>
            <img class="nearest-divider" src="assets/svg/home/divider.svg" alt="">
            <span class="nearest-stat"><img src="assets/svg/home/app-switch.svg" alt=""><span><b>99 <i>台</i></b><em>可用</em></span></span>
            <img class="nearest-divider" src="assets/svg/home/divider.svg" alt="">
            <span class="nearest-stat"><img src="assets/svg/home/time.svg" alt=""><span><b>24h</b><em>服务</em></span></span>
          </span>
        </button>
        <section class="service-grid">
          ${SERVICES.map(s => `
            <button type="button" class="service-item"
              ${s.route ? `data-action="go" data-to="${s.route}"` : `data-action="soon" data-msg="${s.msg}"`}>
              <span class="service-icon svc-${s.key}"><img src="assets/${s.icon}" alt=""></span>
              <span class="service-text"><b>${s.title}</b><em>${s.sub}</em></span>
            </button>`).join('')}
        </section>
        <button type="button" class="promo-scan" data-action="soon" data-msg="扫码购物待接入">
          <img src="assets/promo-scan.png" alt="扫码购物">
        </button>
        <section class="nearby">
          <div class="nearby-head">
            <h2>附近服务点</h2>
            <button type="button" class="nearby-more" data-action="soon" data-msg="更多服务点待接入">更多<img src="assets/svg/home/right-c.svg" alt=""></button>
          </div>
          ${Array.from({ length: 6 }, (_, i) => cabinetCard(i)).join('')}
        </section>
        </div>
      </main>
      <nav class="home-tabbar">
        <button type="button" class="tab-item is-active" data-action="go" data-to="#/home">
          <img src="assets/svg/home/home.svg" alt=""><span>首页</span>
        </button>
        <button type="button" class="tab-item" data-action="go" data-to="#/shopping">
          <img src="assets/svg/home/bag.svg" alt=""><span>购物</span>
        </button>
        <button type="button" class="tab-scan" data-action="soon" data-msg="扫码功能待接入">
          <span class="tab-scan-circle"><img src="assets/svg/home/scan.svg" alt="扫码"></span>
        </button>
        <button type="button" class="tab-item" data-action="soon" data-msg="商家端待搭建">
          <img src="assets/svg/home/app.svg" alt=""><span>商家</span>
        </button>
        <button type="button" class="tab-item" data-action="soon" data-msg="我的页面待搭建">
          <img src="assets/svg/home/user.svg" alt=""><span>我的</span>
        </button>
      </nav>
    </div>`;
}

export function cabinetCard(index) {
  const distance = (0.3 + index * 0.2).toFixed(1);
  const cells = 8 - (index % 4);
  const count = 7 - (index % 3);
  return `
    <article class="nearby-card" data-action="go" data-to="#/select">
      <div class="nearby-card-head">
        <div class="cabinet-thumb"><img src="assets/cabinet.png" alt=""></div>
        <div class="nearby-card-info">
          <div class="nearby-title-row">
            <span class="nearby-name-row">
              <span class="nearby-name">中铁十二局工地柜…</span>
              <span class="tag tag-outline-green">${index % 2 === 0 ? '营业中' : '在线'}</span>
            </span>
            <span class="nearby-count">${count}件商品<img src="assets/svg/home/right-c.svg" alt=""></span>
          </div>
          <p class="nearby-meta"><img src="assets/svg/location.svg" alt="">${distance}km｜${cells}格可用</p>
          <div class="nearby-tags">
            <span class="tag tag-green-soft">零售</span>
            <span class="tag tag-green-soft">寄存</span>
            <span class="tag tag-green-soft">租赁</span>
            <span class="tag tag-green-soft">充电</span>
            <span class="tag tag-blue">预购</span>
          </div>
        </div>
      </div>
      <div class="nearby-products">
        ${HOME_PRODUCTS.map(p => `
          <div class="nearby-product">
            <div class="nearby-product-media">${productMedia(p.media, 'media-sm')}</div>
            <p class="nearby-product-name">${p.name}</p>
            <div class="nearby-product-bottom">
              <span class="nearby-price">
                <span class="nearby-price-row"><span class="cny">¥ </span><span class="num">${p.price}</span><span class="unit">${p.unit}</span></span>
                <em>${p.desc}</em>
              </span>
              <button type="button" class="icon-btn" data-action="add-home" data-id="${p.id}" aria-label="加入购物车">
                <img src="assets/svg/home/plus.svg" alt="">
              </button>
            </div>
          </div>`).join('')}
      </div>
    </article>`;
}
