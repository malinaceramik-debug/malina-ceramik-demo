const STORAGE_KEY = "malina-ceramik-pwa-demo-v2";

const icons = {
  home: `<svg viewBox="0 0 24 24"><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/></svg>`,
  archive: `<svg viewBox="0 0 24 24"><path d="M4 7h16v13H4z"/><path d="M3 4h18v3H3z"/><path d="M9 11h6"/></svg>`,
  money: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6v1M17 15h1v-1"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-5 3-8 7-8s7 3 7 8"/><path d="M16 4a4 4 0 0 1 0 8M17 14c3 .7 5 3 5 7"/></svg>`,
  camera: `<svg viewBox="0 0 24 24"><path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/></svg>`,
  palette: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.4a1.6 1.6 0 0 0 0-3.2h-1a1.5 1.5 0 0 1 0-3h2.8A5.8 5.8 0 0 0 21 9c0-3.3-4-6-9-6Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10" cy="6.8" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="17.5" cy="10.5" r="1"/></svg>`,
};

const initialGlazes = [
  {
    id: "lesna-zielen",
    name: "Leśna zieleń",
    maker: "Szkliwo pracowni",
    code: "SZ-12",
    image: "assets/talerz.webp",
    color: "#66785f",
    finish: "Błyszczące",
    temperature: "1220–1240°C",
    clays: ["Jasna kamionka", "Beżowa kamionka"],
    description: "Głęboka zieleń, która mocniej zbiera się w zagłębieniach i na fakturze.",
    notes: "Najpewniejszy efekt przy 2–3 cienkich warstwach.",
  },
  {
    id: "kobaltowy-deszcz",
    name: "Kobaltowy deszcz",
    maker: "Szkliwo pracowni",
    code: "SZ-07",
    image: "assets/miska.webp",
    color: "#496779",
    finish: "Efektowe",
    temperature: "1220–1240°C",
    clays: ["Jasna kamionka"],
    description: "Niebieskie przejścia i jaśniejsze smugi, szczególnie widoczne na pionowych ściankach.",
    notes: "Lubi wyraźną fakturę. Efekt może różnić się między półkami pieca.",
  },
  {
    id: "malinowy-pyl",
    name: "Malinowy pył",
    maker: "Szkliwo pracowni",
    code: "SZ-19",
    image: "assets/kubek.webp",
    color: "#a46662",
    finish: "Satynowe",
    temperature: "1200–1240°C",
    clays: ["Jasna kamionka", "Czerwona kamionka"],
    description: "Ciepły, przygaszony róż z delikatnymi zmianami tonu na rantach.",
    notes: "Na czerwonej glinie wychodzi ciemniej i bardziej ziemiście.",
  },
  {
    id: "miodowy",
    name: "Miodowy",
    maker: "Szkliwo pracowni",
    code: "SZ-03",
    image: "assets/wazon.webp",
    color: "#a06f38",
    finish: "Błyszczące",
    temperature: "1060°C",
    clays: ["Jasna glina"],
    description: "Ciepłe, transparentne szkliwo podkreślające ślady dłoni i rysunek gliny.",
    notes: "Dobrze wygląda na reliefach i odciśniętych wzorach.",
  },
];

const materialOptions = {
  clay: ["Jasna kamionka", "Beżowa kamionka", "Czerwona kamionka", "Jasna glina"],
  glazes: initialGlazes.map((glaze) => glaze.name),
  paints: ["Kobaltowa", "Czarna", "Biała angoba", "Ceglasta angoba"],
  temperature: ["1060°C", "1200°C", "1220°C", "1240°C"],
};

const recipeCategories = [
  { id: "clay", label: "Glina", multiple: false },
  { id: "glazes", label: "Szkliwa", multiple: true },
  { id: "paints", label: "Farby", multiple: true },
  { id: "temperature", label: "Temperatura", multiple: false },
];

const initialItems = [
  {
    id: 1,
    name: "Kubek w kropki",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/kubek.webp",
    status: "waiting",
    firing: "bisque",
    group: "Dostawa 03.06",
    date: "2026-06-03",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: [],
      paints: ["Kobaltowa"],
      temperature: ["1240°C"],
      note: "Kobalt nakładany szerokim pędzlem, dwie warstwy.",
    },
  },
  {
    id: 2,
    name: "Miska w kobalt",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/miska.webp",
    status: "ready",
    firing: "glaze",
    group: "Dostawa 28.05",
    date: "2026-05-28",
    firedAt: "2026-06-08",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Kobaltowy deszcz"],
      paints: [],
      temperature: ["1240°C"],
      note: "Trzy cienkie warstwy szkliwa.",
    },
  },
  {
    id: 3,
    name: "Wazon z uszami",
    owner: "Marek Piotrowski",
    ownerId: "marek",
    image: "assets/wazon.webp",
    status: "waiting",
    firing: "bisque",
    group: "Dostawa 30.05",
    date: "2026-05-30",
    recipe: {
      clay: ["Beżowa kamionka"],
      glazes: ["Miodowy"],
      paints: [],
      temperature: ["1060°C"],
      note: "",
    },
  },
  {
    id: 4,
    name: "Talerz z gałązką",
    owner: "Zofia Malinowska",
    ownerId: "zofia",
    image: "assets/talerz.webp",
    status: "waiting",
    firing: "glaze",
    group: "Dostawa 01.06",
    date: "2026-06-01",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Leśna zieleń"],
      paints: ["Biała angoba"],
      temperature: ["1240°C"],
      note: "Szkliwo tylko wewnątrz, gałązka malowana angobą.",
    },
  },
  {
    id: 5,
    name: "Mała patera",
    owner: "Marek Piotrowski",
    ownerId: "marek",
    image: "assets/miska.webp",
    status: "ready",
    firing: "glaze",
    group: "Dostawa 24.05",
    date: "2026-05-24",
    firedAt: "2026-06-06",
    recipe: {
      clay: ["Czerwona kamionka"],
      glazes: ["Malinowy pył"],
      paints: [],
      temperature: ["1220°C"],
      note: "",
    },
  },
  {
    id: 6,
    name: "Kubek śniadaniowy",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/kubek.webp",
    status: "collected",
    firing: "glaze",
    group: "Dostawa 12.05",
    date: "2026-05-12",
    firedAt: "2026-05-22",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Leśna zieleń"],
      paints: [],
      temperature: ["1240°C"],
      note: "Dwie warstwy. Na rancie kolor wyszedł jaśniejszy.",
    },
  },
];

const initialState = {
  role: "student",
  view: "home",
  studentFilter: "all",
  instructorStatus: "all",
  instructorFiring: "all",
  glazeFilter: "all",
  search: "",
  selected: [],
  items: initialItems,
  customMaterialOptions: {
    clay: [],
    glazes: [],
    paints: [],
    temperature: [],
  },
  payments: [
    {
      id: 1,
      owner: "Zofia Malinowska",
      date: "2026-06-07",
      bisque: 1.2,
      glaze: 0.8,
      total: 70,
    },
    {
      id: 2,
      owner: "Marek Piotrowski",
      date: "2026-06-04",
      bisque: 2.1,
      glaze: 0,
      total: 58.8,
    },
  ],
};

