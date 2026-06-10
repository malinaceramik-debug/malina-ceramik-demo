const STORAGE_KEY = "malina-ceramik-pwa-demo-v2";

const icons = {
  home: `<svg viewBox="0 0 24 24"><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/></svg>`,
  archive: `<svg viewBox="0 0 24 24"><path d="M4 7h16v13H4z"/><path d="M3 4h18v3H3z"/><path d="M9 11h6"/></svg>`,
  money: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6v1M17 15h1v-1"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-5 3-8 7-8s7 3 7 8"/><path d="M16 4a4 4 0 0 1 0 8M17 14c3 .7 5 3 5 7"/></svg>`,
  camera: `<svg viewBox="0 0 24 24"><path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/></svg>`,
};

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
  },
];

const initialState = {
  role: "student",
  view: "home",
  studentFilter: "all",
  instructorStatus: "all",
  instructorFiring: "all",
  search: "",
  selected: [],
  items: initialItems,
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
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(initialState);
    const items = (saved.items || initialItems).map((item) => {
      const normalized = {
        ...item,
        code: item.code || `MC-${String(item.id).padStart(4, "0")}`,
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

function icon(name) {
  return `<span class="nav-icon" aria-hidden="true">${icons[name] || icons.home}</span>`;
}

function navItems() {
  if (state.role === "student") {
    return [
      { id: "home", label: "Początek", icon: "home" },
      { id: "my-items", label: "Moje wyroby", icon: "gallery" },
      { id: "history", label: "Historia", icon: "archive" },
      { id: "notifications", label: "Powiadomienia", icon: "bell" },
    ];
  }
  return [
    { id: "gallery", label: "Do wypału", icon: "gallery" },
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
    else if (state.view === "history") content.innerHTML = studentHistory();
    else content.innerHTML = notificationsView();
  } else {
    if (state.view === "gallery") content.innerHTML = instructorGallery();
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

      <article class="tip-card">
        <div class="tip-photo" aria-hidden="true">
          <img src="assets/malina-kiln.webp" alt="" />
          <span>Prosto z pieca</span>
        </div>
        <div>
          <h3>Jedna prosta zasada</h3>
          <p>Na zdjęciu powinien być jeden cały wyrób. Jeśli Ty go rozpoznajesz, instruktor też sobie poradzi.</p>
        </div>
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
      ${statCard("Czeka na wypał", waiting, "waiting")}
      ${statCard("Gotowe do odbioru", ready, "ready")}
      ${statCard("Odebrane", collected, "archived")}
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
  `;
}

function statCard(label, count, status) {
  return `
    <article class="stat-card">
      <div class="stat-card-top">
        <span>${label}</span>
        <i class="mini-status ${status}" aria-hidden="true"></i>
      </div>
      <strong>${count}</strong>
    </article>`;
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
  const label = itemLabel(item);
  return `
    <article class="item-card firing-${item.firing} ${selected ? "selected" : ""}" data-item-id="${item.id}" ${selectable ? 'role="button" tabindex="0" aria-label="Zaznacz wyrób"' : ""}>
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
            <p>${firingLabel(item.firing)} · ${formatDate(item.date)}</p>
          </div>
        </div>
        <div class="item-meta">
          <span class="owner-pill">${item.owner}</span>
          <span class="group-pill">${item.group}</span>
        </div>
      </div>
    </article>
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

  document.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentFilter = button.dataset.studentFilter;
      saveState();
      render();
    });
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
    const selectable = card.getAttribute("role") === "button";
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
  const label = itemLabel(item);
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head preview-modal-head">
      <div>
        <p class="eyebrow">Podgląd wyrobu</p>
        <h2 id="modal-title">${label}</h2>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="item-preview-photo firing-${item.firing}">
      <img src="${item.image}" alt="${label}, wyrób: ${item.owner}" />
      <span class="preview-firing-badge ${item.firing}">${firingLabel(item.firing)}</span>
    </div>
    <div class="item-preview-details">
      <div class="preview-owner">
        <span class="avatar">${item.owner
          .split(" ")
          .map((part) => part[0])
          .join("")}</span>
        <div><strong>${item.owner}</strong><small>${item.group}</small></div>
      </div>
      <div class="preview-facts">
        <div><small>Status</small><strong>${statusLabel(item.status)}</strong></div>
        <div><small>Wypał</small><strong>${firingLabel(item.firing)}</strong></div>
        <div><small>Przyniesiono</small><strong>${formatDate(item.date)}</strong></div>
      </div>
    </div>
    <div class="modal-foot preview-modal-foot">
      <button class="secondary-button close-modal" type="button">Zamknij podgląd</button>
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
          <small>Po każdym zdjęciu możesz od razu dodać następne. Nie musisz jeszcze wybierać rodzaju wypału.</small>
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
