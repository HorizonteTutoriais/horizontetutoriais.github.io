# 📦 Horizonte Tutoriais — Especificação Técnica

O **Horizonte Tutoriais** é uma plataforma web dedicada à distribuição de aplicativos, jogos, tutoriais e informações para Android. O site utiliza uma arquitetura estática orientada a dados, com carregamento dinâmico de conteúdo, busca, filtros, páginas técnicas e recursos de interação.

## 🚀 Tecnologias utilizadas

- **Frontend:** HTML5, CSS3, Flexbox e Grid.
- **Lógica do site:** JavaScript Vanilla (ES6+).
- **Dados do catálogo:** arquivo centralizado `assets/js/data.js`.
- **Busca:** `assets/js/search.js`.
- **Comentários:** integração com Firebase Firestore e Firebase Authentication.
- **Notificações:** OneSignal SDK, quando configurado.
- **Ícones:** Font Awesome.
- **Hospedagem principal:** GitHub Pages.

## 🧠 Arquitetura dinâmica

O conteúdo do site é controlado principalmente por `assets/js/data.js`. Cada item do catálogo pode conter nome, descrição, imagem, categoria, data, link de download, guia, tutorial e especificações técnicas.

Os campos utilizados nos itens incluem:

```text
id
nome
tipo
descricao
imagem
data
download
guia_link
tutorial
especificacoes
exibir
```

A inclusão ou atualização de um aplicativo normalmente pode ser feita alterando o cadastro correspondente em `data.js`, sem modificar a estrutura principal do HTML.

## 🔎 Busca, filtros e navegação

O arquivo `assets/js/app.js` renderiza os cards, categorias, modais e demais elementos dinâmicos do site. O arquivo `assets/js/search.js` realiza a busca instantânea no catálogo.

Os filtros permitem organizar o conteúdo por categorias, como aplicativos, jogos, ferramentas, tutoriais e postagens. A navegação do site é feita sem a necessidade de recarregar toda a página para cada filtro.

## 📋 Página de especificações técnicas

A página `app.html` exibe a ficha técnica de cada item usando o parâmetro `id` na URL. Exemplo:

```text
app.html?id=horizon%20tv%20cine-1
```

A página lê os dados do item em `assets/js/data.js` e pode exibir:

- nome e descrição;
- imagem do aplicativo;
- versão;
- tamanho;
- compatibilidade Android;
- desenvolvedora;
- botão de Download;
- botão Ver Guia;
- botão Ver Tutorial.

O botão de **Download** utiliza o campo `download`. O botão de **Guia** utiliza `guia_link`. O botão de **Tutorial** utiliza `tutorial`.

## 🔄 Sistema de atualização do aplicativo

O arquivo `update.json` é utilizado pelo aplicativo Android para consultar informações de atualização. Ele não é uma página visual e não cria botões no site.

Os principais campos são:

```json
{
  "version": "1.1",
  "title": "📺🎬 Horizon TV Cine",
  "notes": "Notas da atualização",
  "download_url": "URL usada para baixar a atualização",
  "details_url": "URL da página de especificações técnicas",
  "file_name": "Nome do APK",
  "size_bytes": 0
}
```

A diferença entre os links de download é a seguinte:

- `download` em `data.js`: alimenta o botão Download da página técnica do site.
- `download_url` em `update.json`: é usado pelo aplicativo para baixar uma atualização.
- `details_url` em `update.json`: abre a página técnica no site.

Quando uma nova versão for publicada, mantenha a versão, o nome do APK, o tamanho e os links coerentes entre o APK, `update.json` e `data.js`.

## 💬 Sistema de comentários

O site possui uma integração de comentários que pode utilizar:

- **Firebase Firestore:** armazenamento dos comentários.
- **Firebase Authentication:** autenticação dos usuários.
- **`assets/js/comentarios.js`:** lógica dos comentários e interação com o serviço.

As regras, credenciais e configurações do Firebase não devem ser publicadas no repositório quando contiverem dados sensíveis. Arquivos de configuração locais devem ser protegidos pelo `.gitignore`.

## 📁 Estrutura principal

```text
/
├── index.html                 # Página principal do site
├── app.html                   # Página de especificações técnicas
├── update.json                # Manifesto de atualização do aplicativo
├── doar.html                  # Página de apoio/doação
├── post.html                  # Página de postagens
├── admin.html                 # Área administrativa, quando configurada
├── assets/
│   ├── css/
│   │   ├── style.css          # Estilos principais
│   │   └── comentarios.css    # Estilos dos comentários
│   └── js/
│       ├── app.js             # Renderização e lógica principal
│       ├── data.js            # Catálogo central de itens
│       ├── search.js          # Sistema de busca
│       └── comentarios.js     # Sistema de comentários
└── .gitignore                 # Arquivos locais e temporários ignorados
```

A página oficial Sobre do aplicativo deve permanecer no repositório próprio do aplicativo, no caminho configurado pelo link utilizado pelo APK:

```text
https://horizontetutoriais.github.io/horizon-tv-cine/sobre.html
```

As antigas cópias `sobre-atual.html` e `sobre-restaurado.html` não fazem parte da estrutura necessária do site principal.

## 🧹 Arquivos temporários e backups

Backups e arquivos locais não devem ser publicados no repositório. Recomenda-se manter no `.gitignore` regras como:

```gitignore
*.backup
*.id-backup
*.nome-antigo.backup
*.save
*.save.*
*.bak
*.old
firebase/
.firebase/
```

O `.gitignore` impede novos envios, mas arquivos que já foram enviados precisam ser removidos do controle do Git com `git rm --cached` ou `git rm`.

## 💚 Apoie o projeto

Para apoiar o projeto, utilize a página oficial de doação ou a chave PIX publicada pelo responsável pelo projeto.

## 📧 Contato

- **E-mail:** horizontetutoriais@gmail.com
- **Site:** https://horizontetutoriais.github.io

---

*Documentação atualizada conforme a estrutura do site, da página técnica e do sistema de atualização do Horizon TV Cine.*
