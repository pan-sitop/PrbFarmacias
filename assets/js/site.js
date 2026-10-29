const NAV = [
  { label: "Inicio", href: "index.html" },
  { label: "Productos", href: "productos.html" },
  { label: "Inventario", href: "inventario.html" },
  {
    label: "Marco teórico",
    href: "marco-teorico/index.html",
    children: [
      ["Introducción", "marco-teorico/introduccion.html"],
      ["Antecedentes", "marco-teorico/antecedentes.html"],
      ["Planteamiento del problema", "marco-teorico/planteamiento.html"],
        ["Arbol de Problemas", "marco-teorico/arbol-problemas.html"],
      ["Formulación del problema", "marco-teorico/formulacion.html"],
      ["Propósito de estudio", "marco-teorico/proposito.html"],
      ["Metodología", "marco-teorico/metodologia.html"],
      ["Planificación de actividades", "marco-teorico/planificacion.html"],
    ],
  },
  {
    label: "Análisis estructurado",
    href: "analisis-estructurado/index.html",
    children: [
      ["Modelo ambiental", "analisis-estructurado/modelo-ambiental.html"],
      ["Modelo de comportamiento", "analisis-estructurado/modelo-comportamiento.html"],
    ],
  },
  {
    label: "Orientado a objetos",
    href: "orientado-objetos/index.html",
    children: [
      ["Diagramas de clases", "orientado-objetos/diagramas-clases.html"],
      ["Diagrama de casos de uso", "orientado-objetos/casos-uso.html"],
    ],
  },
  { label: "Video", href: "video.html" },
  { label: "Contacto", href: "contacto.html" },
];

const ICONS = {
  brand: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M3 12h18"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 7H6"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/></svg>`,
  bottle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2h6v3l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-3V2Z"/><path d="M7 12h10"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 2.4 17.4A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>`,
};


function currentPrefix() {
  const p = location.pathname;
  const inSubdir = /\/(marco-teorico|analisis-estructurado|orientado-objetos)\//.test(p);
  return inSubdir ? "../" : "";
}