let state = loadState();
let addFlow = {
  step: 1,
  photos: [],
};
let recipeDraft = null;
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(initialState);
    const items = (saved.items || initialItems).map((item) => {
      const normalized = {
        ...item,
        code: item.code || `MC-${String(item.id).padStart(4, "0")}`,
        recipe: normalizeRecipe(item.recipe),
      };
      if (/^Wyrób \d+$/.test(normalized.name || "")) delete normalized.name;
      return normalized;
    });
    return { ...initialState, ...saved, items };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeRecipe(recipe = {}) {
  return {
    clay: Array.isArray(recipe.clay) ? recipe.clay : [],
    glazes: Array.isArray(recipe.glazes) ? recipe.glazes : [],
    paints: Array.isArray(recipe.paints) ? recipe.paints : [],
    temperature: Array.isArray(recipe.temperature) ? recipe.temperature : [],
    note: recipe.note || "",
  };
}

function icon(name) {
  return `<span class="nav-icon" aria-hidden="true">${icons[name] || icons.home}</span>`;
}

function navItems() {
  if (state.role === "student") {
    return [
      { id: "home", label: "Początek", icon: "home" },
      { id: "my-items", label: "Moje wyroby", icon: "gallery" },
      { id: "glazes", label: "Katalog szkliw", icon: "palette" },
      { id: "history", label: "Historia", icon: "archive" },
      { id: "notifications", label: "Powiadomienia", icon: "bell" },
    ];
  }
  return [
    { id: "gallery", label: "Do wypału", icon: "gallery" },
    { id: "glazes", label: "Katalog szkliw", icon: "palette" },
    { id: "settlements", label: "Rozliczenia", icon: "money" },
    { id: "clients", label: "Kursanci", icon: "users" },
    { id: "archive", label: "Archiwum", icon: "archive" },
  ];
}

function statusLabel(status) {
  return {
    waiting: "Czeka na wypał",
    ready: "Gotowy do odbioru",
    collected: "Odebrany",
  }[status];
}

function firingLabel(firing) {
  return firing === "bisque" ? "Biskwit" : "Na ostro";
}

function itemCode(item) {
  return item.code || `MC-${String(item.id).padStart(4, "0")}`;
}

function itemLabel(item) {
  return item.name || itemCode(item);
}

function studentItemLabel(item) {
  return item.personalTitle || item.name || `Wyrób z ${formatFullDate(item.date)}`;
}

function visibleItemLabel(item) {
  return state.role === "student" && item.ownerId === "anna"
    ? studentItemLabel(item)
    : itemCode(item);
}

function firingLegend() {
  return `
    <div class="firing-legend" aria-label="Kolory rodzaju wypalu">
      <span><i class="bisque" aria-hidden="true"></i>Biskwit</span>
      <span><i class="glaze" aria-hidden="true"></i>Na ostro</span>
    </div>
  `;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

function formatFullDate(value) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
  }).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function daysSince(value) {
  const now = new Date("2026-06-10T12:00:00");
  const then = new Date(`${value}T12:00:00`);
  return Math.max(0, Math.round((now - then) / 86400000));
}

function pluralItems(count) {
  if (count === 1) return "wyrób";
  if (count >= 2 && count <= 4) return "wyroby";
  return "wyrobów";
}

function renderNav() {
  const markup = navItems()
    .map(
      (item) => `
        <button class="nav-button ${state.view === item.id ? "active" : ""}" data-view="${item.id}" type="button">
          ${icon(item.icon)}
          <span>${item.label}</span>
        </button>`,
    )
    .join("");
  document.querySelector("#desktop-nav").innerHTML = markup;
  document.querySelector("#mobile-nav").innerHTML = markup;
}

function renderProfile() {
  const isStudent = state.role === "student";
  document.querySelector("#avatar").textContent = isStudent ? "AK" : "MW";
  document.querySelector("#profile-name").textContent = isStudent
    ? "Anna Kowalska"
    : "Marta Wiśniewska";
  document.querySelector("#profile-role").textContent = isStudent ? "Kursantka" : "Instruktorka";
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
}

function render() {
  renderNav();
  renderProfile();
  const content = document.querySelector("#app-content");

  if (state.role === "student") {
    if (state.view === "home") content.innerHTML = studentHome();
    else if (state.view === "my-items") content.innerHTML = studentItems();
    else if (state.view === "glazes") content.innerHTML = glazeCatalogView();
    else if (state.view === "history") content.innerHTML = studentHistory();
    else content.innerHTML = notificationsView();
  } else {
    if (state.view === "gallery") content.innerHTML = instructorGallery();
    else if (state.view === "glazes") content.innerHTML = glazeCatalogView();
    else if (state.view === "settlements") content.innerHTML = settlementsView();
    else if (state.view === "clients") content.innerHTML = clientsView();
    else content.innerHTML = instructorArchive();
  }

  attachViewListeners();
}

