// Horizonte Tutoriais v2.0 - Motor de Automação
class HorizonteApp {
    constructor() {
        this.currentPage = 'home';
        this.isDarkMode = localStorage.getItem('dark-mode') === 'true';
        this.init();
    }

    init() {
        HorizonteData.loadItemsFromStorage();
        this.setupListeners();
        this.applyTheme();
        this.loadPage('home');
    }

    setupListeners() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                this.loadPage(btn.dataset.page);
            };
        });

        document.getElementById('darkModeToggle').onclick = () => {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('dark-mode', this.isDarkMode);
            this.applyTheme();
        };

        // Fechar modais ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            };
        });
    }

    applyTheme() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        document.getElementById('darkModeToggle').innerText = this.isDarkMode ? '☀️' : '🌙';
    }

loadPage(page) {
        this.currentPage = page;
        this.itemsPerPage = 12; // Quantidade de itens antes de mostrar o botão "Mais"
        this.displayedCount = this.itemsPerPage;
        
        document.querySelectorAll('.nav-item').forEach(i =>
            i.classList.toggle('active', i.dataset.page === page)
        );

        const homeSections = document.getElementById('homeSections');
        const catSection = document.getElementById('categorySection');
        const gridUpdates = document.getElementById('grid-updates');
        const gridHighlights = document.getElementById('grid-highlights');
        const gridPopular = document.getElementById('grid-popular');

        // Atualizar populares em todas as páginas
        gridPopular.innerHTML = '';
        HorizonteData.getPopular().forEach(item =>
            gridPopular.appendChild(this.createPopularItem(item))
        );

        if (page === 'home') {
            homeSections.style.display = 'block';
            catSection.style.display = 'none';

            gridUpdates.innerHTML = '';
            HorizonteData.getLatestUpdates().forEach(item =>
                gridUpdates.appendChild(this.createCard(item))
            );

            gridHighlights.innerHTML = '';
            HorizonteData.getHighlights().forEach(item =>
                gridHighlights.appendChild(this.createCard(item, true))
            );
        } else {
            homeSections.style.display = 'none';
            catSection.style.display = 'block';

            const titles = {
                aplicativos: '📱 APLICATIVOS',
                jogos: '🎮 JOGOS',
                postagens: '📝 POSTAGENS',
                tutoriais: '📚 TUTORIAIS',
                ferramentas: '🛠️ FERRAMENTAS',
                quente: '🔥 QUENTE'
            };

            document.getElementById('categoryTitle').innerText = titles[page] || page.toUpperCase();
            this.renderCategoryItems(page);
        }
    }

    renderCategoryItems(page) {
        const gridCategory = document.getElementById('grid-category');
        gridCategory.innerHTML = '';

        const filtered = HorizonteData.getAllItems().filter(i => {
            if (page === 'aplicativos') return i.exibir?.emAplicativos;
            if (page === 'jogos') return i.exibir?.emJogos;
            if (page === 'postagens') return i.exibir?.emPostagens;
            if (page === 'tutoriais') return i.exibir?.emTutoriais;
            if (page === 'ferramentas') return i.exibir?.emFerramentas;
            if (page === 'quente') return i.exibir?.emQuente;
            return false;
        });

        if (filtered.length === 0) {
            gridCategory.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum item nesta categoria ainda.</p>';
            return;
        }

        const toShow = filtered.slice(0, this.displayedCount);
        toShow.forEach(item => gridCategory.appendChild(this.createCard(item)));

        if (filtered.length > this.displayedCount) {
            const container = document.createElement('div');
            container.className = 'load-more-container';
            container.style.gridColumn = '1 / -1';
            
            const btn = document.createElement('button');
            btn.className = 'btn-load-more';
            btn.innerText = '➕ VER MAIS';
            btn.onclick = () => {
                this.displayedCount += this.itemsPerPage;
                this.renderCategoryItems(page);
            };
            
            container.appendChild(btn);
            gridCategory.appendChild(container);
        }
    }
    createCard(item, isHighlight = false) {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <img src="${item.imagem}" class="item-image" alt="${item.nome}">
            <span class="item-type">${item.tipo}</span>
            <div class="item-name">${item.nome}</div>
        `;
        div.onclick = () => this.showItemModal(item);
        return div;
    }

    createPopularItem(item) {
        const div = document.createElement('div');
        div.className = 'popular-item';
        div.innerHTML = `
            <img src="${item.imagem}" class="popular-item-image" alt="${item.nome}">
            <div class="popular-item-name">${item.nome}</div>
        `;
        div.onclick = () => this.showItemModal(item);
        return div;
    }

    showItemModal(item) {
        const modal = document.getElementById('itemModal');
        document.getElementById('modalImage').src = item.imagem;
        document.getElementById('modalName').innerText = item.nome;
        document.getElementById('modalDesc').innerText = item.descricao;

        // Especificações Técnicas
        const specs = document.getElementById('modalSpecs');
        specs.innerHTML = '';
        for (const [key, val] of Object.entries(item.especificacoes || {})) {
            specs.innerHTML += `
                <div class="spec-item">
                    <b>${key.toUpperCase()}:</b>
                    <span>${val}</span>
                </div>
            `;
        }

        // Botões de Ação
        const actions = document.getElementById('modalActions');
        actions.innerHTML = '';

        // Botão Guia
        const guiaBtn = document.createElement('button');
        guiaBtn.className = 'action-btn';
        guiaBtn.style.background = '#673ab7';
        guiaBtn.innerHTML = '🗂️ Ver Guia';
        guiaBtn.onclick = () => window.open(item.guia_link || '#', '_blank');
        actions.appendChild(guiaBtn);

        // Botão Tutorial
        const tutBtn = document.createElement('button');
        tutBtn.className = 'action-btn';
        tutBtn.style.background = '#1e5ba8';
        tutBtn.innerHTML = '📚 Ver Tutorial';
        tutBtn.onclick = () => {
            closeModal('itemModal');
            this.loadPage('tutoriais');
            setTimeout(() => this.playTutorial(item), 300);
        };
        actions.appendChild(tutBtn);

// Downloads - Diferenciação automática
        if (item.tipo === 'Postagem') {
            // Para Postagens: botão "Acessar agora" que redireciona para o link
            const acessarBtn = document.createElement('button');
            acessarBtn.className = 'action-btn';
            acessarBtn.style.background = '#ff9800';
            acessarBtn.style.width = '100%';
            acessarBtn.style.marginTop = '5px';
            acessarBtn.innerHTML = '🔗 Acessar agora';
            acessarBtn.onclick = () => window.open(item.download || '#', '_blank');
            actions.appendChild(acessarBtn);
        } else if (item.tipo === 'Jogo' && item.downloads) {
            // Para Jogos: APK/DATA/OBB
            const downloadContainer = document.createElement('div');
            downloadContainer.style.width = '100%';
            downloadContainer.innerHTML = `
                <button class="action-btn" style="width:100%; background:#ff9800; margin-top:5px;">
                    ⬇️ Download (Opções)
                </button>
                <div id="optDown" style="display:none; flex-direction:column; gap:5px; margin-top:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;"></div>
            `;

            const optionsDiv = downloadContainer.querySelector('#optDown');
            ['apk', 'data', 'obb'].forEach(type => {
                if (item.downloads[type] && item.downloads[type] !== '#') {
                    const btn = document.createElement('button');
                    btn.className = 'action-btn';
                    btn.style.background = '#444';
                    btn.style.width = '100%';
                    btn.innerHTML = `⬇️ BAIXAR ${type.toUpperCase()}`;
                    btn.onclick = () => window.open(item.downloads[type], '_blank');
                    optionsDiv.appendChild(btn);
                }
            });

            downloadContainer.querySelector('button').onclick = () => {
                const opt = downloadContainer.querySelector('#optDown');
                opt.style.display = opt.style.display === 'none' ? 'flex' : 'none';
            };

            actions.appendChild(downloadContainer);
        } else {
            // Para Aplicativos/Ferramentas: Download direto
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'action-btn';
            downloadBtn.style.background = '#ff9800';
            downloadBtn.style.width = '100%';
            downloadBtn.style.marginTop = '5px';
            downloadBtn.innerHTML = '⬇️ Download';
            downloadBtn.onclick = () => window.open(item.download || '#', '_blank');
            actions.appendChild(downloadBtn);
        }

        modal.classList.add('active');
    }

    playTutorial(item) {
        const modal = document.getElementById('tutorialModal');
        document.getElementById('tutTitle').innerText = `Tutorial: ${item.nome}`;

        const video = document.getElementById('tutVideo');
        const videoUrl = item.tutorial.includes('?')
            ? `${item.tutorial}&autoplay=1`
            : `${item.tutorial}?autoplay=1`;
        video.src = videoUrl;

        const footer = document.getElementById('tutFooter');
        footer.innerHTML = '';

        const backBtn = document.createElement('button');
        backBtn.className = 'action-btn';
        backBtn.style.background = '#2d5f2e';
        backBtn.style.width = '100%';
        backBtn.style.marginTop = '15px';
        backBtn.innerHTML = '📋 Voltar para Especificações';
        backBtn.onclick = () => {
            closeTutorial();
            this.showItemModal(item);
        };

        footer.appendChild(backBtn);
        modal.classList.add('active');
    }
}

// Inicializar a aplicação
const app = new HorizonteApp();

// Funções globais para modais
window.closeModal = (id) => {
    document.getElementById(id).classList.remove('active');
};

window.closeTutorial = () => {
    const modal = document.getElementById('tutorialModal');
    modal.classList.remove('active');
    document.getElementById('tutVideo').src = '';
};

window.openInfoModal = (id) => {
    document.getElementById(id).classList.add('active');
};
// Funções para o Tutorial de Inscrição (Ajustado para YouTube Shorts com Som)
window.openTutorialInscricao = () => {
    const modal = document.getElementById('tutorialInscricaoModal');
    const video = document.getElementById('tutInscricaoVideo');
    
    // O segredo: Definimos o link do seu Shorts com autoplay e som (mute=0) no momento do clique
    const videoId = "0G8Vcvypu6U"; 
    video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&mute=0&loop=1&playlist=${videoId}`;
    
    modal.classList.add('active');
};

window.closeTutorialInscricao = () => {
    const modal = document.getElementById('tutorialInscricaoModal');
    modal.classList.remove('active');
    
    // Para o vídeo completamente ao fechar a janela
    const video = document.getElementById('tutInscricaoVideo');
    video.src = ''; 
};
