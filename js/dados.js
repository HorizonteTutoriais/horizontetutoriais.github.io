/* ============================================================
   HORIZONTE TUTORIAIS — Banco de Dados (Sistema Automático)
   Dados embutidos diretamente (sem fetch)
   ============================================================ */

// Dados do site - EDITE AQUI para adicionar novos apps e jogos
window.APPS_DATA = {
  "aplicativos": [
    {
      "id": "horizon-clicker",
      "nome": "Horizon Clicker",
      "descricao": "Jogo de clicker divertido",
      "categoria": "Aplicativos",
      "tipo": "quente", // EXEMPLO 3: CONTEÚDO QUENTE
      "imagem": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404237058/AShzdwWGghpbeWBY.png",
      "url": "posts/aplicativos/app.html?id=horizon-clicker",
      "tutorial": "pages/tutoriais.html?open=horizon-clicker",
      "data": "2026-03-04",
      "destaque": true,
      "popular": false,
      "titulo": "Download do APK do Horizon Clicker (Automação de Cliques)",
      "descricaoLonga": "O Horizon Clicker é uma ferramenta poderosa para automação de tarefas repetitivas no seu dispositivo Android, permitindo configurar cliques automáticos com precisão e facilidade.",
      "recursos": [
        "Interface Intuitiva e fácil de usar",
        "Cliques Rápidos e Precisos com ajuste de milissegundos",
        "Fácil de Configurar múltiplos pontos de clique",
        "Sem Necessidade de Root no dispositivo"
      ],
      "especificacoes": {
        "versao": "Última Versão",
        "tamanho": "Varia de acordo com o dispositivo",
        "categoria": "Ferramentas / Automação",
        "desenvolvedor": "Horizon Dev Team",
        "tipoArquivo": "APK",
        "androidMin": "5.0 ou superior",
        "atualizadoEm": "26/02/2026",
        "recursosEspecificacoes": "Interface Intuitiva, Cliques Rápidos e Precisos, Sem Necessidade de Root"
      },
      "linkDownload": "https://4br.me/BaixarHorizonClikerApk",
      "imagemCapa": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404237058/AShzdwWGghpbeWBY.png",
      "tutorialTitulo": "🖱️ Como Usar o Horizon Click",
      "tutorialSubtitulo": "Aprenda a automatizar cliques no seu Android com precisão e facilidade usando o Horizon Clicker.",
      "tutorialDescricao": "Neste tutorial completo, você aprenderá como instalar, configurar e usar o Horizon Clicker para automatizar tarefas repetitivas no seu dispositivo Android.",
      "videos": [
        { "titulo": "Tutorial Parte 1", "id": "XDhx-rdHSmY" },
        { "titulo": "Configuração", "id": "XDhx-rdHSmY" }
      ],
      "icone": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404237058/AShzdwWGghpbeWBY.png"
    }
  ],
  "jogos": [
    {
      "id": "resident-evil-4",
      "nome": "Resident Evil 4",
      "descricao": "Jogo de ação e horror",
      "categoria": "Jogos",
      "tipo": "popular", // EXEMPLO 1: NOVO JOGO POPULAR
      "imagem": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404250136/zdklqMSlQEbwtgnX.jpeg",
      "url": "posts/jogos/jogo.html?id=resident-evil-4",
      "tutorial": "pages/tutoriais.html?open=resident-evil-4",
      "data": "2026-03-04",
      "destaque": true,
      "popular": true,
      "titulo": "Como Jogar Resident Evil 4 Mobile",
      "descricaoLonga": "Resident Evil 4 é um clássico do survival horror que agora está disponível para Android.",
      "recursos": [
        "Gráficos Otimizados para dispositivos móveis",
        "Controles Adaptados para tela sensível ao toque"
      ],
      "especificacoes": {
        "versao": "Mobile Edition",
        "tamanho": "~1.5 GB",
        "categoria": "Ação / Survival Horror",
        "desenvolvedor": "Capcom",
        "tipoArquivo": "APK + Dados (Discos)",
        "androidMin": "7.0 ou superior",
        "atualizadoEm": "26/02/2026",
        "recursosEspecificacoes": "Gráficos Otimizados, Controles Adaptados"
      },
      "linkDownload": "https://4br.me/BaixarApkR4",
      "linkDownloadData1": "https://4br.me/BaixarDico1R4",
      "linkDownloadData2": "https://4br.me/BaixarDisco2R4",
      "imagemCapa": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404250136/zdklqMSlQEbwtgnX.jpeg",
      "tutorialTitulo": "🎮 Como Jogar Resident Evil 4 Mobile",
      "tutorialSubtitulo": "Guia completo para instalar e dominar o clássico survival horror.",
      "tutorialDescricao": "Descubra como instalar Resident Evil 4 no seu Android e configure os controles para melhor experiência.",
      "videos": [
        { "titulo": "Instalação APK", "id": "XDhx-rdHSmY" }
      ],
      "icone": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663404250136/zdklqMSlQEbwtgnX.jpeg",
      "tipoDownload": "multiplo"
    }
  ],
  "tutoriais": [],
  "ferramentas": [],
  "quente": []
};

console.log('Dados carregados com sucesso:', window.APPS_DATA);

// Notifica que os dados estão prontos
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    document.dispatchEvent(new CustomEvent('dadosProntos', { detail: window.APPS_DATA }));
  });
} else {
  document.dispatchEvent(new CustomEvent('dadosProntos', { detail: window.APPS_DATA }));
}
