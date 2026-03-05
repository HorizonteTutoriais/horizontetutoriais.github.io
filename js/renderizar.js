/* ============================================================
   HORIZONTE TUTORIAIS — Renderizador Dinâmico 100% Automático
   Sistema de Filtragem Rigorosa por Categoria e Tipo
   ============================================================ */

(function() {
    'use strict';

    // Determina o prefixo de caminho com base na localização atual
    function getPrefixo() {
        const path = window.location.pathname;
        if (path.includes('/posts/')) return '../../';
        if (path.includes('/pages/')) return '../';
        if (path.includes('/Index/')) return '../';
        return '';
    }

    const prefixo = getPrefixo();

    // Obter ID da URL (para páginas mestras dinâmicas)
    function getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Criar card reutilizável
    function criarCard(item, prefixo) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.style.cssText = `
            background: var(--white);
            border: 1px solid var(--gray-border);
            border-radius: var(--radius);
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
            display: flex;
            gap: 15px;
            cursor: pointer;
        `;

        card.onmouseover = function() {
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            this.style.transform = 'translateY(-2px)';
        };

        card.onmouseout = function() {
            this.style.boxShadow = 'var(--shadow)';
            this.style.transform = 'translateY(0)';
        };

        // Imagem
        const img = document.createElement('img');
        img.src = item.imagem || item.icone || 'https://via.placeholder.com/80';
        img.alt = item.nome;
        img.style.cssText = `
            width: 80px;
            height: 80px;
            border-radius: 6px;
            object-fit: cover;
            flex-shrink: 0;
        `;

        // Conteúdo
        const content = document.createElement('div');
        content.style.flex = '1';

        const title = document.createElement('h3');
        title.style.cssText = 'margin: 0 0 5px 0; font-size: 16px; color: #0d47a1; font-weight: 700;';
        title.textContent = item.nome;

        const desc = document.createElement('p');
        desc.style.cssText = 'margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;';
        desc.textContent = item.descricao;

        const categoria = document.createElement('span');
        categoria.className = 'badge badge-cat';
        categoria.style.cssText = `
            display: inline-block;
            background: #0d47a1;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            margin-right: 8px;
        `;
        categoria.textContent = item.categoria;

        const data = document.createElement('span');
        data.style.cssText = 'font-size: 11px; color: #999;';
        data.textContent = '📅 ' + (item.data || 'Recente');

        content.appendChild(title);
        content.appendChild(desc);
        content.appendChild(categoria);
        content.appendChild(data);

        card.appendChild(img);
        card.appendChild(content);

        // Clique no card redireciona para o app
        card.onclick = function(e) {
            if (e.target.tagName !== 'A') {
                window.location.href = prefixo + item.url;
            }
        };

        return card;
    }

    // Função principal de renderização
    window.renderizarTudo = function() {
        if (!window.APPS_DATA) {
            console.warn('APPS_DATA não está disponível ainda');
            return;
        }

        const path = window.location.pathname;
        const urlId = getIdFromUrl();

        // ============= RENDERIZAR PÁGINA MESTRA DINÂMICA =============
        if (urlId) {
            let postItem = null;
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            
            for (let i = 0; i < todosItens.length; i++) {
                if (todosItens[i].id === urlId) {
                    postItem = todosItens[i];
                    break;
                }
            }

            if (postItem) {
                // Atualizar título e meta
                document.title = postItem.titulo + ' — Horizonte Tutoriais';
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) metaDesc.setAttribute('content', postItem.descricaoLonga);

                // Renderizar conteúdo do post
                const postBody = document.querySelector('.post-body');
                if (postBody) {
                    let recursosHtml = '';
                    if (postItem.recursos && postItem.recursos.length > 0) {
                        recursosHtml = '<h2>⭐ RECURSOS PRINCIPAIS ⭐⭐⭐</h2><ul>';
                        for (let i = 0; i < postItem.recursos.length; i++) {
                            recursosHtml += '<li>✅ ' + postItem.recursos[i] + '</li>';
                        }
                        recursosHtml += '</ul>';
                    }
                    postBody.innerHTML = '<p>' + (postItem.descricaoLonga || '') + '</p>' + recursosHtml;
                }

                // Renderizar tabela de especificações
                const infoTable = document.querySelector('.info-table');
                if (infoTable && postItem.especificacoes) {
                    const s = postItem.especificacoes;
                    infoTable.innerHTML = `
                        <tr><td>${postItem.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${postItem.nome}</td></tr>
                        <tr><td>Versão</td><td>${s.versao}</td></tr>
                        <tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                        <tr><td>Categoria</td><td>${s.categoria}</td></tr>
                        <tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                        <tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr>
                        <tr><td>Requer Android</td><td>${s.androidMin}</td></tr>
                        <tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr>
                    `;
                }

                // Renderizar botões de download
                const downloadBox = document.querySelector('.download-box');
                if (downloadBox) {
                    if (postItem.tipoDownload === 'multiplo') {
                        downloadBox.innerHTML = `
                            <p style="font-size:14px;font-weight:700;color:#c62828;margin-bottom:12px">⬇️ Clique abaixo para baixar o jogo</p>
                            <div class="download-options">
                                <a href="${postItem.linkDownload}" class="btn-download-option" target="_blank" rel="noopener">
                                    <i class="fas fa-file-archive"></i> BAIXAR APK
                                </a>
                                <a href="${postItem.linkDownloadData1}" class="btn-download-option alt" target="_blank" rel="noopener">
                                    <i class="fas fa-database"></i> BAIXAR DATA 1
                                </a>
                                <a href="${postItem.linkDownloadData2}" class="btn-download-option alt" target="_blank" rel="noopener">
                                    <i class="fas fa-database"></i> BAIXAR DATA 2
                                </a>
                            </div>
                            <p style="font-size:11px;color:#666;margin-top:10px">Link seguro verificado — Horizonte Tutoriais</p>
                        `;
                    } else {
                        downloadBox.innerHTML = `
                            <p style="font-size:14px;font-weight:700;color:#0d47a1;margin-bottom:12px">⬇️ Clique abaixo para baixar o aplicativo</p>
                            <a href="${postItem.linkDownload}" class="btn-big-download" target="_blank" rel="noopener">
                                <i class="fas fa-download"></i> DOWNLOAD
                            </a>
                            <p style="font-size:11px;color:#666;margin-top:10px">Link seguro verificado — Horizonte Tutoriais</p>
                        `;
                    }
                }

                // Renderizar botão de tutorial
                const tutorialsWidget = document.querySelector('.tutorials-widget');
                if (tutorialsWidget) {
                    tutorialsWidget.innerHTML = `
                        <a href="${prefixo}pages/tutoriais.html?open=${postItem.id}" class="btn-tutorial-direct">
                            <span><i class="fas fa-video"></i> TUTORIAIS</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    `;
                }

                // Renderizar breadcrumb
                const breadcrumb = document.querySelector('.breadcrumb');
                if (breadcrumb) {
                    breadcrumb.innerHTML = `
                        <a href="${prefixo}index.html">Lar</a>
                        <span>›</span>
                        <a href="${prefixo}pages/${postItem.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}.html">
                            ${postItem.categoria === 'Jogos' ? 'Jogos' : 'Aplicativos'}
                        </a>
                        <span>›</span>
                        ${postItem.nome}
                    `;
                }

                // Atualizar título, imagem e data
                const h1 = document.querySelector('.post-header h1');
                if (h1) h1.textContent = postItem.titulo;

                const img = document.querySelector('.post-featured-img');
                if (img) img.src = postItem.imagemCapa;

                const postDate = document.querySelector('.post-date');
                if (postDate) postDate.textContent = '📅 ' + postItem.data;
            }
            return;
        }

        // ============= RENDERIZAR CARDS NAS PÁGINAS DE LISTAGEM =============
        let container = document.querySelector('.popular-section');
        let dados = [];
        let titulo = '';

        // PÁGINA DE APLICATIVOS - Mostrar APENAS itens com categoria "Aplicativos"
        if (path.includes('/pages/aplicativos.html')) {
            dados = (window.APPS_DATA.aplicativos || []).filter(item => item.categoria === 'Aplicativos');
            titulo = '📱 Aplicativos';
        } 
        // PÁGINA DE JOGOS - Mostrar APENAS itens com categoria "Jogos"
        else if (path.includes('/pages/jogos.html')) {
            dados = (window.APPS_DATA.jogos || []).filter(item => item.categoria === 'Jogos');
            titulo = '🎮 Jogos';
        } 
        // PÁGINA QUENTE - Mostrar APENAS itens com tipo "quente"
        else if (path.includes('/pages/quente.html')) {
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            dados = todosItens.filter(item => item.tipo === 'quente');
            titulo = '🔥 Quente';
        } 
        // PÁGINA FERRAMENTAS
        else if (path.includes('/pages/ferramentas.html')) {
            dados = window.APPS_DATA.ferramentas || [];
            titulo = '🔧 Ferramentas';
        } 
        // PÁGINA INICIAL
        else if (path.includes('/Index/index.html') || path === '/' || path.endsWith('/index.html')) {
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            
            // Últimas Atualizações - TODOS os itens, ordenados por data
            const updateContainer = document.querySelector('.updates-grid');
            if (updateContainer) {
                updateContainer.innerHTML = '';
                const ultimasAtualizacoes = todosItens.sort((a, b) => new Date(b.data) - new Date(a.data));
                for (let i = 0; i < ultimasAtualizacoes.length; i++) {
                    updateContainer.appendChild(criarCard(ultimasAtualizacoes[i], prefixo));
                }
            }

            // Destaques - APENAS itens com destaque: true
            const popularContainer = document.querySelector('.popular-section');
            if (popularContainer) {
                popularContainer.innerHTML = '';
                const destaques = todosItens.filter(item => item.destaque === true);
                for (let i = 0; i < destaques.length; i++) {
                    popularContainer.appendChild(criarCard(destaques[i], prefixo));
                }
            }

            // Sidebar Populares - APENAS itens com tipo: "popular"
            const sidebarPopulares = document.getElementById('sidebar-populares');
            if (sidebarPopulares) {
                sidebarPopulares.innerHTML = '<h3 class="widget-title">🔥 Populares</h3>';
                const ul = document.createElement('ul');
                ul.style.listStyle = 'none';
                ul.style.padding = '0';
                const populares = todosItens.filter(item => item.tipo === 'popular');
                
                for (let i = 0; i < Math.min(populares.length, 5); i++) {
                    const li = document.createElement('li');
                    li.style.marginBottom = '8px';
                    li.innerHTML = `<a href="${prefixo + populares[i].url}" style="color:#0d47a1;text-decoration:none;font-size:13px;font-weight:600;">${populares[i].nome}</a>`;
                    ul.appendChild(li);
                }
                sidebarPopulares.appendChild(ul);
            }

            // Seção Quente - APENAS itens com tipo: "quente"
            const quenteContainer = document.querySelector('.quente-section');
            if (quenteContainer) {
                quenteContainer.innerHTML = '<h2 class="section-title">🔥 Quente Agora</h2>';
                const quentes = todosItens.filter(item => item.tipo === 'quente');
                for (let i = 0; i < quentes.length; i++) {
                    quenteContainer.appendChild(criarCard(quentes[i], prefixo));
                }
            }

            return;
        }

        // Renderizar cards na página de listagem
        if (container && dados.length > 0) {
            container.innerHTML = '<h1 class="section-title">' + titulo + '</h1>';
            for (let i = 0; i < dados.length; i++) {
                container.appendChild(criarCard(dados[i], prefixo));
            }
        }

        // ============= RENDERIZAR TUTORIAIS =============
        if (path.includes('/pages/tutoriais.html')) {
            const tutoriaisContainer = document.querySelector('.popular-section');
            if (tutoriaisContainer) {
                tutoriaisContainer.innerHTML = '<h1 class="section-title">📚 Tutoriais</h1>';
                const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
                
                for (let i = 0; i < todosItens.length; i++) {
                    const item = todosItens[i];
                    if (!item.tutorialTitulo) continue;

                    const tutorialCard = document.createElement('div');
                    tutorialCard.className = 'tutorial-card';
                    
                    let videosHtml = '';
                    if (item.videos && item.videos.length > 0) {
                        for (let v = 0; v < item.videos.length; v++) {
                            const video = item.videos[v];
                            videosHtml += `<div class="video-btn" onclick="openVideoModal('${item.id}', '${video.id}', '${video.titulo}')"><i class="fas fa-video"></i><span>${video.titulo}</span></div>`;
                        }
                    }

                    tutorialCard.innerHTML = `
                        <div class="tutorial-header"><img src="${item.icone || item.imagem}" alt="${item.nome}" class="tutorial-icon" /><div class="tutorial-info"><h3>${item.tutorialTitulo}</h3><p>${item.tutorialSubtitulo}</p></div></div>
                        <div class="tutorial-description">${item.tutorialDescricao}</div>
                        <div class="tutorial-buttons">
                            <button class="btn-specs" onclick="openSpecsModal('${item.id}')"><i class="fas fa-info-circle"></i> Specs</button>
                            <button class="btn-video" onclick="toggleVideoScroll('${item.id}')"><i class="fas fa-play-circle"></i> Assistir</button>
                            <a href="${prefixo}posts/${item.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}/${item.categoria === 'Jogos' ? 'jogo' : 'app'}.html?id=${item.id}" class="btn-download-tutorial"><i class="fas fa-download"></i> Baixar</a>
                        </div>
                        <div id="video-scroll-${item.id}" class="video-scroll-container"><div class="video-scroll-list">${videosHtml}</div></div>
                    `;
                    tutoriaisContainer.appendChild(tutorialCard);

                    // Modal de Specs
                    const modal = document.createElement('div');
                    modal.id = `modal-${item.id}`;
                    modal.className = 'modal';
                    modal.style.display = 'none';
                    const s = item.especificacoes;
                    modal.innerHTML = `<div class="modal-content"><div class="modal-header"><h2>${item.nome} - Specs</h2><button class="close-btn" onclick="closeSpecsModal('${item.id}')">&times;</button></div><table class="specs-table"><tr><td>${item.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${item.nome}</td></tr><tr><td>Versão</td><td>${s.versao}</td></tr><tr><td>Tamanho</td><td>${s.tamanho}</td></tr><tr><td>Categoria</td><td>${s.categoria}</td></tr><tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr><tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr><tr><td>Requer Android</td><td>${s.androidMin}</td></tr><tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr><tr><td>Recursos</td><td>${s.recursosEspecificacoes}</td></tr></table></div>`;
                    document.body.appendChild(modal);
                }
                
                // Auto-open
                const params = new URLSearchParams(window.location.search);
                const autoOpen = params.get('open');
                if (autoOpen) {
                    setTimeout(() => {
                        const scroll = document.getElementById('video-scroll-' + autoOpen);
                        if (scroll) { 
                            scroll.classList.add('active'); 
                            scroll.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                        }
                    }, 300);
                }
            }
        }
    };

    // Funções Globais
    window.openSpecsModal = function(id) { 
        const m = document.getElementById('modal-' + id); 
        if (m) { 
            m.style.display = 'block'; 
            document.body.style.overflow = 'hidden'; 
        } 
    };
    
    window.closeSpecsModal = function(id) { 
        const m = document.getElementById('modal-' + id); 
        if (m) { 
            m.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        } 
    };
    
    window.toggleVideoScroll = function(id) { 
        const s = document.getElementById('video-scroll-' + id); 
        if (s) s.classList.toggle('active'); 
    };
    
    window.openVideoModal = function(tid, vid, title) {
        const m = document.getElementById('modal-video-player');
        const i = document.getElementById('video-iframe');
        const t = document.getElementById('video-modal-title');
        if (m && i) { 
            t.textContent = '📺 ' + title; 
            i.src = 'https://www.youtube.com/embed/' + vid + '?autoplay=1'; 
            m.style.display = 'block'; 
            document.body.style.overflow = 'hidden'; 
        }
    };
    
    window.closeVideoModal = function() {
        const m = document.getElementById('modal-video-player');
        const i = document.getElementById('video-iframe');
        if (m && i) { 
            i.src = ''; 
            m.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        }
    };

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    } else {
        window.renderizarTudo();
    }
    
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();
