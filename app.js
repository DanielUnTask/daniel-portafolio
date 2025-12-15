// Static state (sin edición / sin export/import)
const uuid = () => (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;

const ICONS = {
  roblox_logo: "Assets/Icons/roblox-logo.png",
  discord_logo: "Assets/Icons/discord.png",
  twitter_logo: "Assets/Icons/twitter-alt.png"
}

const state = {
  profile: {
    name: 'Daniel',
    years: 6,
    bio: 'Me gusta diseñar interfaces claras y programar sistemas bien estructurados.',
    technologies: ['ProfileStore', 'ProfileService', 'Fusion', 'Promise', 'Knit Framework', 'ReplicaService']
  },
  contacts: [
    { type: 'link', label: 'Roblox', url: 'https://www.roblox.com/users/1235531176/profile', note: 'Mi perfil de Roblox.' },
    { type: 'link', label: 'X', url: 'https://x.com/Daniel__ec', note: 'Mi Perfil de X.' },
    { type: 'discord', label: 'Discord', username: 'daniel_ec2', note: 'Mi usuario de discord.' }
  ],
  works: [
    {
      id: uuid(),
      type: 'image',
      title: 'UI — Settings',
      description: 'Interfaz de configuración indie, diseñada para adaptarse dinámicamente al contenido mediante scroll automático y totalmente responsive.',
      tags: ['UI', 'Settings', 'Responsive', 'Scroll Dinámico', 'Indie'],
      mediaUrl: 'Assets/Images/ardan-studios-settings-ui.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10
    },
    {
      id: uuid(),
      type: 'image',
      title: 'UI — PlayerList',
      description: 'UI de PlayerList por equipos con agrupación dinámica de jugadores, scroll automático basado en contenido y layout adaptable a cualquier resolución.',
      tags: ['UI', 'PlayerList', 'Teams', 'Responsive', 'Scroll Dinámico'],
      mediaUrl: 'Assets/Images/playerlist-ui.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10
    },
    {
      id: uuid(),
      type: 'image',
      title: 'UI — Quest',
      description: 'Interfaz de misiones estilo indie, totalmente responsive. El sistema de scroll se ajusta dinámicamente al contenido y a la resolución.',
      tags: ['UI', 'Quests', 'Indie', 'Responsive', 'Scroll Dinámico'],
      mediaUrl: 'Assets/Images/menu-quest-arox-ui.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9
    },
    {
      id: uuid(),
      type: 'image',
      title: 'UI — Shop',
      description: 'Interfaz de Tienda estilo Planta vs Brainrot, creado para Steal A Tinaco, adaptable a cualquier resolución.',
      tags: ['UI', 'Shop', 'PvsB', 'SAT', 'Responsive', 'Scroll Dinámico'],
      mediaUrl: 'Assets/Images/sat-ui-shop.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8
    },
    {
      id: uuid(),
      type: 'image',
      title: 'UI — Settings (SAT)',
      description: 'Interfaz de Settings estilo Planta vs Brainrot, creado para Steal A Tinaco, adaptable a cualquier resolución.',
      tags: ['UI', 'Settings', 'PvsB', 'SAT', 'Responsive', 'Scroll Dinámico'],
      mediaUrl: 'Assets/Images/sat-ui-settings.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7
    },
    {
      id: uuid(),
      type: 'image',
      title: 'UI — Menu',
      description: 'Menu estilo Fortnite.',
      tags: ['UI', 'Menu', 'Indie', 'Responsive'],
      mediaUrl: 'Assets/Images/pw-menu-ui.png',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6
    },
    {
      id: uuid(),
      type: 'video',
      title: 'Sistema de rondas',
      description: 'Cree un StateMachine que controla los estados, haciendo posible agrega o eliminar los estados de forma mas facil.',
      tags: ['Rondas', 'Voting System', 'StateMachine'],
      mediaUrl: 'Assets/Videos/pw-round-system.mp4',
      linkUrl: '',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
    }
  ]
};

const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

const PREVIEW_LIMIT = 2;

let currentFilter = 'all';
let modalLockCount = 0;

function lockBody() {
  if (modalLockCount++ === 0) document.body.style.overflow = 'hidden';
}

function unlockBody() {
  modalLockCount = Math.max(0, modalLockCount - 1);
  if (modalLockCount === 0) document.body.style.overflow = '';
}

const techChip = (t) => {
  const span = document.createElement('span');
  span.className = 'rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-xs text-slate-200';
  span.textContent = t;
  return span;
};

function renderProfile() {
  const headerName = $('#headerName');
  if (headerName) {
    headerName.textContent = state.profile.name;
  }

  const heroName = $('#heroName');
  if (heroName) {
    heroName.textContent = state.profile.name;
  }

  const pillYears = $('#pillYears');
  if (pillYears) {
    pillYears.textContent = `+${state.profile.years} años de Experiencia`;
  }

  const heroBio = $('#heroBio');
  if (heroBio) {
    heroBio.textContent = state.profile.bio;
  }

  const tech = state.profile.technologies || [];
  const techWrap = $('#techChips');
  if (techWrap) {
    techWrap.innerHTML = '';
    tech.forEach(t => techWrap.appendChild(techChip(t)));
  }
}


function normalize(s) {
  return (s || '').toString().toLowerCase();
}

function applySearchSort(list, q, sort) {
  let out = [...list];

  if (q) {
    out = out.filter(w => {
      const hay = [w.title, w.description, ...(w.tags || [])].join(' ');
      return normalize(hay).includes(q);
    });
  }

  if (sort === 'newest') out.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  if (sort === 'oldest') out.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  if (sort === 'title') out.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es'));

  return out;
}

function getMainQuerySort() {
  const q = normalize(($('#searchInput').value || '').trim());
  const sort = $('#sortSelect').value;
  return { q, sort };
}

function getWorksByType(type, q, sort) {
  const list = state.works.filter(w => w.type === type);
  return applySearchSort(list, q, sort);
}

function makeCard(work) {
  const card = document.createElement('button');
  card.className = 'group text-left rounded-2xl border border-slate-800/70 bg-slate-950/30 hover:bg-slate-900/30 transition shadow-sm overflow-hidden';
  card.type = 'button';
  card.addEventListener('click', () => openPreview(work.id));

  const top = document.createElement('div');
  top.className = 'relative aspect-video overflow-hidden bg-slate-950/50';

  const badge = document.createElement('div');
  badge.className = 'absolute left-3 top-3 rounded-full border border-slate-700/60 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-200';
  badge.textContent = work.type === 'image' ? 'Imagen' : 'Video';

  const meta = document.createElement('div');
  meta.className = 'absolute right-3 top-3 rounded-full border border-slate-700/60 bg-slate-950/60 px-2 py-1 text-[11px] text-slate-300';
  meta.textContent = (work.tags && work.tags[0]) ? work.tags[0] : 'Trabajo';

  if (work.type === 'image') {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = work.title;
    img.src = work.mediaUrl;
    img.className = 'h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]';
    top.appendChild(img);
  } else {
    const wrap = document.createElement('div');
    wrap.className = 'absolute inset-0 grid place-items-center';
    const play = document.createElement('div');
    play.className = 'rounded-full bg-slate-100/10 px-4 py-2 text-sm text-slate-100 ring-1 ring-white/15';
    play.textContent = 'Ver video';
    wrap.appendChild(play);

    const bg = document.createElement('div');
    bg.className = 'absolute inset-0 bg-gradient-to-br from-slate-900/20 via-indigo-500/10 to-fuchsia-500/10';

    top.appendChild(bg);
    top.appendChild(wrap);
  }

  top.appendChild(badge);
  top.appendChild(meta);

  const body = document.createElement('div');
  body.className = 'p-4';

  const title = document.createElement('div');
  title.className = 'text-sm font-semibold text-slate-100';
  title.textContent = work.title;

  const desc = document.createElement('div');
  desc.className = 'mt-1 text-xs text-slate-400 line-clamp-3';
  desc.textContent = work.description || '';

  const tags = document.createElement('div');
  tags.className = 'mt-3 flex flex-wrap gap-2';
  (work.tags || []).slice(0, 4).forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'rounded-full border border-slate-800/70 bg-slate-950/30 px-2 py-0.5 text-[11px] text-slate-300';
    chip.textContent = t;
    tags.appendChild(chip);
  });

  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(tags);

  card.appendChild(top);
  card.appendChild(body);
  return card;
}

