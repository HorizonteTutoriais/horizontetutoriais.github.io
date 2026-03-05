/* ============================================================
   HORIZONTE TUTORIAIS — Carregador de Dados
   Carrega dados.json e expõe como APPS_DATA
   ============================================================ */

// Inicializa o objeto global se não existir
if (typeof window.APPS_DATA === 'undefined') {
    window.APPS_DATA = {
        "aplicativos": [],
        "jogos": [],
        "tutoriais": [],
        "ferramentas": [],
        "quente": []
    };
}

// Determinar o caminho correto para dados.json baseado na localização
function getDadosPath() {
    const path = window.location.pathname;
    
    // Se estiver em um post
    if (path.includes('/posts/')) {
        return '../../js/dados.json';
    }
    // Se estiver em uma página
    if (path.includes('/pages/')) {
        return '../js/dados.json';
    }
    // Se estiver na pasta Index
    if (path.includes('/Index/')) {
        return '../js/dados.json';
    }
    
    // Raiz
    return './js/dados.json';
}

// Função para carregar os dados
async function carregarDados() {
    try {
        const response = await fetch(getDadosPath());
        if (!response.ok) throw new Error('Erro ao carregar dados.json');
        
        const data = await response.json();
        window.APPS_DATA = data;
        console.log('Dados carregados com sucesso:', window.APPS_DATA);
        
        // Notifica o sistema que os dados estão prontos
        document.dispatchEvent(new CustomEvent('dadosProntos', { detail: data }));
        
        // Se o renderizar.js já rodou e não encontrou dados, tenta rodar as funções dele
        if (typeof window.renderizarTudo === 'function') {
            window.renderizarTudo();
        }
    } catch (error) {
        console.error('Erro crítico ao carregar dados:', error);
    }
}

// Inicia o carregamento imediatamente
carregarDados();