function studentHome() {
  const mine = state.items.filter((item) => item.ownerId === "anna");
  const waiting = mine.filter((item) => item.status === "waiting").length;
  const ready = mine.filter((item) => item.status === "ready").length;
  const collected = mine.filter((item) => item.status === "collected").length;

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Środa, 10 czerwca</p>
        <h1>Dzień dobry, Aniu.</h1>
        <p class="lead">Tu sprawdzisz, co dzieje się z Twoją ceramiką. Bez zgadywania i bez szukania wiadomości.</p>
      </div>
    </div>

    <div class="hero-grid">
      <article class="action-card">
        <p class="eyebrow">Nowa dostawa</p>
        <h2>Zostawiasz dziś ceramikę?</h2>
        <p>Zrób wyraźne zdjęcie każdej sztuki. Całość zajmie mniej niż minutę.</p>
        <button class="primary-button" id="open-add-flow" type="button">
          <span class="button-icon">+</span>
          Dodaj moje wyroby
        </button>
      </article>
    </div>

    <div class="section-head">
      <div>
        <h2>Twoja ceramika</h2>
        <p>Aktualny stan wszystkich dodanych wyrobów</p>
      </div>
      <button class="ghost-button" data-view="my-items" type="button">Zobacz galerię →</button>
    </div>

    <div class="stats-grid">
      ${statCard("Czeka na wypał", waiting, "waiting", "waiting")}
      ${statCard("Gotowe do odbioru", ready, "ready", "ready")}
      ${statCard("Odebrane", collected, "archived", "collected")}
    </div>

    <div class="section-head">
      <div>
        <h2>Ostatnio dodane</h2>
      </div>
    </div>
    <div class="items-grid">
      ${mine
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3)
        .map((item) => itemCard(item, false))
        .join("")}
    </div>

    <article class="catalog-teaser">
      <div>
        <p class="eyebrow">Biblioteka pracowni</p>
        <h2>Znajdź pomysł na kolejne zdobienie</h2>
        <p>Zobacz, jak szkliwa zachowywały się na różnych glinach i przy różnych temperaturach.</p>
      </div>
      <button class="primary-button" data-view="glazes" type="button">Otwórz katalog szkliw</button>
    </article>
  `;
}

function statCard(label, count, status, filter) {
  return `
    <button class="stat-card" data-stat-filter="${filter}" type="button" aria-label="${label}: ${count}. Otwórz galerię">
      <div class="stat-card-top">
        <span>${label}</span>
        <i class="mini-status ${status}" aria-hidden="true"></i>
      </div>
      <span class="stat-card-value">
        <strong>${count}</strong>
        <i class="stat-card-arrow" aria-hidden="true">→</i>
      </span>
    </button>`;
}

function studentItems() {
  const filters = [
    ["all", "Wszystkie"],
    ["ready", "Do odbioru"],
    ["waiting", "Czekają"],
    ["collected", "Odebrane"],
  ];
  const items = state.items
    .filter((item) => item.ownerId === "anna")
    .filter((item) => state.studentFilter === "all" || item.status === state.studentFilter)
    .sort((a, b) => {
      const priority = { ready: 0, waiting: 1, collected: 2 };
      return priority[a.status] - priority[b.status] || b.date.localeCompare(a.date);
    });

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Osobista galeria</p>
        <h1>Moje wyroby</h1>
        <p class="lead">Każda sztuka ma własny status, nawet jeśli została przyniesiona razem z innymi.</p>
      </div>
      <button class="primary-button" id="open-add-flow" type="button"><span class="button-icon">+</span> Dodaj wyroby</button>
    </div>
    <div class="filter-row">
      ${filters
        .map(
          ([id, label]) =>
            `<button class="filter-chip status-filter ${id} ${state.studentFilter === id ? "active" : ""}" data-student-filter="${id}" type="button">${label}</button>`,
        )
        .join("")}
    </div>
    ${firingLegend()}
    <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
    ${items.length ? studentGallerySections(items) : emptyState("Tu jest pusto", "Zmień filtr albo dodaj nowy wyrób.")}
  `;
}

function studentGallerySections(items) {
  const sections = [
    ["ready", "Do odbioru", "Te wyroby są już wypalone i czekają w pracowni."],
    ["waiting", "Czekają na wypał", "Wyroby przyjęte przez pracownię."],
    ["collected", "Odebrane", "Historia odebranych wyrobów."],
  ];

  return sections
    .map(([status, title, copy]) =>
      gallerySection(title, copy, items.filter((item) => item.status === status), false, status),
    )
    .join("");
}

function gallerySection(title, copy, items, selectable, sectionId) {
  if (!items.length) return "";
  return `
    <section class="gallery-section" data-gallery-section="${sectionId}">
      <div class="gallery-section-head">
        <div>
          <h2>${title}</h2>
          <p>${copy}</p>
        </div>
        <span>${items.length} ${pluralItems(items.length)}</span>
      </div>
      <div class="items-grid gallery-grid">
        ${items.map((item) => itemCard(item, selectable && item.status === "waiting")).join("")}
      </div>
    </section>
  `;
}

function itemCard(item, selectable) {
  const selected = state.selected.includes(item.id);
  const label = visibleItemLabel(item);
  const isStudentItem = state.role === "student" && item.ownerId === "anna";
  const groupItems = state.items
    .filter((candidate) => candidate.ownerId === item.ownerId && candidate.group === item.group)
    .sort((a, b) => a.id - b.id);
  const position = groupItems.findIndex((candidate) => candidate.id === item.id) + 1;
  const recipeCount = recipeCategories.reduce(
    (count, category) => count + normalizeRecipe(item.recipe)[category.id].length,
    0,
  );
  return `
    <article class="item-card firing-${item.firing} ${selected ? "selected" : ""}" data-item-id="${item.id}" data-selectable="${selectable}" role="button" tabindex="0" aria-label="${selectable ? "Zaznacz wyrób" : `Otwórz ${escapeHtml(label)}`}">
      <div class="item-photo">
        <img src="${item.image}" alt="${label}, wyrób: ${item.owner}" />
        ${selectable ? `<span class="select-circle" aria-hidden="true">✓</span>` : ""}
        <span class="status-pill ${item.status}">${statusLabel(item.status)}</span>
        <span class="firing-pill ${item.firing}">${firingLabel(item.firing)}</span>
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <div>
            <h3>${label}</h3>
            <p>${isStudentItem ? (groupItems.length > 1 ? `${position} z ${groupItems.length} w tej dostawie` : `Z dostawy ${formatFullDate(item.date)}`) : `${firingLabel(item.firing)} · ${formatDate(item.date)}`}</p>
          </div>
        </div>
        <div class="item-meta">
          ${
            isStudentItem
              ? `<span class="recipe-indicator ${recipeCount ? "filled" : ""}">${recipeCount ? "Ma notatkę zdobienia" : "Dodaj notatkę"}</span>
                 <span class="group-pill">${formatDate(item.date)}</span>`
              : `<span class="owner-pill">${item.owner}</span>
                 <span class="group-pill">${item.group}</span>`
          }
        </div>
      </div>
    </article>
  `;
}

function glazeCatalogView() {
  const filters = ["all", "Błyszczące", "Satynowe", "Efektowe"];
  const glazes = initialGlazes.filter(
    (glaze) => state.glazeFilter === "all" || glaze.finish === state.glazeFilter,
  );

  return `
    <div class="page-head catalog-page-head">
      <div>
        <p class="eyebrow">Wspólna wiedza pracowni</p>
        <h1>Katalog szkliw</h1>
        <p class="lead">Inspiracje, próby i doświadczenia zebrane przez Malina Ceramik. Zobacz efekt, a potem zapisz użyte szkliwo przy swoim wyrobie.</p>
      </div>
    </div>
    <div class="catalog-notice">
      <strong>Każdy wypał może wyglądać trochę inaczej.</strong>
      <span>Na efekt wpływają glina, liczba warstw, temperatura i miejsce w piecu.</span>
    </div>
    <div class="filter-row catalog-filters">
      ${filters
        .map(
          (filter) =>
            `<button class="filter-chip ${state.glazeFilter === filter ? "active" : ""}" data-glaze-filter="${filter}" type="button">${filter === "all" ? "Wszystkie" : filter}</button>`,
        )
        .join("")}
    </div>
    <div class="glaze-grid">
      ${glazes.map(glazeCard).join("")}
    </div>
  `;
}

