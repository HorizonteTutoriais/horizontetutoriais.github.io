// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps e jogos

function obterPrefixoCaminho() {
  // Se estiver na pasta "pages", precisa subir um nível (../) para chegar na raiz
  // Se estiver no Index (raiz), não precisa de prefixo
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '../';
  }
  // Para a pasta "Index com Cusdis", também precisa subir um nível
  if (path.includes('/Index com Cusdis/')) {
    return '../';
  }
  return '';
}

function renderizarAtualizacoes() {
  const container = document.querySelector('.updates-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';
  
  // Adiciona aplicativos
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

  // Adiciona jogos
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

function renderizarDestaques() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  const titulo = container.querySelector('.section-title');
  if (!titulo) return;

  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  // Adiciona aplicativos
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

  // Adiciona jogos
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

function renderizarPaginaAplicativos() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  const titulo = container.querySelector('.section-title');
  if (!titulo) return;

  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  APPS_DATA.aplicativos.forEach(app => {
    const item = document.createElement('div');
    item.className = 'post-list-item';
    item.innerHTML = `
      <img src="${app.imagem}" alt="${app.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${prefixo}${app.url}">${app.nome} (${app.descricao})</a></div>
        <div class="post-cat"><a href="aplicativos.html">${app.categoria}</a> · <span style="color:#e53935;font-weight:700">${app.quente ? 'Quente' : ''}</span></div>
        <a href="${prefixo}${app.url}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderizarPaginaJogos() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  APPS_DATA.jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <div class="app-card-title"><a href="${prefixo}${jogo.url}">${jogo.nome}</a></div>
      <div class="app-card-cat"><span>${jogo.quente ? 'Quente' : ''}</span> · ${jogo.descricao}</div>
      <a href="${prefixo}${jogo.url}" class="btn-download-sm">Download</a>
    `;
    container.appendChild(card);
  });
}

function renderizarSidebar() {
  const container = document.querySelector('.sidebar-widget:nth-of-type(2)');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  const titulo = container.querySelector('.widget-title');
  if (!titulo) return;

  const itensAntigos = container.querySelectorAll('.sidebar-post');
  itensAntigos.forEach(item => item.remove());

  APPS_DATA.aplicativos.forEach(app => {
    const item = document.createElement('div');
    item.className = 'sidebar-post';
    item.innerHTML = `
      <img src="${app.imagem}" alt="${app.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${prefixo}${app.url}">${app.nome}</a></div>
        <div class="sp-cat">${app.categoria}</div>
      </div>
    `;
    container.appendChild(item);
  });

  APPS_DATA.jogos.forEach(jogo => {
    const item = document.createElement('div');
    item.className = 'sidebar-post';
    item.innerHTML = `
      <img src="${jogo.imagem}" alt="${jogo.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${prefixo}${jogo.url}">${jogo.nome}</a></div>
        <div class="sp-cat">${jogo.categoria}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;

  if (path.includes('index.html') || path.endsWith('/') || path.includes('INDEX_FINAL_TRADUCAO_COMPLETA.html')) {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
  } else if (path.includes('aplicativos.html')) {
    renderizarPaginaAplicativos();
    renderizarSidebar();
  } else if (path.includes('jogos.html')) {
    renderizarPaginaJogos();
    renderizarSidebar();
  }
});
