document.addEventListener('input', (e) => {
    if (e.target.id === 'searchInput') {
        const term = e.target.value.toLowerCase().trim();
        const homeSections = document.getElementById('homeSections');
        const catSection = document.getElementById('categorySection');
        const gridCategory = document.getElementById('grid-category');
        const catTitle = document.getElementById('categoryTitle');
        
        if (term !== "") {
            if (homeSections) homeSections.style.display = 'none';
            if (catSection) catSection.style.display = 'block';
            if (catTitle) catTitle.innerText = "🔍 RESULTADOS DA BUSCA";
            
            // Define quantos itens mostrar inicialmente na busca
            app.displayedCount = 12;
            
            // Função interna para renderizar os resultados com paginação
            const renderSearchResults = () => {
                gridCategory.innerHTML = '';
                const allItems = HorizonteData.getAllItems();
                const filtered = allItems.filter(item => 
                    item.nome.toLowerCase().includes(term) || 
                    item.tipo.toLowerCase().includes(term)
                );

                if (filtered.length > 0) {
                    const toShow = filtered.slice(0, app.displayedCount);
                    toShow.forEach(item => gridCategory.appendChild(app.createCard(item)));

                    // Se houver mais resultados que o limite, mostra o botão
                    if (filtered.length > app.displayedCount) {
                        const container = document.createElement('div');
                        container.className = 'load-more-container';
                        container.style.gridColumn = '1 / -1';
                        
                        const btn = document.createElement('button');
                        btn.className = 'btn-load-more';
                        btn.innerText = '➕ VER MAIS RESULTADOS';
                        btn.onclick = () => {
                            app.displayedCount += 12;
                            renderSearchResults();
                        };
                        
                        container.appendChild(btn);
                        gridCategory.appendChild(container);
                    }
                } else {
                    gridCategory.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum item encontrado.</p>';
                }
            };
            
            renderSearchResults();
        } else {
            if (typeof app !== 'undefined' && app.loadPage) app.loadPage('home');
        }
    }
});