function glazeCard(glaze) {
  const examples = state.items.filter((item) =>
    normalizeRecipe(item.recipe).glazes.includes(glaze.name),
  ).length;
  return `
    <button class="glaze-card" data-glaze-id="${glaze.id}" type="button">
      <div class="glaze-photo">
        <img src="${glaze.image}" alt="Przykład szkliwa ${glaze.name}" />
        <span class="glaze-swatch" style="--swatch: ${glaze.color}" aria-hidden="true"></span>
        <span class="glaze-finish">${glaze.finish}</span>
      </div>
      <div class="glaze-card-body">
        <div class="glaze-title-row">
          <div>
            <small>${glaze.maker} · ${glaze.code}</small>
            <h2>${glaze.name}</h2>
          </div>
          <span aria-hidden="true">→</span>
        </div>
        <p>${glaze.description}</p>
        <div class="glaze-card-meta">
          <span>${glaze.temperature}</span>
          <span>${examples} ${examples === 1 ? "przykład" : "przykłady"}</span>
        </div>
      </div>
    </button>
  `;
}

function studentHistory() {
  const payments = state.payments.filter((payment) => payment.owner === "Anna Kowalska");
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Twoje rozliczenia</p>
        <h1>Historia</h1>
        <p class="lead">Odbiory i płatności w jednym miejscu.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${
          payments.length
            ? payments.map(historyRow).join("")
            : emptyState("Jeszcze bez rozliczeń", "Pierwsze rozliczenie pojawi się tu po odbiorze ceramiki.")
        }
      </div>
    </section>
  `;
}

function notificationsView() {
  const ready = state.items.filter((item) => item.ownerId === "anna" && item.status === "ready");
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Wiadomości z pracowni</p>
        <h1>Powiadomienia</h1>
        <p class="lead">Najważniejsze informacje o Twoich wyrobach, bez zbędnego hałasu.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${
          ready.length
            ? ready
                .map(
                  (item) => `
                    <div class="history-row">
                      <div class="history-icon">${icon("bell")}</div>
                      <div>
                        <strong>${itemLabel(item)} jest gotowy do odbioru</strong>
                        <small>Wypalono ${formatDate(item.firedAt || "2026-06-08")} · ${firingLabel(item.firing)}</small>
                      </div>
                      <span class="status-pill ready">Nowe</span>
                    </div>`,
                )
                .join("")
            : emptyState("Wszystko przeczytane", "Nowe wiadomości pojawią się tutaj.")
        }
      </div>
    </section>
  `;
}

