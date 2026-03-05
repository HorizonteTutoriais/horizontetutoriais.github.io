/* ============================================================
   HORIZONTE TUTORIAIS — Motor de Automação Total v11 (Final)
   Lógica: Injeção Segura + Propagação Multi-Seção + Tutoriais
   ============================================================ */

(function() {
    'use strict';

    function getPrefixo() {
        const path = window.location.pathname;
        if (path.includes('/posts/')) return '../../';
        if (path.includes('/pages/')) return '../';
        return '';
    }

    const prefixo = getPrefixo();

    function getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        if (!id) {
            const path = window.location.pathname;
            if (path.includes('horizon-clicker')) id = 'horizon-clicker';
            if (path.includes('resident-evil-4')) id = 'resident-evil-4';
        }
        return id;
    }

    // Função para criar o Card padrão do site
    function criarCard(item, prefixo) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.style.cssText = `background: var(--white); border: 1px solid var(--gray-border); border-radius: var(--radius); padding: 15px; margin-bottom: 15px; box-shadow: var(--shadow); transition: all 0.3s ease; display: flex; gap: 15px; cursor: pointer;`;
        
        const img = document.createElement('img');
        img.src = item.icone || item.imagem || 'https://via.placeholder.com/80';
        img.style.cssText = `width: 80px; height: 80px; border-radius: 6px; object-fit: cover; flex-shrink: 0;`;
        
        const content = document.createElement('div');
        content.style.flex = '1';
        content.innerHTML = `<h3 style="margin: 0 0 5px 0; font-size: 16px; color: #0d47a1; font-weight: 700;">${item.nome}</h3><p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;">${item.descricao}</p><span class="badge badge-cat" style="display: inline-block; background: #0d47a1; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-right: 8px;">${item.categoria}</span><span style="font-size: 11px; color: #999;">📅 ${item.data || 'Recente'}</span>`;
        
        card.appendChild(img);
        card.appendChild(content);
        card.onclick = () => window.location.href = prefixo + item.url;
        return card;
    }

    // Função para criar a seção de Tutoriais (Restaurando layout original fiel)
    function criarTutorialCard(item) {
        const div = document.createElement('div');
        div.className = 'tutorial-card';
        div.innerHTML = `
            <div class="tutorial-header">
                <img src="${item.icone || item.imagem}" class="tutorial-icon" alt="${item.nome}">
                <div class="tutorial-info">
                    <h3>${item.tutorialTitulo || item.nome}</h3>
                    <p>${item.tutorialSubtitulo || ''}</p>
                </div>
            </div>
            <div class="tutorial-description">${item.tutorialDescricao || item.descricaoLonga || ''}</div>
            <div class="tutorial-buttons">
                <button class="btn-specs" onclick="openModal('${item.id}')"><i class="fas fa-list-ul"></i> ESPECIFICAÇÕES</button>
                <button class="btn-video" onclick="toggleVideo('${item.id}')"><i class="fas fa-play-circle"></i> VÍDEOS</button>
                <a href="${prefixo}${item.url}" class="btn-download-tutorial"><i class="fas fa-download"></i> DOWNLOAD</a>
            </div>
            <div id="video-container-${item.id}" class="video-scroll-container">
                <div class="video-scroll-list">
                    ${(item.videos || []).map((v, index) => `
                        <div class="video-btn" onclick="playVideo('${v.id}', '${item.id}')">
                            <i class="fab fa-youtube"></i>
                            <span>${v.titulo || 'Parte ' + (index + 1)}</span>
                        </div>
                    `).join('')}
                </div>
                <div id="player-${item.id}" class="video-player-container" style="display:none;"></div>
            </div>
        `;
        return div;
    }

    window.renderizarTudo = function() {
        if (!window.APPS_DATA) return;
        const path = window.location.pathname;
        const urlId = getIdFromUrl();
        const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];

        // 1. PÁGINA DE DETALHES (POST)
        if (urlId) {
            const postItem = todosItens.find(i => i.id === urlId);
            if (postItem) {
                const img = document.querySelector('.post-featured-img');
                if (img) {
                    img.src = postItem.imagemCapa;
                    img.style.cssText = `width: 100%; max-height: 320px; object-fit: contain; background: #1a73e8; border-radius: var(--radius); margin-bottom: 16px;`;
                }
                const infoTable = document.querySelector('.info-table');
                if (infoTable && postItem.especificacoes) {
                    const containerPai = infoTable.parentElement;
                    document.querySelectorAll('.specs-header-custom').forEach(e => e.remove());
                    const specsHeader = document.createElement('div');
                    specsHeader.className = 'specs-header-custom';
                    specsHeader.style.cssText = `display: flex; align-items: center; gap: 15px; margin-top: 25px; margin-bottom: 15px; padding: 12px; background: #f0f4ff; border-radius: 8px; border-left: 4px solid var(--blue-primary);`;
                    specsHeader.innerHTML = `<img src="${postItem.icone || postItem.imagem}" style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); background: #fff;"><div><h2 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--blue-dark);">📊 ESPECIFICAÇÕES DO ${postItem.categoria.toUpperCase()}</h2></div>`;
                    containerPai.insertBefore(specsHeader, infoTable);
                    containerPai.querySelectorAll('h2.section-title').forEach(t => { if (t.textContent.includes('ESPECIFICAÇÕES')) t.remove(); });
                }
                const downloadBox = document.querySelector('.download-box');
                if (downloadBox) {
                    downloadBox.innerHTML = '';
                    if (postItem.categoria === 'Jogos' || postItem.tipoDownload === 'multiplo') {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#c62828;margin-bottom:12px">⬇️ Clique abaixo para baixar o jogo</p><div class="download-options"><a href="${postItem.linkDownload}" class="btn-download-option" target="_blank"><i class="fas fa-file-archive"></i> BAIXAR APK</a><a href="${postItem.linkDownloadData1 || '#'}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> DATA 1</a><a href="${postItem.linkDownloadData2 || '#'}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> DATA 2</a></div>`;
                    } else {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#0d47a1;margin-bottom:12px">⬇️ Clique abaixo para baixar o aplicativo</p><a href="${postItem.linkDownload}" class="btn-big-download" target="_blank"><i class="fas fa-download"></i> DOWNLOAD</a>`;
                    }
                }
            }
            return;
        }

        // 2. MOTOR DE LISTAGENS (DISTRIBUIÇÃO AUTOMÁTICA)
        const updatesGrid = document.querySelector('.updates-grid');
        const popularSection = document.querySelector('.popular-section');
        const appsGrid = document.querySelector('.apps-grid');
        const sidebarPopulares = document.querySelector('#sidebar-populares');

        // Limpar APENAS o conteúdo gerado dinamicamente para evitar duplicação e sumiço
        if (updatesGrid) updatesGrid.innerHTML = '';
        if (appsGrid) appsGrid.innerHTML = '';
        if (sidebarPopulares) {
            const list = sidebarPopulares.querySelector('.populares-list') || sidebarPopulares;
            // Remover apenas cards injetados anteriormente
            list.querySelectorAll('.app-card').forEach(c => c.remove());
        }
        if (popularSection) {
            const grid = popularSection.querySelector('.apps-grid') || popularSection;
            // Remover apenas cards injetados anteriormente, preservando títulos
            grid.querySelectorAll('.app-card').forEach(c => c.remove());
        }

        todosItens.forEach(item => {
            // REGRA: Sempre em Últimas Atualizações (na Index)
            if (updatesGrid) updatesGrid.appendChild(criarCard(item, prefixo));

            // REGRA: Filtro de Categorias (Aplicativos.html e Jogos.html)
            if (path.includes('aplicativos.html') && item.categoria === 'Aplicativos' && (appsGrid || popularSection)) {
                let target = appsGrid || popularSection.querySelector('.apps-grid') || popularSection;
                target.appendChild(criarCard(item, prefixo));
            }
            if (path.includes('jogos.html') && item.categoria === 'Jogos' && (appsGrid || popularSection)) {
                let target = appsGrid || popularSection.querySelector('.apps-grid') || popularSection;
                target.appendChild(criarCard(item, prefixo));
            }

            // REGRA: Filtro Quente (Quente.html)
            if (path.includes('quente.html') && item.tipo === 'quente' && (appsGrid || popularSection)) {
                let target = appsGrid || popularSection.querySelector('.apps-grid') || popularSection;
                target.appendChild(criarCard(item, prefixo));
            }

            // REGRA: POPULAR (Exemplo 1) -> Aparece em Popular e Destaques na Index
            if (item.tipo === 'popular' || item.popular === true) {
                if (popularSection && (path.includes('index.html') || path === '/' || path.endsWith('/'))) {
                    let target = popularSection.querySelector('.apps-grid') || popularSection;
                    target.appendChild(criarCard(item, prefixo));
                }
                if (sidebarPopulares) {
                    let target = sidebarPopulares.querySelector('.populares-list') || sidebarPopulares;
                    target.appendChild(criarCard(item, prefixo));
                }
            }
        });

        // 3. TUTORIAIS (PÁGINA TUTORIAIS)
        if (path.includes('tutoriais.html')) {
            const tutorialContainer = document.querySelector('.popular-section, #tutoriais-list');
            if (tutorialContainer) {
                const grid = tutorialContainer.querySelector('.apps-grid') || tutorialContainer;
                // Preservar o título original da seção se existir
                if (!grid.querySelector('.section-title')) {
                    grid.innerHTML = '<h1 class="section-title">📖 Tutoriais Completos</h1>';
                } else {
                    // Se já houver título, apenas remove cards antigos
                    grid.querySelectorAll('.tutorial-card').forEach(c => c.remove());
                }
                todosItens.forEach(item => grid.appendChild(criarTutorialCard(item)));
            }
        }
    };

    // Funções Globais para Tutoriais
    window.toggleVideo = function(id) {
        const container = document.getElementById(`video-container-${id}`);
        if (container) container.classList.toggle('active');
    };

    window.playVideo = function(videoId, itemId) {
        const player = document.getElementById(`player-${itemId}`);
        if (player) {
            player.style.display = 'block';
            player.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        }
    };

    window.openModal = function(id) {
        const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
        const item = todosItens.find(i => i.id === id);
        if (item) {
            const modal = document.getElementById('specsModal');
            const content = document.getElementById('modalSpecsContent');
            if (modal && content) {
                const s = item.especificacoes;
                content.innerHTML = `
                    <table class="specs-table">
                        <tr><td>Nome</td><td>${item.nome}</td></tr>
                        <tr><td>Versão</td><td>${s.versao}</td></tr>
                        <tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                        <tr><td>Categoria</td><td>${s.categoria}</td></tr>
                        <tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                        <tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr>
                        <tr><td>Requer Android</td><td>${s.androidMin}</td></tr>
                        <tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr>
                    </table>
                `;
                modal.style.display = 'block';
            }
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    else window.renderizarTudo();
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();