function formatBs(n) {
  return "Bs " + Number(n).toLocaleString("es-BO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function renderHeader() {
  const target = document.querySelector("[data-site-header]");
  if (!target) return;

  const prefix = currentPrefix();
  const current = location.pathname.split("/").pop() || "index.html";

  const nav = NAV.map((item) => {
    const href = prefix + item.href;
    const active = item.href.split("/").pop() === current;

    if (item.children) {
      const submenu = item.children
        .map((c) => `<a href="${prefix + c[1]}">${c[0]}</a>`)
        .join("");
      return `
        <div class="nav-item has-dropdown">
          <a class="nav-link ${active ? "active" : ""}" href="${href}" aria-haspopup="true">
            ${item.label}<span class="chevron">${ICONS.chevron}</span>
          </a>
          <div class="dropdown">${submenu}</div>
        </div>`;
    }

    return `<a class="nav-link ${active ? "active" : ""}" href="${href}">${item.label}</a>`;
  }).join("");

  target.innerHTML = `
    <header class="site-header">
      <div class="nav-inner">
        <a class="brand" href="${prefix}index.html" aria-label="Farmacias Colque — Inicio">
          <span class="brand-logo">${ICONS.brand}</span>
          <span class="brand-name">
            FARMACIAS <b>COLQUE</b>
            <small>Sistema de gestión farmacéutica</small>
          </span>
        </a>
        <button class="mobile-toggle" aria-label="Abrir menú" aria-expanded="false">
          ${ICONS.menu}
        </button>
        <nav class="site-nav" aria-label="Navegación principal">${nav}</nav>
      </div>
    </header>`;

  const toggle = target.querySelector(".mobile-toggle");
  const navEl = target.querySelector(".site-nav");
  toggle.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  const target = document.querySelector("[data-site-footer]");
  if (!target) return;

  const p = currentPrefix();
  target.innerHTML = `
    <footer class="footer">
      <div class="footer-main">
        <div class="brand footer-brand">
          <span class="brand-logo">${ICONS.brand}</span>
          <span class="brand-name">
            FARMACIAS <b>COLQUE</b>
            <small>Tu salud, nuestra prioridad</small>
          </span>
        </div>
        <p>Sistema de Control de Inventarios y Punto de Venta.</p>
        <div class="footer-links">
          <a href="${p}index.html">Inicio</a>
          <a href="${p}productos.html">Productos</a>
          <a href="${p}inventario.html">Inventario</a>
          <a href="${p}contacto.html">Contacto</a>
        </div>
      </div>
      <div class="copyright">
        © 2026 Farmacias Colque · Prototipo educativo · Datos de muestra
      </div>
    </footer>`;
}

const PRODUCTS_DEFAULT = [
  { id: 1, name: "Paracetamol 500 mg x 20 tabletas", category: "Analgésicos", lab: "COFAR", price: 12.5, stock: 120, min: 30, icon: "pill" },
  { id: 2, name: "Ibuprofeno 400 mg x 10 tabletas", category: "Analgésicos", lab: "INTI", price: 15, stock: 80, min: 25, icon: "pill" },
  { id: 3, name: "Amoxicilina 500 mg x 12 cápsulas", category: "Antibióticos", lab: "Bagó", price: 35, stock: 40, min: 15, icon: "bottle", rx: true },
  { id: 4, name: "Omeprazol 20 mg x 14 cápsulas", category: "Digestivos", lab: "VITA", price: 22, stock: 60, min: 20, icon: "pill" },
  { id: 5, name: "Loratadina 10 mg x 10 tabletas", category: "Alergias", lab: "INTI", price: 10, stock: 90, min: 20, icon: "pill" },
  { id: 6, name: "Sales de rehidratación oral", category: "Hidratación", lab: "COFAR", price: 6, stock: 150, min: 40, icon: "bottle" },
  { id: 7, name: "Vitamina C 1 g x 10 efervescentes", category: "Vitaminas", lab: "VITA", price: 28, stock: 35, min: 15, icon: "pill" },
  { id: 8, name: "Jarabe para la tos 120 ml", category: "Respiratorio", lab: "Bagó", price: 24, stock: 8, min: 15, icon: "bottle" },
  { id: 9, name: "Pomada mentolada 30 g", category: "Dolor muscular", lab: "COFAR", price: 14, stock: 5, min: 12, icon: "bottle" },
  { id: 10, name: "Alcohol medicinal 250 ml", category: "Botiquín", lab: "INTI", price: 9, stock: 70, min: 20, icon: "bottle" },
  { id: 11, name: "Algodón hidrófilo 100 g", category: "Botiquín", lab: "COFAR", price: 8, stock: 0, min: 15, icon: "bottle" },
  { id: 12, name: "Barbijos caja x 50 unidades", category: "Botiquín", lab: "Genérico", price: 25, stock: 45, min: 10, icon: "bottle" },
  { id: 13, name: "Termómetro digital", category: "Equipos", lab: "Genérico", price: 30, stock: 18, min: 5, icon: "bottle" },
  { id: 14, name: "Té de manzanilla x 25 filtrantes", category: "Naturales", lab: "Genérico", price: 7, stock: 55, min: 15, icon: "bottle" },
  { id: 15, name: "Diclofenaco gel 1% x 60 g", category: "Antiinflamatorios", lab: "INTI", price: 18, stock: 50, min: 15, icon: "bottle" },
  { id: 16, name: "Mentisan ungüento x 20 g", category: "Respiratorio", lab: "INTI", price: 12, stock: 65, min: 20, icon: "bottle" },
  { id: 17, name: "Suero oral Gatorade 500 ml", category: "Hidratación", lab: "Genérico", price: 10, stock: 100, min: 30, icon: "bottle" },
  { id: 18, name: "Salbutamol aerosol 100 mcg", category: "Respiratorio", lab: "Bagó", price: 45, stock: 25, min: 10, icon: "bottle", rx: true },
  { id: 19, name: "Complejo B jarabe 200 ml", category: "Vitaminas", lab: "VITA", price: 32, stock: 40, min: 15, icon: "bottle" },
  { id: 20, name: "Clonazepam 2 mg x 30 tabletas", category: "Psicotrópicos", lab: "INTI", price: 40, stock: 15, min: 5, icon: "pill", rx: true },
  { id: 21, name: "Diclofenaco inyectable 75 mg", category: "Antiinflamatorios", lab: "COFAR", price: 8, stock: 80, min: 20, icon: "bottle", rx: true },
  { id: 22, name: "Pomada Dermofix 30 g", category: "Dermatología", lab: "Bagó", price: 25, stock: 30, min: 10, icon: "bottle" },
  { id: 23, name: "Refrianex jarabe 120 ml", category: "Respiratorio", lab: "Bagó", price: 22, stock: 55, min: 15, icon: "bottle" },
  { id: 24, name: "Ketorolaco 10 mg x 10 tabletas", category: "Analgésicos", lab: "INTI", price: 20, stock: 60, min: 15, icon: "pill" },
  { id: 25, name: "Amoxicilina + Ácido Clavulánico 500 mg", category: "Antibióticos", lab: "Terbol", price: 55, stock: 20, min: 8, icon: "pill", rx: true },
  { id: 26, name: "Crema para pañalitis 50 g", category: "Dermatología", lab: "COFAR", price: 15, stock: 45, min: 12, icon: "bottle" },
  { id: 27, name: "Agua oxigenada 10 vol. 250 ml", category: "Botiquín", lab: "INTI", price: 5, stock: 120, min: 30, icon: "bottle" },
  { id: 28, name: "Curitas caja x 20 unidades", category: "Botiquín", lab: "Genérico", price: 6, stock: 90, min: 20, icon: "bottle" },
  { id: 29, name: "Ibuprofeno jarabe 100 ml", category: "Analgésicos", lab: "Terbol", price: 28, stock: 12, min: 15, icon: "bottle" },
  { id: 30, name: "Gasa estéril 10x10 cm (sobre)", category: "Botiquín", lab: "Genérico", price: 3, stock: 200, min: 50, icon: "bottle" },
];

const STORE_KEY = "colque_demo_inventory_v2";

function getProducts() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : PRODUCTS_DEFAULT.map((p) => ({ ...p }));
  } catch {
    return PRODUCTS_DEFAULT.map((p) => ({ ...p }));
  }
}