function instructorGallery() {
  const filtered = state.items
    .filter((item) => state.instructorStatus === "all" || item.status === state.instructorStatus)
    .filter((item) => state.instructorFiring === "all" || item.firing === state.instructorFiring)
    .filter((item) => `${itemLabel(item)} ${itemCode(item)} ${item.owner} ${item.group}`.toLowerCase().includes(state.search.toLowerCase()))
    .sort((a, b) => a.date.localeCompare(b.date));
  const statusFilters = [
    ["all", "Wszystkie"],
    ["waiting", "Czekają na wypał"],
    ["ready", "Do odbioru"],
    ["collected", "Odebrane"],
  ];
  const firingFilters = [
    ["all", "Każdy wypał"],
    ["bisque", "Biskwit"],
    ["glaze", "Na ostro"],
  ];

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Widok instruktora</p>
        <h1>Ceramika w pracowni</h1>
        <p class="lead">Najstarsze wyroby są pierwsze. Kliknij zdjęcia, które właśnie wyszły z pieca.</p>
      </div>
    </div>

    <div class="instructor-toolbar">
      <div class="field search-field">
        <label for="search-items">Szukaj kursanta, wyrobu lub dostawy</label>
        <input class="input" id="search-items" type="search" placeholder="np. Anna lub Dostawa 03.06" value="${state.search}" />
      </div>
      <div class="filter-control">
        <span class="filter-label">Status</span>
        <div class="filter-row compact">
          ${statusFilters
            .map(
              ([id, label]) =>
                `<button class="filter-chip status-filter ${id} ${state.instructorStatus === id ? "active" : ""}" data-instructor-status="${id}" type="button">${label}</button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="filter-control">
        <span class="filter-label">Rodzaj wypału</span>
        <div class="filter-row compact">
          ${firingFilters
            .map(
              ([id, label]) =>
                `<button class="filter-chip firing-filter ${id} ${state.instructorFiring === id ? "active" : ""}" data-instructor-firing="${id}" type="button">${label}</button>`,
            )
            .join("")}
        </div>
      </div>
    </div>

    <p class="gallery-gesture-hint">Dotknij zdjęcia, aby je zaznaczyć. Przytrzymaj, aby otworzyć podgląd.</p>
    ${filtered.length ? instructorGallerySections(filtered) : emptyState("Brak pasujących wyrobów", "Zmień filtry lub wyszukiwaną frazę.")}

    ${
      state.selected.length
        ? `
          <div class="bulk-bar">
            <div>
              <strong>Zaznaczono ${state.selected.length} ${pluralItems(state.selected.length)}</strong>
              <small>Każda sztuka zmieni status osobno</small>
            </div>
            <div class="bulk-actions">
              <button class="secondary-button" id="clear-selection" type="button">Anuluj</button>
              <button class="primary-button" id="mark-fired" type="button">Oznacz jako wypalone</button>
            </div>
          </div>`
        : ""
    }
  `;
}

function instructorGallerySections(items) {
  const sections = [
    ["waiting-bisque", "Czekają na biskwit", "Najstarsze sztuki są pokazane jako pierwsze.", (item) => item.status === "waiting" && item.firing === "bisque"],
    ["waiting-glaze", "Czekają na wypał na ostro", "Wyroby szkliwione oczekujące na wypał.", (item) => item.status === "waiting" && item.firing === "glaze"],
    ["ready", "Gotowe do odbioru", "Wypalone wyroby oczekujące na kursantów.", (item) => item.status === "ready"],
    ["collected", "Odebrane", "Wyroby, które opuściły już pracownię.", (item) => item.status === "collected"],
  ];

  return sections
    .map(([id, title, copy, matcher]) =>
      gallerySection(title, copy, items.filter(matcher), true, id),
    )
    .join("");
}

function settlementsView() {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Odbiór i płatność</p>
        <h1>Rozliczenie ceramiki</h1>
        <p class="lead">Wpisz wagę. Kwota policzy się automatycznie według aktualnych stawek.</p>
      </div>
    </div>
    <div class="settlement-layout">
      <section class="panel settlement-form">
        <div class="field">
          <label for="settlement-client">Kursant</label>
          <select class="select" id="settlement-client">
            <option>Anna Kowalska</option>
            <option>Marek Piotrowski</option>
            <option>Zofia Malinowska</option>
          </select>
        </div>
        <div class="weight-row">
          <div class="field">
            <label for="bisque-weight">Biskwit · 28 zł/kg</label>
            <input class="input weight-input" id="bisque-weight" type="number" inputmode="decimal" min="0" step="0.1" value="0" />
          </div>
          <div class="field">
            <label for="glaze-weight">Na ostro · 45 zł/kg</label>
            <input class="input weight-input" id="glaze-weight" type="number" inputmode="decimal" min="0" step="0.1" value="0" />
          </div>
        </div>
        <div class="recognition-note">
          <strong>Co stanie się po zapisaniu?</strong>
          <p>Rozliczenie trafi do historii kursanta, a odebrane wyroby będzie można przenieść do archiwum. W docelowej wersji te dane trafią też do Arkusza Google.</p>
        </div>
      </section>
      <aside class="price-summary">
        <div>
          <p class="eyebrow">Podsumowanie</p>
          <div class="price-lines">
            <div class="price-line"><span>Biskwit</span><strong id="bisque-price">0,00 zł</strong></div>
            <div class="price-line"><span>Na ostro</span><strong id="glaze-price">0,00 zł</strong></div>
          </div>
        </div>
        <div>
          <div class="price-total">
            <small>Do zapłaty</small>
            <strong id="total-price">0,00 zł</strong>
          </div>
          <button class="primary-button" id="save-settlement" type="button">Zapisz rozliczenie</button>
        </div>
      </aside>
    </div>
    <div class="section-head"><div><h2>Ostatnie rozliczenia</h2></div></div>
    <section class="panel">
      <div class="history-list">${state.payments.map(historyRow).join("")}</div>
    </section>
  `;
}

function historyRow(payment) {
  return `
    <div class="history-row">
      <div class="history-icon">${icon("money")}</div>
      <div>
        <strong>${payment.owner}</strong>
        <small>${formatDate(payment.date)} · ${payment.bisque} kg biskwit · ${payment.glaze} kg na ostro</small>
      </div>
      <span class="history-amount">${formatMoney(payment.total)}</span>
    </div>`;
}

function clientsView() {
  const clients = [
    ["Anna Kowalska", "anna"],
    ["Marek Piotrowski", "marek"],
    ["Zofia Malinowska", "zofia"],
  ];
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Baza pracowni</p>
        <h1>Kursanci</h1>
        <p class="lead">Szybki podgląd ceramiki i ostatniej aktywności każdej osoby.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${clients
          .map(([name, id]) => {
            const items = state.items.filter((item) => item.ownerId === id);
            const waiting = items.filter((item) => item.status === "waiting").length;
            return `
              <div class="history-row">
                <div class="avatar">${name.split(" ").map((part) => part[0]).join("")}</div>
                <div><strong>${name}</strong><small>${items.length} ${pluralItems(items.length)} · ${waiting} czeka na wypał</small></div>
                <button class="ghost-button client-filter" data-client="${name}" type="button">Pokaż wyroby →</button>
              </div>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function instructorArchive() {
  const archived = state.items.filter((item) => item.status === "collected");
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Zamknięte sprawy</p>
        <h1>Archiwum</h1>
        <p class="lead">Odebrane wyroby i ich pełna historia pozostają łatwe do odnalezienia.</p>
      </div>
    </div>
    <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
    <div class="items-grid gallery-grid">
      ${archived.length ? archived.map((item) => itemCard(item, false)).join("") : emptyState("Archiwum jest puste", "Odebrane wyroby pojawią się tutaj.")}
    </div>
  `;
}

function emptyState(title, copy) {
  return `<div class="empty-state"><strong>${title}</strong><span>${copy}</span></div>`;
}

function attachViewListeners() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      state.selected = [];
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelector("#open-add-flow")?.addEventListener("click", openAddFlow);

  document.querySelectorAll("[data-stat-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentFilter = button.dataset.statFilter;
      state.view = "my-items";
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentFilter = button.dataset.studentFilter;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-glaze-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.glazeFilter = button.dataset.glazeFilter;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-glaze-id]").forEach((button) => {
    button.addEventListener("click", () => openGlazePreview(button.dataset.glazeId));
  });

  attachGalleryInteractions();

  document.querySelector("#clear-selection")?.addEventListener("click", () => {
    state.selected = [];
    render();
  });

  document.querySelector("#mark-fired")?.addEventListener("click", openFiredConfirmation);

  const search = document.querySelector("#search-items");
  search?.addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    render();
    const nextSearch = document.querySelector("#search-items");
    nextSearch?.focus();
    nextSearch?.setSelectionRange(state.search.length, state.search.length);
  });

  document.querySelectorAll("[data-instructor-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.instructorStatus = button.dataset.instructorStatus;
      state.selected = [];
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-instructor-firing]").forEach((button) => {
    button.addEventListener("click", () => {
      state.instructorFiring = button.dataset.instructorFiring;
      state.selected = [];
      saveState();
      render();
    });
  });

  document.querySelectorAll(".weight-input").forEach((input) => {
    input.addEventListener("input", updatePrice);
  });
  document.querySelector("#save-settlement")?.addEventListener("click", saveSettlement);

  document.querySelectorAll(".client-filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = "gallery";
      state.instructorStatus = "all";
      state.search = button.dataset.client;
      saveState();
      render();
    });
  });
}

function attachGalleryInteractions() {
  document.querySelectorAll(".gallery-grid .item-card").forEach((card) => {
    const itemId = Number(card.dataset.itemId);
    const selectable = card.dataset.selectable === "true";
    let pressTimer;
    let longPressTriggered = false;
    let startX = 0;
    let startY = 0;

    const cancelPress = () => {
      clearTimeout(pressTimer);
    };

    card.addEventListener("contextmenu", (event) => event.preventDefault());
    card.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      longPressTriggered = false;
      startX = event.clientX;
      startY = event.clientY;
      pressTimer = setTimeout(() => {
        longPressTriggered = true;
        navigator.vibrate?.(18);
        openItemPreview(itemId);
      }, 520);
    });
    card.addEventListener("pointermove", (event) => {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 10) cancelPress();
    });
    card.addEventListener("pointerup", cancelPress);
    card.addEventListener("pointercancel", cancelPress);
    card.addEventListener("pointerleave", cancelPress);
    card.addEventListener("click", (event) => {
      if (longPressTriggered) {
        event.preventDefault();
        event.stopPropagation();
        longPressTriggered = false;
        return;
      }
      if (selectable) toggleSelection(itemId);
      else openItemPreview(itemId);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !selectable) {
        event.preventDefault();
        openItemPreview(itemId);
      } else if ((event.key === "Enter" || event.key === " ") && selectable) {
        event.preventDefault();
        toggleSelection(itemId);
      }
    });
  });
}

function openItemPreview(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  if (!item) return;
  const isStudentItem = state.role === "student" && item.ownerId === "anna";
  const label = visibleItemLabel(item);
  const recipe = normalizeRecipe(item.recipe);
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head preview-modal-head">
      <div>
        <p class="eyebrow">${isStudentItem ? "Twój wyrób" : `Wyrób ${itemCode(item)}`}</p>
        <h2 id="modal-title">${label}</h2>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="item-preview-photo firing-${item.firing}">
      <img src="${item.image}" alt="${label}, wyrób: ${item.owner}" />
      <span class="preview-firing-badge ${item.firing}">${firingLabel(item.firing)}</span>
    </div>
    <div class="item-preview-details">
      ${
        isStudentItem
          ? `<div class="student-item-intro">
               <strong>Historia tej konkretnej rzeczy</strong>
               <span>${item.group} · numer pomocniczy pracowni ${itemCode(item)}</span>
             </div>`
          : `<div class="preview-owner">
               <span class="avatar">${item.owner
                 .split(" ")
                 .map((part) => part[0])
                 .join("")}</span>
               <div><strong>${item.owner}</strong><small>${item.group}</small></div>
             </div>`
      }
      <div class="preview-facts">
        <div><small>Status</small><strong>${statusLabel(item.status)}</strong></div>
        <div><small>Wypał</small><strong>${firingLabel(item.firing)}</strong></div>
        <div><small>Przyniesiono</small><strong>${formatDate(item.date)}</strong></div>
      </div>
      ${recipeSummary(item)}
    </div>
    <div class="modal-foot preview-modal-foot">
      <button class="secondary-button close-modal" type="button">Zamknij podgląd</button>
      ${isStudentItem ? '<button class="primary-button" id="edit-recipe" type="button">Edytuj notatkę zdobienia</button>' : ""}
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("#edit-recipe")?.addEventListener("click", () => openRecipeEditor(itemId));
  openModal();
}

function recipeSummary(item) {
  const recipe = normalizeRecipe(item.recipe);
  const hasRecipe =
    recipeCategories.some((category) => recipe[category.id].length) || recipe.note.trim();
  return `
    <section class="recipe-summary ${hasRecipe ? "" : "empty"}">
      <div class="recipe-summary-head">
        <div>
          <small>Osobisty katalog</small>
          <h3>Notatka zdobienia</h3>
        </div>
        ${hasRecipe ? '<span class="recipe-saved">Zapisana</span>' : ""}
      </div>
      ${
        hasRecipe
          ? `<div class="recipe-summary-groups">
              ${recipeCategories
                .map(
                  (category) => `
                    <div>
                      <small>${category.label}</small>
                      <p>${recipe[category.id].length ? recipe[category.id].map((value) => `<span>${escapeHtml(value)}</span>`).join("") : "<em>Nie zapisano</em>"}</p>
                    </div>`,
                )
                .join("")}
            </div>
            ${recipe.note ? `<blockquote>${escapeHtml(recipe.note)}</blockquote>` : ""}`
          : `<p>Dodaj glinę, szkliwa, farby i temperaturę. Przy następnym wyrobie łatwo odnajdziesz sprawdzoną kombinację.</p>`
      }
    </section>
  `;
}

function openRecipeEditor(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  if (!item) return;
  recipeDraft = {
    itemId,
    ...structuredClone(normalizeRecipe(item.recipe)),
  };
  renderRecipeEditor();
}

function renderRecipeEditor() {
  const item = state.items.find((candidate) => candidate.id === recipeDraft?.itemId);
  if (!item || !recipeDraft) return;
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head">
      <div>
        <p class="eyebrow">Osobisty katalog</p>
        <h2 id="modal-title">Jak powstał ten wyrób?</h2>
        <p>Wybierz fasolki. Wszystkie pola są opcjonalne.</p>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body recipe-editor">
      <div class="recipe-item-strip">
        <img src="${item.image}" alt="" />
        <div><strong>${studentItemLabel(item)}</strong><span>${formatFullDate(item.date)}</span></div>
      </div>
      ${recipeCategories.map(recipeCategoryEditor).join("")}
      <label class="recipe-note-field">
        <span>Krótka notatka</span>
        <textarea id="recipe-note" rows="3" placeholder="np. 3 cienkie warstwy, nakładane pędzlem">${escapeHtml(recipeDraft.note)}</textarea>
      </label>
    </div>
    <div class="modal-foot">
      <button class="secondary-button" id="cancel-recipe" type="button">Anuluj</button>
      <button class="primary-button" id="save-recipe" type="button">Zapisz notatkę</button>
    </div>`;

  modal.querySelector(".close-modal").addEventListener("click", () => openItemPreview(item.id));
  modal.querySelector("#cancel-recipe").addEventListener("click", () => openItemPreview(item.id));
  modal.querySelectorAll("[data-recipe-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.recipeCategory;
      const value = button.dataset.recipeOption;
      const config = recipeCategories.find((candidate) => candidate.id === category);
      const selected = recipeDraft[category].includes(value);
      recipeDraft[category] = selected
        ? recipeDraft[category].filter((candidate) => candidate !== value)
        : config.multiple
          ? [...recipeDraft[category], value]
          : [value];
      recipeDraft.note = modal.querySelector("#recipe-note").value;
      renderRecipeEditor();
    });
  });
  modal.querySelectorAll("[data-add-custom]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.addCustom;
      const input = modal.querySelector(`[data-custom-input="${category}"]`);
      const value = input.value.trim();
      if (!value) return;
      const config = recipeCategories.find((candidate) => candidate.id === category);
      if (!state.customMaterialOptions[category].includes(value)) {
        state.customMaterialOptions[category].push(value);
      }
      recipeDraft[category] = config.multiple
        ? [...new Set([...recipeDraft[category], value])]
        : [value];
      recipeDraft.note = modal.querySelector("#recipe-note").value;
      saveState();
      renderRecipeEditor();
    });
  });
  modal.querySelector("#save-recipe").addEventListener("click", () => {
    const note = modal.querySelector("#recipe-note").value.trim();
    state.items = state.items.map((candidate) =>
      candidate.id === item.id
        ? {
            ...candidate,
            recipe: {
              clay: recipeDraft.clay,
              glazes: recipeDraft.glazes,
              paints: recipeDraft.paints,
              temperature: recipeDraft.temperature,
              note,
            },
          }
        : candidate,
    );
    saveState();
    openItemPreview(item.id);
    showToast("Notatka zdobienia została zapisana.");
  });
}

