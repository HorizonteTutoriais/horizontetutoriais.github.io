here// ===== MOTOR DE AUTOMAÇÃO TOTAL DO HORIZONTE TUTORIAIS =====
// Este script organiza TUDO automaticamente com base no arquivo js/dados.js

function obterPrefixo() {
  const path = window.location.pathname;
  if (path.includes('/posts/')) return '../../';
  if (path.includes('/pages/')) return '../';
  return '';
}

function criarCard(item, prefixo, tipo) {
  const div = document.createElement('div');
  
  if (tipo === 'update') {
    div.className = 'update-card';
    div.innerHTML = `
      <img src="${item.imagemGrande}" alt="${item.nome}" />
      <div class="card-title">${item.nome} ${item.descricao ? '(' + item.descricao + ')' : ''}</div>
      <a href="${prefixo}${item.url}" class="btn-download">Download</a>
    `;
  } else if (tipo === 'app-card') {
    div.className = 'app-card';
    div.innerHTML = `
      <div class="app-card-title"><a href="${prefixo}${item.url}">${item.nome}</a></div>
      <div class="app-card-cat"><span>${item.quente ? 'Quente' : ''}</span> · ${item.descricao}</div>
      <a href="${prefixo}${item.url}" class="btn-download-sm">Download</a>
    `;
  } else {
    div.className = 'post-list-item';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${prefixo}${item.url}">${item.nome} ${item.descricao ? '(' + item.descricao + ')' : ''}</a></div>
        <div class="post-cat"><a href="${prefixo}pages/${item.categoria.toLowerCase()}.html">${item.categoria}</a></div>
        <a href="${prefixo}${item.url}" class="btn-download-sm">Download</a>
      </div>
    `;
  }
  return div;
}

function organizarSiteTotal() {
  if (typeof APPS_DATA === 'undefined') return;
  const prefixo = obterPrefixo();
  const path = window.location.pathname;

  // 1. HOME: Últimas Atualizações (Todos os itens misturados)
  const updatesGrid = document.querySelector('.updates-grid');
  if (updatesGrid) {
    updatesGrid.innerHTML = '';
    const todos = [...(APPS_DATA.aplicativos || []), ...(APPS_DATA.jogos || []), ...(APPS_DATA.tutoriais || [])];
    todos.forEach(item => updatesGrid.appendChild(criarCard(item, prefixo, 'update')));
  }

  // 2. HOME: Destaques (Todos os itens misturados)
  const popularSection = document.querySelector('.popular-section');
  if (popularSection && (path.endsWith('index.html') || path.endsWith('/'))) {
    const itensAntigos = popularSection.querySelectorAll('.post-list-item');
    itensAntigos.forEach(item => item.remove());
    [...(APPS_DATA.aplicativos || []), ...(APPS_DATA.jogos || []), ...(APPS_DATA.tutoriais || [])].forEach(item => {
      popularSection.appendChild(criarCard(item, prefixo, 'list'));
    });
  }

  // 3. SIDEBAR: Populares (Todos os itens em todas as páginas)
  const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
  sidebarWidgets.forEach(w => {
    const h3 = w.querySelector('h3');
    if (h3 && (h3.innerText.includes('Populares') || h3.innerText.includes('Quente') || h3.innerText.includes('🔥'))) {
      const itensAntigos = w.querySelectorAll('.sidebar-post');
      itensAntigos.forEach(item => item.remove());
      [...(APPS_DATA.aplicativos || []), ...(APPS_DATA.jogos || []), ...(APPS_DATA.tutoriais || [])].forEach(item => {
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

  // 4. PÁGINA APLICATIVOS: Apenas Aplicativos
  if (path.includes('aplicativos.html')) {
    const container = document.querySelector('.popular-section');
    if (container && APPS_DATA.aplicativos) {
      const itensAntigos = container.querySelectorAll('.post-list-item');
      itensAntigos.forEach(item => item.remove());
      APPS_DATA.aplicativos.forEach(app => container.appendChild(criarCard(app, '../', 'list')));
    }
  }

  // 5. PÁGINA JOGOS: Apenas Jogos
  if (path.includes('jogos.html')) {
    const container = document.querySelector('.apps-grid');
    if (container && APPS_DATA.jogos) {
      container.innerHTML = '';
      APPS_DATA.jogos.forEach(jogo => container.appendChild(criarCard(jogo, '../', 'app-card')));
    }
  }

  // 6. PÁGINA TUTORIAIS: Apenas Tutoriais
  if (path.includes('tutoriais.html')) {
    const container = document.querySelector('.popular-section');
    if (container && APPS_DATA.tutoriais) {
      const itensAntigos = container.querySelectorAll('.post-list-item');
      itensAntigos.forEach(item => item.remove());
      APPS_DATA.tutoriais.forEach(tut => container.appendChild(criarCard(tut, '../', 'list')));
    }
  }
}

// Iniciar automação total
document.addEventListener('DOMContentLoaded', organizarSiteTotal);
window.onload = organizarSiteTotal;
setTimeout(organizarSiteTotal, 500);
