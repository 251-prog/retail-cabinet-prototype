import { statusBar } from '../components.js';
import { CABINET } from '../store.js';

const SIZES = [
  { id: 'small', name: '寄存格 · 小号', price: 2, img: 'storage-small.png', desc: '背包 / 手提袋 / 安全帽', dims: '长 380 × 宽 380 × 高 200 mm' },
  { id: 'medium', name: '寄存格 · 小号', price: 2, img: 'storage-medium.png', desc: '背包 / 手提袋 / 安全帽', dims: '长 380 × 宽 380 × 高 200 mm' },
];
const DURATIONS = [
  { h: 24, label: '24h', sub: '定额' },
  { h: 48, label: '48h', sub: '+¥2' },
  { h: 72, label: '72h', sub: '+¥4' },
];

let selectedSize = 'small';
let selectedDuration = 24;
let dialogOpen = false;
let lockerOpen = false;

export function chooseSize(id) { selectedSize = id; }
export function chooseDuration(h) { selectedDuration = h; }
export function openOpenDialog() { dialogOpen = true; }
export function closeOpenDialog() { dialogOpen = false; }
export function openLockerSheet() { lockerOpen = true; }
export function closeLockerSheet() { lockerOpen = false; }

function header(title, backTo = '#/index') {
  return `
    <header class="pay-header">
      ${statusBar()}
      <div class="navbar navbar-title">
        <button type="button" class="nav-back" data-action="back" data-to="${backTo}" aria-label="返回"><img src="assets/svg/back-pay.svg" alt=""></button>
        <h1 class="nav-title">${title}</h1>
        <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
          <img class="nav-capsule" src="assets/svg/capsule-pay.svg" alt="">
        </button>
      </div>
    </header>`;
}

/* ---------------- 智能存物 ---------------- */
export function renderStorageConfig() {
  const size = SIZES.find(s => s.id === selectedSize) || SIZES[0];
  return `
    <div class="screen screen-pay storage-screen">
      ${header('智能存物', '#/home')}
      <main class="pay-main storage-main">
        <section class="pay-card pay-cabinet">
          <div class="pay-card-head">
            <span class="pay-card-title">存放柜机</span>
            <span class="pay-card-side">到柜</span>
          </div>
          <div class="cabinet-row">
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
          </div>
        </section>

        <section class="pay-card storage-size-card">
          <div class="storage-card-head">
            <span class="pay-card-title">选择格口规格</span>
            <span class="storage-note">含充电 ¥0 附赠</span>
          </div>
          <div class="storage-sizes">
            ${SIZES.map(s => `
              <button type="button" class="storage-size ${s.id === selectedSize ? 'is-active' : ''}"
                data-action="storage-size" data-id="${s.id}">
                <img class="storage-size-img" src="assets/${s.img}" alt="">
                <span class="storage-size-body">
                  <span class="storage-size-row">
                    <span class="storage-size-name">${s.name}</span>
                    <span class="storage-size-price"><span class="cny">¥</span><b>${s.price}</b><span class="unit">/24h</span></span>
                  </span>
                  <span class="storage-size-desc">${s.desc}</span>
                  <span class="storage-size-dims">${s.dims}</span>
                </span>
                <span class="storage-size-check">${s.id === selectedSize ? `<img src="assets/svg/check-green.svg" alt="">` : ''}</span>
              </button>`).join('')}
          </div>
        </section>

        <section class="pay-card storage-duration-card">
          <div class="storage-card-head"><span class="pay-card-title">寄存时长</span></div>
          <div class="storage-durations">
            ${DURATIONS.map(d => `
              <button type="button" class="storage-duration ${d.h === selectedDuration ? 'is-active' : ''}"
                data-action="storage-duration" data-h="${d.h}">
                <b>${d.label}</b><em>${d.sub}</em>
              </button>`).join('')}
          </div>
        </section>

        <section class="pay-card storage-row-card">
          <span class="pay-card-title">充电白送</span>
          <span class="storage-row-right">Type-C 5V/2A<img src="assets/svg/home/right-c.svg" alt=""></span>
        </section>

        <section class="pay-card storage-rule-card">
          <div class="storage-card-head">
            <span class="pay-card-title">计费规则（后付）</span>
            <img class="storage-chevron" src="assets/svg/home/right-c.svg" alt="">
          </div>
          <div class="storage-rule-note">
            <p>后付：存物免费（前 10 分钟免费时长），取物时按 <b class="orange">2.5 元/24h</b> 从计发账户扣（允许负数）；超 <b class="orange">48h</b> 未取触发清柜，物品移出长期保管（不丢弃）+ 持续计费 + 通知。</p>
          </div>
        </section>
      </main>
      <footer class="bottom-bar storage-bar">
        <div class="storage-bar-left">
          <span class="storage-bar-label">寄存费</span>
          <span class="storage-bar-sub">后付·取物时结算</span>
        </div>
        <button type="button" class="btn-primary storage-submit ${size ? '' : ''}" data-action="storage-submit">下单</button>
      </footer>
    </div>`;
}

