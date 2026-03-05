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

    // ============================================================
    // TEMPLATES DE HERANÇA AUTOMÁTICA PARA TUTORIAIS
    // ============================================================
    const tutorialTemplates = {
        aplicativos: {
            titulo: "📱 Como Usar o {nome}",
            subtitulo: "Aprenda a usar {nome} no seu Android com dicas práticas e fáceis de seguir.",
            descricao: "Neste tutorial completo, você aprenderá como instalar, configurar e usar {nome} no seu dispositivo Android. Perfeito para aproveitar ao máximo todas as funcionalidades do aplicativo.",
            videos: [
                { "titulo": "Tutorial Parte 1", "id": "XDhx-rdHSmY" },
                { "titulo": "Configuração", "id": "XDhx-rdHSmY" },
                { "titulo": "Dicas Extras", "id": "XDhx-rdHSmY" },
                { "titulo": "Avançado", "id": "XDhx-rdHSmY" },
                { "titulo": "Troubleshooting", "id": "XDhx-rdHSmY" },
                { "titulo": "FAQ", "id": "XDhx-rdHSmY" }
            ]
        },
        jogos: {
            titulo: "🎮 Como Jogar {nome}",
            subtitulo: "Guia completo para instalar e dominar {nome} no seu celular.",
            descricao: "Descubra como instalar {nome} no seu Android, configure os controles para melhor experiência, e aprenda as melhores estratégias para vencer. Um tutorial passo a passo para iniciantes e veteranos.",
            videos: [
                { "titulo": "Instalação APK", "id": "XDhx-rdHSmY" },
                { "titulo": "Configurar Dados", "id": "XDhx-rdHSmY" },
                { "titulo": "Gameplay", "id": "XDhx-rdHSmY" },
                { "titulo": "Dicas de Combate", "id": "XDhx-rdHSmY" },
                { "titulo": "Controles", "id": "XDhx-rdHSmY" },
                { "titulo": "Gráficos & Performance", "id": "XDhx-rdHSmY" },
                { "titulo": "Troubleshooting", "id": "XDhx-rdHSmY" },
                { "titulo": "FAQ", "id": "XDhx-rdHSmY" }
            ]
        }
    };

    // Função para gerar tutorial automático se não existir
    function gerarTutorialAutomatico(item) {
        if (item.tutorialTitulo) {
            return item; // Já tem tutorial customizado
        }

        const template = item.categoria === 'Jogos' ? tutorialTemplates.jogos : tutorialTemplates.aplicativos;
        
        return {
            ...item,
            tutorialTitulo: template.titulo.replace('{nome}', item.nome),
            tutorialSubtitulo: template.subtitulo.replace('{nome}', item.nome),
            tutorialDescricao: template.descricao.replace('{nome}', item.nome),
            videos: template.videos
        };
    }

    // ============================================================
    // CARD PADRÃO — usado em Destaques, Aplicativos, Jogos, etc.
    // ============================================================
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
        img.src = item.icone || item.imagem || 'https://via.placeholder.com/80';
        img.alt = item.nome;
        img.style.cssText = `
            width: 80px;
            height: 80px;
            border-radius: 14px;
            object-fit: cover;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.13);
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

    // ============================================================
    // UPDATE CARD — estilo moderno para "Últimas Atualizações"
    // Grade de 4 colunas com ícone centralizado + badge + botão
    // ============================================================
    function criarUpdateCard(item, prefixo) {
        const card = document.createElement('div');
        card.className = 'update-card';
        card.style.cssText = `
            background: var(--white);
            border: 1px solid var(--gray-border);
            border-radius: var(--radius);
            padding: 14px 10px 12px;
            text-align: center;
            transition: box-shadow 0.25s, transform 0.25s;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
        `;

        card.onmouseover = function() {
            this.style.boxShadow = '0 6px 18px rgba(0,0,0,0.13)';
            this.style.transform = 'translateY(-3px)';
        };
        card.onmouseout = function() {
            this.style.boxShadow = 'var(--shadow)';
            this.style.transform = 'translateY(0)';
        };

        // Ícone
        const img = document.createElement('img');
        img.src = item.icone || item.imagem || 'https://via.placeholder.com/56';
        img.alt = item.nome;
        img.style.cssText = `
            width: 64px;
            height: 64px;
            border-radius: 14px;
            object-fit: cover;
            margin: 0 auto 10px;
            display: block;
            box-shadow: 0 2px 8px rgba(0,0,0,0.13);
        `;

        // Badge de categoria
        const badge = document.createElement('span');
        badge.style.cssText = `
            display: inline-block;
            background: ${item.categoria === 'Jogos' ? '#c62828' : '#0d47a1'};
            color: #fff;
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            margin-bottom: 6px;
            letter-spacing: 0.3px;
        `;
        badge.textContent = item.categoria;

        // Título
        const title = document.createElement('div');
        title.className = 'card-title';
        title.style.cssText = `
            font-size: 12px;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 4px;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            width: 100%;
        `;
        title.textContent = item.nome;

        // Data
        const data = document.createElement('div');
        data.style.cssText = `
            font-size: 10px;
            color: #999;
            margin-bottom: 10px;
        `;
        data.textContent = '📅 ' + (item.data || 'Recente');

        // Botão de download
        const btn = document.createElement('a');
        btn.href = prefixo + item.url;
        btn.className = 'btn-download';
        btn.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: var(--green-btn);
            color: #fff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
            transition: background 0.2s, transform 0.15s;
            width: 100%;
            margin-top: auto;
        `;
        btn.innerHTML = '<i class="fas fa-download" style="font-size:10px"></i> Baixar';
        btn.onclick = function(e) { e.stopPropagation(); };

        card.appendChild(img);
        card.appendChild(badge);
        card.appendChild(title);
        card.appendChild(data);
        card.appendChild(btn);

        // Clique no card (fora do botão) também navega
        card.onclick = function(e) {
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
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

                // Renderizar ícone + tabela de especificações
                const infoTable = document.querySelector('.info-table');
                if (infoTable && postItem.especificacoes) {
                    const s = postItem.especificacoes;
                    const iconeUrl = postItem.icone || postItem.imagem || '';

                    // Inserir ícone acima da tabela se existir
                    let iconWrapper = document.getElementById('spec-icon-wrapper');
                    if (!iconWrapper && iconeUrl) {
                        iconWrapper = document.createElement('div');
                        iconWrapper.id = 'spec-icon-wrapper';
                        iconWrapper.style.cssText = `
                            text-align: center;
                            margin-bottom: 14px;
                        `;
                        const iconImg = document.createElement('img');
                        iconImg.src = iconeUrl;
                        iconImg.alt = postItem.nome;
                        iconImg.style.cssText = `
                            width: 90px;
                            height: 90px;
                            border-radius: 18px;
                            object-fit: cover;
                            box-shadow: 0 4px 16px rgba(0,0,0,0.18);
                            display: inline-block;
                        `;
                        iconWrapper.appendChild(iconImg);
                        infoTable.parentElement.insertBefore(iconWrapper, infoTable);
                    }

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
                if (img) {
                    // Usar imagemCapa se disponível, senão usar ícone
                    const imagemFinal = postItem.imagemCapa || postItem.icone || postItem.imagem || 'https://via.placeholder.com/700x300';
                    img.src = imagemFinal;
                    
                    // Aplicar cor de fundo dinamica: Azul para Apps, Vermelho para Jogos
                    const corFundo = postItem.categoria === 'Jogos' 
                        ? 'linear-gradient(135deg, #c62828 0%, #d32f2f 100%)' 
                        : 'linear-gradient(135deg, #1a73e8 0%, #1565c0 100%)';
                    img.style.background = corFundo;
                    
                    // Detectar se eh icone (quadrado) ou banner (retangular) e ajustar tamanho
                    img.onload = function() {
                        const ratio = this.naturalWidth / this.naturalHeight;
                        // Se a proporcao for proxima de 1 (quadrado = icone), usar contain
                        if (ratio >= 0.8 && ratio <= 1.2) {
                            img.style.objectFit = 'contain';
                            img.style.objectPosition = 'center center';
                        } else {
                            // Se for retangular (banner), usar cover com foco no topo
                            img.style.objectFit = 'cover';
                            img.style.objectPosition = 'center top';
                        }
                    };
                }

                const postDate = document.querySelector('.post-date');
                if (postDate) postDate.textContent = '📅 ' + postItem.data;

                // Atualizar badges de categoria/tipo
                const badgeCat = document.querySelector('.badge-cat');
                if (badgeCat) badgeCat.textContent = postItem.categoria;

                const badgeHot = document.querySelector('.badge-hot');
                if (badgeHot) {
                    if (postItem.tipo === 'quente') {
                        badgeHot.textContent = '🔥 Quente';
                        badgeHot.style.display = 'inline-block';
                    } else if (postItem.tipo === 'popular') {
                        badgeHot.textContent = '⭐ Popular';
                        badgeHot.style.display = 'inline-block';
                    } else {
                        badgeHot.style.display = 'none';
                    }
                }
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
            
            // Últimas Atualizações — usa criarUpdateCard (estilo grade moderno)
            const updateContainer = document.querySelector('.updates-grid');
            if (updateContainer) {
                updateContainer.innerHTML = '';
                const ultimasAtualizacoes = todosItens.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
                for (let i = 0; i < ultimasAtualizacoes.length; i++) {
                    updateContainer.appendChild(criarUpdateCard(ultimasAtualizacoes[i], prefixo));
                }
            }

            // Destaques - APENAS itens com destaque: true
            const popularContainer = document.querySelector('.popular-section');
            if (popularContainer) {
                popularContainer.innerHTML = '<h2 class="section-title">⭐ Destaques</h2>';
                const destaques = todosItens.filter(item => item.destaque === true);
                for (let i = 0; i < destaques.length; i++) {
                    popularContainer.appendChild(criarCard(destaques[i], prefixo));
                }
            }

            // Sidebar Populares - APENAS itens com tipo: "popular"
            const sidebarPopulares = document.getElementById('sidebar-populares');
            if (sidebarPopulares) {
                sidebarPopulares.innerHTML = '<h3 class="widget-title">🔥 Populares</h3>';
                const populares = todosItens.filter(item => item.tipo === 'popular');
                
                for (let i = 0; i < Math.min(populares.length, 5); i++) {
                    sidebarPopulares.appendChild(criarCard(populares[i], prefixo));
                }
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
                    let item = todosItens[i];
                    
                    // Aplicar herança automática de tutorial se não tiver customizado
                    item = gerarTutorialAutomatico(item);

                    const tutorialCard = document.createElement('div');
                    tutorialCard.className = 'tutorial-card';
                    
                    let videosHtml = '';
                    if (item.videos && item.videos.length > 0) {
                        for (let v = 0; v < item.videos.length; v++) {
                            const video = item.videos[v];
                            videosHtml += `<div class="video-btn" onclick="openVideoModal('${item.id}', '${video.id}', '${video.titulo}')"><i class="fas fa-video"></i><span>${video.titulo}</span></div>`;
                        }
                    }

                    const iconeUrl = item.icone || item.imagem || 'https://via.placeholder.com/80';

                    tutorialCard.innerHTML = `
                        <div class="tutorial-header">
                            <img src="${iconeUrl}" alt="${item.nome}" class="tutorial-icon" />
                            <div class="tutorial-info">
                                <h3>${item.tutorialTitulo}</h3>
                                <p>${item.tutorialSubtitulo}</p>
                            </div>
                        </div>
                        <div class="tutorial-description">${item.tutorialDescricao}</div>
                        <div class="tutorial-buttons">
                            <button class="btn-specs" onclick="openSpecsModal('${item.id}')"><i class="fas fa-info-circle"></i> Specs</button>
                            <button class="btn-video" onclick="toggleVideoScroll('${item.id}')"><i class="fas fa-play-circle"></i> Assistir</button>
                            <a href="${prefixo}posts/${item.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}/${item.categoria === 'Jogos' ? 'jogo' : 'app'}.html?id=${item.id}" class="btn-download-tutorial"><i class="fas fa-download"></i> Baixar</a>
                        </div>
                        <div id="video-scroll-${item.id}" class="video-scroll-container">
                            <div class="video-scroll-list">${videosHtml}</div>
                        </div>
                    `;
                    tutoriaisContainer.appendChild(tutorialCard);

                    // Modal de Specs — com ícone do app/jogo
                    const modal = document.createElement('div');
                    modal.id = 'modal-' + item.id;
                    modal.className = 'modal';
                    modal.style.display = 'none';
                    const s = item.especificacoes;
                    
                    let modalHTML = '<div class="modal-content">';
                    modalHTML += '<div class="modal-header"><h2>' + item.nome + ' - Specs</h2>';
                    modalHTML += '<button class="close-btn" onclick="closeSpecsModal(\'' + item.id + '\')">&times;</button></div>';
                    modalHTML += '<div style="text-align:center;padding:15px 15px 5px;">';
                    modalHTML += '<img src="' + iconeUrl + '" alt="' + item.nome + '" style="width:90px;height:90px;border-radius:18px;object-fit:cover;box-shadow:0 4px 16px rgba(0,0,0,0.18);">';
                    modalHTML += '</div>';
                    modalHTML += '<table class="specs-table">';
                    modalHTML += '<tr><td>' + (item.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo') + '</td><td>' + item.nome + '</td></tr>';
                    modalHTML += '<tr><td>Versão</td><td>' + s.versao + '</td></tr>';
                    modalHTML += '<tr><td>Tamanho</td><td>' + s.tamanho + '</td></tr>';
                    modalHTML += '<tr><td>Categoria</td><td>' + s.categoria + '</td></tr>';
                    modalHTML += '<tr><td>Desenvolvedor</td><td>' + s.desenvolvedor + '</td></tr>';
                    modalHTML += '<tr><td>Tipo do Arquivo</td><td>' + s.tipoArquivo + '</td></tr>';
                    modalHTML += '<tr><td>Requer Android</td><td>' + s.androidMin + '</td></tr>';
                    modalHTML += '<tr><td>Atualizado em</td><td>' + s.atualizadoEm + '</td></tr>';
                    modalHTML += '<tr><td>Recursos</td><td>' + s.recursosEspecificacoes + '</td></tr>';
                    modalHTML += '</table></div>';
                    
                    modal.innerHTML = modalHTML;
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
