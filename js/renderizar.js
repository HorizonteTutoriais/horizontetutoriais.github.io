here// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps e jogos

function obterPrefixoCaminho() {
  const path = window.location.pathname;
  
  // Se estiver em um post (posts/aplicativos/ ou posts/jogos/), precisa subir 2 níveis
  if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) {
    return '../../';
  }
  
  // Se estiver em uma subpasta de pages/, sobe 1 nível
  if (path.includes('/pages/')) {
    return '../';
  }
  
  // Raiz do site
  return '';
}

function renderizarAtualizacoes() {
  const container = document.querySelector('.updates-grid');
  if (!container) return;

  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  // Renderiza aplicativos
  if (APPS_DATA.aplicativos) {
    APPS_DATA.aplicativos.forEach(app => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.innerHTML = `
        <img src="${app.imagemGrande}" alt="${app.nome}" />
        <div class="card-title">${app.nome} (${app.descricao})</div>
        <a href="${prefixo}${app.url}" class="btn-download">Download</a>
      `;
      container.appendChild(card);
    });
  }

  // Renderiza jogos
  if (APPS_DATA.jogos) {
    APPS_DATA.jogos.forEach(jogo => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.innerHTML = `
        <img src="${jogo.imagemGrande}" alt="${jogo.nome}" />
        <div class="card-title">${jogo.nome}</div>
        <a href="${prefixo}${jogo.url}" class="btn-download">Download</a>
      `;
      container.appendChild(card);
    });
  }
}

function renderizarDestaques() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) return;

  const prefixo = obterPrefixoCaminho();
  
  // Limpa itens antigos mas mantém o título
  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  // Aplicativos
  if (APPS_DATA.aplicativos) {
    APPS_DATA.aplicativos.forEach(app => {
      const item = document.createElement('div');
      item.className = 'post-list-item';
      item.innerHTML = `
        <img src="${app.imagem}" alt="${app.nome}" />
        <div class="post-list-info">
          <div class="post-title"><a href="${prefixo}${app.url}">${app.nome} (${app.descricao})</a></div>
          <div class="post-cat"><a href="${prefixo}pages/aplicativos.html">${app.categoria}</a></div>
          <a href="${prefixo}${app.url}" class="btn-download-sm">Download</a>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // Jogos
  if (APPS_DATA.jogos) {
    APPS_DATA.jogos.forEach(jogo => {
      const item = document.createElement('div');
      item.className = 'post-list-item';
      item.innerHTML = `
        <img src="${jogo.imagem}" alt="${jogo.nome}" />
        <div class="post-list-info">
          <div class="post-title"><a href="${prefixo}${jogo.url}">${jogo.nome}</a></div>
          <div class="post-cat"><a href="${prefixo}pages/jogos.html">${jogo.categoria}</a></div>
          <a href="${prefixo}${jogo.url}" class="btn-download-sm">Download</a>
        </div>
      `;
      container.appendChild(item);
    });
  }
}

function renderizarSidebar() {
  const widgets = document.querySelectorAll('.sidebar-widget');
  let container = null;

  widgets.forEach(w => {
    const h3 = w.querySelector('h3');
    if (h3 && (h3.innerText.includes('Populares') || h3.innerText.includes('Quente'))) {
      container = w;
    }
  });

  if (!container || typeof APPS_DATA === 'undefined') return;

  const prefixo = obterPrefixoCaminho();
  const itensAntigos = container.querySelectorAll('.sidebar-post');
  itensAntigos.forEach(item => item.remove());

  [...APPS_DATA.aplicativos, ...APPS_DATA.jogos].forEach(item => {
    const div = document.createElement('div');
    div.className = 'sidebar-post';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${prefixo}${item.url}">${item.nome}</a></div>
        <div class="sp-cat">${item.categoria}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderizarPaginas() {
  const path = window.location.pathname;
  
  if (path.includes('aplicativos.html')) {
    const container = document.querySelector('.popular-section');
    if (!container || !APPS_DATA.aplicativos) return;
    const itensAntigos = container.querySelectorAll('.post-list-item');
    itensAntigos.forEach(item => item.remove());
    APPS_DATA.aplicativos.forEach(app => {
      const div = document.createElement('div');
      div.className = 'post-list-item';
      div.innerHTML = `
        <img src="${app.imagem}" alt="${app.nome}" />
        <div class="post-list-info">
          <div class="post-title"><a href="../${app.url}">${app.nome} (${app.descricao})</a></div>
          <div class="post-cat"><span>${app.quente ? 'Quente' : ''}</span> · ${app.categoria}</div>
          <a href="../${app.url}" class="btn-download-sm">Download</a>
        </div>
      `;
      container.appendChild(div);
    });
  }

  if (path.includes('jogos.html')) {
    const container = document.querySelector('.apps-grid');
    if (!container || !APPS_DATA.jogos) return;
    container.innerHTML = '';
    APPS_DATA.jogos.forEach(jogo => {
      const div = document.createElement('div');
      div.className = 'app-card';
      div.innerHTML = `
        <div class="app-card-title"><a href="../${jogo.url}">${jogo.nome}</a></div>
        <div class="app-card-cat"><span>${jogo.quente ? 'Quente' : ''}</span> · ${jogo.descricao}</div>
        <a href="../${jogo.url}" class="btn-download-sm">Download</a>
      `;
      container.appendChild(div);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
    renderizarPaginas();
  }, 300);
});