function renderMainWorks() {
  const { q, sort } = getMainQuerySort();
  const images = getWorksByType('image', q, sort);
  const videos = getWorksByType('video', q, sort);

  // Visibilidad de secciones según filtro
  const showImagesSection = currentFilter === 'all' || currentFilter === 'image';
  const showVideosSection = currentFilter === 'all' || currentFilter === 'video';
  $('#imagesSection').classList.toggle('hidden', !showImagesSection);
  $('#videosSection').classList.toggle('hidden', !showVideosSection);

  // Render (solo 2 cards)
  $('#imagesGrid').innerHTML = '';
  $('#videosGrid').innerHTML = '';

  images.slice(0, PREVIEW_LIMIT).forEach(w => $('#imagesGrid').appendChild(makeCard(w)));
  videos.slice(0, PREVIEW_LIMIT).forEach(w => $('#videosGrid').appendChild(makeCard(w)));

  $('#countImages').textContent = `${images.length} item(s)`;
  $('#countVideos').textContent = `${videos.length} item(s)`;

  // Botón mostrar más
  const btnImg = $('#showMoreImages');
  const btnVid = $('#showMoreVideos');

  if (images.length > PREVIEW_LIMIT) {
    btnImg.textContent = `Mostrar más (${images.length})`;
    btnImg.classList.remove('hidden');
  } else {
    btnImg.classList.add('hidden');
  }

  if (videos.length > PREVIEW_LIMIT) {
    btnVid.textContent = `Mostrar más (${videos.length})`;
    btnVid.classList.remove('hidden');
  } else {
    btnVid.classList.add('hidden');
  }

  // Empty states (solo si la sección está visible)
  if (showImagesSection && images.length === 0) {
    const p = document.createElement('div');
    p.className = 'text-sm text-slate-400';
    p.textContent = 'No hay imágenes que coincidan con la búsqueda.';
    $('#imagesGrid').appendChild(p);
  }

  if (showVideosSection && videos.length === 0) {
    const p = document.createElement('div');
    p.className = 'text-sm text-slate-400';
    p.textContent = 'No hay videos que coincidan con la búsqueda.';
    $('#videosGrid').appendChild(p);
  }
}

