import { statusBar } from '../components.js';

const ACTIONS = [
  { icon: 'act-upload.png', label: '上架商品' },
  { icon: 'act-accept.png', label: '预定接单' },
  { icon: 'act-goods.png', label: '我的商品' },
  { icon: 'act-hall.png', label: '需求大厅' },
  { icon: 'act-income.png', label: '收益结算' },
  { icon: 'act-abnormal.png', label: '异常处理' },
];

const ORDERS = [
  {
    title: '智能安全帽报修',
    tag: '待接单',
    tone: 'orange',
    desc: '预订 · C001 · 担保冻结',
    time: '2025-06-23  10:28',
    media: 'helmet',
    primary: '接单',
    secondary: '联系',
  },
  {
    title: '工具组合自由需求单',
    tag: '新单',
    tone: 'green',
    desc: '自由需求单 · 期望价 ¥35 · 待接单',
    time: '2025-06-23  09:58',
    media: 'combo',
    primary: '大厅接单',
    secondary: '详情',
  },
  {
    title: '工具组合自由需求单',
    tag: '新单',
    tone: 'green',
    desc: '自由需求单 · 期望价 ¥35 · 待接单',
    time: '2025-06-23  09:58',
    media: 'combo',
    primary: '大厅接单',
    secondary: '详情',
  },
];

export function renderMerchant() {
  return `
    <div class="screen merchant-screen">
      <header class="home-header merchant-header">
        ${statusBar()}
        <div class="home-nav">
          <div class="merchant-title">
            <p class="merchant-title-main">经营工作台</p>
            <p class="merchant-title-sub">今日经营概况·4台柜</p>
          </div>
          <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
            <img class="nav-capsule" src="assets/svg/capsule.svg" alt="">
          </button>
        </div>
      </header>

      <main class="merchant-main">
        <section class="merchant-metrics">
          <div class="merchant-sales">
            <img class="merchant-sales-art" src="assets/merchant/sales.png" alt="">
            <p class="merchant-sales-label">今日销售额</p>
            <p class="merchant-sales-amount"><span class="cny">¥</span> 386386386.00</p>
            <p class="merchant-sales-trend">↑ 较昨日 +12%</p>
          </div>
          <div class="merchant-metric-row">
            <div class="merchant-metric metric-green">
              <span class="merchant-metric-label">待接订单<img src="assets/merchant/ic-orders.png" alt=""></span>
              <b>7</b>
              <em>预订 4 · 需求 3</em>
            </div>
            <div class="merchant-metric metric-blue">
              <span class="merchant-metric-label">在柜商品<img src="assets/merchant/ic-products.png" alt=""></span>
              <b>42</b>
              <em>覆盖 4 台柜</em>
            </div>
            <div class="merchant-metric metric-red">
              <span class="merchant-metric-label">异常格口<img src="assets/merchant/ic-alerts.png" alt=""></span>
              <b>2</b>
              <em>待处理</em>
            </div>
          </div>
        </section>

        <section class="merchant-actions">
          ${ACTIONS.map(a => `
            <button type="button" class="merchant-action" data-action="soon" data-msg="${a.label}待接入">
              <img src="assets/merchant/${a.icon}" alt="">
              <span>${a.label}</span>
            </button>`).join('')}
        </section>

        <section class="merchant-orders">
          <div class="merchant-orders-head">
            <h2>待处理订单</h2>
            <button type="button" class="merchant-orders-more" data-action="soon" data-msg="全部订单待接入">
              <span class="merchant-badge">2</span>
              <img src="assets/svg/home/right-c.svg" alt="">
            </button>
          </div>
          ${ORDERS.map(orderCard).join('')}
        </section>
      </main>

      <nav class="home-tabbar">
        <button type="button" class="tab-item" data-action="go" data-to="#/home">
          <img src="assets/svg/shop/home-grey.svg" alt=""><span>首页</span>
        </button>
        <button type="button" class="tab-item" data-action="go" data-to="#/shopping">
          <img src="assets/svg/home/bag.svg" alt=""><span>购物</span>
        </button>
        <button type="button" class="tab-scan" data-action="go" data-to="#/scan">
          <span class="tab-scan-circle"><img src="assets/svg/home/scan.svg" alt="扫码"></span>
        </button>
        <button type="button" class="tab-item is-active" data-action="go" data-to="#/merchant">
          <img src="assets/svg/merchant/app-active.svg" alt=""><span>商家</span>
        </button>
        <button type="button" class="tab-item" data-action="go" data-to="#/mine">
          <img src="assets/svg/home/user.svg" alt=""><span>我的</span>
        </button>
      </nav>
    </div>`;
}

function orderMedia(media) {
  if (media === 'combo') {
    return `
      <div class="merchant-combo">
        <div class="merchant-combo-row">
          <img class="merchant-combo-helmet" src="assets/product-helmet.png" alt="">
          <img class="merchant-combo-thumb" src="assets/thumb-155.png" alt="">
        </div>
        <div class="merchant-combo-row">
          <img class="merchant-combo-hygro" src="assets/product-hygrometer.png" alt="">
          <img class="merchant-combo-strip" src="assets/product-strip.png" alt="">
        </div>
      </div>`;
  }
  return `<img class="merchant-media-img" src="assets/product-helmet.png" alt="">`;
}

function orderCard(order) {
  return `
    <article class="merchant-order">
      <div class="merchant-order-media">${orderMedia(order.media)}</div>
      <div class="merchant-order-body">
        <div class="merchant-order-title-row">
          <p class="merchant-order-title">${order.title}</p>
          <span class="tag ${order.tone === 'green' ? 'tag-green-soft' : 'tag-orange-soft'}">${order.tag}</span>
        </div>
        <p class="merchant-order-desc">${order.desc}</p>
        <div class="merchant-order-foot">
          <span class="merchant-order-time">${order.time}</span>
          <span class="merchant-order-actions">
            <button type="button" class="merchant-btn-ghost" data-action="soon" data-msg="功能待接入">${order.secondary}</button>
            <button type="button" class="merchant-btn" data-action="soon" data-msg="功能待接入">${order.primary}</button>
          </span>
        </div>
      </div>
    </article>`;
}
