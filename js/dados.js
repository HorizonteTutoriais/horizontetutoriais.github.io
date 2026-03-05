/* ============================================================
   HORIZONTE TUTORIAIS — Carregador de Dados
   Carrega dados.json e expõe como APPS_DATA
   ============================================================ */

let APPS_DATA = {};

// Determinar o caminho correto para dados.json baseado na localização
function getDadosPath() {
  const path = window.location.pathname;
  
  if (path.includes('/posts/aplicativos/') || path.includes('/posts/jogos/')) {
    return '../../js/dados.json';
  }
  if (path.includes('/pages/')) {
    return '../js/dados.json';
  }
  if (path.includes('/Index/')) {
    return '../js/dados.json';
  }
  
  return './js/dados.json';
}

// Carregar dados.json
fetch(getDadosPath())
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar dados.json');
    }
    return response.json();
  })
  .then(data => {
    APPS_DATA = data;
    console.log('Dados carregados com sucesso:', APPS_DATA);
    
    // Disparar evento customizado para notificar que os dados foram carregados
    const event = new CustomEvent('dadosCarregados', { detail: APPS_DATA });
    document.dispatchEvent(event);
  })
  .catch(error => {
    console.error('Erro ao carregar dados:', error);
    
    // Fallback: usar dados padrão
    APPS_DATA = {
      "aplicativos": [],
      "jogos": [],
      "tutoriais": [],
      "ferramentas": [],
      "quente": []
    };
  });