function renderContacts() {
  const wrap = $('#contactIcons');
  wrap.innerHTML = '';

  state.contacts.forEach(c => {
    const tpl = $('#tpl-contact-icon').content.cloneNode(true);
    const btn = tpl.querySelector('button');
    const img = tpl.querySelector('img');

    if (c.label === 'Roblox') img.src = ICONS.roblox_logo;
    if (c.label === 'X') img.src = ICONS.twitter_logo;
    if (c.label === 'Discord') img.src = ICONS.discord_logo;

    img.alt = c.label;

    // Discord → abre modal
    if (c.type === 'discord') {
      btn.addEventListener('click', () => openDiscordMini(c.username));
    } 
    // Links normales
    else {
      btn.addEventListener('click', () => {
        window.open(c.url, '_blank', 'noreferrer');
      });
    }

    wrap.appendChild(tpl);
  });
}


async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  if (!ok) throw new Error('copy_failed');
}

// Preview modal
function openPreview(id) {
  const w = state.works.find(x => x.id === id);
  if (!w) return;

  $('#previewTitle').textContent = w.title;
  const date = w.createdAt ? new Date(w.createdAt) : null;
  $('#previewMeta').textContent = `${w.type === 'image' ? 'Imagen' : 'Video'}${date ? ' • ' + date.toLocaleDateString('es-ES') : ''}`;
  $('#previewDesc').textContent = w.description || '';

  $('#previewTags').innerHTML = '';
  (w.tags || []).forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-xs text-slate-200';
    chip.textContent = t;
    $('#previewTags').appendChild(chip);
  });

  const media = $('#previewMedia');
  media.innerHTML = '';

  if (w.type === 'image') {
    const img = document.createElement('img');
    img.alt = w.title;
    img.src = w.mediaUrl;
    img.className = 'w-full max-h-[70vh] object-contain bg-black/30';
    media.appendChild(img);
  } else {
    if (/\.mp4(\?|$)/i.test(w.mediaUrl)) {
      const v = document.createElement('video');
      v.src = w.mediaUrl;
      v.controls = true;
      v.playsInline = true;
      v.className = 'w-full max-h-[70vh] bg-black/30';
      media.appendChild(v);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = w.mediaUrl;
      iframe.title = w.title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.className = 'w-full aspect-video';
      media.appendChild(iframe);
    }
  }

  const link = w.linkUrl && w.linkUrl.trim() ? w.linkUrl.trim() : null;
  $('#previewLink').style.display = link ? 'inline-flex' : 'none';
  if (link) $('#previewLink').href = link;

  $('#previewModal').classList.remove('hidden');
  lockBody();
}

