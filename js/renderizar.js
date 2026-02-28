// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps e jogos

function obterPrefixoCaminho() {
  const path = window.location.pathname;
  if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) return '../../';
  if (path.includes('/pages/')) return '../';
  return '';
}

function criarCardApp(app, prefixo) {
  const div = document.createElement('div');
  div.className = 'update-card';
  div.innerHTML = `
    <img src="${app.imagemGrande}" alt="${app.nome}" />
    <div class="card-title">${app.nome} (${app.descricao})</div>
    <a href="${prefixo}${app.url}" class="btn-download">Download</a>
  `;
  return div;
}

function criarCardJogo(jogo, prefixo) {
  const div = document.createElement('div');
  div.className = 'update-card';
  div.innerHTML = `
    <img src="${jogo.imagemGrande}" alt="${jogo.nome}" />
    <div class="card-title">${jogo.nome}</div>
    <a href="${prefixo}${jogo.url}" class="btn-download">Download</a>
  `;
  return div;
}

function criarItemLista(item, prefixo, catUrl) {
  const div = document.createElement('div');
  div.className = 'post-list-item';
  div.innerHTML = `
    <img src="${item.imagem}" alt="${item.nome}" />
    <div class="post-list-info">
      <div class="post-title"><a href="${prefixo}${item.url}">${item.nome} ${item.descricao ? '(' + item.descricao + ')' : ''}</a></div>
      <div class="post-cat"><a href="${prefixo}${catUrl}">${item.categoria}</a></div>
      <a href="${prefixo}${item.url}" class="btn-download-sm">Download</a>
    </div>
  `;
  return div;
}

function renderizarTudo() {
  if (typeof APPS_DATA === 'undefined') return;

  const prefixo = obterPrefixoCaminho();
  
  // 1. Últimas Atualizações (Updates Grid)
  const updatesGrid = document.querySelector('.updates-grid');
  if (updatesGrid) {
    updatesGrid.innerHTML = '';
    if (APPS_DATA.aplicativos) APPS_DATA.aplicativos.forEach(app => updatesGrid.appendChild(criarCardApp(app, prefixo)));
    if (APPS_DATA.jogos) APPS_DATA.jogos.forEach(jogo => updatesGrid.appendChild(criarCardJogo(jogo, prefixo)));
  }

  // 2. Destaques (Popular Section na Home)
  const popularSection = document.querySelector('.popular-section');
  if (popularSection && !window.location.pathname.includes('aplicativos.html')) {
    const itensAntigos = popularSection.querySelectorAll('.post-list-item');
    itensAntigos.forEach(item => item.remove());
    if (APPS_DATA.aplicativos) APPS_DATA.aplicativos.forEach(app => popularSection.appendChild(criarItemLista(app, prefixo, 'pages/aplicativos.html')));
    if (APPS_DATA.jogos) APPS_DATA.jogos.forEach(jogo => popularSection.appendChild(criarItemLista(jogo, prefixo, 'pages/jogos.html')));
  }

  // 3. Sidebar (Populares/Quente)
  const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
  sidebarWidgets.forEach(w => {
    const h3 = w.querySelector('h3');
    if (h3 && (h3.innerText.includes('Populares') || h3.innerText.includes('Quente') || h3.innerText.includes('🔥'))) {
      const itensAntigos = w.querySelectorAll('.sidebar-post');
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
        w.appendChild(div);
      });
    }
  });

  // 4. Páginas de Listagem (Aplicativos / Jogos)
  if (window.location.pathname.includes('aplicativos.html')) {
    const container = document.querySelector('.popular-section');
    if (container) {
      const itensAntigos = container.querySelectorAll('.post-list-item');
      itensAntigos.forEach(item => item.remove());
      APPS_DATA.aplicativos.forEach(app => container.appendChild(criarItemLista(app, '../', 'pages/aplicativos.html')));
    }
  }
  if (window.location.pathname.includes('jogos.html')) {
    const container = document.querySelector('.apps-grid');
    if (container) {
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
}

// Execução imediata e por eventos
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderizarTudo);
} else {
  renderizarTudo();
}
window.onload = renderizarTudo;
setTimeout(renderizarTudo, 500);