function saveProducts(products) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(products));
  } catch {
  }
}

function stockState(p) {
  if (p.stock <= 0) return ["Agotado", "out"];
  if (p.stock <= p.min) return ["Stock bajo", "low"];
  return ["Disponible", "ok"];
}

function initCarousel() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  if (!slides.length) return;

  let index = 0;
  const dots = [...document.querySelectorAll(".carousel-dot")];
  const carousel = document.querySelector(".hero-carousel");
  let timer = null;

  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("shown", i === index));
    dots.forEach((d, i) => d.classList.toggle("selected", i === index));
  }

  function start() {
    stop();
    timer = setInterval(() => show(index + 1), 5500);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  document.querySelector(".carousel-prev")?.addEventListener("click", () => show(index - 1));
  document.querySelector(".carousel-next")?.addEventListener("click", () => show(index + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => show(i)));

  carousel?.addEventListener("mouseenter", stop);
  carousel?.addEventListener("mouseleave", start);
  carousel?.addEventListener("focusin", stop);
  carousel?.addEventListener("focusout", start);

  start();
}

function initProducts() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  let products = getProducts();
  let cart = [];

  const search = document.querySelector("#product-search");
  const cat = document.querySelector("#category-filter");
  const cartItems = document.querySelector("#cart-items");
  const cartCount = document.querySelector("#cart-count");
  const cartTotal = document.querySelector("#cart-total");
  const checkout = document.querySelector("#checkout");
  const clearCart = document.querySelector("#clear-cart");
  const saleMsg = document.querySelector("#sale-message");

  [...new Set(products.map((p) => p.category))]
    .sort()
    .forEach((c) => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      cat.appendChild(o);
    });

  function showMsg(text, cls) {
    saleMsg.textContent = text;
    saleMsg.className = "message " + (cls || "");
  }

  function draw() {
    const q = search.value.toLocaleLowerCase("es");
    const list = products.filter(
      (p) =>
        (cat.value === "Todos" || p.category === cat.value) &&
        `${p.name} ${p.lab}`.toLocaleLowerCase("es").includes(q)
    );

    document.querySelector("#product-count").textContent = `${list.length} productos`;

    grid.innerHTML =
      list
        .map((p) => {
          const [st, cls] = stockState(p);
          const disabled = p.stock <= 0;
          return `
            <article class="product-card">
              <div class="product-emoji">${ICONS[p.icon] || ICONS.pill}</div>
              <span class="category-tag">${p.category}</span>
              <h3>${p.name}</h3>
              <p class="muted small">Laboratorio: ${p.lab}</p>
              <div class="product-line">
                <b>${formatBs(p.price)}</b>
                <span class="status ${cls}">${st}</span>
              </div>
              ${p.rx ? '<p class="rx-note">Puede requerir receta según normativa aplicable.</p>' : ""}
              <button class="button primary full" data-add="${p.id}" ${disabled ? "disabled" : ""}>
                ${disabled ? "Agotado" : "Añadir al carrito"}
              </button>
              <small class="muted">Stock: ${p.stock}</small>
            </article>`;
        })
        .join("") || '<p class="empty">No se encontraron productos.</p>';
  }

  function drawCart() {
    const count = cart.reduce((s, c) => s + c.qty, 0);
    cartCount.textContent = `${count} unidad(es)`;
    cartTotal.textContent = formatBs(cart.reduce((s, c) => s + c.price * c.qty, 0));
    checkout.disabled = !cart.length;

    cartItems.innerHTML = cart.length
      ? cart
          .map(
            (c) => `
            <div class="cart-row">
              <div>
                <b>${c.name}</b>
                <small>${formatBs(c.price)} c/u</small>
                <strong>${formatBs(c.price * c.qty)}</strong>
              </div>
              <div class="qty">
                <button data-cart="minus" data-id="${c.id}" aria-label="Quitar unidad">${ICONS.minus}</button>
                <span>${c.qty}</span>
                <button data-cart="plus" data-id="${c.id}" aria-label="Añadir unidad">${ICONS.plus}</button>
                <button class="remove" data-cart="remove" data-id="${c.id}" aria-label="Eliminar del carrito">${ICONS.close}</button>
              </div>
            </div>`
          )
          .join("")
      : `<div class="empty"><span>${ICONS.cart}</span><b>El carrito está vacío</b><p>Añade productos para comenzar.</p></div>`;
  }

  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    const p = products.find((x) => x.id === +b.dataset.add);
    if (!p) return;
    const c = cart.find((x) => x.id === p.id);
    if (c) {
      if (c.qty < p.stock) c.qty++;
      else showMsg("No hay más unidades disponibles.", "error");
    } else if (p.stock > 0) {
      cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    }
    drawCart();
  });

  cartItems.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cart]");
    if (!b) return;
    const c = cart.find((x) => x.id === +b.dataset.id);
    const p = products.find((x) => x.id === c.id);
    const action = b.dataset.cart;

    if (action === "plus") {
      if (c.qty < p.stock) c.qty++;
      else showMsg("La cantidad supera el stock disponible.", "error");
    } else if (action === "minus") {
      c.qty--;
      if (c.qty < 1) cart = cart.filter((x) => x.id !== c.id);
    } else if (action === "remove") {
      cart = cart.filter((x) => x.id !== c.id);
    }
    drawCart();
  });

  search.addEventListener("input", draw);
  cat.addEventListener("change", draw);

  clearCart?.addEventListener("click", () => {
    cart = [];
    drawCart();
    showMsg("Carrito vaciado.", "");
  });

  checkout.addEventListener("click", () => {
    if (!cart.length) return;
    for (const c of cart) {
      if (products.find((p) => p.id === c.id).stock < c.qty) {
        showMsg("Stock insuficiente. Revisa el carrito.", "error");
        return;
      }
    }
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    cart.forEach((c) => (products.find((p) => p.id === c.id).stock -= c.qty));
    saveProducts(products);
    cart = [];
    draw();
    drawCart();
    showMsg(`Venta de demostración registrada: ${formatBs(total)}. Inventario actualizado.`, "success");
  });

  draw();
  drawCart();
}

