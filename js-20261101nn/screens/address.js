import { statusBar } from '../components.js';
import { getRegion } from '../store.js';

const COMMON = [
  { region: '深圳市南山区', name: '春和路368号1号楼102室', meta: '31.5km｜月浦镇春和路256号' },
  { region: '深圳市福田区', name: '春和路368号1号楼102室', meta: '190m｜月浦镇春和路256号' },
];

const NEARBY = [
  { region: '深圳市宝安区', name: '春和路368号1号楼102室', meta: '31.5km｜月浦镇春和路256号' },
  { region: '深圳市龙岗区', name: '春和路368号1号楼102室', meta: '190m｜月浦镇春和路256号' },
];

export function renderAddress() {
  return `
    <div class="screen addr-screen">
      <header class="pay-header">
        ${statusBar()}
        <div class="navbar navbar-title">
          <button type="button" class="nav-back" data-action="back" data-to="#/home" aria-label="返回"><img src="assets-20261101nn/svg/back-pay.svg" alt=""></button>
          <h1 class="nav-title">选择地区</h1>
          <button type="button" class="nav-capsule-btn" data-action="go" data-to="#/index" aria-label="关闭并返回原型目录">
            <img class="nav-capsule" src="assets-20261101nn/svg/capsule-pay.svg" alt="">
          </button>
        </div>
      </header>
      <main class="addr-main">
        <label class="addr-search">
          <img src="assets-20261101nn/svg/address/search.svg" alt="">
          <input class="addr-search-input" type="text" placeholder="搜索地区" aria-label="搜索地区">
        </label>

        <section class="addr-current">
          <p class="addr-label">您的位置</p>
          <div class="addr-current-row">
            <span class="addr-current-name">${getRegion()}</span>
            <button type="button" class="addr-relocate" data-action="relocate">重新定位<img src="assets-20261101nn/svg/address/redo.svg" alt=""></button>
          </div>
        </section>

        <section class="addr-section">
          <div class="addr-section-head">
            <span>常用地址</span>
            <button type="button" class="addr-all" data-action="soon" data-msg="全部地址待接入">全部<img src="assets-20261101nn/svg/address/chevron.svg" alt=""></button>
          </div>
          ${COMMON.map(item => addrItem(item, '常用地址')).join('')}
        </section>

        <section class="addr-section">
          ${NEARBY.map(item => addrItem(item, '附近地址')).join('')}
          <button type="button" class="addr-more" data-action="soon" data-msg="更多附近地址待接入">
            更多附近地址<img src="assets-20261101nn/svg/address/chevron.svg" alt="">
          </button>
        </section>
      </main>
    </div>`;
}

function addrItem(item, label) {
  const nearby = label === '附近地址';
  return `
    <button type="button" class="addr-item" data-action="region-select" data-region="${item.region}">
      <span class="addr-item-main">
        <span class="addr-item-top">
          <span class="addr-tag">${nearby ? `<img src="assets-20261101nn/svg/address/pin-sm.svg" alt="">` : ''}${label}</span>
          <span class="addr-item-name">${item.name}</span>
        </span>
        <span class="addr-item-meta">${item.meta}</span>
      </span>
    </button>`;
}
