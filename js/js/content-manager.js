Enter/**
 * Content Manager - Sistema centralizado de gerenciamento de conteúdo
 * 
 * Como usar:
 * 1. Adicione novos itens em /dados.json
 * 2. Este script carrega automaticamente e renderiza em todas as páginas
 * 3. Suporta filtros por categoria e busca
 */

class ContentManager {
  constructor() {
    this.dados = null;
    this.todosItens = [];
    this.init();
  }

  async init() {
    try {
      const response = await fetch('/dados.json');
      this.dados = await response.json();
      this.processarDados();
      this.renderizarConteudo();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  processarDados() {
    // Combinar todos os itens em um único array
    this.todosItens = [
      ...(this.dados.aplicativos || []),
      ...(this.dados.jogos || []),
      ...(this.dados.tutoriais || []),
      ...(this.dados.ferramentas || [])
    ];
  }

  renderizarConteudo() {
    // Renderizar seção de destaques
    this.renderizarDestaques();
    
    // Renderizar seções por categoria
    this.renderizarAplicativos();
    this.renderizarJogos();
    this.renderizarTutoriais();
    this.renderizarFerramentas();
  }

  renderizarDestaques() {
    const container = document.querySelector('.updates-grid');
    if (!container) return;

    const destaques = this.todosItens.filter(item => item.destaque);
    
    container.innerHTML = destaques.map(item => `
      <div class="update-card">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="card-title">${item.nome}</div>
        <a href="${item.url}" class="btn-download">Ver Mais</a>
      </div>
    `).join('');
  }

  renderizarAplicativos() {
    const container = document.querySelector('[data-category="aplicativos"]');
    if (!container) return;

    const apps = this.dados.aplicativos || [];
    const html = apps.map(app => `
      <div class="app-card">
        <img src="${app.imagem}" alt="${app.nome}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
        <div class="app-card-title"><a href="${app.url}">${app.nome}</a></div>
        <div class="app-card-cat">${app.descricao}</div>
        <a href="${app.url}" class="btn-download-sm">Abrir</a>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderizarJogos() {
    const container = document.querySelector('[data-category="jogos"]');
    if (!container) return;

    const jogos = this.dados.jogos || [];
    const html = jogos.map(jogo => `
      <div class="app-card">
        <img src="${jogo.imagem}" alt="${jogo.nome}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
        <div class="app-card-title"><a href="${jogo.url}">${jogo.nome}</a></div>
        <div class="app-card-cat">${jogo.descricao}</div>
        <a href="${jogo.url}" class="btn-download-sm">Abrir</a>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderizarTutoriais() {
    const container = document.querySelector('[data-category="tutoriais"]');
    if (!container) return;

    const tutoriais = this.dados.tutoriais || [];
    const html = tutoriais.map(tutorial => `
      <div class="tutorial-card">
        <img src="${tutorial.imagem}" alt="${tutorial.nome}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
        <div class="tutorial-info">
          <h3>${tutorial.nome}</h3>
          <p>${tutorial.descricao}</p>
        </div>
        <a href="${tutorial.url}" class="btn-download-sm">Acessar</a>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderizarFerramentas() {
    const container = document.querySelector('[data-category="ferramentas"]');
    if (!container) return;

    const ferramentas = this.dados.ferramentas || [];
    const html = ferramentas.map(ferramenta => `
      <div class="app-card">
        <img src="${ferramenta.imagem}" alt="${ferramenta.nome}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
        <div class="app-card-title"><a href="${ferramenta.url}">${ferramenta.nome}</a></div>
        <div class="app-card-cat">${ferramenta.descricao}</div>
        <a href="${ferramenta.url}" class="btn-download-sm">Usar</a>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  // Método para buscar itens
  buscar(termo) {
    return this.todosItens.filter(item => 
      item.nome.toLowerCase().includes(termo.toLowerCase()) ||
      item.descricao.toLowerCase().includes(termo.toLowerCase()) ||
      item.categoria.toLowerCase().includes(termo.toLowerCase())
    );
  }

  // Método para obter itens por categoria
  obterPorCategoria(categoria) {
    return this.todosItens.filter(item => 
      item.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
  });
} else {
  window.contentManager = new ContentManager();
      }