function recipeCategoryEditor(category) {
  const options = [
    ...materialOptions[category.id],
    ...(state.customMaterialOptions?.[category.id] || []),
  ];
  return `
    <fieldset class="recipe-category">
      <legend>${category.label}<small>${category.multiple ? "Możesz wybrać kilka" : "Wybierz jedną"}</small></legend>
      <div class="recipe-chip-list">
        ${[...new Set(options)]
          .map(
            (option) =>
              `<button class="recipe-chip ${recipeDraft[category.id].includes(option) ? "active" : ""}" data-recipe-category="${category.id}" data-recipe-option="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`,
          )
          .join("")}
      </div>
      <div class="custom-chip-row">
        <input class="input" data-custom-input="${category.id}" type="text" placeholder="Dodaj własną fasolkę" />
        <button class="secondary-button" data-add-custom="${category.id}" type="button">Dodaj</button>
      </div>
    </fieldset>
  `;
}

function openGlazePreview(glazeId) {
  const glaze = initialGlazes.find((candidate) => candidate.id === glazeId);
  if (!glaze) return;
  const examples = state.items.filter((item) =>
    normalizeRecipe(item.recipe).glazes.includes(glaze.name),
  );
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head glaze-modal-head">
      <div>
        <p class="eyebrow">${glaze.maker} · ${glaze.code}</p>
        <h2 id="modal-title">${glaze.name}</h2>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="glaze-detail-hero">
      <img src="${glaze.image}" alt="Przykład szkliwa ${glaze.name}" />
      <span class="glaze-detail-swatch" style="--swatch: ${glaze.color}"></span>
    </div>
    <div class="modal-body glaze-detail-body">
      <p class="glaze-detail-description">${glaze.description}</p>
      <div class="glaze-detail-facts">
        <div><small>Wykończenie</small><strong>${glaze.finish}</strong></div>
        <div><small>Temperatura</small><strong>${glaze.temperature}</strong></div>
        <div><small>Sprawdzone gliny</small><strong>${glaze.clays.join(", ")}</strong></div>
      </div>
      <div class="catalog-notice compact">
        <strong>Wskazówka pracowni</strong>
        <span>${glaze.notes}</span>
      </div>
      <section class="glaze-examples">
        <div>
          <small>Z doświadczeń pracowni</small>
          <h3>Wyroby z tym szkliwem</h3>
        </div>
        ${
          examples.length
            ? `<div class="glaze-example-row">${examples
                .map(
                  (item) =>
                    `<img src="${item.image}" alt="${studentItemLabel(item)}" title="${studentItemLabel(item)}" />`,
                )
                .join("")}</div>`
            : "<p>Pierwsze przykłady pojawią się po zapisaniu szkliwa przy wyrobie.</p>"
        }
      </section>
    </div>
    <div class="modal-foot preview-modal-foot">
      <button class="primary-button close-modal" type="button">Wróć do katalogu</button>
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  openModal();
}

function toggleSelection(id) {
  state.selected = state.selected.includes(id)
    ? state.selected.filter((itemId) => itemId !== id)
    : [...state.selected, id];
  saveState();
  render();
}

function openAddFlow() {
  addFlow = {
    step: 1,
    photos: [],
  };
  renderAddFlow();
  openModal();
}

function renderAddFlow() {
  const modal = document.querySelector("#modal");
  const titles = [
    "Dodaj zdjęcia wyrobów",
    "Zaznacz wyroby na ostro",
  ];
  modal.innerHTML = `
    <div class="modal-head">
      <div>
        <h2 id="modal-title">${titles[addFlow.step - 1]}</h2>
        <p>${addFlowStepDescription()}</p>
        <div class="steps" aria-label="Krok ${addFlow.step} z 2">
          ${[1, 2].map((step) => `<span class="step-dot ${step <= addFlow.step ? "active" : ""}"></span>`).join("")}
        </div>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body">${addFlowBody()}</div>
    <div class="modal-foot">
      ${addFlow.step > 1 ? '<button class="secondary-button" id="add-back" type="button">Wstecz</button>' : "<span></span>"}
      ${
        addFlow.step === 1
          ? `<button class="primary-button" id="add-next" type="button" ${addFlow.photos.length ? "" : "disabled"}>Dodałem już wszystkie zdjęcia</button>`
          : ""
      }
      ${addFlow.step === 2 ? '<button class="primary-button" id="confirm-add" type="button">Dodaj wyroby do pracowni</button>' : ""}
    </div>
  `;

  modal.querySelector(".close-modal").addEventListener("click", closeModal);
  modal.querySelector("#add-back")?.addEventListener("click", () => {
    addFlow.step -= 1;
    renderAddFlow();
  });
  modal.querySelector("#add-next")?.addEventListener("click", () => {
    addFlow.step += 1;
    renderAddFlow();
  });
  modal.querySelector("#confirm-add")?.addEventListener("click", confirmNewItems);
  modal.querySelector("#all-glaze")?.addEventListener("click", () => {
    const shouldSelectAll = !addFlow.photos.every((photo) => photo.firing === "glaze");
    addFlow.photos.forEach((photo) => {
      photo.firing = shouldSelectAll ? "glaze" : "bisque";
    });
    renderAddFlow();
  });

  modal.querySelectorAll("[data-toggle-firing]").forEach((button) => {
    const toggleFiring = () => {
      const photo = addFlow.photos.find((item) => item.id === button.dataset.toggleFiring);
      photo.firing = photo.firing === "bisque" ? "glaze" : "bisque";
      renderAddFlow();
    };
    button.addEventListener("click", toggleFiring);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFiring();
      }
    });
  });

  modal.querySelector("#upload-zone")?.addEventListener("click", () => {
    document.querySelector("#photo-input").click();
  });

  modal.querySelectorAll("[data-demo-image]").forEach((button) => {
    button.addEventListener("click", () => {
      addPhoto(button.dataset.demoImage);
      renderAddFlow();
    });
  });

  modal.querySelectorAll("[data-remove-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      addFlow.photos = addFlow.photos.filter((photo) => photo.id !== button.dataset.removePhoto);
      renderAddFlow();
    });
  });

}

function addFlowStepDescription() {
  if (addFlow.step === 1) return "Dodaj po jednym wyraźnym zdjęciu każdej sztuki.";
  return "Domyślnie wszystkie sztuki są oznaczone jako biskwit.";
}

function addFlowBody() {
  if (addFlow.step === 1) {
    return `
      <button class="upload-zone" id="upload-zone" type="button">
        <span>
          <span class="camera-symbol">${icons.camera}</span>
          <strong>Zrób lub dodaj zdjęcie</strong>
          <small>Jeżeli Ty nie poznajesz swojego wyrobu na zdjęciu, my też go później nie poznamy.</small>
        </span>
      </button>
      <p class="demo-label">W wersji demonstracyjnej dodaj przykładowy wyrób:</p>
      <div class="demo-photo-row">
        ${[
          ["wazon", "Wazon"],
          ["kubek", "Kubek"],
          ["miska", "Miska"],
          ["talerz", "Talerz"],
        ]
          .map(
            ([file, name]) =>
              `<button class="demo-photo" data-demo-image="assets/${file}.webp" data-demo-name="${name}" type="button" aria-label="Dodaj zdjęcie: ${file}"><img src="assets/${file}.webp" alt="" /></button>`,
          )
          .join("")}
      </div>
      ${
        addFlow.photos.length
          ? `
            <div class="recognition-note">
              <strong>Jeżeli Ty nie poznajesz swojego wyrobu na zdjęciu, my też go później nie poznamy.</strong>
              <p>Sprawdź podgląd. Usuń nieczytelne zdjęcie krzyżykiem i od razu dodaj nowe.</p>
            </div>
            <div class="photo-section-head"><strong>Dodane zdjęcia</strong><span>${addFlow.photos.length} ${pluralPhotos(addFlow.photos.length)}</span></div>
            ${photoGrid("editing")}
          `
          : ""
      }
    `;
  }

  const glazeCount = addFlow.photos.filter((photo) => photo.firing === "glaze").length;
  const allGlaze = glazeCount === addFlow.photos.length;
  return `
    <div class="firing-instruction">
      <strong>Kliknij tylko te wyroby, które mają być wypalone na ostro.</strong>
      <p>Beżowy oznacza biskwit. Po kliknięciu kafelek zmieni kolor i podpis na „Na ostro”.</p>
    </div>
    ${photoGrid("firing")}
    <button class="all-glaze-card ${allGlaze ? "active" : ""}" id="all-glaze" type="button">
      <span class="all-glaze-check" aria-hidden="true">${allGlaze ? "✓" : ""}</span>
      <span>
        <strong>Wszystko jest na ostro</strong>
        <small>${allGlaze ? "Kliknij ponownie, aby przywrócić wszystko do biskwitu." : "Jednym kliknięciem oznacz wszystkie dodane zdjęcia."}</small>
      </span>
    </button>
    <div class="firing-summary">
      <span><i class="summary-dot bisque"></i>Biskwit: <strong>${addFlow.photos.length - glazeCount}</strong></span>
      <span><i class="summary-dot glaze"></i>Na ostro: <strong>${glazeCount}</strong></span>
    </div>
  `;
}

function addPhoto(image) {
  addFlow.photos.push({
    id: `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    image,
    firing: "bisque",
  });
}