function initInventory() {
  const body = document.querySelector("#inventory-body");
  if (!body) return;

  let products = getProducts();
  const search = document.querySelector("#inventory-search");
  const filter = document.querySelector("#stock-filter");
  const alertsList = document.querySelector("#alerts-list");

  function draw() {
    const q = search.value.toLocaleLowerCase("es");
    const list = products.filter(
      (p) =>
        `${p.name} ${p.lab} ${p.category}`.toLocaleLowerCase("es").includes(q) &&
        (filter.value === "Todos" || stockState(p)[0] === filter.value)
    );

    body.innerHTML =
      list
        .map((p) => {
          const [st, cls] = stockState(p);
          return `
            <tr>
              <td><b>${ICONS[p.icon] || ICONS.pill} ${p.name}</b></td>
              <td>${p.category}<small>${p.lab}</small></td>
              <td>${formatBs(p.price)}</td>
              <td><b>${p.stock}</b><small>Mínimo: ${p.min}</small></td>
              <td><span class="status ${cls}">${st}</span></td>
              <td>
                <div class="restock">
                  <input type="number" id="restock-${p.id}" min="1" max="9999" value="10" aria-label="Unidades para reponer">
                  <button data-restock="${p.id}" aria-label="Reponer stock">${ICONS.plus}</button>
                </div>
              </td>
            </tr>`;
        })
        .join("") || '<tr><td colspan="6">No hay coincidencias.</td></tr>';

    document.querySelector("#inventory-value").textContent = formatBs(
      products.reduce((s, p) => s + p.stock * p.price, 0)
    );
    document.querySelector("#inventory-total").textContent = products.length;
    document.querySelector("#inventory-low").textContent = products.filter(
      (p) => p.stock > 0 && p.stock <= p.min
    ).length;
    document.querySelector("#inventory-out").textContent = products.filter((p) => p.stock <= 0).length;

    const alerts = products.filter((p) => p.stock <= p.min);
    alertsList.innerHTML = alerts.length
      ? alerts
          .map((p) => {
            const [st, cls] = stockState(p);
            return `
              <div class="alert-row">
                <span>${ICONS.alert}</span>
                <div>
                  <b>${p.name}</b>
                  <small>${p.stock <= 0 ? "Agotado" : `Quedan ${p.stock} unidades`} · Mínimo ${p.min}</small>
                </div>
                <span class="status ${cls}">${st}</span>
              </div>`;
          })
          .join("")
      : '<p class="empty">No hay alertas de stock.</p>';
  }

  body.addEventListener("click", (e) => {
    const b = e.target.closest("[data-restock]");
    if (!b) return;
    const id = +b.dataset.restock;
    const input = document.querySelector(`#restock-${id}`);
    const n = +input.value;
    if (!Number.isInteger(n) || n < 1 || n > 9999) {
      alert("Escribe una cantidad entera entre 1 y 9999.");
      return;
    }
    products.find((p) => p.id === id).stock += n;
    saveProducts(products);
    draw();
  });

  search.addEventListener("input", draw);
  filter.addEventListener("change", draw);

  document.querySelector("#reset-inventory")?.addEventListener("click", () => {
    if (confirm("¿Restaurar los datos iniciales? Se perderán los cambios de este navegador.")) {
      products = PRODUCTS_DEFAULT.map((p) => ({ ...p }));
      saveProducts(products);
      draw();
    }
  });

  draw();
}

function initContact() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#contact-result").textContent =
      "Mensaje validado en modo demostración. Este formulario no envía información a un servidor.";
    form.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initCarousel();
  initProducts();
  initInventory();
  initContact();
});