/* ---------------- 状态页公共块 ---------------- */
function statusHero({ badge, badgeTone, elapsed = '00:03:00', freeLabel = '3 / 10 分钟', progress = 30 }) {
  return `
    <section class="storage-hero">
      <div class="storage-hero-head">
        <span class="storage-hero-name">${CABINET.name}</span>
        <span class="storage-local"><img src="assets/svg/storage/local.svg" alt=""></span>
      </div>
      <img class="storage-divider" src="assets/svg/storage/divider.svg" alt="">
      <div class="storage-status">
        <span class="storage-status-icon"><img src="assets/svg/storage/timer.svg" alt=""></span>
        <span class="storage-status-text">
          <b>柜格已锁定</b>
          <em>正在为本次暂存计时</em>
        </span>
        <span class="storage-cell"><b>D01</b><em>格口</em></span>
      </div>
      <div class="storage-elapsed">
        <p class="storage-time js-storage-time">${elapsed}</p>
        <span class="storage-badge ${badgeTone}">${badge}</span>
      </div>
      <div class="storage-free">
        <div class="storage-free-labels">
          <span>前10分钟免费</span>
          <b>${freeLabel}</b>
        </div>
        <div class="storage-progress"><span style="width:${progress}%"></span></div>
      </div>
    </section>`;
}

function feeCard() {
  return `
    <section class="pay-card">
      <div class="pay-card-head pay-card-headline"><span class="pay-card-title">费用明细</span><span class="storage-head-sub">（后付）</span></div>
      <div class="fee-body">
        <div class="fee-row">
          <p class="fee-label">柜格费（寄存格 · 小号）</p>
          <p class="storage-orange">取物时结算</p>
        </div>
        <div class="fee-row"><p class="fee-label">计费方式</p><p class="fee-value">¥2/24h·前十分钟免费</p></div>
        <div class="fee-row"><p class="fee-label">扣费账户</p><p class="fee-value">计发帐户</p></div>
        <div class="fee-row">
          <p class="fee-label">充电（附赠）</p>
          <span class="storage-free-tag"><span class="tag tag-green-soft">限免</span><s>¥2.00</s></span>
        </div>
      </div>
    </section>`;
}

function orderCard() {
  return `
    <section class="pay-card">
      <div class="pay-card-head pay-card-headline"><span class="pay-card-title">订单详情</span></div>
      <div class="fee-body">
        <div class="fee-row"><p class="fee-label">存货柜机</p><p class="fee-value">${CABINET.name}</p></div>
        <div class="fee-row"><p class="fee-label">格口规格</p><p class="fee-value">小号</p></div>
        <div class="fee-row"><p class="fee-label">存货格口</p><p class="fee-value">D01</p></div>
        <div class="fee-row"><p class="fee-label">订单编号</p><p class="fee-value">D123456</p></div>
        <div class="fee-row"><p class="fee-label">下单时间</p><p class="fee-value">2026-10-12 12:00:00</p></div>
      </div>
    </section>`;
}

