import { statusBar } from '../components.js';

const MENU = [
  { icon: 'success.svg', label: '购买订单', desc: '现货/预订/代购' },
  { icon: 'ad-product.svg', label: '寄存与充电', desc: '计时/取回/费用' },
  { icon: 'helmet.svg', label: '安全帽租赁', desc: '押金/租金/归还' },
  { icon: 'inbox.svg', label: '发票与报表', desc: '发票/月度账单' },
  { icon: 'doc-fail.svg', label: '投诉与仲裁', desc: '异常/退款/责任' },
];

const SETTINGS = [
  { icon: 'headset.svg', label: '联系客服' },
  { icon: 'setting.svg', label: '设置' },
];

export function renderMine() {
  return `
    <div class="screen mine-screen">
      <header class="home-header mine-header">
        ${statusBar()}
        <div class="navbar">
          <span class="mine-title">我的</span>
          <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
            <img class="nav-capsule" src="assets/svg/capsule.svg" alt="">
          </button>
        </div>
      </header>

      <main class="mine-main">
        <section class="mine-profile">
          <img class="mine-avatar" src="assets/mine/avatar.png" alt="">
          <div class="mine-profile-info">
            <p class="mine-name">李师傅</p>
            <div class="mine-id-row">
              <span>ID: 123456</span>
              <span class="tag tag-outline-green">已实名</span>
            </div>
          </div>
        </section>

        <section class="mine-balance">
          <img class="mine-balance-bg" src="assets/mine/balance-bg.png" alt="">
          <div class="mine-balance-head">
            <p class="mine-balance-left">余额: <span class="mine-money">¥1.25万</span></p>
            <div class="mine-balance-right">
              <span>冻结余额 <span class="mine-money">¥3863.00</span></span>
              <button type="button" class="mine-eye" data-action="soon" data-msg="余额明细待接入" aria-label="余额明细">
                <img src="assets/svg/mine/eye.svg" alt="">
              </button>
            </div>
          </div>
          <div class="mine-balance-stats">
            <div class="mine-stat">
              <span class="mine-stat-icon mine-icon-orange"><img src="assets/svg/mine/box.svg" alt=""></span>
              <span class="mine-stat-text"><b>3 <i>单</i></b><em>待取货</em></span>
            </div>
            <div class="mine-stat">
              <span class="mine-stat-icon mine-icon-green"><img src="assets/svg/mine/app-one.svg" alt=""></span>
              <span class="mine-stat-text"><b>3 <i>单</i></b><em>租赁中</em></span>
            </div>
          </div>
        </section>

        <section class="mine-todos">
          <button type="button" class="mine-todo" data-action="soon" data-msg="待付款待接入">
            <img src="assets/svg/mine/todo-pay.svg" alt=""><span>待付款</span>
          </button>
          <button type="button" class="mine-todo" data-action="soon" data-msg="待使用待接入">
            <img src="assets/svg/mine/todo-use.svg" alt=""><span>待使用</span>
          </button>
          <button type="button" class="mine-todo" data-action="soon" data-msg="售后待接入">
            <img src="assets/svg/mine/todo-aftersale.svg" alt=""><span>售后</span>
          </button>
        </section>

        <section class="mine-menu">
          ${MENU.map(item => `
            <button type="button" class="mine-row" data-action="soon" data-msg="${item.label}待接入">
              <img class="mine-row-icon" src="assets/svg/mine/${item.icon}" alt="">
              <span class="mine-row-label">${item.label}</span>
              <span class="mine-row-desc">${item.desc}</span>
              <img class="mine-row-arrow" src="assets/svg/mine/chevron.svg" alt="">
            </button>`).join('')}
        </section>

        <section class="mine-menu">
          ${SETTINGS.map(item => `
            <button type="button" class="mine-row" data-action="soon" data-msg="${item.label}待接入">
              <img class="mine-row-icon" src="assets/svg/mine/${item.icon}" alt="">
              <span class="mine-row-label is-strong">${item.label}</span>
              <img class="mine-row-arrow" src="assets/svg/mine/chevron.svg" alt="">
            </button>`).join('')}
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
        <button type="button" class="tab-item" data-action="go" data-to="#/merchant">
          <img src="assets/svg/home/app.svg" alt=""><span>商家</span>
        </button>
        <button type="button" class="tab-item is-active" data-action="go" data-to="#/mine">
          <img src="assets/svg/mine/user-active.svg" alt=""><span>我的</span>
        </button>
      </nav>
    </div>`;
}
