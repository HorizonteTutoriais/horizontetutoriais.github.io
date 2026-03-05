/* ============================================================
   HORIZONTE TUTORIAIS — Motor de Automação Total v7
   Lógica: Herança de Template + Propagação + Tutoriais Automáticos
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

    function criarTutorialSection(item) {
        const section = document.createElement('div');
        section.className = 'tutorial-item';
        section.id = `tutorial-${item.id}`;
        section.style.cssText = `background: var(--white); border: 1px solid var(--gray-border); border-radius: var(--radius); padding: 20px; margin-bottom: 30px; box-shadow: var(--shadow);`;
        
        let videosHtml = '';
        if (item.videos && item.videos.length) {
            videosHtml = `<div class="video-container" style="margin-top: 20px; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
                <iframe src="https://www.youtube.com/embed/${item.videos[0].id}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
            </div>`;
        }

        section.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <img src="${item.icone || item.imagem}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                <div>
                    <h2 style="margin: 0; font-size: 20px; color: var(--blue-dark);">${item.tutorialTitulo || 'Tutorial: ' + item.nome}</h2>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">${item.tutorialSubtitulo || ''}</p>
                </div>
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #444;">${item.tutorialDescricao || item.descricaoLonga || ''}</p>
            ${videosHtml}
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <a href="${prefixo}${item.url}" class="btn-download" style="background: var(--blue-primary); color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">IR PARA DOWNLOAD</a>
            </div>
        `;
        return section;
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
                document.title = postItem.titulo + ' — Horizonte Tutoriais';
                const h1 = document.querySelector('.post-header h1');
                if (h1) h1.textContent = postItem.titulo;
                const img = document.querySelector('.post-featured-img');
                if (img) {
                    img.src = postItem.imagemCapa;
                    img.style.cssText = `width: 100%; max-height: 320px; object-fit: contain; background: #1a73e8; border-radius: var(--radius); margin-bottom: 16px;`;
                }
                const postBody = document.querySelector('.post-body');
                if (postBody) {
                    let rec = postItem.recursos && postItem.recursos.length ? `<h2>⭐ RECURSOS PRINCIPAIS ⭐⭐⭐</h2><ul>${postItem.recursos.map(r => `<li>✅ ${r}</li>`).join('')}</ul>` : '';
                    postBody.innerHTML = `<p>${postItem.descricaoLonga || ''}</p>${rec}`;
                }
                const infoTable = document.querySelector('.info-table');
                if (infoTable && postItem.especificacoes) {
                    const s = postItem.especificacoes;
                    const containerPai = infoTable.parentElement;
                    document.querySelectorAll('.specs-header-custom').forEach(e => e.remove());
                    const specsHeader = document.createElement('div');
                    specsHeader.className = 'specs-header-custom';
                    specsHeader.style.cssText = `display: flex; align-items: center; gap: 15px; margin-top: 25px; margin-bottom: 15px; padding: 12px; background: #f0f4ff; border-radius: 8px; border-left: 4px solid var(--blue-primary);`;
                    specsHeader.innerHTML = `<img src="${postItem.icone || postItem.imagem}" style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.15); background: #fff;"><div><h2 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--blue-dark);">📊 ESPECIFICAÇÕES DO ${postItem.categoria.toUpperCase()}</h2></div>`;
                    containerPai.insertBefore(specsHeader, infoTable);
                    containerPai.querySelectorAll('h2.section-title').forEach(t => { if (t.textContent.includes('ESPECIFICAÇÕES')) t.remove(); });
                    infoTable.innerHTML = `<tr><td>${postItem.categoria === 'Jogos' ? 'Jogo' : 'Aplicativo'}</td><td>${postItem.nome}</td></tr><tr><td>Versão</td><td>${s.versao}</td></tr><tr><td>Tamanho</td><td>${s.tamanho}</td></tr><tr><td>Categoria</td><td>${s.categoria}</td></tr><tr><td>Desenvolvedor</td><td>${s.desenvolvedor}</td></tr><tr><td>Tipo do Arquivo</td><td>${s.tipoArquivo}</td></tr><tr><td>Requer Android</td><td>${s.androidMin}</td></tr><tr><td>Atualizado em</td><td>${s.atualizadoEm}</td></tr>`;
                }
                const downloadBox = document.querySelector('.download-box');
                if (downloadBox) {
                    if (postItem.categoria === 'Jogos' || postItem.tipoDownload === 'multiplo') {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#c62828;margin-bottom:12px">⬇️ Clique abaixo para baixar o jogo</p><div class="download-options"><a href="${postItem.linkDownload}" class="btn-download-option" target="_blank"><i class="fas fa-file-archive"></i> BAIXAR APK</a><a href="${postItem.linkDownloadData1 || '#'}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> DATA 1</a><a href="${postItem.linkDownloadData2 || '#'}" class="btn-download-option alt" target="_blank"><i class="fas fa-database"></i> DATA 2</a></div>`;
                    } else {
                        downloadBox.innerHTML = `<p style="font-size:14px;font-weight:700;color:#0d47a1;margin-bottom:12px">⬇️ Clique abaixo para baixar o aplicativo</p><a href="${postItem.linkDownload}" class="btn-big-download" target="_blank"><i class="fas fa-download"></i> DOWNLOAD</a>`;
                    }
                }
            }
            return;
        }

        // 2. MOTOR DE TUTORIAIS AUTOMÁTICO (PÁGINA TUTORIAIS)
        if (path.includes('tutoriais.html')) {
            const tutorialContainer = document.querySelector('.popular-section, #tutoriais-container');
            if (tutorialContainer) {
                tutorialContainer.innerHTML = '<h1 class="section-title">📖 Tutoriais Completos</h1>';
                todosItens.forEach(item => {
                    tutorialContainer.appendChild(criarTutorialSection(item));
                });
            }
            return;
        }

        // 3. MOTOR DE INJEÇÃO MÚLTIPLA (PÁGINAS DE LISTAGEM)
        const genericContainer = document.querySelector('.popular-section');
        const containers = {
            quente: document.querySelector('.quente-section, #quente-container'),
            popular: document.querySelector('.popular-section, #popular-container'),
            destaque: document.querySelector('.destaque-section, #destaque-container'),
            recentes: document.querySelector('.recentes-section, #recentes-container')
        };

        if (genericContainer) {
            todosItens.forEach(item => {
                // Filtro por Categoria Física
                if (path.includes('aplicativos.html') && item.categoria === 'Aplicativos') genericContainer.appendChild(criarCard(item, prefixo));
                if (path.includes('jogos.html') && item.categoria === 'Jogos') genericContainer.appendChild(criarCard(item, prefixo));
                
                // Filtro por Tipo Quente
                if (path.includes('quente.html') && item.tipo === 'quente') genericContainer.appendChild(criarCard(item, prefixo));
                
                // Filtro por Index (Popular e Destaque)
                if ((path.includes('index.html') || path === '/' || path.endsWith('/')) && (item.tipo === 'popular' || item.tipo === 'quente' || item.popular === true || item.destaque === true)) {
                    genericContainer.appendChild(criarCard(item, prefixo));
                }
            });
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    else window.renderizarTudo();
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();        const container = document.querySelector('.popular-section');
        if (container) {
            let dadosFiltrados = [];
            let tituloSecao = '';
            const todosItens = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])];

            // PÁGINA: Aplicativos (aplicativos.html)
            if (path.includes('aplicativos.html')) {
                dadosFiltrados = window.APPS_DATA.aplicativos || [];
                tituloSecao = '📱 Aplicativos';
            } 
            // PÁGINA: Jogos (jogos.html)
            else if (path.includes('jogos.html')) {
                dadosFiltrados = window.APPS_DATA.jogos || [];
                tituloSecao = '🎮 Jogos';
            }
            // PÁGINA: Quente (quente.html)
            else if (path.includes('quente.html')) {
                // PROPAGAÇÃO: Aparece aqui se tipo for "quente"
                dadosFiltrados = todosItens.filter(item => item.tipo === 'quente');
                tituloSecao = '🔥 Conteúdo Quente';
            }
            // PÁGINA: Inicial (index.html)
            else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
                // PROPAGAÇÃO: Aparece aqui se tipo for "popular" ou "quente"
                dadosFiltrados = todosItens.filter(item => item.tipo === 'popular' || item.tipo === 'quente' || item.popular === true || item.destaque === true);
                tituloSecao = '⭐ Populares e Destaques';
            }

            if (dadosFiltrados.length > 0) {
                container.innerHTML = `<h1 class="section-title">${tituloSecao}</h1>`;
                // Ordenar por data (Últimas Atualizações) - Sempre Propaga para Últimas Atualizações
                dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
                dadosFiltrados.forEach(item => {
                    container.appendChild(criarCard(item, prefixo));
                });
            }
        }
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    else window.renderizarTudo();
    document.addEventListener('dadosProntos', window.renderizarTudo);
})();