/* ---------------- 确认存物 ---------------- */
export function renderStorageConfirm() {
  return `
    <div class="screen screen-pay storage-screen">
      ${header('确认存物', '#/storage')}
      <main class="pay-main storage-main">
        ${statusHero({ badge: '待存放', badgeTone: 'is-orange' })}
        ${feeCard()}
        ${orderCard()}
      </main>
      <footer class="storage-action-bar">
        <button type="button" class="storage-outline-btn" data-action="storage-later">稍后开柜</button>
        <button type="button" class="btn-primary storage-half-btn" data-action="storage-open-dialog">确认·立即开柜</button>
      </footer>
      ${dialogOpen ? openDialog() : ''}
    </div>`;
}

function openDialog() {
  return `
    <div class="modal-layer">
      <div class="modal-mask" data-action="storage-open-cancel"></div>
      <div class="modal-card" role="dialog" aria-label="立即开柜？">
        <h2>立即开柜？</h2>
        <p>存好物品后请关好柜门，系统检测到关门信号即开始计时。</p>
        <button type="button" class="btn-primary modal-btn" data-action="storage-open-confirm">确定·立即开柜</button>
      </div>
    </div>`;
}

/* ---------------- 柜门已打开 ---------------- */
export function renderStorageOpened() {
  return `
    <div class="screen screen-pay storage-screen">
      ${header('确认存物', '#/storage/confirm')}
      <main class="pay-main storage-main">
        ${statusHero({ badge: '存放中', badgeTone: '' })}
        ${feeCard()}
        ${orderCard()}
      </main>
      <footer class="storage-action-bar">
        <button type="button" class="storage-outline-btn" data-action="storage-later">稍后开柜</button>
        <button type="button" class="btn-primary storage-half-btn" data-action="storage-open-dialog">确认·立即开柜</button>
      </footer>
      <div class="sheet-layer">
        <div class="sheet-mask" data-action="storage-done"></div>
        <section class="bottom-sheet storage-opened-sheet" role="dialog" aria-label="柜门已打开">
          <span class="sheet-handle"></span>
          <button type="button" class="sheet-close success-close" data-action="storage-done" aria-label="关闭"><img src="assets/svg/close-sm.svg" alt=""></button>
          <div class="success-hero">
            <span class="success-icon"><img src="assets/svg/check-small.svg" alt=""></span>
            <p class="success-title">柜门已打开，本单格号D01</p>
            <p class="success-sub">后付·取物时结算</p>
          </div>
          <div class="warn-box">
            <img src="assets/svg/attention.svg" alt="">
            <p>存物 免费（前 10 分钟免费时长）。取物时按 2.5 元/24h 从<b class="orange">计发账户</b>结算（后付）。本柜剩余 7 个空格。</p>
          </div>
          <button type="button" class="btn-primary sheet-wide-btn" data-action="storage-done">存物完成·我已关闭柜门</button>
        </section>
      </div>
    </div>`;
}

/* ---------------- 存放中 ---------------- */
export function renderStorageActive() {
  return `
    <div class="screen screen-pay storage-screen">
      ${header('存放中', '#/home')}
      <main class="pay-main storage-main">
        ${statusHero({ badge: '存放中', badgeTone: '' })}
        ${feeCard()}
        ${orderCard()}
      </main>
      <footer class="storage-bottom-bar">
        <div class="storage-bottom-text">
          <b>取物时结算</b>
          <span>当前已存放 3 分钟</span>
        </div>
        <button type="button" class="btn-primary storage-bottom-btn" data-action="storage-retrieve">取物</button>
      </footer>
    </div>`;
}

