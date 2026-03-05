// ===== RENDERIZADOR DINÂMICO DO SITE =====
// Este arquivo monta automaticamente as listas de apps, jogos, tutoriais ou ferramentas

function obterPrefixoCaminho() {
  const path = window.location.pathname;
  
  // Se a página atual está na pasta 'Index', o prefixo para sair dela é '../'
  if (path.includes("/Index/")) {
    return "../";
  }
  // Se a página atual está na pasta 'pages', o prefixo para sair dela é '../'
  if (path.includes("/pages/")) {
    return "../";
  }
  // Se a página atual está em uma subpasta de 'posts', o prefixo para sair dela é '../../'
  if (path.includes("/posts/")) {
    return "../../";
  }
  
  // Se estiver na raiz do site (ex: http://localhost:8000/)
  return "";
}

// Função auxiliar para determinar o caminho correto de um asset
function getAssetPath(assetUrl) {
  // Se for uma URL absoluta (começa com http/https), retorna a própria URL
  if (assetUrl.startsWith("http://") || assetUrl.startsWith("https://")) {
    return assetUrl;
  }
  // Caso contrário, é um caminho relativo ao site, então aplica o prefixo
  return obterPrefixoCaminho() + assetUrl;
}

function renderizarAtualizacoes() {
  const container = document.querySelector(".updates-grid");
  if (!container) return;

  container.innerHTML = "";
  
  // Combinar todos os itens e ordenar por data (mais recentes primeiro)
  const todosItens = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].sort((a, b) => new Date(b.data) - new Date(a.data));

  // Renderiza todos os itens
  todosItens.forEach(item => {
    const card = document.createElement("div");
    card.className = "update-card";
    card.innerHTML = `
      <img src="${getAssetPath(item.imagemGrande)}" alt="${item.nome}" />
      <div class="card-title">${item.nome} (${item.descricao})</div>
      <a href="${getAssetPath(item.url)}" class="btn-download">Download</a>
    `;
    container.appendChild(card);
  });
}

