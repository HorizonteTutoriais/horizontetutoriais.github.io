# 📦 Horizonte Tutoriais - Especificação Técnica

O **Horizonte Tutoriais** é uma plataforma web de alto desempenho dedicada à distribuição de aplicativos, jogos e tutoriais para Android. O projeto destaca-se por sua **Inteligência Dinâmica e Automática**, oferecendo uma experiência de usuário fluida e moderna sem a necessidade de recarregamento de páginas.

## 🚀 Tecnologias Utilizadas
- **Frontend:** HTML5 Semântico, CSS3 Moderno (Variáveis e Flexbox/Grid).
- **Inteligência:** JavaScript Vanilla (ES6+) com manipulação dinâmica de DOM.
- **Notificações:** Integração com OneSignal SDK para alertas em tempo real.
- **Comentários:** Sistema Cusdis com tradução automática via script.
- **Ícones:** Font Awesome 6.0.0.

## 🧠 Inteligência Dinâmica e Automática

O coração do site reside em sua arquitetura orientada a dados, permitindo que o conteúdo seja gerenciado de forma centralizada e automática.

### 1. Sistema de Filtragem Inteligente
- **Filtro em Tempo Real:** Através da função `filterCategory`, o site processa o banco de dados local (`data.js`) e renderiza instantaneamente os itens solicitados (Aplicativos, Jogos, Postagens, etc.).
- **Sincronização de Navegação:** Os links do rodapé utilizam uma lógica de "espelhamento" que aciona os gatilhos do menu superior, garantindo que a página suba ao topo (`scrollTo`) suavemente enquanto o conteúdo é atualizado.

### 2. Gestão de Dados Centralizada (`data.js`)
- Toda a biblioteca de conteúdo é gerida por um objeto estruturado, permitindo que novos itens sejam adicionados apenas inserindo um novo bloco de código, sem mexer na estrutura do HTML.
- **Campos Automáticos:** Nome, Descrição, Categoria, Link de Download e Imagens são injetados dinamicamente nos cards e modais.

### 3. Sistema de Busca Instantânea
- Implementação de um motor de busca que filtra os itens conforme o usuário digita, oferecendo feedback visual imediato.

### 4. Modo Escuro (Dark Mode) Persistente
- Sistema automático que detecta e salva a preferência do usuário no `localStorage`.
- **Inversão Inteligente:** O sistema aplica filtros de inversão de cores inclusive em widgets externos (como o Cusdis) para manter a harmonia visual no modo noturno.

## 🛠️ Funcionalidades Avançadas

| Funcionalidade | Descrição |
| :--- | :--- |
| **Modais Inteligentes** | Janelas flutuantes que carregam especificações técnicas e links de download dinamicamente. |
| **Tutorial de Inscrição** | Botão flutuante que abre um tutorial em vídeo (YouTube Shorts) com autoplay e loop configurados. |
| **Feed RSS** | Sistema de compartilhamento de notícias via XML integrado ao rodapé. |
| **Cusdis Traduzido** | Script customizado que traduz em tempo real os campos do sistema de comentários para o Português. |

## 📁 Estrutura de Pastas
- `/assets/css/`: Folhas de estilo (Design Responsivo e Dark Mode).
- `/assets/js/`: Inteligência do site (`app.js`), Banco de dados (`data.js`) e Motor de busca (`search.js`).
- `/index.html`: Estrutura principal e containers de renderização.

---
*Desenvolvido com foco em velocidade, automação e acessibilidade.*