/* ---------------- 取物：扫码 / 本柜 ---------------- */
export function renderStoragePickup() {
  return `
    <div class="screen screen-pay storage-screen">
      ${header('存放中', '#/storage/active')}
      <main class="pay-main storage-main">
        ${statusHero({ badge: '存放中', badgeTone: '' })}
        ${feeCard()}
        ${orderCard()}
      </main>
      <footer class="storage-bottom-bar">
        <div class="storage-bottom-text"><b>取物时结算</b><span>当前已存放 3 分钟</span></div>
        <button type="button" class="btn-primary storage-bottom-btn" data-action="storage-retrieve">取物</button>
      </footer>
      <div class="sheet-layer">
        <div class="sheet-mask" data-action="back" data-to="#/storage/active"></div>
        <section class="bottom-sheet scan-sheet" role="dialog" aria-label="到柜扫码取物">
          <span class="sheet-handle"></span>
          <button type="button" class="sheet-close success-close" data-action="back" data-to="#/storage/active" aria-label="关闭"><img src="assets/svg/close-sm.svg" alt=""></button>
          <div class="scan-hero">
            <span class="scan-icon"><img src="assets/svg/scan.svg" alt=""></span>
            <p class="scan-title">到柜扫码取物</p>
            <p class="scan-sub">请到 <b>${CABINET.name}</b> 柜前扫码，<br>确认后即可开柜取物</p>
          </div>
          <div class="warn-box">
            <img src="assets/svg/attention.svg" alt="">
            <p>本次寄存前 10 分钟免费，超时按 ¥2/24h 从计发账户结算。</p>
          </div>
          <button type="button" class="btn-primary sheet-wide-btn" data-action="storage-pickup-cabinet">扫码取物</button>
        </section>
      </div>
    </div>`;
}

export function renderStorageCabinet() {
  return `
    <div class="screen screen-pay pickup-screen">
      ${header('本柜取物', '#/storage/pickup')}
      <main class="pay-main pickup-main">
        <section class="pay-card pay-cabinet">
          <div class="pay-card-head"><span class="pay-card-title">存放柜机</span><span class="pay-card-side">到柜</span></div>
          <div class="cabinet-row">
            <div class="cabinet-thumb"><img src="assets/cabinet.png" alt=""></div>
            <div class="cabinet-info">
              <div class="cabinet-title-row"><span class="cabinet-name">${CABINET.name}</span><span class="tag tag-outline-green">${CABINET.status}</span></div>
              <p class="cabinet-meta">距您 ${CABINET.distance} · 编号 ${CABINET.code}</p>
              <div class="cabinet-tags"><span class="tag tag-orange">12 格可用</span><span class="tag tag-orange">24h 服务</span></div>
            </div>
          </div>
        </section>
        <section class="pickup-card">
          <div class="pickup-head">
            <span class="pickup-head-text">逐个开柜，关门校验后完成</span>
            <span class="pickup-count"><b>0</b><i>/1</i></span>
          </div>
          <div class="progress"><span style="width:0%"></span></div>
          <div class="pickup-list">
            <div class="pickup-row">
              <div class="pickup-item">
                <div class="pickup-thumb storage-thumb"><img src="assets/storage-small.png" alt=""></div>
                <div class="pickup-info">
                  <div class="pickup-name-row"><span class="tag tag-blue">寄存</span><span class="pickup-name">寄存物品</span></div>
                  <p class="pickup-sub">#CG20260707-091 · D01格</p>
                </div>
              </div>
              <button type="button" class="pill pill-open" data-action="storage-open-locker">开柜</button>
            </div>
          </div>
        </section>
      </main>
      <footer class="pickup-bar">
        <button type="button" class="btn-primary pickup-btn" data-action="storage-open-locker">开柜</button>
      </footer>
      ${lockerOpen ? lockerSheet() : ''}
    </div>`;
}

function lockerSheet() {
  return `
    <div class="sheet-layer">
      <div class="sheet-mask" data-action="storage-close-locker"></div>
      <section class="bottom-sheet open-sheet" role="dialog" aria-label="D01格已开">
        <span class="sheet-handle"></span>
        <button type="button" class="sheet-close success-close" data-action="storage-close-locker" aria-label="关闭"><img src="assets/svg/close-sm.svg" alt=""></button>
        <div class="open-hero">
          <span class="locker-icon"><img src="assets/svg/locker-open.svg" alt=""></span>
          <p class="open-title">D01格已开</p>
          <p class="open-sub">寄存物品<br>请取出商品并关好柜门</p>
        </div>
        <div class="warn-box">
          <img src="assets/svg/attention.svg" alt="">
          <p>开柜即交易成功，24h 内可售后。柜门未关好将提醒您。</p>
        </div>
        <button type="button" class="btn-primary sheet-wide-btn" data-action="storage-locker-done">我已关门</button>
      </section>
    </div>`;
}