function renderizarDestaques() {
  const container = document.querySelector(".popular-section");
  if (!container) return;

  const titulo = container.querySelector(".section-title");
  if (!titulo) return;

  container.innerHTML = `<h2 class="section-title">⭐ Destaques</h2>`; // Limpa e adiciona o título novamente

  // REGRAS DO USUÁRIO: Destaques = item.tipo === "popular"
  const destaques = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.tipo === "popular").sort((a, b) => new Date(b.data) - new Date(a.data));

  // Renderiza destaques
  destaques.forEach(item => {
    const link = document.createElement("div");
    link.className = "post-list-item";
    link.innerHTML = `
      <img src="${getAssetPath(item.imagem)}" alt="${item.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${getAssetPath(item.url)}">${item.nome} (${item.descricao})</a></div>
        <div class="post-cat"><a href="${getAssetPath("pages/" + item.categoria.toLowerCase() + ".html")}">${item.categoria}</a></div>
        <a href="${getAssetPath(item.url)}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(link);
  });
}

function renderizarPaginaAplicativos() {
  const container = document.querySelector(".popular-section"); // Usando popular-section como container principal
  if (!container) return;

  container.innerHTML = `<h1 class="section-title">📱 Aplicativos</h1>`; // Limpa e adiciona o título novamente

  const apps = (APPS_DATA.aplicativos || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  apps.forEach(app => {
    const item = document.createElement("div");
    item.className = "post-list-item";
    item.innerHTML = `
      <img src="${getAssetPath(app.imagem)}" alt="${app.nome}" />
      <div class="post-list-info">
        <div class="post-title"><a href="${getAssetPath(app.url)}">${app.nome} (${app.descricao})</a></div>
        <div class="post-cat"><a href="${getAssetPath("pages/" + app.categoria.toLowerCase() + ".html")}">${app.categoria}</a> · <span style="color:#e53935;font-weight:700">${app.quente ? "Quente" : ""}</span></div>
        <a href="${getAssetPath(app.url)}" class="btn-download-sm">Download</a>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderizarPaginaJogos() {
  const container = document.querySelector(".apps-grid");
  if (!container) return;

  container.innerHTML = "";

  const jogos = (APPS_DATA.jogos || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  jogos.forEach(jogo => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `
      <div class="app-card-title"><a href="${getAssetPath(jogo.url)}">${jogo.nome}</a></div>
      <div class="app-card-cat"><span>${jogo.quente ? "Quente" : ""}</span> · ${jogo.descricao}</div>
      <a href="${getAssetPath(jogo.url)}" class="btn-download-sm">Download</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginaTutoriais() {
  const container = document.querySelector(".apps-grid");
  if (!container) return;

  container.innerHTML = "";

  const tutoriais = (APPS_DATA.tutoriais || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  tutoriais.forEach(tutorial => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `
      <div class="app-card-title"><a href="${getAssetPath(tutorial.url)}">${tutorial.nome}</a></div>
      <div class="app-card-cat">${tutorial.descricao}</div>
      <a href="${getAssetPath(tutorial.url)}" class="btn-download-sm">Acessar</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginaFerramentas() {
  const container = document.querySelector(".apps-grid");
  if (!container) return;

  container.innerHTML = "";

  const ferramentas = (APPS_DATA.ferramentas || []).sort((a, b) => new Date(b.data) - new Date(a.data));

  ferramentas.forEach(ferramenta => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `
      <div class="app-card-title"><a href="${getAssetPath(ferramenta.url)}">${ferramenta.nome}</a></div>
      <div class="app-card-cat">${ferramenta.descricao}</div>
      <a href="${getAssetPath(ferramenta.url)}" class="btn-download-sm">Usar</a>
    `;
    container.appendChild(card);
  });
}

function renderizarPaginaQuente() {
  const container = document.querySelector(".apps-grid");
  if (!container) return;

  container.innerHTML = "";

  // Filtrar apenas itens marcados como quente
  const itensQuentes = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.quente).sort((a, b) => new Date(b.data) - new Date(a.data));

  itensQuentes.forEach(item => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = `
      <div class="app-card-title"><a href="${getAssetPath(item.url)}">${item.nome}</a></div>
      <div class="app-card-cat">${item.categoria} · ${item.descricao}</div>
      <a href="${getAssetPath(item.url)}" class="btn-download-sm">Abrir</a>
    `;
    container.appendChild(card);
  });
}

function renderizarSidebar() {
  const container = document.getElementById("sidebar-populares"); // Alvo direto pelo ID
  if (!container) return;

  // Limpa o conteúdo existente, mas mantém o título H3
  const h3Title = container.querySelector("h3");
  container.innerHTML = "";
  if (h3Title) {
    container.appendChild(h3Title);
  }

  // REGRAS DO USUÁRIO: Populares = item.tipo === "popular"
  const itensPopulares = [
    ...(APPS_DATA.aplicativos || []),
    ...(APPS_DATA.jogos || []),
    ...(APPS_DATA.tutoriais || []),
    ...(APPS_DATA.ferramentas || [])
  ].filter(item => item.tipo === "popular").sort((a, b) => new Date(b.data) - new Date(a.data));

  itensPopulares.forEach(item => {
    const sidebarItem = document.createElement("div");
    sidebarItem.className = "sidebar-post";
    sidebarItem.innerHTML = `
      <img src="${getAssetPath(item.imagem)}" alt="${item.nome}" />
      <div class="sidebar-post-info">
        <div class="sp-title"><a href="${getAssetPath(item.url)}">${item.nome}</a></div>
        <div class="sp-cat">${item.categoria}</div>
      </div>
    `;
    container.appendChild(sidebarItem);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;

  if (path.includes("index.html") || path.endsWith("/") || path.includes("INDEX")) {
    renderizarAtualizacoes();
    renderizarDestaques();
    renderizarSidebar();
  } else if (path.includes("aplicativos.html")) {
    renderizarPaginaAplicativos();
    renderizarSidebar();
  } else if (path.includes("jogos.html")) {
    renderizarPaginaJogos();
    renderizarSidebar();
  } else if (path.includes("tutoriais.html")) {
    renderizarPaginaTutoriais();
    renderizarSidebar();
  } else if (path.includes("ferramentas.html")) {
    renderizarPaginaFerramentas();
    renderizarSidebar();
  } else if (path.includes("quente.html")) {
    renderizarPaginaQuente();
    renderizarSidebar();
  } else {
    renderizarSidebar();
  }
});
