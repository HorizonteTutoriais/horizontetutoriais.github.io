// ===== DADOS CENTRALIZADOS DO SITE =====
// Adicione novos aplicativos ou jogos neste arquivo
// O site atualizará automaticamente todas as páginas

const APPS_DATA = {
  aplicativos: [
    {
      id: "horizon-clicker",
      nome: "Horizon Clicker",
      descricao: "Automação de Cliques",
      categoria: "Aplicativos",
      quente: true,
      imagem: "https://placehold.co/64x64/1a73e8/fff?text=HC",
      imagemGrande: "https://placehold.co/56x56/1a73e8/fff?text=HC",
      url: "posts/Aplicativos/horizon-clicker.html",
      linkDownload: "https://4br.me/BaixarHorizonClicker"
    }
  ],
  jogos: [
    {
      id: "resident-evil-4",
      nome: "Resident Evil 4 Mobile Edition",
      descricao: "Ação / Survival Horror",
      categoria: "Jogos",
      quente: true,
      imagem: "https://placehold.co/64x64/c62828/fff?text=RE4",
      imagemGrande: "https://placehold.co/56x56/c62828/fff?text=RE4",
      url: "posts/Jogos/resident-evil-4.html",
      linkDownload: "posts/Jogos/resident-evil-4.html"
    }
  ]
};

// ===== INSTRUÇÕES PARA ADICIONAR NOVOS ITENS =====
/*
PARA ADICIONAR UM NOVO APLICATIVO:
1. Copie o objeto abaixo e adicione dentro do array "aplicativos"
2. Preencha os campos conforme o exemplo

{
  id: "seu-app-id",
  nome: "Nome do Aplicativo",
  descricao: "Descrição curta",
  categoria: "Aplicativos",
  quente: false,  // true se quiser destacar como "Quente"
  imagem: "https://placehold.co/64x64/cor/fff?text=XX",
  imagemGrande: "https://placehold.co/56x56/cor/fff?text=XX",
  url: "posts/Aplicativos/seu-app-id.html",
  linkDownload: "https://seu-link-de-download.com"
}

PARA ADICIONAR UM NOVO JOGO:
1. Copie o objeto abaixo e adicione dentro do array "jogos"
2. Preencha os campos conforme o exemplo

{
  id: "seu-jogo-id",
  nome: "Nome do Jogo",
  descricao: "Gênero / Categoria",
  categoria: "Jogos",
  quente: false,
  imagem: "https://placehold.co/64x64/cor/fff?text=XX",
  imagemGrande: "https://placehold.co/56x56/cor/fff?text=XX",
  url: "posts/Jogos/seu-jogo-id.html",
  linkDownload: "posts/Jogos/seu-jogo-id.html"
}

DEPOIS:
- Crie o arquivo HTML do post na pasta correspondente (posts/Aplicativos/ ou posts/Jogos/)
- O site atualizará automaticamente a Home, Aplicativos e Jogos!
*/
