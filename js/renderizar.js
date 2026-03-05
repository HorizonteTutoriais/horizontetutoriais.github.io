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
        let id = params.get('id');
        
        // Fallback: Se não houver ID na URL, tenta identificar pelo nome do arquivo HTML
        if (!id) {
            const path = window.location.pathname;
            if (path.includes('horizon-clicker')) id = 'horizon-clicker';
            if (path.includes('horizon-tela-ligada')) id = 'horizon-tela-ligada';
        }
        return id;
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
                    
                    // Adicionar cabeçalho com ícone antes da tabela
                    const containerPai = infoTable.parentElement;
                    const headerExistente = document.querySelector('.specs-header-custom');
                    if (headerExistente) headerExistente.remove();

                    const specsHeader = document.createElement('div');
                    specsHeader.className = 'specs-header-custom';
                    specsHeader.style.cssText = `
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-top: 25px;
                        margin-bottom: 15px;
                        padding: 12px;
                        background: #f0f4ff;
                        border-radius: 8px;
                        border-left: 4px solid var(--blue-primary);
                    `;

                    const iconImg = document.createElement('img');
                    iconImg.src = postItem.icone || postItem.imagem || 'https://via.placeholder.com/80';
                    iconImg.style.cssText = `
                        width: 70px;
                        height: 70px;
                        border-radius: 8px;
                        object-fit: cover;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                        background: #fff;
                    `;

                    const titleWrapper = document.createElement('div');
                    const titleH2 = document.createElement('h2');
                    titleH2.textContent = '📊 ESPECIFICAÇÕES DO ' + (postItem.categoria === 'Jogos' ? 'JOGO' : 'APLICATIVO');
                    titleH2.style.cssText = 'margin: 0; font-size: 16px; font-weight: 700; color: var(--blue-dark);';
                    titleWrapper.appendChild(titleH2);

                    specsHeader.appendChild(iconImg);
                    specsHeader.appendChild(titleWrapper);

                    // Inserir antes da tabela
                    containerPai.insertBefore(specsHeader, infoTable);

                    // Remover o título H2 antigo se existir para não duplicar
                    const titulosAntigos = containerPai.querySelectorAll('h2.section-title');
                    titulosAntigos.forEach(t => {
                        if (t.textContent.includes('ESPECIFICAÇÕES')) t.remove();
                    });

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
        // PÁGINA DE FERRAMENTAS
        else if (path.includes('/pages/ferramentas.html')) {
            dados = (window.APPS_DATA.aplicativos || []).filter(item => item.categoria === 'Ferramentas');
            titulo = '🔧 Ferramentas';
        }
        // PÁGINA QUENTE
        else if (path.includes('/pages/quente.html')) {
            dados = [...(window.APPS_DATA.aplicativos || []), ...(window.APPS_DATA.jogos || [])].filter(item => item.tipo === 'quente');
            titulo = '🔥 Conteúdo Quente';
        }

        if (container && dados.length > 0) {
            container.innerHTML = `<h1 class="section-title">${titulo}</h1>`;
            dados.forEach(item => {
                container.appendChild(criarCard(item, prefixo));
            });
        }
    };

    // Executar renderização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.renderizarTudo);
    } else {
        window.renderizarTudo();
    }

    // Ouvir evento de dados prontos (caso venham de carregamento assíncrono)
    document.addEventListener('dadosProntos', window.renderizarTudo);

})();
