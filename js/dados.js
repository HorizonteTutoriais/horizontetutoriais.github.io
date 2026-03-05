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
      tipo: "normal", 
      quente: false,    
      imagem: "https://placehold.co/64x64/1a73e8/fff?text=HC",
      imagemGrande: "https://placehold.co/150x150/1a73e8/fff?text=HC",
      url: "posts/aplicativos/horizon-clicker-FINAL-CORRIGIDO.html",
      linkDownload: "https://4br.me/BaixarHorizonClicker",
      tutorial: "pages/tutoriais.html#horizon-clicker",
      data: "2026-03-04",
      destaque: false 
    },
    {
      id: "horizon-tela-ligada",
      nome: "Horizon Tela Ligada",
      descricao: "Mantenha a tela ligada",
      categoria: "Aplicativos",
      tipo: "normal", 
      quente: true,    // Marcado como quente para teste
      imagem: "https://placehold.co/64x64/2196f3/fff?text=HTL",
      imagemGrande: "https://placehold.co/150x150/2196f3/fff?text=HTL",
      url: "posts/aplicativos/horizon-tela-ligada.html",
      linkDownload: "https://4br.me/BaixarHorizonTelaLigada",
      tutorial: "pages/tutoriais.html#tutorial-horizon-tela-ligada",
      data: "2026-03-05",
      destaque: false 
    }
  ],
  jogos: [
    {
      id: "resident-evil-4",
      nome: "Resident Evil 4 Mobile Edition",
      descricao: "Ação / Survival Horror",
      categoria: "Jogos",
      tipo: "popular", // Marcado como popular para teste
      quente: false,   
      imagem: "https://placehold.co/64x64/c62828/fff?text=RE4",
      imagemGrande: "https://placehold.co/150x150/c62828/fff?text=RE4",
      url: "posts/jogos/resident-evil-4-FINAL-CORRIGIDO.html",
      linkDownload: "https://4br.me/BaixarResidentEvil4",
      tutorial: "pages/tutoriais.html#resident-evil-4",
      data: "2026-03-04",
      destaque: false 
    },
    {
      id: "horizon-zero-dawn",
      nome: "Horizon Zero Dawn Mobile",
      descricao: "Ação / RPG",
      categoria: "Jogos",
      tipo: "normal", 
      quente: false,
      imagem: "https://placehold.co/64x64/00bcd4/fff?text=HZD",
      imagemGrande: "https://placehold.co/150x150/00bcd4/fff?text=HZD",
      url: "posts/jogos/horizon-zero-dawn.html",
      linkDownload: "https://example.com/horizon-zero-dawn-download",
      tutorial: "pages/tutoriais.html#tutorial-horizon-zero-dawn",
      data: "2026-03-05",
      destaque: false
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
    },
    {
      id: "tutorial-horizon-clicker",
      nome: "Tutorial Horizon Clicker",
      descricao: "Como usar o Horizon Clicker",
      categoria: "Tutoriais",
      tipo: "normal",
      quente: false,
      imagem: "https://placehold.co/64x64/1a73e8/fff?text=T-HC",
      imagemGrande: "https://placehold.co/150x150/1a73e8/fff?text=T-HC",
      url: "posts/tutoriais/tutorial-horizon-clicker.html",
      linkDownload: "",
      idRelacionado: "horizon-clicker", 
      data: "2026-03-04",
      destaque: false
    },
    {
      id: "tutorial-horizon-tela-ligada",
      nome: "Tutorial Horizon Tela Ligada",
      descricao: "Como usar o Horizon Tela Ligada",
      categoria: "Tutoriais",
      tipo: "normal",
      quente: false,
      imagem: "https://placehold.co/64x64/2196f3/fff?text=T-HTL",
      imagemGrande: "https://placehold.co/150x150/2196f3/fff?text=T-HTL",
      url: "posts/tutoriais/tutorial-horizon-tela-ligada.html",
      linkDownload: "",
      idRelacionado: "horizon-tela-ligada", // Vincula ao novo aplicativo
      data: "2026-03-05",
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
