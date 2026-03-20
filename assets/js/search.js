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
            gridCategory.innerHTML = '';
            const allItems = HorizonteData.getAllItems();
            const filtered = allItems.filter(item => 
                item.nome.toLowerCase().includes(term) || 
                item.tipo.toLowerCase().includes(term)
            );
            if (filtered.length > 0) {
                filtered.forEach(item => gridCategory.appendChild(app.createCard(item)));
            } else {
                gridCategory.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum item encontrado.</p>';
            }
        } else {
            if (typeof app !== 'undefined' && app.loadPage) app.loadPage('home');
        }
    }
});
