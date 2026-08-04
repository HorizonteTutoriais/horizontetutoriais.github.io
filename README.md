# 📦 Horizonte Tutoriais - Especificação Técnica

O **Horizonte Tutoriais** é uma plataforma web de alto desempenho dedicada à distribuição de aplicativos, jogos e tutoriais para Android. O projeto destaca-se por sua **Inteligência Dinâmica e Automática**, oferecendo uma experiência de usuário fluida e moderna sem a necessidade de recarregamento de páginas.

## 🚀 Tecnologias Utilizadas
- **Frontend:** HTML5 Semântico, CSS3 Moderno (Variáveis e Flexbox/Grid).
- **Inteligência:** JavaScript Vanilla (ES6+) com manipulação dinâmica de DOM.
- **Notificações:** Integração com OneSignal SDK para alertas em tempo real.
- **Comentários:** Sistema próprio com Firebase (Firestore + Authentication).
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

## 💬 Sistema de Comentários (Firebase)

O site possui um sistema de comentários próprio, construído com **Firebase**, que oferece:

- **Login com Google:** Opcional, para que o nome do visitante apareça automaticamente nos comentários.
- **Aprovação prévia:** Comentários ficam invisíveis até serem aprovados pelo administrador.
- **Painel de Moderação:** Interface exclusiva para gerenciar comentários (aprovar, excluir, responder e exportar).
- **Restrição de acesso:** Apenas o administrador pode acessar o painel.

**Tecnologias do sistema de comentários:**
- **Firebase Firestore:** Banco de dados para armazenar os comentários.
- **Firebase Authentication:** Controle de login e permissão de administrador.
- **Firebase Hosting:** Hospedagem permanente do painel de moderação.

## 📁 Estrutura de Pastas
- `/assets/css/`: Folhas de estilo (Design Responsivo e Dark Mode).
- `/assets/js/`: Inteligência do site (`app.js`), Banco de dados (`data.js`) e Motor de busca (`search.js`).
- `/index.html`: Estrutura principal e containers de renderização.

---

## 💚 Apoie o Projeto

Gostou do Horizonte Tutoriais? Apoie nosso trabalho com uma doação!

CHAVE PIX (E-MAIL)
 horizontetutoriais@gmail.com

---

📧 **Contato:** horizontetutoriais@gmail.com
🌐 **Site:** https://horizontetutoriais.github.io

*Desenvolvido com foco em velocidade, automação e acessibilidade.*
