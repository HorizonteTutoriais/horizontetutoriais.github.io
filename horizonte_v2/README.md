# 📦 Horizonte Tutoriais v2.0

Bem-vindo ao seu novo site de APKs e Jogos Android! Este é um sistema totalmente automatizado, pronto para receber seus apps e jogos com toda a inteligência nativa.

## ✨ Características

- ✅ **Automação Inteligente**: Diferencia automaticamente entre Aplicativos, Jogos e Ferramentas
- ✅ **Downloads Dinâmicos**: Para Jogos (APK/DATA/OBB), para Apps (download único)
- ✅ **Navegação Inteligente**: Botão de Tutorial com auto-play e volta automática para especificações
- ✅ **Modo Noturno**: Suporte completo a tema escuro
- ✅ **Responsivo**: Funciona perfeitamente em desktop, tablet e celular
- ✅ **Categorias Dinâmicas**: 6 abas diferentes (Lar, Aplicativos, Jogos, Tutoriais, Ferramentas, Quente)
- ✅ **Sem Comentários**: Preparado para integração com Cusdis depois

## 📁 Estrutura de Pastas

```
horizonte_v2/
├── index.html              # Página principal
├── README.md               # Este arquivo
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos (azul/laranja + dark mode)
│   └── js/
│       ├── data.js         # Base de dados (vazia, pronta para itens)
│       └── app.js          # Motor de automação
└── scripts/
    └── add_item.py         # Script para adicionar novos itens
```

## 🚀 Como Usar

### 1️⃣ Preparar no Termux (Android)

```bash
# Clonar/copiar o repositório
cd ~/seu-repositorio-github
# (Copie os arquivos aqui)

# Testar localmente
python3 -m http.server 8112

# Abrir no navegador
# http://localhost:8112
```

### 2️⃣ Adicionar um Novo App/Jogo

```bash
cd scripts
python3 add_item.py
```

O script vai fazer perguntas interativas:
- **ID**: Identificador único (ex: gta-sa)
- **Nome**: Nome do app/jogo
- **Tipo**: Aplicativo, Jogo ou Ferramenta
- **Descrição**: Texto descritivo
- **Imagem**: URL da imagem (ex: https://...)
- **Downloads**: Links para APK, DATA, OBB (se for jogo)
- **Guia**: Link para página de guia/download
- **Tutorial**: Link do YouTube Embed
- **Especificações**: Versão, tamanho, Android mínimo, dev
- **Categorias**: Onde exibir (Destaques, Populares, Quente, etc)

### 3️⃣ Testar Localmente

```bash
python3 -m http.server 8112
# Acesse: http://localhost:8112
```

### 4️⃣ Enviar para GitHub

```bash
git add .
git commit -m "Adicionar novo item: [Nome do App]"
git push origin main
```

## 📊 Estrutura de um Item (data.js)

Cada item tem esta estrutura:

```json
{
    "id": "gta-sa",
    "nome": "GTA San Andreas",
    "tipo": "Jogo",
    "descricao": "O clássico jogo de ação em mundo aberto",
    "imagem": "https://...",
    "data": "2024-03-18",
    "download": "#",
    "downloads": {
        "apk": "https://...",
        "data": "https://...",
        "obb": "https://..."
    },
    "guia_link": "https://...",
    "tutorial": "https://www.youtube.com/embed/...",
    "especificacoes": {
        "versao": "2.0",
        "tamanho": "2.5GB",
        "android": "5.0+",
        "desenvolvedora": "Rockstar Games"
    },
    "exibir": {
        "emDestaques": true,
        "emPopulares": true,
        "emQuente": true,
        "emAplicativos": false,
        "emJogos": true,
        "emTutoriais": true,
        "emFerramentas": false
    }
}
```

## 🎨 Personalizações

### Mudar Cores
Edite `assets/css/style.css`:
```css
:root {
    --primary: #1e5ba8;    /* Azul */
    --accent: #ff9800;     /* Laranja */
}
```

### Mudar Título
Edite `index.html`:
```html
<h1 class="logo">📦 Horizonte Tutoriais</h1>
```

### Mudar Descrição "Sobre Nós"
Edite `index.html`, procure por `sobreModal`

## 🔧 Troubleshooting

### Script não funciona?
```bash
# Dar permissão de execução
chmod +x scripts/add_item.py

# Executar com python3
python3 scripts/add_item.py
```

### Itens não aparecem?
1. Verifique se o JSON está válido em `data.js`
2. Limpe o cache do navegador (Ctrl+Shift+Del)
3. Verifique se as categorias estão marcadas como `true` em `exibir`

### Vídeo não toca?
Use o link de embed do YouTube: `https://www.youtube.com/embed/VIDEO_ID`

## 📱 Responsividade

O site funciona perfeitamente em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Celular (até 600px)

## 🌙 Modo Noturno

Clique no botão 🌙 no canto superior direito para ativar/desativar o modo escuro.

## 📝 Próximos Passos

1. ✅ Adicionar seus primeiros apps/jogos
2. ✅ Testar todas as funcionalidades
3. ✅ Integrar Cusdis para comentários (depois)
4. ✅ Fazer deploy no GitHub Pages

## 💡 Dicas

- Use imagens de alta qualidade (mínimo 140x140px)
- Links do YouTube devem ser de embed, não de watch
- Teste sempre localmente antes de fazer push
- Mantenha IDs únicos para cada item

## 🆘 Suporte

Se algo não funcionar:
1. Verifique o console do navegador (F12)
2. Verifique a sintaxe JSON em `data.js`
3. Teste em outro navegador

---

**Criado com ❤️ para Horizonte Tutoriais**

Versão: 2.0 | Data: 2024-03-18
