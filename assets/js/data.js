// Horizonte Tutoriais v2.0 - Base de Dados
// Esta array será preenchida com seus apps e jogos
const items = [];

function getAllItems() {
    return items;
}

function getLatestUpdates() {
    return items.slice(0, 8);
}

function getHighlights() {
    return items.filter(i => i.exibir?.emDestaques).slice(0, 2);
}

function getPopular() {
    return items.filter(i => i.exibir?.emPopulares).slice(0, 5);
}

function loadItemsFromStorage() {
    const stored = localStorage.getItem('horizonte_v2_items');
    if (stored) {
        items.length = 0;
        items.push(...JSON.parse(stored));
    }
}

window.HorizonteData = {
    getAllItems,
    getLatestUpdates,
    getHighlights,
    getPopular,
    loadItemsFromStorage
};
