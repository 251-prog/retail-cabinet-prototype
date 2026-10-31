import {
  addToCart, addLine, setQty, toggleItem, toggleAll, clearCart, resetDemo,
  createOrder, setOrderQty, finishOrder, getState,
} from './store.js';
import { showToast } from './components.js';
import { renderIndex } from './screens/index.js';
import { renderHome, HOME_PRODUCTS } from './screens/home.js';
import {
  renderStorageConfig, renderStorageConfirm, renderStorageOpened,
  renderStorageActive, renderStoragePickup, renderStorageCabinet,
  chooseSize, chooseDuration, openOpenDialog, closeOpenDialog,
  openLockerSheet, closeLockerSheet,
} from './screens/storage.js';
import { renderSelect, setCategory } from './screens/select.js';
import {
  renderPay, setMethod, closeSheet as closePaySheet, openSheet as openPaySheet,
  startPaying, finishPaying, resetPayState, ensureOrder,
} from './screens/pay.js';
import { renderSuccess } from './screens/success.js';
import { renderPickup } from './screens/pickup.js';
import {
  renderCabinet, openLocker, closeLocker, openNextLocker, completeLocker,
  resetPickupState,
} from './screens/cabinet.js';

const app = document.getElementById('app');

function currentRoute() {
  return (location.hash || '#/home').split('?')[0];
}

function render() {
  const route = currentRoute();
  if (route === '#/index' || route === '#/') {
    app.innerHTML = renderIndex();
  } else if (route === '#/home' || route === '#') {
    app.innerHTML = renderHome();
  } else if (route === '#/storage') {
    app.innerHTML = renderStorageConfig();
  } else if (route === '#/storage/confirm') {
    app.innerHTML = renderStorageConfirm();
  } else if (route === '#/storage/opened') {
    app.innerHTML = renderStorageOpened();
  } else if (route === '#/storage/active') {
    app.innerHTML = renderStorageActive();
  } else if (route === '#/storage/pickup') {
    app.innerHTML = renderStoragePickup();
  } else if (route === '#/storage/pickup/cabinet') {
    app.innerHTML = renderStorageCabinet();
  } else if (route === '#/pay') {
    app.innerHTML = renderPay();
  } else if (route === '#/pay-success') {
    app.innerHTML = renderSuccess();
  } else if (route === '#/pickup') {
    app.innerHTML = renderPickup();
  } else if (route === '#/pickup/cabinet' || route === '#/pickup/open') {
    app.innerHTML = renderCabinet();
  } else {
    app.innerHTML = renderSelect();
  }
}

