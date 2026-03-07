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
            return item;
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
    // CARD PADRÃO
    // ============================================================
    function criarCard(item, prefixo) {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.style.cssText = 'background:var(--white);border:1px solid var(--gray-border);border-radius:var(--radius);padding:15px;margin-bottom:15px;box-shadow:var(--shadow);transition:all 0.3s ease;display:flex;gap:15px;cursor:pointer;';
        if (item.categoria === 'Ferramentas') card.id = item.id;

        const img = document.createElement('img');
        img.src = item.icone || item.imagem || 'https://via.placeholder.com/80';
        img.style.cssText = 'width:80px;height:80px;border-radius:14px;object-fit:cover;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.13);';

        const content = document.createElement('div');
        content.style.flex = '1';
        content.innerHTML = `<h3 style="margin:0 0 5px 0;font-size:16px;color:#0d47a1;font-weight:700;">${item.nome}</h3>
                            <p style="margin:0 0 8px 0;font-size:13px;color:#666;line-height:1.4;">${item.descricao}</p>
                            <span class="badge badge-cat" style="display:inline-block;background:#0d47a1;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;font-weight:600;margin-right:8px;">${item.categoria}</span>
                            <span style="font-size:11px;color:#999;">📅 ${item.data || 'Recente'}</span>`;

        card.appendChild(img);
        card.appendChild(content);
        card.onclick = () => window.location.href = prefixo + item.url;
        return card;
    }

    // ============================================================
    // UPDATE CARD
    // ============================================================
    function criarUpdateCard(item, prefixo) {
        const card = document.createElement('div');
        card.className = 'update-card';
        card.style.cssText = 'background:var(--white);border:1px solid var(--gray-border);border-radius:var(--radius);padding:14px 10px 12px;text-align:center;transition:all 0.25s;cursor:pointer;display:flex;flex-direction:column;align-items:center;';
        
        card.innerHTML = `
            <img src="${item.icone || item.imagem}" style="width:64px;height:64px;border-radius:14px;object-fit:cover;margin-bottom:10px;box-shadow:0 2px 8px rgba(0,0,0,0.13);">
            <span style="display:inline-block;background:${item.categoria === 'Jogos' ? '#c62828' : '#0d47a1'};color:#fff;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;margin-bottom:6px;">${item.categoria}</span>
            <div style="font-size:12px;font-weight:700;color:var(--text-main);margin-bottom:4px;line-height:1.3;">${item.nome}</div>
            <div style="font-size:10px;color:#999;margin-bottom:10px;">📅 ${item.data || 'Recente'}</div>
            <a href="${prefixo + item.url}" class="btn-download" style="display:inline-flex;align-items:center;justify-content:center;gap:5px;background:var(--green-btn);color:#fff;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700;text-decoration:none;width:100%;margin-top:auto;"><i class="fas fa-download"></i> BAIXAR</a>
        `;
        card.onclick = () => window.location.href = prefixo + item.url;
        return card;
    }

    // ============================================================
    // RENDERIZAÇÃO PRINCIPAL
    // ============================================================
    window.renderizarTudo = function() {
        if (!window.APPS_DATA) return;
        const path = window.location.pathname;

        // --- PÁGINA DE POSTAGEM ---
        if (path.includes('/posts/')) {
            const id = getIdFromUrl();
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || []), ...(window.APPS_DATA.ferramentas || [])];
            const item = todosItens.find(i => i.id === id);

            if (item) {
                // Especificações
                const infoTable = document.querySelector('.info-table');
                if (infoTable) {
                    const s = item.especificacoes;
                    let iconeUrlSpecs = item.icone || item.imagem || '';
                    if (iconeUrlSpecs.startsWith('../') && prefixo === '../../') iconeUrlSpecs = '../' + iconeUrlSpecs;

                    infoTable.innerHTML = `
                        <div style="text-align:center;margin-bottom:20px;">
                            <img src="${iconeUrlSpecs}" style="width:90px;height:90px;border-radius:18px;object-fit:contain;background:#fff;border:1px solid #eee;box-shadow:0 4px 16px rgba(0,0,0,0.1);">
                        </div>
                        <tr><td>${item.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${item.nome}</td></tr>
                        <tr><td>Versão</td><td>${s.versao}</td></tr>
                        <tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                        <tr><td>Categoria</td><td>${s.categoria}</td></tr>
                        <tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                        <tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr>
                        <tr><td>Requer Android</td><td>${s.androidMin}</td></tr>
                        <tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr>
                    `;

                    // Botões de Feed e YouTube
                    let feedWrapper = document.getElementById('feed-btn-wrapper');
                    if (!feedWrapper) {
                        feedWrapper = document.createElement('div');
                        feedWrapper.id = 'feed-btn-wrapper';
                        feedWrapper.style.cssText = 'margin-top:15px;display:flex;flex-direction:column;gap:10px;';
                        
                        feedWrapper.innerHTML = `
                            <button class="rss-copy-btn" onclick="handleFeedClickWithVideo(this, 'post-feed-video')" style="width:100%;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:8px;"><i class="fas fa-copy"></i> Copiar Link do Feed</button>
                            <a href="https://www.youtube.com/@HorizonteTutoriais" target="_blank" style="background:#ff0000;color:#fff;text-decoration:none;padding:12px 10px;border-radius:6px;font-size:11px;font-weight:700;text-align:center;display:flex;flex-direction:column;gap:3px;">
                                <span><i class="fab fa-youtube"></i> CANAL HORIZONTE TUTORIAIS</span>
                                <span style="font-size:9px;font-weight:400;opacity:0.9;">INSCREVA-SE E ATIVE O SINO DE NOTIFICAÇÕES</span>
                            </a>
                            <div id="post-feed-video" style="display:none;width:100%;border-radius:8px;overflow:hidden;margin-top:5px;">
                                <div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>
                            </div>
                        `;
                        infoTable.parentElement.appendChild(feedWrapper);
                    }
                }

                // Download Box
                const downloadBox = document.querySelector('.download-box');
                if (downloadBox) {
                    if (item.tipoDownload === 'multiplo') {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#c62828;margin-bottom:12px">⬇️ Clique abaixo para baixar o jogo</p>
                            <div class="download-options">
                                <a href="${item.linkDownload}" class="btn-download-option" target="_blank"><i class="fas fa-file-archive"></i> BAIXAR APK</a>
                                <a href="${item.linkDownloadData1}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> BAIXAR DATA 1</a>
                                <a href="${item.linkDownloadData2}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> BAIXAR DATA 2</a>
                            </div>`;
                    } else {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#0d47a1;margin-bottom:12px">⬇️ Clique abaixo para baixar o aplicativo</p>
                            <a href="${item.linkDownload}" class="btn-big-download" target="_blank"><i class="fas fa-download"></i> DOWNLOAD</a>`;
                    }
                }

                // Imagem de Capa
                const imgCapa = document.querySelector('.post-featured-img');
                if (imgCapa) {
                    let srcCapa = item.imagemCapa || item.icone || item.imagem;
                    if (srcCapa.startsWith('../') && prefixo === '../../') srcCapa = '../' + srcCapa;
                    imgCapa.src = srcCapa;
                    if (item.id === 'resident-evil-4') { imgCapa.style.objectFit = 'contain'; imgCapa.style.background = '#000'; }
                }

                // Widgets Sidebar
                const tutWidget = document.querySelector('.tutorials-widget');
                if (tutWidget) {
                    tutWidget.innerHTML = `
                        <a href="${prefixo}pages/tutoriais.html?open=${item.id}" class="btn-tutorial-direct"><span><i class="fas fa-video"></i> TUTORIAIS</span><i class="fas fa-external-link-alt"></i></a>
                        <a href="${prefixo}pages/ferramentas.html" class="btn-tutorial-direct" style="background:#607d8b;margin-top:10px;"><span><i class="fas fa-tools"></i> FERRAMENTAS</span><i class="fas fa-external-link-alt"></i></a>
                    `;
                }

                // Outros campos
                const h1 = document.querySelector('.post-header h1'); if (h1) h1.textContent = item.titulo;
                const date = document.querySelector('.post-date'); if (date) date.textContent = '📅 ' + item.data;
                const bCat = document.querySelector('.badge-cat'); if (bCat) bCat.textContent = item.categoria;
                const telCta = document.querySelector('.telegram-cta'); if (telCta) telCta.style.display = 'none';
            }
        }

        // --- PÁGINAS DE LISTAGEM ---
        let listContainer = document.querySelector('.popular-section');
        let listDados = [];
        let listTitulo = '';

        if (path.includes('/pages/aplicativos.html')) { listDados = window.APPS_DATA.aplicativos; listTitulo = '📱 Aplicativos'; }
        else if (path.includes('/pages/jogos.html')) { listDados = window.APPS_DATA.jogos; listTitulo = '🎮 Jogos'; }
        else if (path.includes('/pages/quente.html')) { listDados = [...window.APPS_DATA.aplicativos, ...window.APPS_DATA.jogos].filter(i => i.tipo === 'quente'); listTitulo = '🔥 Quente'; }
        else if (path.includes('/pages/ferramentas.html')) { listDados = window.APPS_DATA.ferramentas; listTitulo = '🔧 Ferramentas'; const grid = document.querySelector('.apps-grid'); if (grid) listContainer = grid; }
        else if (path.includes('/index.html') || path === '/' || path.endsWith('/')) {
            const all = [...window.APPS_DATA.aplicativos, ...window.APPS_DATA.jogos];
            const upGrid = document.querySelector('.updates-grid');
            if (upGrid) { upGrid.innerHTML = ''; all.slice().sort((a,b) => new Date(b.data) - new Date(a.data)).forEach(i => upGrid.appendChild(criarUpdateCard(i, prefixo))); }
            const popSec = document.querySelector('.popular-section');
            if (popSec) { popSec.innerHTML = '<h2 class="section-title">⭐ Destaques</h2>'; all.filter(i => i.destaque).forEach(i => popSec.appendChild(criarCard(i, prefixo))); }
        }

        if (listContainer && listDados.length > 0 && !path.includes('index.html') && path !== '/') {
            listContainer.innerHTML = `<h2 class="section-title">${listTitulo}</h2>`;
            listDados.forEach(i => listContainer.appendChild(criarCard(i, prefixo)));
        }

        // --- PÁGINA DE TUTORIAIS ---
        if (path.includes('/pages/tutoriais.html')) {
            const tutsContainer = document.querySelector('.tutoriais-container');
            if (tutsContainer) {
                tutsContainer.innerHTML = '';
                [...window.APPS_DATA.aplicativos, ...window.APPS_DATA.jogos].forEach(raw => {
                    const i = gerarTutorialAutomatico(raw);
                    const card = document.createElement('div');
                    card.className = 'tutorial-card';
                    card.id = 'tutorial-' + i.id;
                    
                    let vHtml = '';
                    i.videos.forEach(v => {
                        vHtml += `<div class="video-item" onclick="openVideoModal('${i.id}','${v.id}','${v.titulo}')">
                            <div class="video-thumb"><img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg"><div class="play-overlay"><i class="fas fa-play"></i></div></div>
                            <div class="video-title">${v.titulo}</div></div>`;
                    });

                    card.innerHTML = `
                        <div class="tutorial-header"><img src="${i.icone || i.imagem}" class="tutorial-icon">
                        <div class="tutorial-info"><h3>${i.tutorialTitulo}</h3><p>${i.tutorialSubtitulo}</p></div></div>
                        <div class="tutorial-description">${i.tutorialDescricao}</div>
                        <div class="tutorial-buttons" style="display:flex;gap:10px;flex-wrap:wrap;">
                            <button class="btn-specs" onclick="openSpecsModal('${i.id}')" style="flex:1;"><i class="fas fa-info-circle"></i> Specs</button>
                            <button class="btn-video" onclick="toggleVideoScroll('${i.id}')" style="flex:1;"><i class="fas fa-play-circle"></i> Assistir</button>
                            <div style="display:flex;gap:10px;width:100%;">
                                <a href="${prefixo}posts/${i.categoria==='Jogos'?'jogos':'aplicativos'}/${i.categoria==='Jogos'?'jogo':'app'}.html?id=${i.id}" class="btn-download-tutorial" style="flex:1;"><i class="fas fa-download"></i> Baixar</a>
                                <button class="btn-ferramenta-main" onclick="toggleFerramentasMenu('${i.id}')" style="background:#607d8b;flex:1;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;"><i class="fas fa-tools"></i> Ferramentas <i class="fas fa-chevron-down"></i></button>
                            </div>
                            <div id="ferramentas-menu-${i.id}" style="display:none;gap:5px;width:100%;margin-top:5px;">
                                <a href="${prefixo}pages/ferramentas.html#superme" class="btn-ferramenta-tutorial" style="background:#455a64;flex:1;color:#fff;text-decoration:none;padding:8px;border-radius:4px;text-align:center;font-size:11px;">SuperMe</a>
                                <a href="${prefixo}pages/ferramentas.html#custom-patch-pro" class="btn-ferramenta-tutorial" style="background:#455a64;flex:1;color:#fff;text-decoration:none;padding:8px;border-radius:4px;text-align:center;font-size:11px;">Custom Patch Pro</a>
                                <a href="${prefixo}pages/ferramentas.html#mt-manager" class="btn-ferramenta-tutorial" style="background:#455a64;flex:1;color:#fff;text-decoration:none;padding:8px;border-radius:4px;text-align:center;font-size:11px;">MT Manager</a>
                            </div>
                        </div>
                        <div id="video-scroll-${i.id}" class="video-scroll-container"><div class="video-scroll-list">${vHtml}</div></div>
                    `;
                    tutsContainer.appendChild(card);

                    // Modal Specs
                    const modal = document.createElement('div');
                    modal.id = 'modal-' + i.id; modal.className = 'modal'; modal.style.display = 'none';
                    const s = i.especificacoes;
                    let iconeM = i.icone || i.imagem; if (iconeM.startsWith('../') && prefixo === '../../') iconeM = '../' + iconeM;
                    
                    modal.innerHTML = `
                        <div class="modal-content">
                            <div class="modal-header"><h2>${i.nome} - Specs</h2><button class="close-btn" onclick="closeSpecsModal('${i.id}')">&times;</button></div>
                            <div style="text-align:center;margin-bottom:20px;"><img src="${iconeM}" style="width:90px;height:90px;border-radius:18px;object-fit:contain;background:#fff;border:1px solid #eee;"></div>
                            <table class="specs-table">
                                <tr><td>Versão</td><td>${s.versao}</td></tr><tr><td>Tamanho</td><td>${s.tamanho}</td></tr>
                                <tr><td>Categoria</td><td>${s.categoria}</td></tr><tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr>
                                <tr><td>Android</td><td>${s.androidMin}</td></tr><tr><td>Atualizado</td><td>${s.atualizadoEm}</td></tr>
                            </table>
                            <div style="padding:15px;border-top:1px solid #eee;display:flex;flex-direction:column;gap:10px;">
                                <button class="rss-copy-btn" onclick="handleFeedClickWithVideo(this, 'modal-feed-video-${i.id}')" style="width:100%;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:8px;"><i class="fas fa-copy"></i> Copiar Link do Feed</button>
                                <a href="https://www.youtube.com/@HorizonteTutoriais" target="_blank" style="background:#ff0000;color:#fff;text-decoration:none;padding:12px 10px;border-radius:6px;font-size:11px;font-weight:700;text-align:center;display:flex;flex-direction:column;gap:3px;">
                                    <span><i class="fab fa-youtube"></i> CANAL HORIZONTE TUTORIAIS</span>
                                    <span style="font-size:9px;font-weight:400;opacity:0.9;">INSCREVA-SE E ATIVE O SINO DE NOTIFICAÇÕES</span>
                                </a>
                                <div id="modal-feed-video-${i.id}" style="display:none;width:100%;border-radius:8px;overflow:hidden;margin-top:5px;">
                                    <div style="position:relative;padding-bottom:56.25%;height:0;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                });
            }
        }

        // Redes Sociais Sidebar
        document.querySelectorAll('.widget-title').forEach(t => {
            if (t.textContent.includes('Mídias Sociais') || t.textContent.includes('MÍDIAS SOCIAIS')) t.innerHTML = '📱 MINHAS REDES SOCIAIS';
        });
    };

    // Funções Globais
    window.openSpecsModal = id => { const m = document.getElementById('modal-'+id); if(m){m.style.display='block';document.body.style.overflow='hidden';} };
    window.closeSpecsModal = id => { const m = document.getElementById('modal-'+id); if(m){m.style.display='none';document.body.style.overflow='auto';} };
    window.toggleVideoScroll = id => { const s = document.getElementById('video-scroll-'+id); if(s) s.classList.toggle('active'); };
    window.toggleFerramentasMenu = id => { const m = document.getElementById('ferramentas-menu-'+id); if(m) m.style.display = m.style.display==='none'?'flex':'none'; };
    window.openVideoModal = (tid, vid, title) => {
        const m = document.getElementById('modal-video-player'), i = document.getElementById('video-iframe'), t = document.getElementById('video-modal-title');
        if (m && i) { t.textContent = '📺 ' + title; i.src = 'https://www.youtube.com/embed/' + vid + '?autoplay=1'; m.style.display = 'block'; document.body.style.overflow = 'hidden'; }
    };
    window.closeVideoModal = () => {
        const m = document.getElementById('modal-video-player'), i = document.getElementById('video-iframe');
        if (m && i) { i.src = ''; m.style.display = 'none'; document.body.style.overflow = 'auto'; }
    };
    window.handleFeedClickWithVideo = function(btn, videoId) {
        const path = window.location.pathname;
        let pFeed = '';
        if (path.includes('/posts/')) pFeed = '../../'; else if (path.includes('/pages/')) pFeed = '../';
        const fPath = pFeed + 'feed/feed.xml';
        
        if (window.copyToClipboard) window.copyToClipboard(fPath);
        else {
            const url = window.location.origin + '/' + fPath.replace(/\.\.\//g, '');
            navigator.clipboard.writeText(url).then(() => {
                const old = btn.innerHTML; btn.innerHTML = '<i class="fas fa-check"></i> Link Copiado!';
                setTimeout(() => btn.innerHTML = old, 2000);
            });
        }
        const v = document.getElementById(videoId); if (v) { v.style.display = v.style.display==='none'?'block':'none'; if(v.style.display==='block') v.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    else window.renderizarTudo();
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();
