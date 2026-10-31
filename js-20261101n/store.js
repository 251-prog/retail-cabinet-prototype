const KEY = 'retail-cabinet-prototype-v1';

export const CATEGORIES = ['全部', '零售', '寄存', '租赁', '充电', '预购', '饮料', '工具'];

export const CABINET = {
  name: '中铁十二局工地柜',
  distance: '0.3km',
  code: 'C001',
  status: '营业中',
  locker: 'A01',
};

export const CATALOG = [
  {
    id: 'hygrometer',
    name: '温湿度计',
    price: 5,
    unit: '/h',
    desc: '整箱装',
    media: 'hygro',
    tags: [{ text: '工具', tone: 'blue' }],
    cats: ['租赁', '工具'],
  },
  {
    id: 'helmet',
    name: '智能安全帽',
    price: 5,
    unit: '/h',
    desc: '整箱装',
    media: 'helmet',
    tags: [{ text: '可预定', tone: 'orange' }, { text: '工具', tone: 'blue' }],
    cats: ['租赁', '工具'],
    soldOut: true,
  },
  {
    id: 'combo',
    name: '组合套餐',
    price: 50,
    unit: '',
    desc: '智能安全帽+智能摄像头+温湿度计+气体检测仪',
    media: 'combo',
    tags: [{ text: '工具', tone: 'blue' }, { text: '预购', tone: 'blue' }],
    cats: ['预购', '工具'],
  },
];

function seed() {
  return {
    cart: [
      {
        id: 'helmet',
        name: '智能安全帽',
        desc: '整箱装',
        price: 30,
        qty: 10,
        checked: true,
        media: 'helmet',
        tags: [{ text: '可预定', tone: 'orange' }, { text: '工具', tone: 'blue' }],
      },
      {
        id: 'combo',
        name: '组合套餐',
        desc: '智能安全帽+智能摄像头+温湿度计+气体检测仪',
        price: 50,
        qty: 1,
        checked: true,
        media: 'combo',
        tags: [{ text: '可预定', tone: 'orange' }, { text: '工具', tone: 'blue' }],
      },
    ],
    order: null,
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cart)) return seed();
    return parsed;
  } catch {
    return seed();
  }
}

let state = load();

export function getState() { return state; }

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* 隐私模式忽略 */ }
}

export function resetDemo() {
  state = seed();
  save();
}

export function findProduct(id) {
  return CATALOG.find(p => p.id === id) || null;
}

export function addToCart(id) {
  const product = findProduct(id);
  if (!product) return;
  if (product.soldOut) return false;
  const line = state.cart.find(item => item.id === id);
  if (line) {
    line.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      qty: 1,
      checked: true,
      media: product.media,
      tags: product.tags,
    });
  }
  save();
  return true;
}

export function addLine(line) {
  const existing = state.cart.find(i => i.id === line.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: line.id,
      name: line.name,
      desc: line.desc || '',
      price: line.price,
      qty: 1,
      checked: true,
      media: line.media,
      tags: line.tags || [],
    });
  }
  save();
}

export function setQty(id, qty) {
  const line = state.cart.find(item => item.id === id);
  if (!line) return;
  line.qty = Math.max(0, Math.min(99, qty));
  if (line.qty === 0) state.cart = state.cart.filter(item => item.id !== id);
  save();
}

export function toggleItem(id) {
  const line = state.cart.find(item => item.id === id);
  if (line) line.checked = !line.checked;
  save();
}

export function toggleAll() {
  const allChecked = state.cart.length > 0 && state.cart.every(i => i.checked);
  state.cart.forEach(i => { i.checked = !allChecked; });
  save();
}

export function clearCart() {
  state.cart = [];
  save();
}

export function cartCount({ checkedOnly = false } = {}) {
  return state.cart.reduce((sum, i) => sum + ((!checkedOnly || i.checked) ? i.qty : 0), 0);
}

export function cartTotal({ checkedOnly = false } = {}) {
  return state.cart.reduce((sum, i) => sum + ((!checkedOnly || i.checked) ? i.price * i.qty : 0), 0);
}

export function createOrder() {
  const items = state.cart.filter(i => i.checked);
  state.order = {
    no: 'DD' + String(Date.now()).slice(-8),
    items: items.map(i => ({ ...i })),
    total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
    count: items.reduce((sum, i) => sum + i.qty, 0),
    locker: 'B02',
    paid: false,
  };
  save();
  return state.order;
}

export function markPaid() {
  if (state.order) state.order.paid = true;
  save();
}

export function setOrderQty(id, qty) {
  if (!state.order) return;
  const line = state.order.items.find(i => i.id === id);
  if (!line) return;
  line.qty = Math.max(1, Math.min(99, qty));
  state.order.count = state.order.items.reduce((sum, i) => sum + i.qty, 0);
  state.order.total = state.order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  save();
}

export function finishOrder() {
  state.cart = state.cart.filter(i => !i.checked);
  state.order = null;
  save();
}
