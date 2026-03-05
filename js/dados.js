// ===== DADOS CENTRALIZADOS DO SITE =====
// Adicione novos aplicativos, jogos, tutoriais ou ferramentas neste arquivo
// O site atualizará automaticamente todas as páginas

const APPS_DATA = {
  aplicativos: [
    {
      id: "horizon-clicker",
      nome: "Horizon Clicker",
      descricao: "Automação de Cliques",
      categoria: "Aplicativos",
      tipo: "normal", // Para não aparecer em Populares (Exemplo 3)
      quente: true,    // Marcado como quente (Exemplo 3)
      imagem: "https://placehold.co/64x64/1a73e8/fff?text=HC",
      imagemGrande: "https://placehold.co/150x150/1a73e8/fff?text=HC",
      url: "posts/aplicativos/horizon-clicker-FINAL-CORRIGIDO.html",
      linkDownload: "https://4br.me/BaixarHorizonClicker",
      tutorial: "pages/tutoriais.html#horizon-clicker",
      data: "2026-03-04",
      destaque: false // Deixado como false para testar a automação do renderizar.js
    }
  ],
  jogos: [
    {
      id: "resident-evil-4",
      nome: "Resident Evil 4 Mobile Edition",
      descricao: "Ação / Survival Horror",
      categoria: "Jogos",
      tipo: "popular", // Marcado como popular (Exemplo 1)
      quente: false,   // Para não aparecer em Quente (Exemplo 1)
      imagem: "https://placehold.co/64x64/c62828/fff?text=RE4",
      imagemGrande: "https://placehold.co/150x150/c62828/fff?text=RE4",
      url: "posts/jogos/resident-evil-4-FINAL-CORRIGIDO.html",
      linkDownload: "https://4br.me/BaixarResidentEvil4",
      tutorial: "pages/tutoriais.html#resident-evil-4",
      data: "2026-03-04",
      destaque: false // Deixado como false para testar a automação do renderizar.js
    }
  ],
  tutoriais: [
    {
      id: "tutorial-1",
      nome: "Tutorial 1",
      descricao: "Primeiro tutorial",
      categoria: "Tutoriais",
      tipo: "normal",
      quente: false,
      imagem: "https://placehold.co/64x64/4caf50/fff?text=T1",
      imagemGrande: "https://placehold.co/150x150/4caf50/fff?text=T1",
      url: "posts/tutoriais/tutorial-1.html",
      linkDownload: "",
      tutorial: "pages/tutoriais.html#tutorial-1",
      data: "2026-03-04",
      destaque: false
    }
  ],
  ferramentas: [
    {
      id: "ferramenta-1",
      nome: "Ferramenta 1",
      descricao: "Primeira ferramenta",
      categoria: "Ferramentas",
      tipo: "normal",
      quente: false,
      imagem: "https://placehold.co/64x64/ff9800/fff?text=F1",
      imagemGrande: "https://placehold.co/150x150/ff9800/fff?text=F1",
      url: "posts/ferramentas/ferramenta-1.html",
      linkDownload: "",
      tutorial: "pages/ferramentas.html#ferramenta-1",
      data: "2026-03-04",
      destaque: false
    }
  ]
};