function pluralPhotos(count) {
  if (count === 1) return "zdjęcie";
  if (count >= 2 && count <= 4) return "zdjęcia";
  return "zdjęć";
}

function photoGrid(mode) {
  return `
    <div class="flow-photo-grid ${mode === "firing" ? "firing-grid" : ""}">
      ${addFlow.photos
        .map(
          (photo, index) => `
            <article
              class="flow-photo-card ${mode === "firing" ? `firing-choice ${photo.firing}` : ""}"
              ${mode === "firing" ? `data-toggle-firing="${photo.id}" role="button" tabindex="0" aria-label="Zmień rodzaj wypału dla zdjęcia ${index + 1}"` : ""}
            >
              <div class="flow-photo-image">
                <img src="${photo.image}" alt="Zdjęcie ${index + 1}" />
                ${mode === "editing" ? `<button class="remove-photo" data-remove-photo="${photo.id}" type="button" aria-label="Usuń zdjęcie ${index + 1}">×</button>` : ""}
              </div>
              <div class="flow-photo-caption">
                <strong class="photo-sequence">${index + 1}</strong>
                ${mode === "firing" ? `<span>${photo.firing === "bisque" ? "Biskwit" : "Na ostro"}</span>` : ""}
              </div>
            </article>`,
        )
        .join("")}
    </div>`;
}