function goSelect() {
  finishOrder();
  resetPayState();
  resetPickupState();
  location.hash = '#/select';
  render();
}

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  const id = el.dataset.id;
  const state = getState();

  switch (action) {
    case 'go':
      location.hash = el.dataset.to;
      return;
    case 'soon':
      showToast(el.dataset.msg || '功能待搭建');
      return;
    case 'add-home': {
      const product = HOME_PRODUCTS.find(p => p.id === el.dataset.id);
      if (!product) return;
      addLine(product);
      showToast('已加入购物车');
      location.hash = '#/select';
      return;
    }
    case 'storage-size':
      chooseSize(el.dataset.id);
      render();
      return;
    case 'storage-duration':
      chooseDuration(Number(el.dataset.h));
      render();
      return;
    case 'storage-submit':
      location.hash = '#/storage/confirm';
      return;
    case 'storage-open-dialog':
      openOpenDialog();
      render();
      return;
    case 'storage-open-cancel':
      closeOpenDialog();
      render();
      return;
    case 'storage-open-confirm':
      closeOpenDialog();
      location.hash = '#/storage/opened';
      return;
    case 'storage-done':
      location.hash = '#/storage/active';
      return;
    case 'storage-later':
      showToast('已锁定格口，可稍后开柜');
      location.hash = '#/storage/active';
      return;
    case 'storage-retrieve':
      location.hash = '#/storage/pickup';
      return;
    case 'storage-pickup-cabinet':
      location.hash = '#/storage/pickup/cabinet';
      return;
    case 'storage-open-locker':
      openLockerSheet();
      render();
      return;
    case 'storage-close-locker':
      closeLockerSheet();
      render();
      return;
    case 'storage-locker-done':
      closeLockerSheet();
      showToast('取物完成');
      location.hash = '#/home';
      return;
    case 'back': {
      const to = el.dataset.to;
      if (to) { location.hash = to; return; }
      if (currentRoute() !== '#/index') { location.hash = '#/index'; return; }
      showToast('已经是第一页了');
      return;
    }
    case 'category':
      setCategory(el.dataset.cat);
      render();
      return;
    case 'add': {
      const ok = addToCart(id);
      if (!ok) { showToast('该商品已售罄'); return; }
      render();
      return;
    }
    case 'inc':
    case 'dec': {
      const line = state.cart.find(i => i.id === id);
      const qty = (line ? line.qty : 0) + (action === 'inc' ? 1 : -1);
      if (action === 'dec' && qty <= 0) showToast('已从购物车移除');
      setQty(id, qty);
      render();
      return;
    }
    case 'open-cart':
      location.hash = '#/cart';
      return;
    case 'close-cart':
      location.hash = '#/select';
      return;
    case 'toggle-item':
      toggleItem(id);
      render();
      return;
    case 'toggle-all':
      toggleAll();
      render();
      return;
    case 'clear-cart':
      clearCart();
      render();
      return;
    case 'go-pay': {
      const checked = state.cart.filter(i => i.checked);
      if (!checked.length) { showToast('请先选择商品'); return; }
      createOrder();
      location.hash = '#/pay';
      return;
    }
    case 'open-pay-sheet':
      openPaySheet();
      render();
      return;
    case 'close-pay-sheet':
      closePaySheet();
      render();
      return;
    case 'choose-method':
      setMethod(el.dataset.method);
      render();
      return;
    case 'confirm-pay':
      if (document.querySelector('.pay-submit[disabled]')) return;
      startPaying();
      render();
      setTimeout(finishPaying, 800);
      return;
    case 'pay-inc':
    case 'pay-dec': {
      const order = state.order;
      if (!order) return;
      const line = order.items.find(i => i.id === id);
      if (!line) return;
      setOrderQty(id, line.qty + (action === 'pay-inc' ? 1 : -1));
      render();
      return;
    }
    case 'go-pickup':
      location.hash = '#/pickup';
      return;
    case 'go-pickup-cabinet':
      location.hash = '#/pickup/cabinet';
      return;
    case 'go-select':
      goSelect();
      return;
    case 'open-locker':
      openLocker(el.dataset.key);
      render();
      return;
    case 'close-locker':
      closeLocker();
      render();
      return;
    case 'open-next-locker':
      ensureOrder();
      openNextLocker();
      render();
      return;
    case 'locker-done': {
      const allDone = completeLocker();
      render();
      if (allDone) showToast('取货完成');
      else showToast('已关闭柜门，请继续取下一件');
      return;
    }
    case 'after-sale':
      showToast('售后流程暂未接入');
      return;
    default:
      return;
  }
});

document.getElementById('toggle-full').addEventListener('click', (event) => {
  document.body.classList.toggle('full');
  event.currentTarget.textContent = document.body.classList.contains('full') ? '退出全屏' : '全屏预览';
});

document.getElementById('reset-demo').addEventListener('click', () => {
  resetDemo();
  resetPayState();
  resetPickupState();
  location.hash = '#/select';
  render();
  showToast('演示已重置');
});

window.addEventListener('hashchange', render);

const params = new URLSearchParams(location.search);
if (params.has('clean')) document.querySelector('.dev-bar').style.display = 'none';
if (params.get('shell') === '1') document.body.classList.add('keep-shell');

render();