function closePreview() {
  $('#previewModal').classList.add('hidden');
  $('#previewMedia').innerHTML = '';
  unlockBody();
}

// Gallery modal (Mostrar más)
function openGalleryModal(type) {
  const title = type === 'image' ? 'Imágenes' : 'Videos';
  $('#galleryModal').dataset.type = type;
  $('#galleryModalTitle').textContent = title;

  // Copia valores actuales de búsqueda/orden al modal
  $('#modalSearchInput').value = ($('#searchInput').value || '');
  $('#modalSortSelect').value = $('#sortSelect').value;

  renderGalleryModal();
  $('#galleryModal').classList.remove('hidden');
  lockBody();
}

function renderGalleryModal() {
  const type = $('#galleryModal').dataset.type;
  const title = type === 'image' ? 'Imágenes' : 'Videos';
  const q = normalize(($('#modalSearchInput').value || '').trim());
  const sort = $('#modalSortSelect').value;

  const list = getWorksByType(type, q, sort);

  $('#galleryModalTitle').textContent = title;
  $('#galleryModalMeta').textContent = `${list.length} item(s)`;

  const grid = $('#galleryModalGrid');
  grid.innerHTML = '';

  if (list.length === 0) {
    const p = document.createElement('div');
    p.className = 'text-sm text-slate-400';
    p.textContent = 'No hay resultados.';
    grid.appendChild(p);
    return;
  }

  list.forEach(w => grid.appendChild(makeCard(w)));
}

function closeGalleryModal() {
  $('#galleryModal').classList.add('hidden');
  $('#galleryModalGrid').innerHTML = '';
  unlockBody();
}

function setFilter(f) {
  currentFilter = f;
  $$('.filterBtn').forEach(btn => {
    const active = btn.dataset.filter === f;
    btn.className = active
      ? 'filterBtn focus-ring rounded-lg bg-slate-100/10 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10 hover:bg-slate-100/15'
      : 'filterBtn focus-ring rounded-lg border border-slate-700/60 bg-slate-900/40 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900/70';
  });
  renderMainWorks();
}

function openDiscordMini(username) {
  const tpl = $('#tpl-discord-mini').content.cloneNode(true);
  const modal = tpl.querySelector('.fixed');
  const input = tpl.querySelector('[data-username]');
  const copyBtn = tpl.querySelector('[data-copy]');
  const closeBtn = tpl.querySelector('[data-close]');
  const status = tpl.querySelector('[data-status]');

  input.value = username;

  copyBtn.addEventListener('click', async () => {
    try {
      await copyToClipboard(username);
      status.textContent = 'Copiado ✔';
    } catch {
      status.textContent = 'Error al copiar';
    }
    setTimeout(() => (status.textContent = ''), 2000);
  });

  closeBtn.addEventListener('click', () => {
    modal.remove();
    unlockBody();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal.firstElementChild) {
      modal.remove();
      unlockBody();
    }
  });

  document.body.appendChild(modal);
  lockBody();
}

function init() {
  renderProfile();
  renderContacts();
  setFilter('all');

  // Main gallery interactions
  $$('.filterBtn').forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
  $('#searchInput').addEventListener('input', renderMainWorks);
  $('#sortSelect').addEventListener('change', renderMainWorks);

  $('#showMoreImages').addEventListener('click', () => openGalleryModal('image'));
  $('#showMoreVideos').addEventListener('click', () => openGalleryModal('video'));

  // Modal search/sort
  $('#modalSearchInput').addEventListener('input', renderGalleryModal);
  $('#modalSortSelect').addEventListener('change', renderGalleryModal);

  // Close handlers (overlay + buttons)
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const closeWhich = t.getAttribute('data-close');
    if (!closeWhich) return;

    if (closeWhich === 'preview' && !$('#previewModal').classList.contains('hidden')) closePreview();
    if (closeWhich === 'gallery' && !$('#galleryModal').classList.contains('hidden')) closeGalleryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    if (!$('#previewModal').classList.contains('hidden')) {
      closePreview();
      return;
    }
    if (!$('#galleryModal').classList.contains('hidden')) {
      closeGalleryModal();
      return;
    }
  });
}

init();