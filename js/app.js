import {
  addToCart, setQty, toggleItem, toggleAll, clearCart, resetDemo,
  createOrder, setOrderQty, finishOrder, getState,
} from './store.js';
import { showToast } from './components.js';
import { renderIndex } from './screens/index.js';
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
  return (location.hash || '#/index').split('?')[0];
}

function render() {
  const route = currentRoute();
  if (route === '#/index' || route === '#/' || route === '#') {
    app.innerHTML = renderIndex();
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
