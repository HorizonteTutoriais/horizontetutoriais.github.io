// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps, jogos, tutoriais e ferramentas

function obterPrefixoCaminho() {
  const path = window.location.pathname;
  
  // Se estiver em uma subpasta (pages, posts, Index)
  if (path.includes('/pages/') || path.includes('/posts/') || path.includes('/Index/')) {
    // Se for um post (que está em posts/aplicativos/, posts/jogos/, etc), precisa subir 2 níveis
    if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/') || 
        path.includes('/posts/tutoriais/') || path.includes('/posts/ferramentas/') ||
        path.includes('/posts/quente/')) {
        return '../../';
    }
    // Para as outras subpastas (pages), sobe 1 nível
    return '../';
  }
  
  // Se estiver na raiz
  return '';
}

function renderizarAtualizacoes() {
  const container = document.querySelector('.updates-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';
  
  // Combinar todos os itens e ordenar por data (mais recentes primeiro)
  const todosItens = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].sort((a, b) => new Date(b.data) - new Date(a.data));

  // Renderiza todos os itens
  todosItens.forEach(item => {
    const card = document.createElement('div');
    card.className = 'update-card';
    card.innerHTML = `
      <img src="${item.imagemGrande}" alt="${item.nome}" />
      <div class="card-title">${item.nome} (${item.descricao})</div>
      <a href="${prefixo}${item.url}" class="btn-download">Download</a>
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

  // Filtrar apenas itens marcados como destaque
  const destaques = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.destaque).sort((a, b) => new Date(b.data) - new Date(a.data));

  // Renderiza destaques
  destaques.forEach(item => {
    const link = document.createElement('div');
    link.className = 'post-list-item';
    link.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${prefixo}${item.url}">${item.nome} (${item.descricao})</a></div>
        <div class="post-cat"><a href="${prefixo}pages/${item.categoria.toLowerCase()}.html">${item.categoria}</a></div>
        <a href="${prefixo}${item.url}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(link);
  });
}

function renderizarPaginaAplicativos() {
  const container = document.querySelector('.popular-section');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  const itensAntigos = container.querySelectorAll('.post-list-item');
  itensAntigos.forEach(item => item.remove());

  const apps = (APPS_DATA.aplicativos || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  apps.forEach(app => {
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

  const jogos = (APPS_DATA.jogos || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  jogos.forEach(jogo => {
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

function renderizarPaginaTutoriais() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  const tutoriais = (APPS_DATA.tutoriais || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  tutoriais.forEach(tutorial => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <div class="app-card-title"><a href="${prefixo}${tutorial.url}">${tutorial.nome}</a></div>
      <div class="app-card-cat">${tutorial.descricao}</div>
      <a href="${prefixo}${tutorial.url}" class="btn-download-sm">Acessar</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginaFerramentas() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  const ferramentas = (APPS_DATA.ferramentas || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  ferramentas.forEach(ferramenta => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <div class="app-card-title"><a href="${prefixo}${ferramenta.url}">${ferramenta.nome}</a></div>
      <div class="app-card-cat">${ferramenta.descricao}</div>
      <a href="${prefixo}${ferramenta.url}" class="btn-download-sm">Usar</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginaQuente() {
  const container = document.querySelector('.apps-grid');
  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  container.innerHTML = '';

  // Filtrar apenas itens marcados como quente
  const itensQuentes = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.quente).sort((a, b) => new Date(b.data) - new Date(a.data));

  itensQuentes.forEach(item => {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
      <div class="app-card-title"><a href="${prefixo}${item.url}">${item.nome}</a></div>
      <div class="app-card-cat">${item.categoria} · ${item.descricao}</div>
      <a href="${prefixo}${item.url}" class="btn-download-sm">Abrir</a>
    `;
    container.appendChild(card);
  });
}

function renderizarSidebar() {
  const widgets = document.querySelectorAll('.sidebar-widget');
  let container = null;
  
  // Busca robusta pelo widget de populares/quente
  widgets.forEach(w => {
    const h3 = w.querySelector('h3');
    const h2 = w.querySelector('h2');
    const title = (h3 ? h3.innerText : (h2 ? h2.innerText : "")).toLowerCase();
    
    if (title.includes('populares') || title.includes('quente') || title.includes('pop')) {
      container = w;
    }
  });

  // Se não encontrar pelo título, tenta encontrar pela classe ou ID
  if (!container) {
    container = document.querySelector('.sidebar-popular') || document.querySelector('#sidebar-popular');
  }

  // Se ainda não encontrar, usa o último widget da sidebar como plano B
  if (!container && widgets.length > 0) {
    container = widgets[widgets.length - 1];
  }

  if (!container) return;

  const prefixo = obterPrefixoCaminho();
  const itensAntigos = container.querySelectorAll('.sidebar-post');
  itensAntigos.forEach(item => item.remove());

  // Combinar todos os itens populares e quentes
  const itensPopulares = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.tipo === 'popular' || item.quente).sort((a, b) => new Date(b.data) - new Date(a.data));

  itensPopulares.forEach(item => {
    const sidebarItem = document.createElement('div');
    sidebarItem.className = 'sidebar-post';
    sidebarItem.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${prefixo}${item.url}">${item.nome}</a></div>
        <div class="sp-cat">${item.categoria}</div>
      </div>
    `;
    container.appendChild(sidebarItem);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;

  if (path.includes('index.html') || path.endsWith('/') || path.includes('INDEX')) {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
  } else if (path.includes('aplicativos.html')) {
    renderizarPaginaAplicativos();
    renderizarSidebar();
  } else if (path.includes('jogos.html')) {
    renderizarPaginaJogos();
    renderizarSidebar();
  } else if (path.includes('tutoriais.html')) {
    renderizarPaginaTutoriais();
    renderizarSidebar();
  } else if (path.includes('ferramentas.html')) {
    renderizarPaginaFerramentas();
    renderizarSidebar();
  } else if (path.includes('quente.html')) {
    renderizarPaginaQuente();
    renderizarSidebar();
  } else {
    renderizarSidebar();
  }
});
