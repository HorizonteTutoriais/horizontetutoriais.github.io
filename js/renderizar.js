// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps e jogos

function renderizarAtualizacoes() {
  const container = document.querySelector('.updates-grid');
  if (!container) return;

  container.innerHTML = '';
  
  // Adiciona aplicativos
  APPS_DATA.aplicativos.forEach(app => {
    const card = document.createElement('div');
    card.className = 'update-card';
    card.setAttribute('data-app-name', app.nome);
    card.setAttribute('data-app-url', app.url);
    card.innerHTML = `
      <img src="${app.imagemGrande}" alt="${app.nome}" />
      <div class="card-title">${app.nome} (${app.descricao})</div>
      <a href="${app.url}" class="btn-download">Download</a>
    `;
    container.appendChild(card);
  });

  // Adiciona jogos
  APPS_DATA.jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'update-card';
    card.setAttribute('data-app-name', jogo.nome);
    card.setAttribute('data-app-url', jogo.url);
    card.innerHTML = `
      <img src="${jogo.imagemGrande}" alt="${jogo.nome}" />
      <div class="card-title">${jogo.nome}</div>
      <a href="${jogo.url}" class="btn-download">Download</a>
    `;
    container.appendChild(card);
  });
}

function renderizarDestaques() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  // Encontra o título
  const titulo = container.querySelector('.section-title');
  if (!titulo) return;

  // Remove itens antigos (mantém o título)
  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  // Adiciona aplicativos
  APPS_DATA.aplicativos.forEach(app => {
    const item = document.createElement('div');
    item.className = 'post-list-item';
    item.setAttribute('data-app-name', app.nome);
    item.setAttribute('data-app-url', app.url);
    item.innerHTML = `
      <img src="${app.imagem}" alt="${app.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${app.url}">${app.nome} (${app.descricao})</a></div>
        <div class="post-cat"><a href="pages/aplicativos.html">${app.categoria}</a></div>
        <a href="${app.url}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(item);
  });

  // Adiciona jogos
  APPS_DATA.jogos.forEach(jogo => {
    const item = document.createElement('div');
    item.className = 'post-list-item';
    item.setAttribute('data-app-name', jogo.nome);
    item.setAttribute('data-app-url', jogo.url);
    item.innerHTML = `
      <img src="${jogo.imagem}" alt="${jogo.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${jogo.url}">${jogo.nome}</a></div>
        <div class="post-cat"><a href="pages/jogos.html">${jogo.categoria}</a></div>
        <a href="${jogo.url}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderizarPaginaAplicativos() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  // Encontra o título
  const titulo = container.querySelector('.section-title');
  if (!titulo) return;

  // Remove itens antigos
  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  // Adiciona apenas aplicativos
  APPS_DATA.aplicativos.forEach(app => {
    const item = document.createElement('div');
    item.className = 'post-list-item';
    item.innerHTML = `
      <img src="${app.imagem}" alt="${app.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${app.url}">${app.nome} (${app.descricao})</a></div>
        <div class="post-cat"><a href="aplicativos.html">${app.categoria}</a> · <span style="color:#e53935;font-weight:700">${app.quente ? 'Quente' : ''}</span></div>
        <a href="${app.url}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderizarPaginaJogos() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  container.innerHTML = '';

  // Adiciona apenas jogos
  APPS_DATA.jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <div class="app-card-title"><a href="${jogo.url}">${jogo.nome}</a></div>
      <div class="app-card-cat"><span>${jogo.quente ? 'Quente' : ''}</span> · ${jogo.descricao}</div>
      <a href="${jogo.url}" class="btn-download-sm">Download</a>
    `;
    container.appendChild(card);
  });
}

function renderizarSidebar() {
  const container = document.querySelector('.sidebar-widget:nth-of-type(2)');
  if (!container) return;

  // Encontra o título
  const titulo = container.querySelector('.widget-title');
  if (!titulo) return;

  // Remove itens antigos
  const itensAntigos = container.querySelectorAll('.sidebar-post');
  itensAntigos.forEach(item => item.remove());

  // Adiciona aplicativos
  APPS_DATA.aplicativos.forEach(app => {
    const item = document.createElement('div');
    item.className = 'sidebar-post';
    item.innerHTML = `
      <img src="${app.imagem}" alt="${app.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${app.url}">${app.nome}</a></div>
        <div class="sp-cat">${app.categoria}</div>
      </div>
    `;
    container.appendChild(item);
  });

  // Adiciona jogos
  APPS_DATA.jogos.forEach(jogo => {
    const item = document.createElement('div');
    item.className = 'sidebar-post';
    item.innerHTML = `
      <img src="${jogo.imagem}" alt="${jogo.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${jogo.url}">${jogo.nome}</a></div>
        <div class="sp-cat">${jogo.categoria}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// ===== INICIALIZA RENDERIZAÇÃO QUANDO A PÁGINA CARREGA =====
document.addEventListener('DOMContentLoaded', function() {
  // Detecta qual página está sendo exibida e renderiza o conteúdo apropriado
  const pagina = window.location.pathname;

  if (pagina.includes('index.html') || pagina.endsWith('/')) {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
  } else if (pagina.includes('aplicativos.html')) {
    renderizarPaginaAplicativos();
  } else if (pagina.includes('jogos.html')) {
    renderizarPaginaJogos();
  }
});
