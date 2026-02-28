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

  // Verifica se APPS_DATA existe
  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) {
    console.warn('APPS_DATA não disponível ainda');
    return;
  }

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  // Renderiza aplicativos
  if (APPS_DATA.aplicativos && Array.isArray(APPS_DATA.aplicativos)) {
    APPS_DATA.aplicativos.forEach(app => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.setAttribute('data-app-name', app.nome);
      card.setAttribute('data-app-url', prefixo + app.url);
      card.innerHTML = `
        <img src="${app.imagemGrande}" alt="${app.nome}" />
        <div class="card-title">${app.nome} (${app.descricao})</div>
        <a href="${prefixo}${app.url}" class="btn-download">Download</a>
      `;
      container.appendChild(card);
    });
  }

  // Renderiza jogos
  if (APPS_DATA.jogos && Array.isArray(APPS_DATA.jogos)) {
    APPS_DATA.jogos.forEach(jogo => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.setAttribute('data-app-name', jogo.nome);
      card.setAttribute('data-app-url', prefixo + jogo.url);
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

  // Verifica se APPS_DATA existe
  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) {
    console.warn('APPS_DATA não disponível ainda');
    return;
  }

  const prefixo = obterPrefixoCaminho();
  const titulo = container.querySelector('.section-title');
  if (!titulo) return;

  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  // Aplicativos
  if (APPS_DATA.aplicativos && Array.isArray(APPS_DATA.aplicativos)) {
    APPS_DATA.aplicativos.forEach(app => {
      const item = document.createElement('div');
      item.className = 'post-list-item';
      item.setAttribute('data-app-name', app.nome);
      item.setAttribute('data-app-url', prefixo + app.url);
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
  if (APPS_DATA.jogos && Array.isArray(APPS_DATA.jogos)) {
    APPS_DATA.jogos.forEach(jogo => {
      const item = document.createElement('div');
      item.className = 'post-list-item';
      item.setAttribute('data-app-name', jogo.nome);
      item.setAttribute('data-app-url', prefixo + jogo.url);
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

function renderizarPaginaAplicativos() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  // Verifica se APPS_DATA existe
  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) {
    console.warn('APPS_DATA não disponível ainda');
    return;
  }

  const prefixo = obterPrefixoCaminho();
  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  if (APPS_DATA.aplicativos && Array.isArray(APPS_DATA.aplicativos)) {
    APPS_DATA.aplicativos.forEach(app => {
      const item = document.createElement('div');
      item.className = 'post-list-item';
      item.setAttribute('data-app-name', app.nome);
      item.setAttribute('data-app-url', prefixo + app.url);
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
}

function renderizarPaginaJogos() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  // Verifica se APPS_DATA existe
  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) {
    console.warn('APPS_DATA não disponível ainda');
    return;
  }

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  if (APPS_DATA.jogos && Array.isArray(APPS_DATA.jogos)) {
    APPS_DATA.jogos.forEach(jogo => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.setAttribute('data-app-name', jogo.nome);
      card.setAttribute('data-app-url', prefixo + jogo.url);
      card.innerHTML = `
        <div class="app-card-title"><a href="${prefixo}${jogo.url}">${jogo.nome}</a></div>
        <div class="app-card-cat"><span>${jogo.quente ? 'Quente' : ''}</span> · ${jogo.descricao}</div>
        <a href="${prefixo}${jogo.url}" class="btn-download-sm">Download</a>
      `;
      container.appendChild(card);
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

  if (!container) return;

  // Verifica se APPS_DATA existe
  if (typeof APPS_DATA === 'undefined' || !APPS_DATA) {
    console.warn('APPS_DATA não disponível ainda');
    return;
  }

  const prefixo = obterPrefixoCaminho();
  const itensAntigos = container.querySelectorAll('.sidebar-post');
  itensAntigos.forEach(item => item.remove());

  if (APPS_DATA.aplicativos && Array.isArray(APPS_DATA.aplicativos)) {
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
  }

  if (APPS_DATA.jogos && Array.isArray(APPS_DATA.jogos)) {
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
}

// Função para renderizar tudo de uma vez
function renderizarTudo() {
  const path = window.location.pathname;

  // Página inicial (index.html na raiz)
  const ehPaginaInicial =
    path.endsWith('/') ||
    path.endsWith('index.html') ||
    path.includes('horizontetutoriais.github.io');

  if (ehPaginaInicial) {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
  } else if (path.includes('aplicativos.html')) {
    renderizarPaginaAplicativos();
    renderizarSidebar();
  } else if (path.includes('jogos.html')) {
    renderizarPaginaJogos();
    renderizarSidebar();
  } else {
    renderizarSidebar();
  }
}

// Executa quando o DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
  renderizarTudo();
});

// Também tenta renderizar após um pequeno delay para garantir que dados.js foi carregado
setTimeout(renderizarTudo, 500);