function confirmNewItems() {
  let nextId = Math.max(0, ...state.items.map((item) => item.id)) + 1;
  const newItems = addFlow.photos.map((photo) => {
    const id = nextId++;
    return {
      id,
      code: `MC-${String(id).padStart(4, "0")}`,
      owner: "Anna Kowalska",
      ownerId: "anna",
      image: photo.image,
      status: "waiting",
      firing: photo.firing,
      group: "Dostawa 09.06",
      date: "2026-06-09",
      recipe: normalizeRecipe(),
    };
  });
  state.items.push(...newItems);
  saveState();
  closeModal();
  state.view = "my-items";
  render();
  showToast(`${newItems.length} ${pluralItems(newItems.length)} dodano do jednej dostawy.`);
}

function openFiredConfirmation() {
  const count = state.selected.length;
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head">
      <div><h2 id="modal-title">Potwierdź wypał</h2><p>Ta operacja wyśle powiadomienia kursantom.</p></div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body">
      <div class="confirmation-visual">✓</div>
      <div class="confirmation-copy">
        <h3>${count} ${pluralItems(count)} ${count === 1 ? "został wypalony" : "zostały wypalone"}?</h3>
        <p>Wybrane zdjęcia trafią do sekcji „Gotowe do odbioru”. Każdy właściciel otrzyma informację o swoich wyrobach.</p>
      </div>
    </div>
    <div class="modal-foot">
      <button class="secondary-button close-modal" type="button">Jeszcze nie</button>
      <button class="primary-button" id="confirm-fired" type="button">Tak, potwierdzam wypał</button>
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("#confirm-fired").addEventListener("click", confirmFired);
  openModal();
}

function confirmFired() {
  const count = state.selected.length;
  state.items = state.items.map((item) =>
    state.selected.includes(item.id)
      ? { ...item, status: "ready", firedAt: "2026-06-09" }
      : item,
  );
  state.selected = [];
  saveState();
  closeModal();
  render();
  showToast(`${count} ${pluralItems(count)} oznaczono jako wypalone. Powiadomienia są gotowe.`);
}

function updatePrice() {
  const bisque = Number(document.querySelector("#bisque-weight")?.value || 0);
  const glaze = Number(document.querySelector("#glaze-weight")?.value || 0);
  document.querySelector("#bisque-price").textContent = formatMoney(bisque * 28);
  document.querySelector("#glaze-price").textContent = formatMoney(glaze * 45);
  document.querySelector("#total-price").textContent = formatMoney(bisque * 28 + glaze * 45);
}

function saveSettlement() {
  const owner = document.querySelector("#settlement-client").value;
  const bisque = Number(document.querySelector("#bisque-weight").value || 0);
  const glaze = Number(document.querySelector("#glaze-weight").value || 0);
  const total = bisque * 28 + glaze * 45;
  if (!total) {
    showToast("Najpierw wpisz wagę ceramiki.");
    return;
  }
  state.payments.unshift({
    id: Date.now(),
    owner,
    date: "2026-06-09",
    bisque,
    glaze,
    total,
  });
  saveState();
  render();
  showToast(`Rozliczenie ${formatMoney(total)} zostało zapisane.`);
}

function formatMoney(value) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);
}

function openModal() {
  document.querySelector("#modal-backdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.querySelector("#modal-backdrop").classList.add("hidden");
  document.body.style.overflow = "";
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove("hidden");
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3400);
}

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    state.role = button.dataset.role;
    state.view = state.role === "student" ? "home" : "gallery";
    state.selected = [];
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(initialState);
  render();
  showToast("Dane demonstracyjne zostały przywrócone.");
});

document.querySelector("#modal-backdrop").addEventListener("click", (event) => {
  if (event.target.id === "modal-backdrop") closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.querySelector("#photo-input").addEventListener("change", (event) => {
  const files = [...event.target.files];
  if (!files.length) return;
  let loaded = 0;
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      addPhoto(reader.result);
      loaded += 1;
      if (loaded === files.length) renderAddFlow();
    };
    reader.readAsDataURL(file);
  });
  event.target.value = "";
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

render();
