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

        // Adicionar ID para âncora se for ferramenta
        if (item.categoria === 'Ferramentas') {
            card.id = item.id;
        }

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
        btn.innerHTML = '<i class="fas fa-download" style="font-size:10px"></i> BAIXAR';

        card.appendChild(img);
        card.appendChild(badge);
        card.appendChild(title);
        card.appendChild(data);
        card.appendChild(btn);

        card.onclick = function() {
            window.location.href = prefixo + item.url;
        };

        return card;
    }

    // ============================================================
    // FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
    // ============================================================
    window.renderizarTudo = function() {
        if (!window.APPS_DATA) {
            console.error('Dados não encontrados!');
            return;
        }

        const path = window.location.pathname;

        // ============= RENDERIZAR PÁGINA DE POST (DETALHES) =============
        if (path.includes('/posts/')) {
            const id = getIdFromUrl();
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            const postItem = todosItens.find(item => item.id === id);

            if (postItem) {
                // Título e Meta
                document.title = postItem.nome + ' - Horizonte Tutoriais';
                const h1 = document.querySelector('.post-header h1');
                if (h1) h1.textContent = postItem.titulo || postItem.nome;

                // Tabela de Especificações
                const infoTable = document.querySelector('.info-table');
                if (infoTable) {
                    const s = postItem.especificacoes;
                    
                    let iconeUrlSpecs = postItem.icone || postItem.imagem || '';
                    if (iconeUrlSpecs.startsWith('../') && prefixo === '../../') {
                        iconeUrlSpecs = '../' + iconeUrlSpecs;
                    }

                    infoTable.innerHTML = `
                        <div style="text-align:center;margin-bottom:20px;">
                            <img src="${iconeUrlSpecs}" alt="${postItem.nome}" style="width:90px;height:90px;border-radius:18px;object-fit:contain;background:#ffffff;border:1px solid #eee;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
                        </div>
                        <tr><td>${postItem.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${postItem.nome}</td></tr>
                        <tr><td>Versão</td><td>${s.versao}</td></tr>
                        <tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                        <tr><td>Categoria</td><td>${s.categoria}</td></tr>
                        <tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                        <tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr>
                        <tr><td>Requer Android</td><td>${s.androidMin}</td></tr>
                        <tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr>
                        <tr><td>Recursos</td><td>${s.recursosEspecificacoes}</td></tr>
                    `;

                    // Adicionar botões de Feed e YouTube no centro direito (abaixo das specs)
                    const feedContainer = document.createElement('div');
                    feedContainer.style.cssText = 'margin-top:15px; display:flex; flex-direction:column; gap:10px;';
                    
                    const videoId = `feed-video-${postItem.id}`;
                    const feedPath = prefixo === '../../' ? '../../feed/feed.xml' : 'feed/feed.xml';

                    feedContainer.innerHTML = `
                        <div style="background: var(--green-btn); border-radius: 6px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
                            <button class="rss-copy-btn" onclick="handleFeedClickWithVideo(this, '${videoId}', '${feedPath}')" style="background: transparent; border: none; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 5px 0;">
                                <i class="fas fa-copy"></i> Copiar Link do Feed
                            </button>
                            <button onclick="toggleFeedVideo('${videoId}')" style="background: rgba(255,255,255,0.2); border: none; color: #fff; border-radius: 4px; padding: 6px; font-weight: 600; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; width: 100%;">
                                <i class="fas fa-video"></i> Como usar o FEED
                            </button>
                        </div>
                        <a href="https://www.youtube.com/@HorizonteTutoriais" target="_blank" style="background: #ff0000; color: #fff; text-decoration: none; padding: 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; display: flex; flex-direction: column; gap: 2px;">
                            <span><i class="fab fa-youtube"></i> CANAL HORIZONTE TUTORIAIS</span>
                            <span style="font-size: 9px; font-weight: 400; opacity: 0.9;">INSCREVA-SE E ATIVE O SINO DE NOTIFICAÇÕES</span>
                        </a>
                        <div id="${videoId}" style="display: none; width: 100%; border-radius: 8px; overflow: hidden; margin-top: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                            </div>
                        </div>
                    `;
                    infoTable.parentElement.appendChild(feedContainer);
                }

                // Área de Download
                const downloadBox = document.querySelector('.download-box');
                if (downloadBox) {
                    if (postItem.tipoDownload === 'multiplo') {
                        downloadBox.innerHTML = `
                            <p style="font-size: 14px; font-weight: 700; color: #c62828; margin-bottom: 12px">⬇️ Clique abaixo para baixar o jogo</p>
                            <div class="download-options">
                                <a href="${postItem.linkDownload}" class="btn-download-option" target="_blank"><i class="fas fa-file-archive"></i> BAIXAR APK</a>
                                <a href="${postItem.linkDownloadData1}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> BAIXAR DATA 1</a>
                                <a href="${postItem.linkDownloadData2}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> BAIXAR DATA 2</a>
                            </div>
                        `;
                    } else {
                        downloadBox.innerHTML = `
                            <p style="font-size: 14px; font-weight: 700; color: #0d47a1; margin-bottom: 12px">⬇️ Clique abaixo para baixar o aplicativo</p>
                            <a href="${postItem.linkDownload}" class="btn-big-download" target="_blank"><i class="fas fa-download"></i> DOWNLOAD</a>
                        `;
                    }
                }

                // Widgets da Sidebar
                const tutorialsWidget = document.querySelector('.tutorials-widget');
                if (tutorialsWidget) {
                    tutorialsWidget.innerHTML = `
                        <a href="${prefixo}pages/tutoriais.html?open=${postItem.id}" class="btn-tutorial-direct">
                            <span><i class="fas fa-video"></i> TUTORIAIS</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${prefixo}pages/ferramentas.html" class="btn-tutorial-direct" style="background: linear-gradient(135deg, #607d8b 0%, #455a64 100%); margin-top: 10px;">
                            <span><i class="fas fa-tools"></i> FERRAMENTAS</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    `;
                }

                // Imagem de Destaque
                const img = document.querySelector('.post-featured-img');
                if (img) {
                    let imagemFinal = postItem.imagemCapa || postItem.icone || postItem.imagem || 'https://via.placeholder.com/700x300';
                    if (imagemFinal.startsWith('../') && prefixo === '../../') {
                        imagemFinal = '../' + imagemFinal;
                    }
                    img.src = imagemFinal;
                    img.style.background = '#ffffff';
                    img.onload = function() {
                        const ratio = this.naturalWidth / this.naturalHeight;
                        if (postItem.id === 'resident-evil-4') {
                            img.style.objectFit = 'contain';
                            img.style.objectPosition = 'center center';
                            img.style.background = '#000';
                        } else if (ratio >= 0.8 && ratio <= 1.2) {
                            img.style.objectFit = 'contain';
                            img.style.objectPosition = 'center center';
                        } else {
                            img.style.objectFit = 'cover';
                            img.style.objectPosition = 'center top';
                        }
                    };
                }

                const postDate = document.querySelector('.post-date');
                if (postDate) postDate.textContent = '📅 ' + postItem.data;

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

                // REMOVER DEFINITIVAMENTE BOTÕES ACIMA DOS COMENTÁRIOS
                const telegramCta = document.querySelector('.telegram-cta');
                if (telegramCta) telegramCta.style.display = 'none';
                
                const youtubeCta = document.querySelector('.youtube-cta');
                if (youtubeCta) youtubeCta.style.display = 'none';
            }
            
            // Ajustar Mídias Sociais na Sidebar
            const sidebarWidgets = document.querySelectorAll('.sidebar-widget');
            sidebarWidgets.forEach(widget => {
                const title = widget.querySelector('.widget-title');
                if (title && (title.textContent.includes('Mídias Sociais') || title.textContent.includes('MÍDIAS SOCIAIS'))) {
                    title.innerHTML = '📱 MINHAS REDES SOCIAIS';
                }
            });

            return;
        }

        // ============= RENDERIZAR CARDS NAS PÁGINAS DE LISTAGEM =============
        let container = document.querySelector('.popular-section');
        let dados = [];
        let titulo = '';

        if (path.includes('/pages/aplicativos.html')) {
            dados = (window.APPS_DATA.aplicativos || []).filter(item => item.categoria === 'Aplicativos');
            titulo = '📱 Aplicativos';
        } else if (path.includes('/pages/jogos.html')) {
            dados = (window.APPS_DATA.jogos || []).filter(item => item.categoria === 'Jogos');
            titulo = '🎮 Jogos';
        } else if (path.includes('/pages/quente.html')) {
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            dados = todosItens.filter(item => item.tipo === 'quente');
            titulo = '🔥 Quente';
        } else if (path.includes('/pages/ferramentas.html')) {
            dados = window.APPS_DATA.ferramentas || [];
            titulo = '🔧 Ferramentas';
        } else if (path.includes('/Index/index.html') || path === '/' || path.endsWith('/index.html')) {
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];
            
            const updateContainer = document.querySelector('.updates-grid');
            if (updateContainer) {
                updateContainer.innerHTML = '';
                const ultimasAtualizacoes = todosItens.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
                for (let i = 0; i < ultimasAtualizacoes.length; i++) {
                    updateContainer.appendChild(criarUpdateCard(ultimasAtualizacoes[i], prefixo));
                }
            }

            const popularContainer = document.querySelector('.popular-section');
            if (popularContainer) {
                popularContainer.innerHTML = '<h2 class="section-title">⭐ Destaques</h2>';
                const destaques = todosItens.filter(item => item.destaque === true);
                for (let i = 0; i < destaques.length; i++) {
                    popularContainer.appendChild(criarCard(destaques[i], prefixo));
                }
            }

            const sidebarPopulares = document.getElementById('sidebar-populares');
            if (sidebarPopulares) {
                sidebarPopulares.innerHTML = '<h3 class="widget-title">🔥 Populares</h3>';
                const populares = todosItens.filter(item => item.tipo === 'popular');
                for (let i = 0; i < Math.min(populares.length, 5); i++) {
                    sidebarPopulares.appendChild(criarCard(populares[i], prefixo));
                }
            }

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

        if (container && dados.length > 0) {
            container.innerHTML = '<h1 class="section-title">' + titulo + '</h1>';
            let grid = container.querySelector('.apps-grid');
            if (!grid) {
                grid = document.createElement('div');
                grid.className = 'apps-grid';
                container.appendChild(grid);
            }
            for (let i = 0; i < dados.length; i++) {
                grid.appendChild(criarCard(dados[i], prefixo));
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
                        <div class="tutorial-buttons" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn-specs" onclick="openSpecsModal('${item.id}')" style="flex: 1; min-width: 120px;"><i class="fas fa-info-circle"></i> Specs</button>
                            <button class="btn-video" onclick="toggleVideoScroll('${item.id}')" style="flex: 1; min-width: 120px;"><i class="fas fa-play-circle"></i> Assistir</button>
                            
                            <div style="display: flex; gap: 10px; width: 100%; flex-wrap: wrap;">
                                <a href="${prefixo}posts/${item.categoria === 'Jogos' ? 'jogos' : 'aplicativos'}/${item.categoria === 'Jogos' ? 'jogo' : 'app'}.html?id=${item.id}" class="btn-download-tutorial" style="flex: 1; min-width: 140px; margin: 0;"><i class="fas fa-download"></i> Baixar</a>
                                <button class="btn-ferramenta-main" onclick="toggleFerramentasMenu('${item.id}')" style="background: linear-gradient(135deg, #607d8b 0%, #455a64 100%); flex: 1; min-width: 140px; padding: 12px 14px; border: none; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 5px; text-decoration: none; color: #fff;">
                                    <i class="fas fa-tools"></i> Ferramentas <i class="fas fa-chevron-down" style="font-size: 10px;"></i>
                                </button>
                            </div>

                            <div id="ferramentas-menu-${item.id}" style="display: none; gap: 5px; flex-wrap: wrap; width: 100%; margin-top: 5px; animation: fadeIn 0.3s ease;">
                                <a href="${prefixo}pages/ferramentas.html#superme" class="btn-ferramenta-tutorial" style="background: #455a64; flex: 1; min-width: 120px; padding: 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;"><i class="fas fa-download"></i> SuperMe</a>
                                <a href="${prefixo}pages/ferramentas.html#custom-patch-pro" class="btn-ferramenta-tutorial" style="background: #455a64; flex: 1; min-width: 120px; padding: 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;"><i class="fas fa-download"></i> Custom Patch Pro</a>
                                <a href="${prefixo}pages/ferramentas.html#mt-manager" class="btn-ferramenta-tutorial" style="background: #455a64; flex: 1; min-width: 120px; padding: 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;"><i class="fas fa-download"></i> MT Manager</a>
                            </div>
                        </div>
                        <div id="video-scroll-${item.id}" class="video-scroll-container">
                            <div class="video-scroll-list">${videosHtml}</div>
                        </div>
                    `;
                    tutoriaisContainer.appendChild(tutorialCard);

                    // Modal de Specs
                    const modal = document.createElement('div');
                    modal.id = 'modal-' + item.id;
                    modal.className = 'modal';
                    modal.style.display = 'none';
                    const s = item.especificacoes;
                    let iconeUrlModal = item.icone || item.imagem || '';
                    if (iconeUrlModal.startsWith('../') && prefixo === '../../') {
                        iconeUrlModal = '../' + iconeUrlModal;
                    }
                    
                    const videoId = `modal-feed-video-${item.id}`;
                    const feedPath = prefixo === '../../' ? '../../feed/feed.xml' : 'feed/feed.xml';

                    modal.innerHTML = `
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2>${item.nome} - Specs</h2>
                                <button class="close-btn" onclick="closeSpecsModal('${item.id}')">&times;</button>
                            </div>
                            <div style="text-align:center;margin-bottom:20px;">
                                <img src="${iconeUrlModal}" alt="${item.nome}" style="width:90px;height:90px;border-radius:18px;object-fit:contain;background:#ffffff;border:1px solid #eee;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
                            </div>
                            <table class="specs-table">
                                <tr><td>Versão</td><td>${s.versao}</td></tr>
                                <tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                                <tr><td>Categoria</td><td>${s.categoria}</td></tr>
                                <tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                                <tr><td>Android</td><td>${s.androidMin}</td></tr>
                                <tr><td>Atualizado</td><td>${s.atualizadoEm}</td></tr>
                            </table>
                            <div style="padding:15px; border-top:1px solid #eee; display: flex; flex-direction: column; gap: 10px;">
                                <div style="background: var(--green-btn); border-radius: 6px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
                                    <button class="rss-copy-btn" onclick="handleFeedClickWithVideo(this, '${videoId}', '${feedPath}')" style="background: transparent; border: none; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 5px 0;">
                                        <i class="fas fa-copy"></i> Copiar Link do Feed
                                    </button>
                                    <button onclick="toggleFeedVideo('${videoId}')" style="background: rgba(255,255,255,0.2); border: none; color: #fff; border-radius: 4px; padding: 6px; font-weight: 600; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; width: 100%;">
                                        <i class="fas fa-video"></i> Como usar o FEED
                                    </button>
                                </div>
                                <a href="https://www.youtube.com/@HorizonteTutoriais" target="_blank" style="background: #ff0000; color: #fff; text-decoration: none; padding: 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; display: flex; flex-direction: column; gap: 2px;">
                                    <span><i class="fab fa-youtube"></i> CANAL HORIZONTE TUTORIAIS</span>
                                    <span style="font-size: 9px; font-weight: 400; opacity: 0.9;">INSCREVA-SE E ATIVE O SINO DE NOTIFICAÇÕES</span>
                                </a>
                                <div id="${videoId}" style="display: none; width: 100%; border-radius: 8px; overflow: hidden; margin-top: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
            }
        }
    };

    // Funções Globais
    window.openSpecsModal = function(id) { 
        const m = document.getElementById('modal-' + id); 
        if (m) { m.style.display = 'block'; document.body.style.overflow = 'hidden'; } 
    };
    window.closeSpecsModal = function(id) { 
        const m = document.getElementById('modal-' + id); 
        if (m) { m.style.display = 'none'; document.body.style.overflow = 'auto'; } 
    };
    window.toggleVideoScroll = function(id) { 
        const s = document.getElementById('video-scroll-' + id); 
        if (s) s.classList.toggle('active'); 
    };
    window.toggleFerramentasMenu = function(id) {
        const menu = document.getElementById('ferramentas-menu-' + id);
        if (menu) {
            const isHidden = menu.style.display === 'none';
            menu.style.display = isHidden ? 'flex' : 'none';
            const btn = menu.previousElementSibling;
            const icon = btn.querySelector('.fa-chevron-down, .fa-chevron-up');
            if (icon) icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        }
    };
    window.openVideoModal = function(tid, vid, title) {
        const m = document.getElementById('modal-video-player');
        const i = document.getElementById('video-iframe');
        const t = document.getElementById('video-modal-title');
        if (m && i) { t.textContent = '📺 ' + title; i.src = 'https://www.youtube.com/embed/' + vid + '?autoplay=1'; m.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    };
    window.closeVideoModal = function() {
        const m = document.getElementById('modal-video-player');
        const i = document.getElementById('video-iframe');
        if (m && i) { i.src = ''; m.style.display = 'none'; document.body.style.overflow = 'auto'; }
    };

    // Função para o Feed
    window.toggleFeedVideo = function(videoId) {
        const v = document.getElementById(videoId);
        if (v) {
            v.style.display = v.style.display === 'none' ? 'block' : 'none';
            if (v.style.display === 'block') v.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    window.handleFeedClickWithVideo = function(btn, videoId, feedPath) {
        const fullUrl = window.location.origin + '/' + feedPath.replace(/\.\.\//g, '');
        navigator.clipboard.writeText(fullUrl).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Link Copiado!';
            setTimeout(() => btn.innerHTML = originalText, 2000);
        }).catch(err => console.error('Erro ao copiar:', err));
        window.toggleFeedVideo(videoId);
    };

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    } else {
        window.renderizarTudo();
    }
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();
